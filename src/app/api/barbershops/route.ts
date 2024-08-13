import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const barbershops = await prisma.barbershop.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    revalidated: true,
    barbershops,
  });
}
