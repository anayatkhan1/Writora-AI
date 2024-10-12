import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import MagicCard from "@/components/ui/magic-card";
import getDbConnection from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import removeMd from "remove-markdown";
export default async function Page() {
	const user = await currentUser();

	if (!user) {
		return redirect("/sign-in");
	}

	const sql = await getDbConnection();
	const posts = await sql`SELECT * from posts where user_id = ${user.id}`;

	return (
		<MaxWidthWrapper className="mb-40">
			<AnimationContainer delay={0.1}>
				<div className="mx-auto flex max-w-lg flex-col items-center justify-center py-10">
					<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
						{posts.length === 0
							? "You have no posts yet. Upload a video or audio to get started."
							: "Blog"}
					</h1>
					<Link
						href="/dashboard"
						className="mt-6 text-center text-base text-muted-foreground md:text-lg"
					>
						<p className="flex items-center gap-2 text-muted-foreground text-sm hover:text-white hover:underline">
							{posts.length === 0 && (
								<>
									Go to Dashboard <ArrowRight className="size-4" />
								</>
							)}
						</p>
					</Link>
					{posts.length > 0 && (
						<p className="flex items-center gap-2 text-muted-foreground text-sm">
							Your blog posts
						</p>
					)}
				</div>
			</AnimationContainer>
			{posts.map((post) => (
				<div
					key={post.id}
					className="flex flex-col items-center justify-center pb-20"
				>
					<AnimationContainer delay={0.2} className="w-full pt-20">
						<div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 md:px-0">
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								<MagicCard className="relative p-0 md:p-0">
									<Card className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
										<CardHeader>
											<CardTitle className="text-lg sm:text-xl md:text-2xl">
												{removeMd(post.title)}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="line-clamp-3 text-muted-foreground text-xs sm:text-sm md:text-base">
												{post.content.split("\n").slice(1).join("\n")}
											</p>
										</CardContent>
										<CardFooter className="mt-2 flex justify-end sm:mt-4">
											<Link href={`/posts/${post.id}`}>
												<div className="flex h-auto items-center p-0 text-primary text-xs hover:underline sm:text-sm">
													Read More
													<ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
												</div>
											</Link>
										</CardFooter>
									</Card>
								</MagicCard>
							</div>
						</div>
					</AnimationContainer>
				</div>
			))}
		</MaxWidthWrapper>
	);
}
