export type OAFilter = "all" | "oa_only" | "non_oa";
export type SortOption = "relevance" | "cited" | "newest";

function buildFilterParams({
  yearFrom,
  yearTo,
  oa,
}: {
  yearFrom?: number;
  yearTo?: number;
  oa?: OAFilter;
}) {
  const filters: string[] = [];
  if (yearFrom) filters.push(`from_publication_date:${yearFrom}-01-01`);
  if (yearTo) filters.push(`to_publication_date:${yearTo}-12-31`);
  if (oa === "oa_only") filters.push(`is_oa:true`);
  if (oa === "non_oa") filters.push(`is_oa:false`);
  return filters.length ? `&filter=${filters.join(",")}` : "";
}

export function buildWorksUrl({
  q,
  page = 1,
  per_page = 20,
  yearFrom,
  yearTo,
  oa,
  sort,
}: {
  q: string;
  page?: number;
  per_page?: number;
  yearFrom?: number;
  yearTo?: number;
  oa?: OAFilter;
  sort?: SortOption;
}) {
  const base = `https://api.openalex.org/works`;
  const s = q ? `?search=${encodeURIComponent(q)}` : `?`;
  const sortParam =
    sort === "cited" ? "&sort=cited_by_count:desc" : sort === "newest" ? "&sort=publication_year:desc" : "";
  const pageParam = `&per_page=${per_page}&page=${page}`;
  const filter = buildFilterParams({ yearFrom, yearTo, oa });
  return `${base}${s}${sortParam}${pageParam}${filter}`;
}

export async function fetchGroupBy({
  q,
  group_by,
  yearFrom,
  yearTo,
  oa,
  per_page = 200,
}: {
  q?: string;
  group_by: string;
  yearFrom?: number;
  yearTo?: number;
  oa?: OAFilter;
  per_page?: number;
}) {
  const base = `https://api.openalex.org/works`;
  const search = q ? `search=${encodeURIComponent(q)}&` : "";
  const filter = buildFilterParams({ yearFrom, yearTo, oa });
  const url = `${base}?${search}group_by=${encodeURIComponent(group_by)}&per_page=${per_page}${filter}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenAlex error ${res.status}`);
  return res.json();
}
