import { nextAuthOptions } from "@/constants/next-auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

interface IBooking {
  params: {
    id: string;
  };
}

export async function POST(request: Request, { params }: IBooking) {
  const body = await request.json();
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json({
      revalidated: true,
      bookingId: null,
    });
  }

  const createBookingBody = z.object({
    date: z.coerce.date({
      required_error: "Data é obrigatória.",
      invalid_type_error: "Data deve ser uma data válida.",
    }),
  });

  try {
    const { date } = createBookingBody.parse(body);

    const booking = await prisma.booking.create({
      data: {
        date,
        serviceId: params.id,
        userId: session.user.id,
      },
    });

    revalidateTag("bookings");

    return NextResponse.json({
      revalidated: true,
      bookingId: booking.id,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      revalidated: true,
      bookingId: null,
    });
  }
}

export async function DELETE(request: Request, { params }: IBooking) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return NextResponse.json({
      revalidated: true,
      bookingId: null,
    });
  }

  try {
    const booking = await prisma.booking.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    revalidateTag("bookings");

    return NextResponse.json({
      revalidated: true,
      bookingId: booking.id,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      revalidated: true,
      bookingId: null,
    });
  }
}
