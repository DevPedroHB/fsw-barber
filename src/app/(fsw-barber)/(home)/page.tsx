import { CardBooking } from "@/components/card-booking";
import { SearchForm } from "@/components/search-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { nextAuthOptions } from "@/constants/next-auth-options";
import { formatDate } from "@/functions/format-date";
import { fetchBarbershops } from "@/http/fetch-barbershops";
import { fetchBookings } from "@/http/fetch-bookings";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { BarbershopsCarousel } from "./components/barbershops-carousel";

export const metadata: Metadata = {
  title: "Início",
};

export default async function Home() {
  const currentDate = new Date();
  const session = await getServerSession(nextAuthOptions);
  const { bookings } = await fetchBookings();
  const { barbershops } = await fetchBarbershops();

  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.date) > currentDate,
  );

  return (
    <main>
      <section className="bg-hero-img bg-cover bg-center bg-no-repeat">
        <div className="bg-background/85">
          <div className="mx-auto grid max-w-[76.5rem] grid-cols-2 gap-5 px-5 py-16 max-lg:grid-cols-1">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl">
                  Olá,{" "}
                  <span className="font-bold">
                    {!session?.user
                      ? "Faça seu login!"
                      : `${session.user.name}`}
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
            <BarbershopsCarousel
              title="Recomendados"
              barbershops={barbershops}
            />
          </div>
        </div>
      </section>
      <section className="mx-auto my-10 max-w-[76.5rem] space-y-10 px-5">
        <BarbershopsCarousel title="Populares" barbershops={barbershops} />
        <BarbershopsCarousel title="Mais visitados" barbershops={barbershops} />
      </section>
    </main>
  );
}
