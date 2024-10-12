import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<section className="flex items-center justify-center py-16">
			<SignIn forceRedirectUrl="/dashboard" />
		</section>
	);
}
