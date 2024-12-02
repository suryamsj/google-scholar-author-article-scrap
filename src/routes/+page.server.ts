import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	async function getArtcle(url: string) {
		try {
			const response = await fetch(url);
			const data = await response.json();
			return data;
		} catch (e) {
			return error(500, (e as Error).message);
		}
	}

	async function getAuthor(url: string) {
		try {
			const response = await fetch(url);
			const data = await response.json();
			return data;
		} catch (e) {
			return error(500, (e as Error).message);
		}
	}
	const id = url.searchParams.get('id') || '';
	const articleAPI = id ? `/api/article/${id}` : '/api/article';
	const authorAPI = id ? `/api/author/${id}` : '/api/author';

	return { articles: await getArtcle(articleAPI), author: await getAuthor(authorAPI) };
};
