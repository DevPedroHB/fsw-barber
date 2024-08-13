"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { openingHours } from "@/constants/opening-hours";
import { formatDate } from "@/functions/format-date";
import { formatPrice } from "@/functions/format-price";
import { generateTimeSlots } from "@/functions/generate-time-slots";
import { getAvailableTimeSlots } from "@/functions/get-available-time-slots";
import { createBooking } from "@/http/create-booking";
import {
  createBookingSchema,
  type CreateBookingSchema,
} from "@/types/schemas/create-booking-schema";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Service } from "@prisma/client";
import { getDay, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IBookingForm {
  barbershopName: string;
  service: Service;
}

export function BarbershopBookingForm({
  barbershopName,
  service,
}: IBookingForm) {
  const [open, setOpen] = useState(false);
  const [parentForm] = useAutoAnimate();
  const [parentInfo] = useAutoAnimate();

  const formattedOpeningHours = generateTimeSlots(openingHours);
  const enabledDaysOfWeek = openingHours.map((schedule) => schedule.dayOfWeek);

  const form = useForm<CreateBookingSchema>({
    resolver: zodResolver(createBookingSchema),
  });

  const dateSelected = form.watch("date");
  const timeSelected = form.watch("time");

  const availableTimeSlots = getAvailableTimeSlots(
    formattedOpeningHours,
    dateSelected,
  );

  async function handleCreateBooking({ date, time }: CreateBookingSchema) {
    const [hours, minutes] = time.split(":").map(Number);

    const bookingDate = set(date, {
      hours,
      minutes,
      seconds: 0,
      milliseconds: 0,
    });

    const { bookingId } = await createBooking(service.id, {
      date: bookingDate,
    });

    if (!bookingId) {
      toast.error("Ocorreu um erro ao agendar a reserva.", {
        description: "Por favor, tente novamente mais tarde.",
      });

      return;
    }

    toast.success("Reserva Efetuada!", {
      description: "Sua reserva foi agendada com sucesso.",
    });

    form.reset();

    setOpen((prev) => !prev);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type="button" variant="secondary" size="sm">
          Reservar
        </Button>
      </SheetTrigger>
      <SheetContent className="w-fit max-w-full p-0">
        <ScrollArea type="scroll" className="h-full w-fit">
          <Form {...form}>
            <form
              ref={parentForm}
              onSubmit={form.handleSubmit(handleCreateBooking)}
              className="flex flex-col divide-y"
            >
              <SheetHeader className="p-6">
                <SheetTitle>Fazer reserva</SheetTitle>
              </SheetHeader>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center p-6">
                    <FormControl>
                      <Card>
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          fromDate={new Date()}
                          disabled={(date) =>
                            !enabledDaysOfWeek.includes(getDay(date))
                          }
                        />
                      </Card>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {dateSelected && (
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="p-6">
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          variant="outline"
                          size="sm"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex-wrap justify-center"
                        >
                          {availableTimeSlots.map((time) => (
                            <ToggleGroupItem key={time} value={time}>
                              {time}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex flex-col gap-6 p-6">
                <Card ref={parentInfo} className="flex flex-col gap-3 p-3">
                  <div className="flex justify-between">
                    <span className="font-bold">{service.name}</span>
                    <span className="text-sm font-bold">
                      {formatPrice(Number(service.price))}
                    </span>
                  </div>
                  {dateSelected && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Data
                      </span>
                      <span className="text-sm">
                        {formatDate(dateSelected, "dd 'de' MMMM")}
                      </span>
                    </div>
                  )}
                  {timeSelected && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Horário
                      </span>
                      <span className="text-sm">{timeSelected}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Barbearia
                    </span>
                    <span className="text-sm">{barbershopName}</span>
                  </div>
                </Card>
                <Button type="submit" className="w-full">
                  Confirmar
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
