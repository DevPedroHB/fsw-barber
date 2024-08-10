"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface ILoginDialog {
  children: ReactNode;
}

export function LoginDialog({ children }: ILoginDialog) {
  async function handleSignInWithGoogle() {
    await signIn("google");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs gap-5">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-bold">
            Faça login na plataforma
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Conecte-se usando sua conta do Google ou Github.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:space-x-2.5">
          <AlertDialogCancel
            onClick={handleSignInWithGoogle}
            className="flex-1 gap-2 font-bold"
          >
            <Image src="/svgs/google.svg" alt="Github" width={16} height={16} />
            Google
          </AlertDialogCancel>
          <AlertDialogCancel className="flex-1 gap-2 font-bold">
            <Image src="/svgs/github.svg" alt="Github" width={16} height={16} />
            Github
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
