import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { openingHours } from "@/constants/opening-hours";
import { formatDate } from "@/functions/format-date";
import { formatPrice } from "@/functions/format-price";
import { getBarbershop } from "@/http/get-barbershop";
import { MapPin, Star, User2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ListPhones } from "../components/list-phones";

interface IBarbershop {
  params: {
    barbershopId: string;
  };
}

export async function generateMetadata({
  params,
}: IBarbershop): Promise<Metadata> {
  const { barbershop } = await getBarbershop(params.barbershopId);

  if (!barbershop) {
    return { title: "Barbearia não encontrada" };
  }

  return {
    title: `${barbershop.name}`,
  };
}

export default async function Barbershop({ params }: IBarbershop) {
  const { barbershop } = await getBarbershop(params.barbershopId);

  if (!barbershop) {
    return redirect("/");
  }

  return (
    <main className="mx-auto my-10 flex min-h-screen max-w-[76.5rem] flex-wrap gap-10 px-5">
      <section className="flex flex-1 flex-col gap-10">
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
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold text-muted-foreground">Serviços</h4>
          <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
            {barbershop.services.map((service) => {
              return (
                <Card key={service.id} className="flex gap-3 p-3">
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    width={110}
                    height={110}
                    className="size-[6.875rem] rounded-lg object-cover object-center"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <h4 className="truncate text-sm font-bold">
                        {service.name}
                      </h4>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">
                        {formatPrice(Number(service.price))}
                      </span>
                      <Button type="button" variant="secondary" size="sm">
                        Reservar
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="max-w-[24.125rem] flex-1">
        <Card>
          <CardHeader className="relative p-5">
            <Image
              src="/images/map-banner.png"
              alt="Banner de um mapa"
              width={1658}
              height={1038}
              className="h-auto w-full rounded-lg object-cover object-center"
            />
            <Card className="absolute bottom-10 left-10 right-10 flex items-center gap-3 px-5 py-3">
              <Avatar className="size-12">
                <AvatarImage src={barbershop.imageUrl} />
                <AvatarFallback>
                  <User2 className="size-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="truncate font-bold">{barbershop.name}</p>
                <span className="truncate text-xs">{barbershop.address}</span>
              </div>
            </Card>
          </CardHeader>
          <CardContent className="flex flex-col divide-y p-0 px-5">
            <div className="flex flex-col gap-2.5 pb-5">
              <h4 className="text-sm font-bold uppercase">Sobre nós</h4>
              <p className="text-sm text-muted-foreground">
                {barbershop.description}
              </p>
            </div>
            <ListPhones phones={barbershop.phones} />
            <div className="flex flex-col gap-2.5 py-5">
              {openingHours.map((openingHour) => {
                return (
                  <div
                    key={openingHour.dayOfWeek}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {formatDate(
                        new Date(2024, 0, openingHour.dayOfWeek),
                        "EEEE",
                      )}
                    </span>
                    <span>
                      {formatDate(openingHour.schedules.from, "HH:mm")} -{" "}
                      {formatDate(openingHour.schedules.to, "HH:mm")}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between py-5">
              <span className="text-sm">Em parceria com</span>
              <Image
                src="/images/logo.png"
                alt="FSW Barber"
                width={130}
                height={22}
                className="h-auto w-[8.125rem] object-cover object-center"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
