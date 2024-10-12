"use client";

import { cn } from "@/utils";
import { motion } from "framer-motion";
import React from "react";

export const LampContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md",
				className,
			)}
		>
			<div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center ">
				<motion.div
					initial={{ opacity: 0.5, width: "15rem" }}
					whileInView={{ opacity: 1, width: "30rem" }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					style={{
						backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
					}}
					className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-conic from-purple-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
				>
					<div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
					<div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-background [mask-image:linear-gradient(to_right,white,transparent)]" />
				</motion.div>
				<motion.div
					initial={{ opacity: 0.5, width: "15rem" }}
					whileInView={{ opacity: 1, width: "30rem" }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					style={{
						backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
					}}
					className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-purple-500 text-white [--conic-position:from_290deg_at_center_top]"
				>
					<div className="absolute right-0 bottom-0 z-20 h-[100%] w-40 bg-background [mask-image:linear-gradient(to_left,white,transparent)]" />
					<div className="absolute right-0 bottom-0 z-20 h-40 w-[100%] bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
				</motion.div>
				<div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-background blur-[8rem]"></div>
				<div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
				<motion.div
					initial={{ width: "8rem" }}
					whileInView={{ width: "16rem" }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="-translate-y-[6rem] absolute inset-auto z-30 h-36 w-64 rounded-full bg-purple-400 blur-2xl"
				></motion.div>
				<motion.div
					initial={{ width: "15rem" }}
					whileInView={{ width: "30rem" }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="-translate-y-[7rem] absolute inset-auto z-50 h-0.5 w-[30rem] bg-purple-400"
				></motion.div>

				<div className="-translate-y-[12.5rem] absolute inset-auto z-40 h-44 w-full bg-background "></div>
			</div>

			<div className="-translate-y-80 relative z-50 flex flex-col items-center px-5">
				{children}
			</div>
		</div>
	);
};
