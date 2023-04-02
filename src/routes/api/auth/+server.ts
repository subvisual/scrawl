import { error, json, type RequestHandler } from '@sveltejs/kit';
import { createUser, getUser } from '$lib/db';
import { saveUser } from '$lib/cookies';

export const GET = (async ({ url }) => {
	const address = url.searchParams.get('id') || '';

	const user = await getUser(address);

	if (!user.data?.length) {
		throw error(404, 'User not found');
	}

	return json(user.data);
}) satisfies RequestHandler;

export const POST = (async ({ request, cookies }) => {
	const data = await request.json();

	const { address, key } = data;

	saveUser(cookies, { address, key });

	return new Response();
}) satisfies RequestHandler;
