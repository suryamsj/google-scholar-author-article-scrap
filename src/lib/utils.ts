import * as XLSX from 'xlsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function exportToExcel(article: any[]) {
	const worksheet = XLSX.utils.json_to_sheet(article);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Publications');
	XLSX.writeFile(workbook, 'publications.xlsx');
}

export function handleSearch(id: string) {
	if (id === '') {
		alert('ID is required!');
		return;
	}
	window.location.href = `/?id=${id}`;
}
