"use client";

import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { PLANS, cn } from "@/utils";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Tab = "monthly" | "yearly";

const PricingCards = () => {
	const MotionTabTrigger = motion(TabsTrigger);

	const [activeTab, setActiveTab] = useState<Tab>("monthly");

	return (
		<Tabs
			defaultValue="monthly"
			className="flex w-full flex-col items-center justify-center"
		>
			<TabsList>
				<MotionTabTrigger
					value="monthly"
					onClick={() => setActiveTab("monthly")}
					className="relative"
				>
					{activeTab === "monthly" && (
						<motion.div
							layoutId="active-tab-indicator"
							transition={{
								type: "spring",
								bounce: 0.5,
							}}
							className="absolute top-0 left-0 z-10 h-full w-full rounded-md bg-background shadow-sm"
						/>
					)}
					<span className="z-20">Monthly</span>
				</MotionTabTrigger>
				<MotionTabTrigger
					value="yearly"
					onClick={() => setActiveTab("yearly")}
					className="relative"
				>
					{activeTab === "yearly" && (
						<motion.div
							layoutId="active-tab-indicator"
							transition={{
								type: "spring",
								bounce: 0.5,
							}}
							className="absolute top-0 left-0 z-10 h-full w-full rounded-md bg-background shadow-sm"
						/>
					)}
					<span className="z-20">Yearly</span>
				</MotionTabTrigger>
			</TabsList>

			<TabsContent
				value="monthly"
				className="mx-auto grid w-full max-w-5xl grid-cols-1 flex-wrap gap-5 pt-6 md:gap-8 lg:grid-cols-3"
			>
				{PLANS.map((plan) => (
					<Card
						key={plan.name}
						className={cn(
							"flex w-full flex-col rounded-xl border-border",
							plan.name === "Pro" && "border-2 border-purple-500",
						)}
					>
						<CardHeader
							className={cn(
								"border-border border-b",
								plan.name === "Pro"
									? "bg-purple-500/[0.07]"
									: "bg-foreground/[0.03]",
							)}
						>
							<CardTitle
								className={cn(
									plan.name !== "Pro" && "text-muted-foreground",
									"font-medium text-lg",
								)}
							>
								{plan.name}
							</CardTitle>
							<CardDescription>{plan.info}</CardDescription>
							<h5 className="font-semibold text-3xl">
								${plan.price.monthly}
								<span className="font-normal text-base text-muted-foreground">
									{plan.name !== "Free" ? "/month" : ""}
								</span>
							</h5>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							{plan.features.map((feature, index) => (
								<div key={index} className="flex items-center gap-2">
									<CheckCircleIcon className="h-4 w-4 text-purple-500" />
									<TooltipProvider>
										<Tooltip delayDuration={0}>
											<TooltipTrigger asChild>
												<p
													className={cn(
														feature.tooltip &&
															"!border-dashed cursor-pointer border-border border-b",
													)}
												>
													{feature.text}
												</p>
											</TooltipTrigger>
											{feature.tooltip && (
												<TooltipContent>
													<p>{feature.tooltip}</p>
												</TooltipContent>
											)}
										</Tooltip>
									</TooltipProvider>
								</div>
							))}
						</CardContent>
						<CardFooter className="mt-auto w-full">
							<Link
								href={plan.btn.href}
								style={{ width: "100%" }}
								className={buttonVariants({
									className:
										plan.name === "Pro" &&
										"bg-purple-500 text-white hover:bg-purple-500/80",
								})}
							>
								{plan.btn.text}
							</Link>
						</CardFooter>
					</Card>
				))}
			</TabsContent>
			<TabsContent
				value="yearly"
				className="mx-auto grid w-full max-w-5xl grid-cols-1 flex-wrap gap-5 pt-6 md:gap-8 lg:grid-cols-3"
			>
				{PLANS.map((plan) => (
					<Card
						key={plan.name}
						className={cn(
							"flex w-full flex-col rounded-xl border-border",
							plan.name === "Pro" && "border-2 border-purple-500",
						)}
					>
						<CardHeader
							className={cn(
								"border-border border-b",
								plan.name === "Pro"
									? "bg-purple-500/[0.07]"
									: "bg-foreground/[0.03]",
							)}
						>
							<CardTitle
								className={cn(
									plan.name !== "Pro" && "text-muted-foreground",
									"font-medium text-lg",
								)}
							>
								{plan.name}
							</CardTitle>
							<CardDescription>{plan.info}</CardDescription>
							<h5 className="flex items-end font-semibold text-3xl">
								${plan.price.yearly}
								<div className="font-normal text-base text-muted-foreground">
									{plan.name !== "Free" ? "/year" : ""}
								</div>
								{plan.name !== "Free" && (
									<motion.span
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
										className="ml-2 rounded-md bg-purple-500 px-2 py-0.5 font-medium text-foreground text-sm"
									>
										-12%
									</motion.span>
								)}
							</h5>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							{plan.features.map((feature, index) => (
								<div key={index} className="flex items-center gap-2">
									<CheckCircleIcon className="h-4 w-4 text-purple-500" />
									<TooltipProvider>
										<Tooltip delayDuration={0}>
											<TooltipTrigger asChild>
												<p
													className={cn(
														feature.tooltip &&
															"!border-dashed cursor-pointer border-border border-b",
													)}
												>
													{feature.text}
												</p>
											</TooltipTrigger>
											{feature.tooltip && (
												<TooltipContent>
													<p>{feature.tooltip}</p>
												</TooltipContent>
											)}
										</Tooltip>
									</TooltipProvider>
								</div>
							))}
						</CardContent>
						<CardFooter className="pt- mt-auto w-full">
							<Link
								href={plan.btn.href}
								style={{ width: "100%" }}
								className={buttonVariants({
									className:
										plan.name === "Pro" &&
										"bg-purple-500 text-white hover:bg-purple-500/80",
								})}
							>
								{plan.btn.text}
							</Link>
						</CardFooter>
					</Card>
				))}
			</TabsContent>
		</Tabs>
	);
};

export default PricingCards;
