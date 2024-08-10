"use client";

import { filters } from "@/constants/filters";
import { navbarLinks } from "@/constants/navbar-links";
import { LogIn, LogOut, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { LoginDialog } from "../login-dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { NavbarLink } from "./navbar-link";
import { NavbarProfile } from "./navbar-profile";

export function NavbarResponsive() {
  const { data } = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="hidden max-md:flex"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-fit max-w-full">
        <SheetHeader>
          <SheetTitle className="text-start text-lg font-bold">Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full" type="scroll">
          {data?.user ? (
            <NavbarProfile variant="responsive" />
          ) : (
            <div className="flex items-center justify-between gap-6 py-6">
              <p className="text-lg font-bold">Olá, faça seu login!</p>
              <LoginDialog>
                <Button type="button" size="icon">
                  <LogIn className="size-5" />
                </Button>
              </LoginDialog>
            </div>
          )}
          <div className="flex flex-col gap-1 border-t py-6">
            {navbarLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavbarLink
                  key={link.label}
                  href={link.path}
                  className="w-full justify-start gap-3"
                >
                  <Icon className="size-4" />
                  {link.label}
                </NavbarLink>
              );
            })}
          </div>
          <div className="flex flex-col gap-1 border-t py-6">
            {filters.map((filter) => {
              return (
                <Button
                  key={filter.label}
                  type="button"
                  variant="ghost"
                  className="w-full justify-start gap-3"
                >
                  <Image
                    src={filter.icon}
                    alt={filter.label}
                    width={16}
                    height={16}
                    className="invert dark:invert-0"
                  />
                  {filter.label}
                </Button>
              );
            })}
          </div>
          {data?.user && (
            <SheetFooter className="border-t py-6">
              <Button
                type="button"
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start gap-3"
              >
                <LogOut className="size-4" />
                Sair da conta
              </Button>
            </SheetFooter>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
