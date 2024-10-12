"use client";
import MobileNavbar from "@/components/home/mobile-navbar";
import { buttonVariants } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NAV_LINKS, cn } from "@/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { LucideIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import AnimationContainer from "../global/animation-container";
import MaxWidthWrapper from "../global/max-width-wrapper";

const Navbar = () => {
	const { user } = useClerk();
	const pathname = usePathname();

	const [scroll, setScroll] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 8) {
			setScroll(true);
		} else {
			setScroll(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header
			className={cn(
				"sticky inset-x-0 top-0 z-[99999] h-14 w-full select-none border-transparent border-b",
				scroll && "border-background/80 bg-background/40 backdrop-blur-md",
			)}
		>
			<AnimationContainer reverse delay={0.1} className="size-full">
				<MaxWidthWrapper className="flex items-center justify-between">
					<div className="flex items-center space-x-12">
						<Link href="/">
							<span className="!leading-none font-bold font-heading text-lg">
								Writora AI
							</span>
						</Link>

						<NavigationMenu className="hidden lg:flex">
							<NavigationMenuList>
								{NAV_LINKS.map((link) => (
									<NavigationMenuItem key={link.title}>
										{link.menu ? (
											<>
												<NavigationMenuTrigger>
													{link.title}
												</NavigationMenuTrigger>
												<NavigationMenuContent>
													<ul
														className={cn(
															"grid gap-1 rounded-xl p-4 md:w-[400px] lg:w-[500px]",
															link.title === "Features"
																? "lg:grid-cols-[.75fr_1fr]"
																: "lg:grid-cols-2",
														)}
													>
														{link.title === "Features" && (
															<li className="relative row-span-4 overflow-hidden rounded-lg pr-2">
																<div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />
																<NavigationMenuLink
																	asChild
																	className="relative z-20"
																>
																	<Link
																		href="/"
																		className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
																	>
																		<h6 className="mt-4 mb-2 font-medium text-lg">
																			All Features
																		</h6>
																		<p className="text-muted-foreground text-sm leading-tight">
																			Manage Blogs, track performance, and more.
																		</p>
																	</Link>
																</NavigationMenuLink>
															</li>
														)}
														{link.menu.map((menuItem) => (
															<ListItem
																key={menuItem.title}
																title={menuItem.title}
																href={menuItem.href}
																icon={menuItem.icon}
															>
																{menuItem.tagline}
															</ListItem>
														))}
													</ul>
												</NavigationMenuContent>
											</>
										) : (
											<Link href={link.href} legacyBehavior passHref>
												<NavigationMenuLink
													className={navigationMenuTriggerStyle()}
												>
													{link.title}
												</NavigationMenuLink>
											</Link>
										)}
									</NavigationMenuItem>
								))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					<div className="hidden items-center lg:flex">
						{user ? (
							<SignedIn>
								<div className="flex items-center gap-3">
									<Link
										href={pathname === "/dashboard" ? "/posts" : "/dashboard"}
										className={`${buttonVariants({ size: "sm" })} font-semibold`}
									>
										{pathname === "/dashboard"
											? "Your Posts"
											: "Upload a video"}
									</Link>
									<UserButton />
								</div>
							</SignedIn>
						) : (
							<div className="flex items-center gap-x-4">
								<SignedOut>
									<SignInButton>
										<Link
											href="/sign-in"
											className={buttonVariants({ size: "sm" })}
										>
											Get Started
											<ZapIcon className="ml-1.5 size-3.5 fill-orange-500 text-orange-500" />
										</Link>
									</SignInButton>
								</SignedOut>
							</div>
						)}
					</div>
					<MobileNavbar />
				</MaxWidthWrapper>
			</AnimationContainer>
		</header>
	);
};

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a"> & { title: string; icon: LucideIcon }
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					href={href!}
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-100 ease-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="flex items-center space-x-2 text-neutral-300">
						<Icon className="h-4 w-4" />
						<h6 className="!leading-none font-medium text-sm">{title}</h6>
					</div>
					<p
						title={children! as string}
						className="line-clamp-1 text-muted-foreground text-sm leading-snug"
					>
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

export default Navbar;
