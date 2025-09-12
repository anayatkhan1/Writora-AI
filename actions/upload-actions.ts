"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
		// Delegate heavy work to API route with 60s budget
		const transcriptionResponse = await fetch("/api/transcribe", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ fileUrl, fileName, userId }),
			signal: AbortSignal.timeout(55_000),
		});

		const result = await transcriptionResponse.json();

		if (!transcriptionResponse.ok) {
			return {
				success: false,
				message: result?.error || "Transcription failed",
				data: null,
			};
		}

		return {
			success: true,
			message: "File transcribed successfully!",
			data: {
				transcriptions: { text: result?.data?.transcription },
				userId: result?.data?.userId,
			},
		};
	} catch (error) {
		console.error("Error processing file", error);
		if (error instanceof Error && error.name === "TimeoutError") {
			return {
				success: false,
				message: "Transcription timed out. Please try a smaller file.",
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

export async function generateBlogPostAction({
	transcriptions,
	userId,
}: {
	transcriptions: { text: string };
	userId: string;
}) {
	try {
		if (!transcriptions?.text || !userId) {
			return { success: false, message: "Missing transcription or user ID" };
		}

		const response = await fetch("/api/generate-blog", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ transcription: transcriptions.text, userId }),
			signal: AbortSignal.timeout(35_000),
		});

		const result = await response.json();
		if (!response.ok) {
			return {
				success: false,
				message: result?.error || "Blog post generation failed",
			};
		}

		const { postId } = result.data;
		revalidatePath(`/posts/${postId}`);
		redirect(`/posts/${postId}`);
	} catch (error) {
		if (error instanceof Error && error.name === "TimeoutError") {
			return {
				success: false,
				message: "Blog generation timed out. Please try again.",
			};
		}
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Blog post generation failed",
		};
	}
}
