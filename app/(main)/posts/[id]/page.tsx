import ContentEditor from "@/components/content/content-editor";
import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import getDbConnection from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PostsPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const user = await currentUser();

	if (!user) {
		return redirect("/sign-in");
	}

	const sql = await getDbConnection();

	const posts: any =
		await sql`SELECT * from posts where user_id = ${user.id} and id = ${id}`;

	return (
		<MaxWidthWrapper className="mb-40">
			<AnimationContainer delay={0.1}>
				<ContentEditor posts={posts} />
			</AnimationContainer>
		</MaxWidthWrapper>
	);
}
