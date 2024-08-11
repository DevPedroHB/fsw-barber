import { api } from "@/lib/ky";
import type { Barbershop } from "@/types/barbershop";

interface IFetchBarbershopsResponse {
  barbershops: Barbershop[];
}

export async function fetchBarbershops() {
  const result = await api.get("barbershops").json<IFetchBarbershopsResponse>();

  return result;
}
