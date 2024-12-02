import { parseAuthor } from '$lib/helper/extractAuthor';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, params }) => {
	try {
		const { id } = params;
		let author = {};
		if (id) {
			const response = await fetch(
				`https://scholar.google.com/citations?user=${id}&hl=en&gl=us&pagesize=100`
			);
			const html = await response.text();
			author = parseAuthor(html);
		}
		return json(author, { status: 200 });
	} catch (e) {
		return json({ message: (e as Error).message }, { status: 500 });
	}
};
