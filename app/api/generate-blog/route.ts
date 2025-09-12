import getDbConnection from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Configure runtime for longer execution
export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds for Vercel Pro

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

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
		console.error("Error getting user blog posts:", error);
		return "";
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
		console.error("Error saving blog post:", error);
		throw error;
	}
}

export async function POST(request: NextRequest) {
	try {
		const { transcription, userId } = await request.json();

		if (!transcription || !userId) {
			return NextResponse.json(
				{ error: "Transcription and userId are required" },
				{ status: 400 },
			);
		}

		// Get user's previous posts for style analysis
		const userPosts = await getUserBlogPosts(userId);

		// Set timeout for blog generation
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout

		try {
			const completion = await openai.chat.completions.create(
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

Here's the transcription to convert: ${transcription}`,
						},
					],
					model: "gpt-4o-mini",
					temperature: 0.7,
					max_tokens: 2000, // Increased for better content
				},
				{
					signal: controller.signal,
				},
			);

			clearTimeout(timeoutId);

			const blogPost = completion.choices[0].message.content;

			if (!blogPost) {
				return NextResponse.json(
					{ error: "Blog post generation failed" },
					{ status: 500 },
				);
			}

			// Extract title from the blog post
			const [title] = blogPost.split("\n\n") || ["Untitled Post"];

			// Save the blog post to database
			const postId = await saveBlogPost(userId, title.trim(), blogPost);

			return NextResponse.json({
				success: true,
				data: {
					postId,
					title: title.trim(),
					content: blogPost,
				},
			});
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof Error && error.name === "AbortError") {
				return NextResponse.json(
					{ error: "Blog generation timed out. Please try again." },
					{ status: 408 },
				);
			}

			console.error("Blog generation error:", error);
			return NextResponse.json(
				{ error: "Blog generation failed. Please try again." },
				{ status: 500 },
			);
		}
	} catch (error) {
		console.error("API error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
