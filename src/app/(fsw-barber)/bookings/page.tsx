import { BarbershopListPhones } from "@/components/barbershop-list-phones";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { formatDate } from "@/functions/format-date";
import { formatPrice } from "@/functions/format-price";
import { fetchBookings } from "@/http/fetch-bookings";
import { isAfter } from "date-fns";
import { User2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingsCancelDialog } from "./components/bookings-cancel-dialog";
import { BookingsTabs } from "./components/bookings-tabs";

export const metadata: Metadata = {
  title: "Agendamentos",
};

export default async function Bookings() {
  const { bookings } = await fetchBookings();

  return (
    <main className="mx-auto my-10 flex min-h-screen max-w-[60.5rem] flex-col gap-5 px-5">
      <h1 className="text-2xl font-bold">Agendamentos</h1>
      {bookings.length > 0 ? (
        <BookingsTabs bookings={bookings}>
          {bookings.map((booking) => {
            return (
              <TabsContent key={booking.id} value={booking.id} asChild>
                <Card className="mt-[1.625rem] p-2.5">
                  <CardHeader className="relative p-0 pb-5">
                    <Image
                      src="/images/map-banner.png"
                      alt="Banner de um mapa"
                      width={1658}
                      height={1038}
                      className="h-auto w-full rounded-lg object-cover object-center"
                    />
                    <Card className="absolute inset-x-5 bottom-10 flex items-center gap-3 px-5 py-3">
                      <Avatar className="size-12">
                        <AvatarImage
                          src={booking.service.barbershop.imageUrl}
                        />
                        <AvatarFallback>
                          <User2 className="size-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="truncate font-bold">
                          {booking.service.barbershop.name}
                        </p>
                        <span className="truncate text-xs">
                          {booking.service.barbershop.address}
                        </span>
                      </div>
                    </Card>
                  </CardHeader>
                  <CardContent className="flex flex-col divide-y p-0">
                    <div className="flex flex-col gap-2.5 pb-5">
                      <h4 className="text-sm font-bold uppercase">Sobre nós</h4>
                      <p className="text-sm text-muted-foreground">
                        {booking.service.barbershop.description}
                      </p>
                    </div>
                    <BarbershopListPhones
                      phones={booking.service.barbershop.phones}
                    />
                    <div className="flex flex-col gap-5 pt-5">
                      <div className="flex flex-col gap-2.5">
                        {isAfter(booking.date, new Date()) ? (
                          <Badge className="w-fit">Confirmado</Badge>
                        ) : (
                          <Badge variant="secondary" className="w-fit">
                            Finalizado
                          </Badge>
                        )}
                        <Card className="flex flex-col gap-3 p-3">
                          <div className="flex justify-between">
                            <span className="font-bold">
                              {booking.service.name}
                            </span>
                            <span className="text-sm font-bold">
                              {formatPrice(Number(booking.service.price))}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Data
                            </span>
                            <span className="text-sm">
                              {formatDate(booking.date, "dd 'de' MMMM")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Horário
                            </span>
                            <span className="text-sm">
                              {formatDate(booking.date, "HH:mm")}h
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Barbearia
                            </span>
                            <span className="text-sm">
                              {booking.service.barbershop.name}
                            </span>
                          </div>
                        </Card>
                      </div>
                      {isAfter(booking.date, new Date()) && (
                        <BookingsCancelDialog bookingId={booking.id} asChild>
                          <Button
                            type="button"
                            variant="destructive"
                            className="w-full"
                          >
                            Cancelar Reserva
                          </Button>
                        </BookingsCancelDialog>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </BookingsTabs>
      ) : (
        <div className="flex flex-col gap-5">
          <p className="text-muted-foreground">
            Parece que você ainda não possuí nenhum agendamento, comece fazendo
            seu primeiro agendamento com uma barbearia de sua escolha.
          </p>
          <Button type="button" className="w-fit" asChild>
            <Link href="/">Agendar</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
