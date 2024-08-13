import { Card } from "@/components/ui/card";
import type { Barbershop } from "@prisma/client";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";

interface IBarbershopHero {
  barbershop: Barbershop;
}

export function BarbershopHero({ barbershop }: IBarbershopHero) {
  return (
    <div className="flex flex-col gap-5">
      <Image
        src={barbershop.imageUrl}
        alt={barbershop.name}
        width={1366}
        height={768}
        className="h-auto w-full rounded-lg object-cover object-center shadow-sm"
      />
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex flex-col gap-2">
          <h1 className="truncate text-3xl font-bold">{barbershop.name}</h1>
          <span className="flex items-center gap-2 truncate text-sm">
            <MapPin className="size-4 text-primary" />
            {barbershop.address}
          </span>
        </div>
        <Card className="flex flex-col items-center px-5 py-2.5">
          <p className="flex items-center gap-2 text-xl">
            <Star className="size-5 text-primary" />
            5,0
          </p>
          <span className="text-nowrap text-xs">889 avaliações</span>
        </Card>
      </div>
    </div>
  );
}
