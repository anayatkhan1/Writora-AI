import {
	HelpCircleIcon,
	LineChartIcon,
	Link2Icon,
	LockIcon,
	NewspaperIcon,
	QrCodeIcon,
} from "lucide-react";

export const NAV_LINKS = [
	{
		title: "Features",
		href: "/features",
		menu: [
			{
				title: "SEO Strategy",
				tagline: "SEO optimization and track their performance.",
				href: "/features/seo-strategy",
				icon: Link2Icon,
			},
			{
				title: "Password Protection",
				tagline: "Secure your blogs with a password.",
				href: "/features/password-protection",
				icon: LockIcon,
			},
			{
				title: "Advanced Analytics",
				tagline: "Gain insights into who is clicking your posts.",
				href: "/features/analytics",
				icon: LineChartIcon,
			},
			{
				title: "Custom QR Codes",
				tagline: "Use QR codes to reach your audience.",
				href: "/features/qr-codes",
				icon: QrCodeIcon,
			},
		],
	},
	{
		title: "Pricing",
		href: "/pricing",
	},
	{
		title: "Enterprise",
		href: "/enterprise",
	},
	{
		title: "Resources",
		href: "/resources",
		menu: [
			{
				title: "Blog",
				tagline: "Read articles on the latest trends in tech.",
				href: "/resources/blog",
				icon: NewspaperIcon,
			},
			{
				title: "Help",
				tagline: "Get answers to your questions.",
				href: "/resources/help",
				icon: HelpCircleIcon,
			},
		],
	},
	{
		title: "Changelog",
		href: "/changelog",
	},
];
