"use server";
import getDbConnection from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	timeout: 300000, // 5 minutes timeout
	maxRetries: 5, // Increase retries for better reliability
	defaultHeaders: {
		"Keep-Alive": "timeout=300", // Keep connection alive for 5 minutes
	},
	defaultQuery: {
		"request-timeout": "300000", // Request timeout hint for the API
	},
});

export async function transcribeUploadedFile(
	resp: {
		serverData: { userId: string; file: any };
	}[],
) {
	if (!resp) {
		return {
			success: false,
			message: "File upload failed",
			data: null,
		};
	}

	const {
		serverData: {
			userId,
			file: { url: fileUrl, name: fileName },
		},
	} = resp[0];

	if (!fileUrl || !fileName) {
		return {
			success: false,
			message: "File upload failed",
			data: null,
		};
	}

	try {
		// Fetch with timeout and retry logic
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 120000); // Increase to 120 second timeout for fetch

		// Add retry logic for fetch
		const fetchWithRetry = async (
			url: string,
			options: RequestInit,
			maxRetries = 3,
		) => {
			let lastError;
			for (let i = 0; i < maxRetries; i++) {
				try {
					return await fetch(url, options);
				} catch (error) {
					console.log(`Fetch attempt ${i + 1} failed, retrying...`);
					lastError = error;
					// Exponential backoff
					await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
				}
			}
			throw lastError;
		};

		const response = await fetchWithRetry(fileUrl, {
			signal: controller.signal,
			headers: {
				Connection: "keep-alive",
				"Keep-Alive": "timeout=120",
			},
		}).finally(() => clearTimeout(timeoutId));

		if (!response.ok) {
			throw new Error(
				`Failed to fetch file: ${response.status} ${response.statusText}`,
			);
		}

		// Process in chunks to avoid timeouts
		console.log("Starting transcription for file:", fileName);
		const startTime = Date.now();

		// Add retry logic for OpenAI API calls
		const callWithRetry = async (fn: any, maxRetries = 3) => {
			let lastError;
			for (let i = 0; i < maxRetries; i++) {
				try {
					return await fn();
				} catch (error) {
					console.log(`API call attempt ${i + 1} failed, retrying...`, error);
					lastError = error;
					// Exponential backoff
					await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
				}
			}
			throw lastError;
		};

		// Convert the response to a Blob which is compatible with OpenAI's API
		const audioBlob = await response.blob();
		// Create a File object from the Blob with the original filename
		const audioFile = new File([audioBlob], fileName, { type: audioBlob.type });

		const transcriptions = await callWithRetry(() =>
			openai.audio.transcriptions.create({
				model: "whisper-1",
				file: audioFile,
				// Add response_format parameter for more reliable processing
				response_format: "json",
			}),
		);

		const duration = ((Date.now() - startTime) / 1000).toFixed(2);
		console.log(`Transcription completed in ${duration}s`);

		return {
			success: true,
			message: "File uploaded successfully!",
			data: { transcriptions, userId },
		};
	} catch (error) {
		console.error("Error processing file", error);

		// Handle specific error types
		if (error instanceof OpenAI.APIError) {
			if (error.status === 413) {
				return {
					success: false,
					message: "File size exceeds the max limit of 20MB",
					data: null,
				};
			}

			if (error.status === 504 || error.status === 408) {
				return {
					success: false,
					message:
						"The request timed out. Try with a shorter audio file or try again later.",
					data: null,
				};
			}
		}

		// Handle fetch timeout
		if (error instanceof Error && error.name === "AbortError") {
			return {
				success: false,
				message:
					"Request timed out while fetching the file. Please try again with a smaller file.",
				data: null,
			};
		}

		return {
			success: false,
			message: error instanceof Error ? error.message : "Error processing file",
			data: null,
		};
	}
}

async function saveBlogPost(userId: string, title: string, content: string) {
	try {
		const sql = await getDbConnection();
		const [insertedPost] = await sql`
    INSERT INTO posts (user_id, title, content)
    VALUES (${userId}, ${title}, ${content})
    RETURNING id
    `;
		return insertedPost.id;
	} catch (error) {
		console.error("Error saving blog post", error);
		throw error;
	}
}

async function getUserBlogPosts(userId: string) {
	try {
		const sql = await getDbConnection();
		const posts = await sql`
    SELECT content FROM posts 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC 
    LIMIT 3
  `;
		return posts.map((post) => post.content).join("\n\n");
	} catch (error) {
		console.error("Error getting user blog posts", error);
		throw error;
	}
}

async function generateBlogPost({
	transcriptions,
	userPosts,
}: {
	transcriptions: string;
	userPosts: string;
}) {
	// Add retry logic for OpenAI API calls
	const callWithRetry = async (fn: any, maxRetries = 3) => {
		let lastError;
		for (let i = 0; i < maxRetries; i++) {
			try {
				return await fn();
			} catch (error) {
				console.log(
					`Blog generation attempt ${i + 1} failed, retrying...`,
					error,
				);
				lastError = error;
				// Exponential backoff
				await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
			}
		}
		throw lastError;
	};

	// Stream the response to avoid timeouts
	const completion = await callWithRetry(() =>
		openai.chat.completions.create(
			{
				messages: [
					{
						role: "system",
						content:
							"You are a skilled content writer that converts audio transcriptions into well-structured, engaging blog posts in Markdown format. Create a comprehensive blog post with a catchy title, introduction, main body with multiple sections, and a conclusion. Analyze the user's writing style from their previous posts and emulate their tone and style in the new post. Keep the tone casual and professional.",
					},
					{
						role: "user",
						content: `Here are some of my previous blog posts for reference:

${userPosts}

Please convert the following transcription into a well-structured blog post using Markdown formatting. Follow this structure:

1. Start with a SEO friendly catchy title on the first line.
2. Add two newlines after the title.
3. Write an engaging introduction paragraph.
4. Create multiple sections for the main content, using appropriate headings (##, ###).
5. Include relevant subheadings within sections if needed.
6. Use bullet points or numbered lists where appropriate.
7. Add a conclusion paragraph at the end.
8. Ensure the content is informative, well-organized, and easy to read.
9. Emulate my writing style, tone, and any recurring patterns you notice from my previous posts.

Here's the transcription to convert: ${transcriptions}`,
					},
				],
				model: "gpt-4o-mini",
				temperature: 0.7,
				max_tokens: 1000,
				// Set stream to false to get the complete response at once
				stream: false,
			},
			{
				timeout: 180000, // 3 minutes timeout specifically for this call
			},
		),
	);

	return completion.choices[0].message.content;
}
export async function generateBlogPostAction({
	transcriptions,
	userId,
}: {
	transcriptions: { text: string };
	userId: string;
}) {
	const userPosts = await getUserBlogPosts(userId);

	let postId = null;

	if (transcriptions) {
		const blogPost = await generateBlogPost({
			transcriptions: transcriptions.text,
			userPosts,
		});

		if (!blogPost) {
			return {
				success: false,
				message: "Blog post generation failed, please try again...",
			};
		}

		const [title, ...contentParts] = blogPost?.split("\n\n") || [];

		//database connection

		if (blogPost) {
			postId = await saveBlogPost(userId, title, blogPost);
		}
	}

	//navigate
	revalidatePath(`/posts/${postId}`);
	redirect(`/posts/${postId}`);
}
