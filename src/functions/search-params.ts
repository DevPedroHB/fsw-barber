export const searchParams = {
  get<T extends Record<string, string | undefined>>(
    searchParams: URLSearchParams,
  ) {
    return Object.fromEntries(searchParams.entries()) as T;
  },
  set(params: Record<string, string>, searchParams?: URLSearchParams) {
    const newSearchParams = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(params)) {
      newSearchParams.set(key, value);
    }

    return newSearchParams;
  },
  remove(keys: string[], searchParams?: URLSearchParams) {
    const newSearchParams = new URLSearchParams(searchParams);

    for (const key of keys) {
      newSearchParams.delete(key);
    }

    return newSearchParams;
  },
  has(keys: string[], searchParams: URLSearchParams) {
    return keys.map((key) => searchParams.has(key));
  },
};
