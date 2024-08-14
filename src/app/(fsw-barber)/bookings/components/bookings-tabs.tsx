"use client";

import { CardBooking } from "@/components/card-booking";
import { useTabs } from "@/hooks/use-tabs";
import type { BookingDetails } from "@/types/booking";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { isAfter, isBefore } from "date-fns";
import type { ReactNode } from "react";

interface IBookingsTabs {
  bookings: BookingDetails[];
  children: ReactNode;
}

export function BookingsTabs({ bookings, children }: IBookingsTabs) {
  const upcomingBookings = bookings.filter((booking) =>
    isAfter(booking.date, new Date()),
  );

  const pastBookings = bookings.filter((booking) =>
    isBefore(booking.date, new Date()),
  );

  const { value, onValueChange } = useTabs(bookings[0].id, "booking");

  return (
    <TabsPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      className="flex flex-wrap gap-10"
    >
      <TabsPrimitive.List className="flex flex-1 flex-col gap-5">
        {upcomingBookings.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase text-muted-foreground">
              Confirmados
            </h4>
            {upcomingBookings.map((booking) => {
              return (
                <TabsPrimitive.Trigger
                  key={booking.id}
                  value={booking.id}
                  className="rounded-lg text-start"
                >
                  <CardBooking booking={booking} />
                </TabsPrimitive.Trigger>
              );
            })}
          </div>
        )}
        {pastBookings.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase text-muted-foreground">
              Finalizados
            </h4>
            {pastBookings.map((booking) => {
              return (
                <TabsPrimitive.Trigger
                  key={booking.id}
                  value={booking.id}
                  className="rounded-lg text-start"
                >
                  <CardBooking booking={booking} />
                </TabsPrimitive.Trigger>
              );
            })}
          </div>
        )}
      </TabsPrimitive.List>
      <section className="flex-1">{children}</section>
    </TabsPrimitive.Root>
  );
}
