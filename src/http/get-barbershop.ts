import { api } from "@/lib/ky";
import type { BarbershopWithServices } from "@/types/barbershop";

interface IGetBarbershopResponse {
  barbershop: BarbershopWithServices | null;
}

export async function getBarbershop(barbershopId: string) {
  const result = await api
    .get(`barbershop/${barbershopId}`)
    .json<IGetBarbershopResponse>();

  return result;
}
