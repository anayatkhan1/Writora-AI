import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import Link from "next/link";

const TermsPage = () => {
	return (
		<MaxWidthWrapper className="mx-auto mb-40 max-w-3xl px-8">
			<AnimationContainer delay={0.1} className="w-full">
				<h1 className="my-12 w-full text-center font-bold font-heading text-4xl md:text-6xl">
					Terms and Conditions
				</h1>
				<p className="mt-20 mb-2 text-sm italic">
					Last updated: 12th October 2024
				</p>
				<p className="mt-4">
					Welcome to Writora. These terms and conditions outline the rules and
					regulations for the use of Writora&apos;s website and services.
				</p>

				<h2 className="mt-8 font-medium text-xl">Acceptance of Terms</h2>

				<p className="mt-8 text-muted-foreground">
					By accessing and using Writora, you accept and agree to be bound by
					these terms and conditions. If you do not agree to these terms, you
					may not use our website or services.
				</p>

				<h2 className="mt-12 font-medium text-xl">Changes to Terms</h2>
				<p className="mt-8 text-muted-foreground">
					Writora reserves the right to modify these terms at any time. We will
					notify you of any changes by updating the &quot;Last updated&quot;
					data at the top of this page. You continued use of our website and
					services after any modifications indicates your acceptance of the new
					terms.
				</p>

				<h2 className="mt-12 font-medium text-xl">Use of Services</h2>

				<h3 className="mt-8 text-lg">Eligibility</h3>
				<p className="mt-8">
					To use Writora, you must be at least 18 years old and capable of
					entering into a binding contact.
				</p>

				<h3 className="mt-8 text-lg">Account Registration</h3>
				<div className="mt-8">
					<ul className="ml-8 list-disc text-muted-foreground">
						<li>
							You must provide accurate and complete information during the
							registration process.
						</li>
						<li>
							You are responsible for maintaining the confidentiality of your
							account information and for all activities that occur under your
							account.
						</li>
						<li>
							You agree to notify us immediately of any unantuhorized use of
							your account.
						</li>
					</ul>
				</div>

				<h3 className="mt-8 text-lg">Acceptable Use</h3>
				<div className="mt-8">
					You agree not to use Writora for any unlawful or prohibited
					activities, including but not limited to:
					<ul className="ml-8 list-disc text-muted-foreground">
						<li>
							Uploading or sharing content that is offensive, harmful, or
							violates any laws.
						</li>
						<li>Using the service to distribute spam or malicious content.</li>
						<li>
							Attempting to gain unauthorized access to other user accounts or
							Writora&apos;s systems.
						</li>
					</ul>
				</div>

				<h2 className="mt-12 font-medium text-xl">
					AI powered blog generating
				</h2>

				<h3 className="mt-8 text-lg">Blog generating</h3>
				<p className="mt-8 text-muted-foreground">
					Writora provides a AI powered blog generater service that allows you
					to create content from the media. You agree not to use this service to
					create links to illegal or harmful content.
				</p>

				<h3 className="mt-8 text-lg">Analytics</h3>
				<p className="mt-8 text-muted-foreground">
					Writora offers analytics for your content generation. You agree to use
					this data responsibly and comply with all applicable privacy laws.
				</p>

				<h3 className="mt-8 text-lg">QR Code Generation</h3>
				<p className="mt-8 text-muted-foreground">
					You may generate QR codes for your blog posts. You agree not to use QR
					codes for any malicious purposes.
				</p>

				<h3 className="mt-8 text-lg">Business Transfers</h3>
				<p className="mt-8 text-muted-foreground">
					In the event of a merger, acquisition, or sale of all or a portion of
					our assets, your information may be transferred to the acquiring
					entity.
				</p>

				<h2 className="mt-12 font-medium text-xl">User Content</h2>

				<h3 className="mt-8 text-lg">Ownership</h3>

				<p className="mt-8 text-muted-foreground">
					You retain ownership of any content you upload or create using
					Writora. However, by uploading or creating content, you grant Writora
					a worldwide, non-exclusive, royalty-free license to use, reproduce,
					and display your content as necessary to provide our services.
				</p>

				<h2 className="mt-12 font-medium text-xl">Responsibility</h2>
				<p className="mt-8 text-muted-foreground">
					You are solely responsible for the content you upload or create.
					Writora does not endorse or assume any liability for user content.
				</p>

				<h2 className="mt-12 font-medium text-xl">Privacy</h2>

				<p className="mt-8 text-muted-foreground">
					Your privacy is important to us. Please review our{" "}
					<Link href="/privacy" className="underline">
						Privacy Policy
					</Link>{" "}
					to understand how we collect, use, and protect your information.
				</p>

				<h2 className="mt-12 font-medium text-xl">Termination</h2>
				<p className="mt-8 text-muted-foreground">
					Writora reserves the right to suspend or terminate your account at any
					time, with or without notice, for any reason, including but not
					limited to violation of these terms.
				</p>

				<h2 className="mt-12 font-medium text-xl">
					Disclaimers and Limitations of Liability
				</h2>

				<h3 className="mt-8 text-lg">No Warranties</h3>
				<p className="mt-8 text-muted-foreground">
					Writora is provided on an &quot;as is&quot; and &quot;as
					available&quot; basis. We do not warrant that the service will be
					uninterrupted, error-free, or free from viruses or other harmful
					components.
				</p>

				<h3 className="mt-8 text-lg">Limitation of Liability</h3>
				<p className="mt-8 text-muted-foreground">
					In no event shall Writora be liable for any indirect, incidental,
					special, or consequential damages arising out of or in connection with
					your use of the service.
				</p>

				<h2 className="mt-12 font-medium text-xl">Governing Law</h2>
				<p className="mt-8 text-muted-foreground">
					These terms shall be governed and construed in accordance with the
					laws of India, without regard to its conflict of law provisions.
				</p>

				<h2 className="mt-12 font-medium text-xl">Contact Us</h2>
				<p className="mt-8 text-muted-foreground">
					If you have any questions or concerns about this Privacy Policy,
					please contact us at anayat0khan@gmail.com
				</p>

				<p className="mt-8 font-medium">
					By using Writora, you acknowledge that you have read, understood, and
					agree to be bound by these terms and conditions.
				</p>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
};

export default TermsPage;
