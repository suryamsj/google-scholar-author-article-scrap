import { parseHTML } from "linkedom";

function extractArticle(element: Element){
  const title = element.querySelector(".gsc_a_t a")?.textContent?.trim() || "";
  const article_link = element.querySelector(".gsc_a_t a")?.getAttribute("href")?.trim() || "";
  const year = parseInt(element.querySelector(".gsc_a_y .gsc_a_hc")?.textContent?.trim() || "") || 0;
  const url = "https://scholar.google.com" + article_link;

  const article = {
    title,
    url,
    year
  }

  return article;
}

export function parseArticle(html: string, sortOrder: 'asc' | 'desc' = 'desc'){
  const {document} = parseHTML(html);
  const articles = Array.from(document.querySelectorAll("#gsc_a_t > #gsc_a_b > .gsc_a_tr")).map(items => extractArticle(items));
  
  return articles.sort((a, b) => 
    sortOrder === 'asc' 
      ? a.year - b.year 
      : b.year - a.year
  );
}