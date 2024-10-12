import { FolderOpenIcon, ScrollText, WandSparklesIcon } from "lucide-react";

export const DEFAULT_AVATAR_URL =
	"https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const COMPANIES = [
	{
		name: "Asana",
		logo: "/assets/company-01.svg",
	},
	{
		name: "Tidal",
		logo: "/assets/company-02.svg",
	},
	{
		name: "Innovaccer",
		logo: "/assets/company-03.svg",
	},
	{
		name: "Linear",
		logo: "/assets/company-04.svg",
	},
	{
		name: "Raycast",
		logo: "/assets/company-05.svg",
	},
	{
		name: "Labelbox",
		logo: "/assets/company-06.svg",
	},
] as const;

export const PROCESS = [
	{
		title: "Upload Your Video",
		description:
			"Easily categorize the scripts and optimize the media to create high-quality blog posts.",
		icon: FolderOpenIcon,
	},
	{
		title: "AI Magic",
		description:
			"Create SEO-optimized blog posts that are easy to customize and share.",
		icon: WandSparklesIcon,
	},
	{
		title: "Optimize and Export",
		description:
			"Content is provided in Markdown format and can be easily exported.",
		icon: ScrollText,
	},
] as const;

export const FEATURES = [
	{
		title: "Link shortening",
		description: "Create short links that are easy to remember and share.",
	},
	{
		title: "Advanced analytics",
		description: "Track and measure the performance of your links.",
	},
	{
		title: "Password protection",
		description: "Secure your links with a password.",
	},
	{
		title: "Custom QR codes",
		description: "Generate custom QR codes for your links.",
	},
	{
		title: "Link expiration",
		description: "Set an expiration date for your links.",
	},
	{
		title: "Team collaboration",
		description: "Share links with your team and collaborate in real-time.",
	},
] as const;

export const REVIEWS = [
	{
		name: "Michael Smith",
		username: "@michaelsmith",
		avatar: "https://randomuser.me/api/portraits/men/1.jpg",
		rating: 5,
		review:
			"This app is fantastic! It offers everything I need to manage my blog contents efficiently.",
	},
	{
		name: "Emily Johnson",
		username: "@emilyjohnson",
		avatar: "https://randomuser.me/api/portraits/women/1.jpg",
		rating: 4,
		review:
			"This platform saved us time and improved our content quality. The AI suggestions are incredibly helpful!”",
	},
	{
		name: "Daniel Williams",
		username: "@danielwilliams",
		avatar: "https://randomuser.me/api/portraits/men/2.jpg",
		rating: 5,
		review:
			"I've been using this app daily for months. The insights and analytics it provides are invaluable. Highly recommend it!",
	},
	{
		name: "Sophia Brown",
		username: "@sophiabrown",
		avatar: "https://randomuser.me/api/portraits/women/2.jpg",
		rating: 4,
		review:
			"Great app with a lot of potential. It has already saved me a lot of time. Looking forward to future updates and improvements.",
	},
	{
		name: "James Taylor",
		username: "@jamestaylor",
		avatar: "https://randomuser.me/api/portraits/men/3.jpg",
		rating: 5,
		review:
			"Absolutely love this app! It's intuitive and feature-rich. Has significantly improved how I manage and create content.",
	},
	{
		name: "Olivia Martinez",
		username: "@oliviamartinez",
		avatar: "https://randomuser.me/api/portraits/women/3.jpg",
		rating: 4,
		review:
			"This app is a game-changer for generate posts. It's easy to use, extremely powerful and highly recommended!",
	},
	{
		name: "William Garcia",
		username: "@williamgarcia",
		avatar: "https://randomuser.me/api/portraits/men/4.jpg",
		rating: 5,
		review:
			"Effortless blogging with amazing SEO tools. This platform made our content strategy more effective.",
	},
	{
		name: "Mia Rodriguez",
		username: "@miarodriguez",
		avatar: "https://randomuser.me/api/portraits/women/4.jpg",
		rating: 4,
		review:
			"I've tried several content generator tools, but this one stands out. It's simple, effective.",
	},
	{
		name: "Henry Lee",
		username: "@henrylee",
		avatar: "https://randomuser.me/api/portraits/men/5.jpg",
		rating: 5,
		review:
			"This app has transformed my workflow. Managing and analyzing links is now a breeze. I can't imagine working without it.",
	},
] as const;
