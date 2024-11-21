import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch, url}) => {
  try {
    const id = url.searchParams.get("id") || "";
    const api = id ? `/api/article/${id}` : "/api/article";

    const response = await fetch(api);
    const data = await response.json();
    return {articles: data}
  } catch (e) {
    return error(500, (e as Error).message)
  }
};