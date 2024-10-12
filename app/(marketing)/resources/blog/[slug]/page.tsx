import blogs from "@/utils/constants/blogs.json";
interface Props {
	params: {
		slug: string;
	};
}

const BlogPage = ({ params }: Props) => {
	const blog = blogs.find((blog) => blog.slug === params.slug);
	return (
		<div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 pb-80 md:px-0">
			<div className="flex flex-col items-center justify-center">
				<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
					{blog?.title}
				</h1>
				<p className="mt-6 text-center text-base text-muted-foreground md:text-lg">
					{blog?.description}
				</p>
			</div>
		</div>
	);
};

export default BlogPage;
