import { CardBarbershop } from "@/components/card-barbershop";
import { CardBooking } from "@/components/card-booking";
import { SearchForm } from "@/components/search-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatDate } from "@/functions/format-date";
import { fetchBarbershops } from "@/http/fetch-barbershops";
import { fetchBookings } from "@/http/fetch-bookings";
import { Suspense } from "react";

interface IHero {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export function Hero({ user }: IHero) {
  const currentDate = new Date();
  const booking = fetchBookings();
  const barbershops = fetchBarbershops();

  return (
    <section className="bg-hero-img bg-cover bg-center bg-no-repeat">
      <div className="bg-background/85">
        <div className="mx-auto grid max-w-[76.5rem] grid-cols-2 gap-5 px-5 py-16 max-lg:grid-cols-1">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl">
                Olá,{" "}
                <span className="font-bold">
                  {!user ? "Faça seu login!" : `${user.name}`}
                </span>
              </h1>
              <p className="text-sm">
                {formatDate(currentDate, "eeee',' dd 'de' MMMM")}
              </p>
            </div>
            <Suspense>
              <SearchForm className="my-auto max-w-md" />
            </Suspense>
            {user && (
              <div className="flex max-w-md flex-col gap-5">
                <h4 className="text-sm font-bold uppercase text-muted-foreground">
                  Agendamentos
                </h4>
                <CardBooking booking={booking} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold uppercase text-muted-foreground">
              Recomendados
            </h4>
            <Carousel>
              <CarouselContent>
                {barbershops.map((barbershop) => (
                  <CarouselItem key={barbershop.id} className="basis-auto">
                    <CardBarbershop barbershop={barbershop} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
