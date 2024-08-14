import type { Prisma } from "@prisma/client";

export interface BookingDetails
  extends Prisma.BookingGetPayload<{
    select: {
      id: true;
      date: true;
      createdAt: true;
      service: {
        select: {
          id: true;
          name: true;
          price: true;
          barbershop: {
            select: {
              id: true;
              name: true;
              address: true;
              phones: true;
              description: true;
              imageUrl: true;
            };
          };
        };
      };
    };
  }> {}
