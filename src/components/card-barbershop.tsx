import type { Barbershop } from "@prisma/client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
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
        width={1366}
        height={768}
        className="h-auto w-full rounded-lg object-cover object-center"
      />
      <div className="flex flex-col gap-3 p-2 pt-3">
        <div className="flex flex-col gap-1">
          <h4 className="truncate font-bold">{barbershop.name}</h4>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {barbershop.address}
          </p>
        </div>
        <Button type="button" variant="secondary" asChild>
          <Link href={`/barbershop/${barbershop.id}`}>Reservar</Link>
        </Button>
      </div>
      <Badge className="absolute left-2 top-2 gap-1 text-xs">
        <Star className="size-3" />
        5,0
      </Badge>
    </Card>
  );
}
