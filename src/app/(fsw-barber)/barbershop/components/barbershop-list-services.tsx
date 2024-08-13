import { SignInDialog } from "@/components/sign-in-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { nextAuthOptions } from "@/constants/next-auth-options";
import { formatPrice } from "@/functions/format-price";
import type { Service } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { BarbershopBookingForm } from "./barbershop-booking-form";

interface IListServices {
  barbershopName: string;
  services: Service[];
}

export async function BarbershopListServices({
  barbershopName,
  services,
}: IListServices) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-bold text-muted-foreground">Serviços</h4>
      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        {services.map((service) => {
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
                  <h4 className="truncate text-sm font-bold">{service.name}</h4>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">
                    {formatPrice(Number(service.price))}
                  </span>
                  {session ? (
                    <BarbershopBookingForm
                      barbershopName={barbershopName}
                      service={service}
                    />
                  ) : (
                    <SignInDialog asChild>
                      <Button type="button" variant="secondary" size="sm">
                        Reservar
                      </Button>
                    </SignInDialog>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
