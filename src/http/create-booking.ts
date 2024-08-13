import { api } from "@/lib/ky";

interface ICreateBookingResponse {
  bookingId: string | null;
}

interface ICreateBooking {
  date: Date;
}

export async function createBooking(serviceId: string, data: ICreateBooking) {
  const result = await api
    .post(`booking/${serviceId}`, {
      json: data,
    })
    .json<ICreateBookingResponse>();

  return result;
}
