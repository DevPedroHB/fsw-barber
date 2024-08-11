import { CardBarbershop } from "@/components/card-barbershop";
import { CardBooking } from "@/components/card-booking";
import { SearchForm } from "@/components/search-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatDate } from "@/functions/format-date";
import { fetchBookings } from "@/http/fetch-bookings";
import type { Barbershop } from "@/types/barbershop";
import type { User } from "@prisma/client";
import { Suspense } from "react";

interface IHero {
  user?: User;
  barbershops: Barbershop[];
}

export async function Hero({ user, barbershops }: IHero) {
  const currentDate = new Date();
  const { bookings } = await fetchBookings();

  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.date) > currentDate,
  );

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
            {upcomingBookings.length > 0 && (
              <div className="flex max-w-md flex-col gap-5">
                <h4 className="text-sm font-bold uppercase text-muted-foreground">
                  Agendamentos
                </h4>
                <Carousel orientation="vertical">
                  <CarouselContent className="h-[132px]">
                    {upcomingBookings.map((booking) => (
                      <CarouselItem key={booking.id} className="basis-auto">
                        <CardBooking booking={booking} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
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
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
