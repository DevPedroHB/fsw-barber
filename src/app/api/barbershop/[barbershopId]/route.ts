import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IBarbershop {
  params: {
    barbershopId: string;
  };
}

export async function GET(request: Request, { params }: IBarbershop) {
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id: params.barbershopId,
    },
    include: {
      services: true,
    },
  });

  return NextResponse.json({
    revalidated: true,
    barbershop,
  });
}
