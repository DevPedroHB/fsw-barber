"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBooking } from "@/http/delete-booking";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";

interface IBookingsCancelDialog
  extends AlertDialogPrimitive.AlertDialogTriggerProps {
  bookingId: string;
}

export function BookingsCancelDialog({
  bookingId,
  ...rest
}: IBookingsCancelDialog) {
  async function handleDeleteBooking() {
    const { bookingId: id } = await deleteBooking(bookingId);

    if (!id) {
      toast.error("Reserva", {
        description:
          "Não foi possível cancelar a reserva. Por favor, tente novamente mais tarde.",
      });

      return;
    }

    toast.success(`Reserva`, {
      description: "Sua reserva foi cancelada com sucesso!",
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger {...rest} />
      <AlertDialogContent className="max-w-xs gap-5">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-bold">
            Cancelar Reserva
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Tem certeza que deseja cancelar esse agendamento?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2.5">
          <AlertDialogCancel variant="secondary" className="flex-1">
            Voltar
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDeleteBooking}
            className="flex-1"
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
