import { nextAuthOptions } from "@/constants/next-auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json({
      revalidated: true,
      bookings: [],
    });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      date: true,
      createdAt: true,
      service: {
        select: {
          id: true,
          name: true,
          price: true,
          barbershop: {
            select: {
              id: true,
              name: true,
              address: true,
              phones: true,
              description: true,
              imageUrl: true,
            },
          },
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return NextResponse.json({
    revalidated: true,
    bookings,
  });
}
