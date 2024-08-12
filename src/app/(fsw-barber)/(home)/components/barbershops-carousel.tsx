import { CardBarbershop } from "@/components/card-barbershop";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Barbershop } from "@prisma/client";

interface IBarbershopsCarousel {
  title: string;
  barbershops: Barbershop[];
}

export function BarbershopsCarousel({
  title,
  barbershops,
}: IBarbershopsCarousel) {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-sm font-bold uppercase text-muted-foreground">
        {title}
      </h4>
      <Carousel>
        <CarouselContent>
          {barbershops.map((barbershop) => (
            <CarouselItem key={barbershop.id} className="basis-auto">
              <CardBarbershop barbershop={barbershop} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </div>
  );
}
