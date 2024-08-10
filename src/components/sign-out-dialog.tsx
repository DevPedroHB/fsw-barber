"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { signOut } from "next-auth/react";
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
} from "./ui/alert-dialog";

interface ISignOutDialog extends AlertDialogPrimitive.AlertDialogTriggerProps {}

export function SignOutDialog(props: ISignOutDialog) {
  function handleSignOut() {
    signOut();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger {...props} />
      <AlertDialogContent className="max-w-xs gap-5">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-bold">
            Sair
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Deseja sair da plataforma?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2.5">
          <AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleSignOut}
            className="flex-1"
          >
            Sair
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
