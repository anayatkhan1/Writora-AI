"use client";
import {
	generateBlogPostAction,
	transcribeUploadedFile,
} from "@/actions/upload-actions";
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/utils/uploadthing";
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
	const { toast } = useToast();

	const { startUpload } = useUploadThing("videoOrAudioUploader", {
		onClientUploadComplete: () => {
			toast({ title: "uploaded successfully!" });
		},
		onUploadError: (err) => {
			console.error("Error occurred", err);
		},
		onUploadBegin: () => {
			toast({ title: "Upload has begun 🚀!" });
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
			toast({
				title: "❌ Something went wrong",
				variant: "destructive",
				description:
					validatedFields.error.flatten().fieldErrors.file?.[0] ??
					"Invalid file",
			});
		}

		if (file) {
			const resp: any = await startUpload([file]);
			console.log({ resp });

			if (!resp) {
				toast({
					title: "Something went wrong",
					description: "Please use a different file",
					variant: "destructive",
				});
			}
			toast({
				title: "🎙️ Transcription is in progress...",
				description:
					"Hang tight! Our digital wizards are sprinkling magic dust on your file! ✨",
			});

			const result = await transcribeUploadedFile(resp);
			const { data = null, message = null } = result || {};

			if (!result || (!data && !message)) {
				toast({
					title: "An unexpected error occurred",
					description:
						"An error occurred during transcription. Please try again.",
				});
			}

			if (data) {
				toast({
					title: "🤖 Generating AI blog post...",
					description: "Please wait while we generate your blog post.",
				});

				await generateBlogPostAction({
					transcriptions: data.transcriptions,
					userId: data.userId,
				});

				toast({
					title: "🎉 Woohoo! Your AI blog is created! 🎊",
					description:
						"Time to put on your editor hat, Click the post and edit it!",
				});
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
