import { BarbershopListPhones } from "@/components/barbershop-list-phones";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { openingHours } from "@/constants/opening-hours";
import { formatDate } from "@/functions/format-date";
import type { Barbershop } from "@prisma/client";
import { User2 } from "lucide-react";
import Image from "next/image";

interface IBarbershopCard {
  barbershop: Barbershop;
}

export function BarbershopCard({ barbershop }: IBarbershopCard) {
  return (
    <Card>
      <CardHeader className="relative p-5">
        <Image
          src="/images/map-banner.png"
          alt="Banner de um mapa"
          width={1658}
          height={1038}
          className="h-auto w-full rounded-lg object-cover object-center"
        />
        <Card className="absolute inset-x-10 bottom-10 flex items-center gap-3 px-5 py-3">
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
        <BarbershopListPhones phones={barbershop.phones} />
        <div className="flex flex-col gap-2.5 py-5">
          {openingHours.map((openingHour) => {
            return (
              <div
                key={openingHour.dayOfWeek}
                className="flex items-center justify-between text-sm"
              >
                <span className="capitalize text-muted-foreground">
                  {formatDate(new Date(2024, 0, openingHour.dayOfWeek), "EEEE")}
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
  );
}
