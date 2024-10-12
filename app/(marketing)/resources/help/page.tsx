import { AnimationContainer } from "@/components/global";

const HelpPage = () => {
	return (
		<div className="flex flex-col items-center justify-center py-20">
			<AnimationContainer delay={0.1} className="w-full">
				<h1 className="!leading-tight mt-6 text-center font-heading font-semibold text-2xl md:text-4xl lg:text-5xl">
					Help
				</h1>
				<p className="mt-6 text-center text-base text-muted-foreground md:text-lg">
					Need help? We got you.
				</p>
			</AnimationContainer>
		</div>
	);
};

export default HelpPage;
