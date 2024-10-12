import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import UpgradeYourPlan from "@/components/upload/upgrade-your-plan";
import UploadForm from "@/components/upload/upload-form";
import getDbConnection from "@/lib/db";
import {
	doesUserExist,
	getPlanType,
	hasCancelledSubscription,
	updateUser,
} from "@/lib/user-helpers";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const clerkUser = await currentUser();

	if (!clerkUser) {
		return redirect("/sign-in");
	}

	const email = clerkUser?.emailAddresses?.[0].emailAddress ?? "";

	const sql = await getDbConnection();
	const response = await sql`SELECT Version()`;
	console.log(response[0].version);

	//updatethe user id
	let userId = null;
	let priceId = null;

	const hasUserCancelled = await hasCancelledSubscription(sql, email);
	const user = await doesUserExist(sql, email);

	if (user) {
		//update the user_id in users table
		userId = clerkUser?.id;
		if (userId) {
			await updateUser(sql, userId, email);
		}

		priceId = user[0].price_id;
	}

	const { id: planTypeId = "starter", name: planTypeName } =
		getPlanType(priceId);

	const isBasicPlan = planTypeId === "basic";
	const isProPlan = planTypeId === "pro";

	// check number of posts per plan
	const posts = await sql`SELECT * FROM posts WHERE user_id = ${userId}`;

	const isValidBasicPlan = isBasicPlan && posts.length < 3;

	return (
		<MaxWidthWrapper className="mb-40">
			<AnimationContainer delay={0.1}>
				<div className="mx-auto flex max-w-4xl flex-col items-center justify-center py-10">
					{isValidBasicPlan || isProPlan ? (
						<UploadForm planTypeName={planTypeName} />
					) : (
						<UpgradeYourPlan />
					)}
				</div>
			</AnimationContainer>
		</MaxWidthWrapper>
	);
}
