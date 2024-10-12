"use client";

import { updatePostAction } from "@/actions/edit-actions";
import { Download, Edit2, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { ForwardRefEditor } from "./forward-ref-editor";

import { Card } from "../ui/card";

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			variant="outline"
			className="w-40 transform rounded-full px-4 py-2 font-semibold shadow-lg transition duration-200 ease-in-out hover:scale-105"
			disabled={pending}
		>
			{pending ? (
				<span className="flex items-center justify-center">
					<Loader2 className="mr-2 h-5 w-5 animate-spin" /> Updating...
				</span>
			) : (
				<span className="flex items-center justify-center">
					<Edit2 className="mr-2 h-5 w-5" />
					Update Text
				</span>
			)}
		</Button>
	);
}

const initialState = {
	success: false,
};

type UploadState = {
	success: boolean;
};

type UploadAction = (
	state: UploadState,
	formData: FormData,
) => Promise<UploadState>;

export default function ContentEditor({
	posts,
}: {
	posts: Array<{ content: string; title: string; id: string }>;
}) {
	const [content, setContent] = useState(posts[0].content);
	const [isChanged, setIsChanged] = useState(false);

	const updatedPostActionWithId = updatePostAction.bind(null, {
		postId: posts[0].id,
		content,
	});

	const [state, formAction] = useFormState<UploadState, FormData>(
		updatedPostActionWithId as unknown as UploadAction,
		initialState,
	);

	const handleContentChange = (value: string) => {
		setContent(value);
		setIsChanged(true);
	};

	const handleExport = useCallback(() => {
		const filename = `${posts[0].title || "blog-post"}.md`;

		const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}, [content, posts]);

	return (
		<form action={formAction} className="flex flex-col gap-2">
			<div className="mx-auto flex max-w-lg flex-col items-center justify-center py-10">
				<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
					Edit your post
				</h1>
				<p className="mt-6 text-center text-base text-muted-foreground md:text-lg">
					Start editing your blog post below...
				</p>
			</div>
			<div className="flex items-center justify-between border-gray-200/50 border-b-2 pb-4">
				<div className="flex flex-1 place-content-end gap-4">
					<SubmitButton />

					<Button
						onClick={handleExport}
						className="w-40 transform rounded-full px-4 py-2 font-semibold transition duration-200 ease-in-out hover:scale-105"
					>
						<Download className="mr-2 h-5 w-5" />
						Export
					</Button>
				</div>
			</div>
			<Card className="p-0">
				<ForwardRefEditor
					markdown={posts[0].content}
					onChange={handleContentChange}
				></ForwardRefEditor>
			</Card>
		</form>
	);
}
