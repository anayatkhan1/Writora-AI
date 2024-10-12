"use client";
import {
	MDXEditor,
	type MDXEditorMethods,
	type MDXEditorProps,
	headingsPlugin,
	listsPlugin,
	markdownShortcutPlugin,
	quotePlugin,
	thematicBreakPlugin,
} from "@mdxeditor/editor";
// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";

// Only import this to the next file
export default function InitializedMDXEditor({
	editorRef,
	...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
	return (
		<MDXEditor
			plugins={[
				// Example Plugin Usage
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
			]}
			{...props}
			ref={editorRef}
		/>
	);
}
