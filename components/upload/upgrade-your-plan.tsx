import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MagicBadge from "../ui/magic-badge";

export default function UpgradeYourPlan() {
	return (
		<MaxWidthWrapper className="mb-40">
			<AnimationContainer delay={0.1}>
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-center py-10">
					<MagicBadge title="Upgrade your plan" />
					<p className="mt-6 text-center font-semibold text-2xl md:text-4xl lg:text-4xl">
						You're one step away from unlocking the full power of AI for your
						blog posts. Upgrade to Basic or Pro Plan now!
					</p>
					<Link href="/pricing">
						<p className="mt-6 flex items-center gap-1 text-center text-base text-muted-foreground hover:text-white hover:underline md:text-lg">
							Go to Pricing <ArrowRight className="h-4 w-4" />
						</p>
					</Link>
				</div>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
}
