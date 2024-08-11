import { api } from "@/lib/ky";
import type { Booking } from "@/types/booking";
import { headers } from "next/headers";

interface IFetchBookingsResponse {
  bookings: Booking[];
}

export async function fetchBookings() {
  const result = await api
    .get("bookings", {
      headers: headers(),
    })
    .json<IFetchBookingsResponse>();

  return result;
}
