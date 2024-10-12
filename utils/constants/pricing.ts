export const ORIGIN_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: process.env.PRODUCTION_ORIGIN_URL;

export const PLANS = [
	{
		id: "basic",
		name: "Basic",
		info: "For most individuals",
		price: {
			monthly: 7,
			yearly: Math.round(7 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: "Up to 3 Blog posts", limit: "100 tags" },
			{ text: "Up to 3 Transcriptions" },
			{ text: "Up to 3 Posts stored" },
			{
				text: "Markdown support",
				tooltip: "Export content in Markdown format",
			},
			{
				text: "Community support",
				tooltip: "Get answers your questions on discord",
			},
			{
				text: "AI powered suggestions",
				tooltip: "Get up to 100 AI powered suggestions",
			},
		],
		btn: {
			text: "Start Your Free Trial",
			href: "https://buy.stripe.com/test_eVadT70GKh1ac6Y005",
			variant: "default",
		},
		priceId: process.env.STRIPE_PRICE_ID_BASIC_PLAN,
	},
	{
		id: "pro",
		name: "Pro",
		info: "For small businesses",
		price: {
			monthly: 17.99,
			yearly: Math.round(17.99 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: "Up to 500 Blog Posts", limit: "500 tags" },
			{ text: "Up to 500 Transcriptions" },
			{ text: "Up to 500 Posts stored" },
			{
				text: "Unlimited Markdown support",
				tooltip: "Export content in Markdown format",
			},
			{ text: "SEO optimization tools" },
			{ text: "Priority support", tooltip: "Get 24/7 chat support" },
			{
				text: "AI powered suggestions",
				tooltip: "Get up to 500 AI powered suggestions",
			},
		],
		btn: {
			text: "Get started",
			href: "https://buy.stripe.com/test_cN26qF9dg9yI9YQ3ci",
			variant: "purple",
		},
		priceId: process.env.STRIPE_PRICE_ID_PRO_PLAN,
	},
	{
		name: "Business",
		info: "For large organizations",
		price: {
			monthly: 69.99,
			yearly: Math.round(49.99 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: "Unlimited Blog Posts" },
			{ text: "Unlimited Transcriptions" },
			{ text: "Unlimited Posts stored" },
			{ text: "Unlimited Markdown support" },
			{
				text: "SEO optimization tools",
				tooltip: "Advanced SEO optimization tools",
			},
			{ text: "Priority support", tooltip: "Get 24/7 chat support" },
			{
				text: "AI powered suggestions",
				tooltip: "Get up to 500 AI powered suggestions",
			},
		],
		btn: {
			text: "Contact team",
			href: "mailto:anayat0khan@gmail.com",
			variant: "default",
		},
	},
];

export const PRICING_FEATURES = [
	{
		text: "Shorten links",
		tooltip: "Create shortened links",
	},
	{
		text: "Track clicks",
		tooltip: "Track clicks on your links",
	},
	{
		text: "See top countries",
		tooltip: "See top countries where your links are clicked",
	},
	{
		text: "Upto 10 tags",
		tooltip: "Add upto 10 tags to your links",
	},
	{
		text: "Community support",
		tooltip: "Community support is available for free users",
	},
	{
		text: "Priority support",
		tooltip: "Get priority support from our team",
	},
	{
		text: "AI powered suggestions",
		tooltip: "Get AI powered suggestions for your links",
	},
];

export const WORKSPACE_LIMIT = 2;
