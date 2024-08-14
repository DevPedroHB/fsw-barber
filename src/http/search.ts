import { api } from "@/lib/ky";
import type { Barbershop } from "@prisma/client";

interface ISearchResponse {
  barbershops: Barbershop[];
}

export async function search(query: string) {
  const result = await api
    .get("search", {
      searchParams: {
        query,
      },
      next: {
        tags: [`search/${query}`],
      },
    })
    .json<ISearchResponse>();

  return result;
}
