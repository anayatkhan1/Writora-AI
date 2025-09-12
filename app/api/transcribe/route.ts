import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Configure runtime for longer execution
export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds for Vercel Pro

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
	try {
		const contentType = request.headers.get("content-type") || "";

		// Set timeout for transcription
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 55_000);

		try {
			let userId: string | null = null;
			let file: File | null = null;

			if (contentType.includes("multipart/form-data")) {
				const formData = await request.formData();
				file = formData.get("file") as File | null;
				userId = (formData.get("userId") as string) || null;
			} else {
				const { fileUrl, fileName, userId: uid } = await request.json();
				userId = uid || null;
				if (fileUrl) {
					const fetched = await fetch(fileUrl);
					if (!fetched.ok) {
						throw new Error("Failed to fetch uploaded file");
					}
					const blob = await fetched.blob();
					const name = fileName || "audio";
					file = new File([blob], name, {
						type: blob.type || "application/octet-stream",
					});
				}
			}

			if (!file || !userId) {
				return NextResponse.json(
					{ error: "File and userId are required" },
					{ status: 400 },
				);
			}

			const transcription = await openai.audio.transcriptions.create(
				{
					model: "whisper-1",
					file,
				},
				{ signal: controller.signal },
			);

			clearTimeout(timeoutId);

			return NextResponse.json({
				success: true,
				data: {
					transcription: transcription.text,
					userId,
				},
			});
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof OpenAI.APIError) {
				if (error.status === 413) {
					return NextResponse.json(
						{ error: "File size exceeds the max limit of 20MB" },
						{ status: 413 },
					);
				}
			}

			if (error instanceof Error && error.name === "AbortError") {
				return NextResponse.json(
					{ error: "Transcription timed out. Please try again." },
					{ status: 408 },
				);
			}

			console.error("Transcription error:", error);
			return NextResponse.json(
				{ error: "Transcription failed. Please try again." },
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
