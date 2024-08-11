import type { Barbershop } from "@/types/barbershop";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ICardBarbershop {
  barbershop: Barbershop;
}

export function CardBarbershop({ barbershop }: ICardBarbershop) {
  return (
    <Card className="relative w-full max-w-52 p-1">
      <Image
        src={barbershop.imageUrl}
        alt={barbershop.name}
        width={1000}
        height={1000}
        className="size-full object-cover object-center"
      />
      <div className="flex flex-col gap-3 p-2 pt-3">
        <div className="flex flex-col gap-1">
          <h4 className="truncate font-bold">{barbershop.name}</h4>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {barbershop.address}
          </p>
        </div>
        <Button type="button" variant="secondary">
          Reservar
        </Button>
      </div>
    </Card>
  );
}
