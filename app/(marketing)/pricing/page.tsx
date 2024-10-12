import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import PricingCards from "@/components/pricing-cards";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import MagicBadge from "@/components/ui/magic-badge";
import { FAQ } from "@/utils/constants/faq";

const PricingPage = () => {
	return (
		<MaxWidthWrapper className="mb-40">
			<AnimationContainer delay={0.1}>
				<div className="mx-auto flex max-w-lg flex-col items-center justify-center py-10">
					<MagicBadge title="Pricing" />
					<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
						Simple and transparent pricing
					</h1>
					<p className="mt-6 text-center text-base text-muted-foreground md:text-lg">
						Choose a plan that works for you. No hidden fees. No surprises.
					</p>
				</div>
			</AnimationContainer>

			<AnimationContainer delay={0.2}>
				<PricingCards />
			</AnimationContainer>

			<AnimationContainer delay={0.3}>
				<div className="mt-20 w-full">
					<div className="flex w-full flex-col items-center justify-center pt-12">
						<h2 className="mt-6 text-center font-semibold text-2xl lg:text-3xl xl:text-4xl">
							Frequently Asked Questions
						</h2>
						<p className="mt-6 max-w-lg text-center text-neutral-500">
							Here are some of the most common questions we get asked. If you
							have a question that isn&apos;t answered here, feel free to reach
							out to us.
						</p>
					</div>
					<div className="mx-auto mt-20 w-full max-w-3xl">
						<Accordion type="single" collapsible>
							{FAQ.map((faq) => (
								<AccordionItem key={faq.id} value={faq.id}>
									<AccordionTrigger>{faq.question}</AccordionTrigger>
									<AccordionContent>{faq.answer}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
};

export default PricingPage;
