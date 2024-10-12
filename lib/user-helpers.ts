import { PLANS } from "@/utils";
import { NeonQueryFunction } from "@neondatabase/serverless";

export async function hasCancelledSubscription(
	sql: NeonQueryFunction<false, false>,
	email: string,
) {
	const query =
		await sql`SELECT * FROM users where email = ${email} AND status = 'cancelled'`;

	return query && query.length > 0;
}

export async function doesUserExist(
	sql: NeonQueryFunction<false, false>,
	email: string,
) {
	const query = await sql`SELECT * FROM users where email = ${email}`;
	if (query && query.length > 0) {
		return query;
	}
	return null;
}

export async function updateUser(
	sql: NeonQueryFunction<false, false>,
	userId: string,
	email: string,
) {
	return sql`UPDATE users SET user_id = ${userId} WHERE email = ${email}`;
}

export function getPlanType(priceId: string) {
	if (priceId === null) return { id: "starter", name: "Starter" };

	const checkPlanType = PLANS.filter((plan) => plan.priceId === priceId);

	if (checkPlanType.length === 0) return { id: "default", name: "Default" };

	return checkPlanType[0];
}
