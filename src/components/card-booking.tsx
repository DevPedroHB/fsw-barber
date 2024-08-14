import { formatDate } from "@/functions/format-date";
import type { BookingDetails } from "@/types/booking";
import { isAfter } from "date-fns";
import { User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";

interface ICardBooking {
  booking: BookingDetails;
}

export function CardBooking({ booking }: ICardBooking) {
  return (
    <Card className="flex divide-x-2">
      <CardContent className="flex flex-1 flex-col gap-3 p-3">
        {isAfter(booking.date, new Date()) ? (
          <Badge className="w-fit">Confirmado</Badge>
        ) : (
          <Badge variant="secondary" className="w-fit">
            Finalizado
          </Badge>
        )}
        <div className="flex flex-col gap-2">
          <h3 className="truncate font-bold">{booking.service.name}</h3>
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage
                src={booking.service.barbershop.imageUrl}
                alt={booking.service.barbershop.name}
              />
              <AvatarFallback>
                <User2 className="size-4" />
              </AvatarFallback>
            </Avatar>
            <p className="truncate text-sm">
              {booking.service.barbershop.name}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center p-6">
        <small className="text-xs">{formatDate(booking.date, "MMMM")}</small>
        <span className="text-2xl">{formatDate(booking.date, "dd")}</span>
        <small className="text-xs">{formatDate(booking.date, "p")}</small>
      </CardFooter>
    </Card>
  );
}
