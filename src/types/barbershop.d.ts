import type { Prisma } from "@prisma/client";

export interface BarbershopWithServices
  extends Prisma.BarbershopGetPayload<{
    include: {
      services: true;
    };
  }> {}
