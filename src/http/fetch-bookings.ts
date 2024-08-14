import { api } from "@/lib/ky";
import type { BookingDetails } from "@/types/booking";
import { headers } from "next/headers";

interface IFetchBookingsResponse {
  bookings: BookingDetails[];
}

export async function fetchBookings() {
  const result = await api
    .get("bookings", {
      headers: headers(),
      next: {
        tags: ["bookings"],
      },
    })
    .json<IFetchBookingsResponse>();

  return result;
}
