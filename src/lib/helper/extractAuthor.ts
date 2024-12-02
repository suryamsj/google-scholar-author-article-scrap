import { parseHTML } from 'linkedom';

function extrackAuthor(document: Document) {
	const image = document.querySelector('#gsc_prf_pua img')?.getAttribute('src')?.trim() || '';
	const name = document.querySelector('#gsc_prf #gsc_prf_in')?.textContent?.trim() || '';
	const verified =
		document.querySelector('#gsc_prf #gsc_prf_ivh')?.textContent?.split('-', 1) || '';
	const information = document.querySelector('#gsc_prf .gsc_prf_il')?.textContent?.trim() || '';

	const author = {
		image,
		name,
		verified,
		information
	};

	return author;
}

export function parseAuthor(html: string) {
	const { document } = parseHTML(html);
	return extrackAuthor(document);
}
