"use client";
import {
	generateBlogPostAction,
	transcribeUploadedFile,
} from "@/actions/upload-actions";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MagicBadge from "../ui/magic-badge";

const schema = z.object({
	file: z
		.instanceof(File, { message: "Invalid file" })
		.refine(
			(file) => file.size <= 20 * 1024 * 1024,
			"File size must not exceed 20MB",
		)
		.refine(
			(file) =>
				file.type.startsWith("audio/") || file.type.startsWith("video/"),
			"File must be an audio or a video file",
		),
});

export default function UploadForm({ planTypeName }: { planTypeName: string }) {
	const { startUpload } = useUploadThing("videoOrAudioUploader", {
		onClientUploadComplete: () => {
			toast("uploaded successfully!");
		},
		onUploadError: (err) => {
			console.error("Error occurred", err);
		},
		onUploadBegin: () => {
			toast("Upload has begun 🚀!");
		},
	});

	const handleTranscribe = async (formData: FormData) => {
		const file = formData.get("file") as File;

		const validatedFields = schema.safeParse({ file });

		if (!validatedFields.success) {
			console.log(
				"validatedFields",
				validatedFields.error.flatten().fieldErrors,
			);
			toast.error("Something went wrong", {
				description:
					validatedFields.error.flatten().fieldErrors.file?.[0] ??
					"Invalid file",
			});
			return;
		}

		if (file) {
			// Upload the file
			const resp: any = await startUpload([file]);
			console.log({ resp });

			if (!resp) {
				toast.error("Something went wrong", {
					description: "Please use a different file",
				});
				return;
			}

			// Show a loading toast that stays visible during the potentially long transcription process
			const toastId = toast.loading("Transcription is in progress...", {
				description:
					"Hang tight! Our digital wizards are sprinkling magic dust on your file! ✨ This may take a few minutes for longer files.",
				duration: 120000, // 2 minutes
			});

			// Try to transcribe with better error handling
			let result;
			try {
				result = await transcribeUploadedFile(resp);
				// Dismiss the loading toast
				toast.dismiss(toastId);
			} catch (error) {
				// Dismiss the loading toast
				toast.dismiss(toastId);

				console.error("Error during transcription:", error);
				toast.error("Transcription process failed", {
					description:
						"The request may have timed out. Try with a shorter audio file or try again later.",
				});
				return;
			}

			const { data = null, message = null, success = false } = result || {};

			// Handle transcription failures
			if (!result || (!data && !message)) {
				toast.error("An unexpected error occurred", {
					description:
						"An error occurred during transcription. Please try again.",
				});
				return;
			}

			if (!success) {
				toast.error("Transcription failed", {
					description: message || "Please try again with a different file.",
				});
				return;
			}

			// If we have data, proceed with blog post generation
			if (data) {
				toast.message("Generating AI blog post...", {
					description: "Please wait while we generate your blog post.",
				});

				try {
					await generateBlogPostAction({
						transcriptions: data.transcriptions,
						userId: data.userId,
					});

					toast.message("🎉 Woohoo! Your AI blog is created! 🎊", {
						description:
							"Time to put on your editor hat, Click the post and edit it!",
					});
				} catch (error) {
					console.error("Error generating blog post:", error);
					toast.error("Failed to generate blog post", {
						description:
							"There was an error generating your blog post. Please try again.",
					});
				}
			}
		}
	};
	return (
		<>
			<MagicBadge title={`${planTypeName} Plan Is Active`} />
			<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
				Start Creating Amazing Content
			</h1>
			<p className="mt-6 pb-5 text-center text-base text-muted-foreground md:text-lg">
				Upload your audio or video file and let our AI do the magic!
			</p>
			<form className="flex flex-col gap-6 pt-5" action={handleTranscribe}>
				<div className="flex items-center justify-end gap-1.5">
					<Input
						id="file"
						name="file"
						type="file"
						accept="audio/*,video/*"
						required
						className="cursor-pointer"
					/>
					<Button>Transcribe</Button>
				</div>
			</form>
		</>
	);
}
