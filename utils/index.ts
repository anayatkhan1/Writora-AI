// constants
import {
	CHILD_VARIANTS,
	FADE_IN_VARIANTS,
	LIST_ITEM_VARIANTS,
	MODAL_VARIANTS,
} from "./constants/animation";
import { aeonik, inter } from "./constants/fonts";
import {
	COMPANIES,
	DEFAULT_AVATAR_URL,
	PAGINATION_LIMIT,
	PROCESS,
} from "./constants/misc";
import { NAV_LINKS } from "./constants/nav-links";
import { PLANS, PRICING_FEATURES, WORKSPACE_LIMIT } from "./constants/pricing";
import { APP_DOMAIN, APP_HOSTNAMES, APP_NAME } from "./constants/site";

// functions
import { cn } from "@/utils/functions/cn";
import { generateMetadata } from "./functions/metadata";
import { isValidUrl } from "./functions/urls";

export {
	// constants
	LIST_ITEM_VARIANTS,
	CHILD_VARIANTS,
	APP_DOMAIN,
	APP_HOSTNAMES,
	APP_NAME,
	DEFAULT_AVATAR_URL,
	FADE_IN_VARIANTS,
	MODAL_VARIANTS,
	PAGINATION_LIMIT,
	PLANS,
	PRICING_FEATURES,
	WORKSPACE_LIMIT,
	NAV_LINKS,
	COMPANIES,
	PROCESS,
	aeonik,
	inter,
	// functions
	cn,
	isValidUrl,
	generateMetadata,
};
