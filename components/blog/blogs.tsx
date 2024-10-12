import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import blogs from "@/utils/constants/blogs.json";
import Image from "next/image";
import Link from "next/link";
import MagicCard from "../ui/magic-card";

const Blogs = () => {
	return (
		<div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 md:px-0">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{blogs.map((blog, id) => (
					<MagicCard key={id} className="relative p-0 md:p-0">
						<Link
							href={`/resources/blog/${blog.slug}`}
							className="-z-1 absolute inset-0 h-full w-full"
						></Link>
						<Card className="group border-0">
							<CardContent className="p-4 lg:p-6">
								<div className="flex h-40 items-center justify-center overflow-hidden lg:h-52">
									<Image
										src={blog.image}
										alt={blog.title}
										width={1024}
										height={1024}
										unoptimized
										className="h-full w-full rounded-lg object-cover"
									/>
								</div>
								<div className="mt-4 flex flex-col items-start justify-start">
									<CardTitle className="font-semibold text-foreground/80 text-lg transition-all duration-300 group-hover:text-foreground">
										{blog.title}
									</CardTitle>
									<CardDescription className="mt-2">
										{blog.description.length > 100
											? `${blog.description.substring(0, 100)}...`
											: blog.description}
									</CardDescription>
								</div>
							</CardContent>
						</Card>
					</MagicCard>
				))}
			</div>
		</div>
	);
};

export default Blogs;
