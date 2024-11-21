import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parseArticle } from '$lib/helper/extractArticle';

export const GET: RequestHandler = async ({ fetch, params }) => {
	try {
		const { id } = params;
		let article = {};
		if (id) {
			const response = await fetch(
				`https://scholar.google.com/citations?user=${id}&hl=en&gl=us&pagesize=100`
			);
			const html = await response.text();
			article = parseArticle(html);
		}
		return json(article, { status: 200 });
	} catch (e) {
		return json({ message: (e as Error).message }, { status: 500 });
	}
};
