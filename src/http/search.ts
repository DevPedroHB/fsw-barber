import { api } from "@/lib/ky";
import type { Barbershop } from "@/types/barbershop";

interface ISearchResponse {
  barbershops: Barbershop[];
}

export async function search(query: string) {
  const result = await api
    .get("search", {
      searchParams: {
        query,
      },
    })
    .json<ISearchResponse>();

  return result;
}
