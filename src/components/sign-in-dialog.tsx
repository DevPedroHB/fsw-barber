"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { signIn } from "next-auth/react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface ISignInDialog extends AlertDialogPrimitive.AlertDialogTriggerProps {}

export function SignInDialog(props: ISignInDialog) {
  async function handleSignInWithGoogle() {
    await signIn("google");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger {...props} />
      <AlertDialogContent className="max-w-xs gap-5">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-bold">
            Faça login na plataforma
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Conecte-se usando sua conta do Google ou Github.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2.5">
          <AlertDialogAction
            variant="outline"
            onClick={handleSignInWithGoogle}
            className="flex-1"
          >
            <Image
              src="/svgs/google.svg"
              alt="Github"
              width={16}
              height={16}
              className="invert dark:invert-0"
            />
            Google
          </AlertDialogAction>
          <AlertDialogAction variant="outline" className="flex-1">
            <Image
              src="/svgs/github.svg"
              alt="Github"
              width={16}
              height={16}
              className="invert dark:invert-0"
            />
            Github
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
