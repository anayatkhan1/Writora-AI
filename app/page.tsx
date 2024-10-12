import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import PricingCards from "@/components/pricing-cards";
import { BentoCard, BentoGrid, CARDS } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import MagicCard from "@/components/ui/magic-card";
import { COMPANIES, PROCESS } from "@/utils";
import { REVIEWS } from "@/utils/constants/misc";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRightIcon, CreditCardIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
	const user = await currentUser();

	return (
		<div className="scrollbar-hide size-full overflow-x-hidden">
			{/* Hero Section */}
			<MaxWidthWrapper>
				<div
					id="home"
					className="flex w-full flex-col items-center justify-center bg-gradient-to-t from-background text-center"
				>
					<AnimationContainer className="flex w-full flex-col items-center justify-center text-center">
						<button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
							<span>
								<span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
							</span>
							<span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
							<span className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-tr from-primary/20 blur-md"></span>
							<span className="z-10 flex items-center justify-center gap-1 py-0.5 text-neutral-100 text-sm">
								✨ Introduction Writora AI
								<ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
							</span>
						</button>
						<h1 className="!leading-[1.15] w-full text-balance py-6 text-center font-heading font-medium text-5xl text-foreground tracking-normal sm:text-6xl md:text-7xl lg:text-8xl">
							AI-Powered Blogs With{" "}
							<span className="inline-bloc bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
								Media
							</span>
						</h1>
						<p className="mb-12 text-balance text-lg text-muted-foreground tracking-tight md:text-xl">
							Create high-quality blog posts with videos,
							<br className="hidden md:block" />
							<span className="hidden md:block">
								customize content, and export in Markdown format effortlessly!
							</span>
						</p>
						<div className="z-50 flex items-center justify-center gap-4 whitespace-nowrap">
							<Button asChild>
								<Link
									href={user ? "/dashboard" : "/sign-in"}
									className="flex items-center"
								>
									Start creating for free
									<ArrowRightIcon className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					</AnimationContainer>

					<AnimationContainer
						delay={0.2}
						className="relative w-full bg-transparent px-2 pt-20 pb-20 md:py-32"
					>
						<div className="gradient -translate-x-1/2 absolute inset-0 left-1/2 h-1/4 w-3/4 animate-image-glow blur-[5rem] md:top-[10%] md:h-1/3"></div>
						<div className="-m-2 lg:-m-4 rounded-xl bg-opacity-50 p-2 ring-1 ring-foreground/20 ring-inset backdrop-blur-3xl lg:rounded-2xl">
							<BorderBeam size={250} duration={12} delay={9} />
							<Image
								src="/assets/dashboard-dark.png"
								alt="Dashboard"
								width={1500}
								height={1500}
								quality={100}
								className="rounded-md bg-foreground/10 ring-1 ring-border lg:rounded-xl"
							/>
							<div className="-bottom-4 absolute inset-x-0 z-40 h-1/2 w-full bg-gradient-to-t from-background" />
							<div className="md:-bottom-8 absolute inset-x-0 bottom-0 z-50 h-1/4 w-full bg-gradient-to-t from-background" />
						</div>
					</AnimationContainer>
				</div>
			</MaxWidthWrapper>

			{/* Companies Section */}
			<MaxWidthWrapper>
				<AnimationContainer delay={0.4}>
					<div className="py-14">
						<div className="mx-auto px-4 md:px-8">
							<h2 className="text-center font-heading font-medium text-neutral-400 text-sm uppercase">
								Trusted by the best in the industry
							</h2>
							<div className="mt-8">
								<ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-6 md:gap-x-16">
									{COMPANIES.map((company) => (
										<li key={company.name}>
											<Image
												src={company.logo}
												alt={company.name}
												width={80}
												height={80}
												quality={100}
												className="h-auto w-28"
											/>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</AnimationContainer>
			</MaxWidthWrapper>

			{/* Features Section */}
			<MaxWidthWrapper className="pt-10">
				<AnimationContainer delay={0.1}>
					<div
						id="features"
						className="flex w-full flex-col items-center justify-center py-8 lg:items-center"
					>
						<MagicBadge title="Features" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							Manage Blogs Like a Pro
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							Writora AI is a cutting-edge blog generation tool that delivers
							content-driven blogs in just seconds.
						</p>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2}>
					<BentoGrid className="py-8">
						{CARDS.map((feature, idx) => (
							<BentoCard key={idx} {...feature} />
						))}
					</BentoGrid>
				</AnimationContainer>
			</MaxWidthWrapper>

			{/* Process Section */}
			<MaxWidthWrapper className="py-10">
				<AnimationContainer delay={0.1}>
					<div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center">
						<MagicBadge title="The Process" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							Generate content effortlessly in just 3 steps
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							Easily repurpose your content into SEO focused blog posts
						</p>
					</div>
				</AnimationContainer>
				<div className="grid w-full grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
					{PROCESS.map((process, id) => (
						<AnimationContainer delay={0.2 * id} key={id}>
							<MagicCard className="group md:py-8">
								<div className="flex w-full flex-col items-start justify-center">
									<process.icon
										strokeWidth={1.5}
										className="h-10 w-10 text-foreground"
									/>
									<div className="relative flex flex-col items-start">
										<span className="-top-6 absolute right-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border pt-0.5 font-medium text-2xl text-foreground">
											{id + 1}
										</span>
										<h3 className="mt-6 font-medium text-base text-foreground">
											{process.title}
										</h3>
										<p className="mt-2 text-muted-foreground text-sm">
											{process.description}
										</p>
									</div>
								</div>
							</MagicCard>
						</AnimationContainer>
					))}
				</div>
			</MaxWidthWrapper>

			{/* Pricing Section */}
			<MaxWidthWrapper className="py-10">
				<AnimationContainer delay={0.1}>
					<div
						id="pricing"
						className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center"
					>
						<MagicBadge title="Simple Pricing" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							Choose a plan that works for you
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							Get started with Writora today and enjoy more features with our
							pro plans.
						</p>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2}>
					<PricingCards />
				</AnimationContainer>
				<AnimationContainer delay={0.3}>
					<div className="mx-auto mt-12 flex w-full max-w-5xl flex-wrap items-start justify-center gap-6 md:items-center lg:justify-evenly">
						<div className="flex items-center gap-2">
							<CreditCardIcon className="h-5 w-5 text-foreground" />
							<span className="text-muted-foreground">
								No credit card required
							</span>
						</div>
					</div>
				</AnimationContainer>
			</MaxWidthWrapper>

			{/* Reviews Section */}
			<MaxWidthWrapper className="py-10">
				<AnimationContainer delay={0.1}>
					<div
						id="testimonials"
						className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center"
					>
						<MagicBadge title="Our Customers" />
						<h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
							What our users are saying
						</h2>
						<p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
							Here&apos;s what some of our users have to say about Writora.
						</p>
					</div>
				</AnimationContainer>
				<div className="grid grid-cols-1 place-items-start gap-4 py-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
					<div className="flex h-min flex-col items-start gap-6">
						{REVIEWS.slice(0, 3).map((review, index) => (
							<AnimationContainer delay={0.2 * index} key={index}>
								<MagicCard key={index} className="md:p-0">
									<Card className="flex h-min w-full flex-col border-none">
										<CardHeader className="space-y-0">
											<CardTitle className="font-medium text-lg text-muted-foreground">
												{review.name}
											</CardTitle>
											<CardDescription>{review.username}</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4 pb-4">
											<p className="text-muted-foreground">{review.review}</p>
										</CardContent>
										<CardFooter className="mt-auto w-full space-x-1">
											{Array.from({ length: review.rating }, (_, i) => (
												<StarIcon
													key={i}
													className="h-4 w-4 fill-yellow-500 text-yellow-500"
												/>
											))}
										</CardFooter>
									</Card>
								</MagicCard>
							</AnimationContainer>
						))}
					</div>
					<div className="flex h-min flex-col items-start gap-6">
						{REVIEWS.slice(3, 6).map((review, index) => (
							<AnimationContainer delay={0.2 * index} key={index}>
								<MagicCard key={index} className="md:p-0">
									<Card className="flex h-min w-full flex-col border-none">
										<CardHeader className="space-y-0">
											<CardTitle className="font-medium text-lg text-muted-foreground">
												{review.name}
											</CardTitle>
											<CardDescription>{review.username}</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4 pb-4">
											<p className="text-muted-foreground">{review.review}</p>
										</CardContent>
										<CardFooter className="mt-auto w-full space-x-1">
											{Array.from({ length: review.rating }, (_, i) => (
												<StarIcon
													key={i}
													className="h-4 w-4 fill-yellow-500 text-yellow-500"
												/>
											))}
										</CardFooter>
									</Card>
								</MagicCard>
							</AnimationContainer>
						))}
					</div>
					<div className="flex h-min flex-col items-start gap-6">
						{REVIEWS.slice(6, 9).map((review, index) => (
							<AnimationContainer delay={0.2 * index} key={index}>
								<MagicCard key={index} className="md:p-0">
									<Card className="flex h-min w-full flex-col border-none">
										<CardHeader className="space-y-0">
											<CardTitle className="font-medium text-lg text-muted-foreground">
												{review.name}
											</CardTitle>
											<CardDescription>{review.username}</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4 pb-4">
											<p className="text-muted-foreground">{review.review}</p>
										</CardContent>
										<CardFooter className="mt-auto w-full space-x-1">
											{Array.from({ length: review.rating }, (_, i) => (
												<StarIcon
													key={i}
													className="h-4 w-4 fill-yellow-500 text-yellow-500"
												/>
											))}
										</CardFooter>
									</Card>
								</MagicCard>
							</AnimationContainer>
						))}
					</div>
				</div>
			</MaxWidthWrapper>

			{/* CTA Section */}
			<MaxWidthWrapper className="scrollbar-hide mt-20 max-w-[100vw] overflow-x-hidden">
				<AnimationContainer delay={0.1}>
					<LampContainer>
						<div className="relative flex w-full flex-col items-center justify-center text-center">
							<h2 className="!leading-[1.15] mt-8 bg-gradient-to-b from-neutral-200 to-neutral-400 bg-clip-text py-4 text-center font-heading font-medium text-4xl text-transparent tracking-tight md:text-7xl">
								Step into the Future of AI <br />
								Content Creation
							</h2>
							<p className="mx-auto mt-6 max-w-md text-muted-foreground">
								Unlock the future of content creation with our cutting-edge,
								AI-powered platform. Let AI do the heavy lifting, so you can
								focus on what matters most—your ideas.
							</p>
							<div className="mt-6">
								<Button>
									<Link href="/sign-in">Get started for free</Link>
									<ArrowRightIcon className="ml-2 h-4 w-4" />
								</Button>
							</div>
						</div>
					</LampContainer>
				</AnimationContainer>
			</MaxWidthWrapper>
		</div>
	);
};

export default HomePage;
