import type { Booking } from "@/types/booking";
import { add, sub } from "date-fns";

export function fetchBookings() {
  const booking: Booking = {
    id: "an-example-booking",
    date: add(new Date(), { weeks: 1 }),
    createdAt: sub(new Date(), { weeks: 1 }),
    service: {
      id: "309d3376-eb1d-413e-a50c-89d8ca1911c0",
      name: "Corte de Cabelo",
      barbershop: {
        id: "d3c25079-92ab-47e0-bd67-301c13c9ec9d",
        name: "Barbearia Vintage",
        imageUrl:
          "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
      },
    },
  };

  return booking;
}
