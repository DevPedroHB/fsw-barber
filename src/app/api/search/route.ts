import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query")?.toString();

  const barbershops = await prisma.barbershop.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          services: {
            some: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
  });

  return NextResponse.json({
    barbershops,
  });
}
