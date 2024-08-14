import { api } from "@/lib/ky";

interface IDeleteBookingResponse {
  bookingId: string | null;
}

export async function deleteBooking(bookingId: string) {
  const result = await api
    .delete(`booking/${bookingId}`)
    .json<IDeleteBookingResponse>();

  return result;
}
