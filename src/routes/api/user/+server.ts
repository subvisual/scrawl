import { createUser } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	const data = await request.json();

	const { address, key } = data;

	await createUser(address, key);

	return new Response();
}) satisfies RequestHandler;
