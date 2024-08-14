import { api } from "@/lib/ky";
import type { Barbershop } from "@prisma/client";

interface IFetchBarbershopsResponse {
  barbershops: Barbershop[];
}

export async function fetchBarbershops() {
  const result = await api
    .get("barbershops", {
      next: {
        tags: ["barbershops"],
      },
    })
    .json<IFetchBarbershopsResponse>();

  return result;
}
