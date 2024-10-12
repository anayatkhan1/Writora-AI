import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import { COMPANIES } from "@/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LinkShorteningPage = () => {
	return (
		<>
			<MaxWidthWrapper>
				<AnimationContainer delay={0.1} className="w-full">
					<div className="mx-auto flex max-w-lg flex-col items-center justify-center py-10">
						<MagicBadge title="Unique" />
						<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
							Create QR codes for your blogs
						</h1>
						<p className="mt-6 text-center text-base text-muted-foreground md:text-lg">
							Enhance your marketing strategy with custom QR codes. Drive
							engagement and track performance with ease.
						</p>
						<div className="mt-8 flex items-center justify-center gap-x-4">
							<Button size="sm" asChild>
								<Link href="/dashboard">Get started</Link>
							</Button>
							<Button size="sm" variant="outline" asChild>
								<Link href="/blog">Learn more</Link>
							</Button>
						</div>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.2} className="w-full">
					<div className="mx-auto flex w-full max-w-4xl py-10">
						<Image
							src="/assets/qr-codes.svg"
							alt="Create QR codes for your content"
							width={80}
							height={80}
							className="h-auto w-full"
						/>
					</div>
				</AnimationContainer>
				<AnimationContainer delay={0.3} className="w-full">
					<div className="py-14">
						<div className="mx-auto px-4 md:px-8">
							<h2 className="text-center font-heading font-medium text-neutral-400 text-sm uppercase">
								Trusted by the best in the industry
							</h2>
							<div className="mt-8">
								<ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-6 py-8 md:gap-x-16">
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
			<MaxWidthWrapper className="pt-20">
				<AnimationContainer delay={0.4} className="w-full">
					<LampContainer className="mx-auto max-w-2xl">
						<div className="relative flex w-full flex-col items-center justify-center text-center">
							<h2 className="mt-8 bg-gradient-to-br from-neutral-300 to-neutral-500 bg-clip-text py-4 text-center font-heading font-semibold text-4xl text-transparent tracking-tight md:text-7xl">
								Powerup your content strategy
							</h2>
							<p className="mx-auto mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
								Take control of your content with advanced features and
								real-time insights. Simplify your workflow and achieve more.
							</p>
							<div className="mt-6">
								<Button asChild>
									<Link href="/sign-in" className="flex items-center">
										Get started for free
										<ArrowRightIcon className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</div>
						</div>
					</LampContainer>
				</AnimationContainer>
			</MaxWidthWrapper>
		</>
	);
};

export default LinkShorteningPage;
