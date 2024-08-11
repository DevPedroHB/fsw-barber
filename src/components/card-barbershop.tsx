import type { Barbershop } from "@/types/barbershop";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface ICardBarbershop {
  barbershop: Barbershop;
}

export function CardBarbershop({ barbershop }: ICardBarbershop) {
  return (
    <Card className="relative w-full max-w-52 p-1">
      <Suspense fallback={<Skeleton className="aspect-video size-full" />}>
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          width={1000}
          height={1000}
          className="aspect-video size-full rounded-lg object-cover object-center"
        />
      </Suspense>
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

export function CardBarbershopSkeleton() {
  return (
    <Card className="relative w-52 p-1">
      <Skeleton className="aspect-video size-full" />
      <div className="space-y-3 p-2 pt-3">
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="absolute left-2 top-2 h-5 w-14 rounded-full" />
    </Card>
  );
}
