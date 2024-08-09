"use client";

import { navbarLinks } from "@/constants/navbar-links";
import { Calendar, User2, UserCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { NavbarResponsive } from "./navbar-responsive";
import { NavbarSearchForm } from "./navbar-search-form";

export function Navbar() {
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);

  function handleChangeAuth() {
    setAuth((prev) => !prev);
  }

  return (
    <Card className="sticky top-0 h-24 w-full rounded-none">
      <CardContent className="mx-auto flex h-full max-w-[76.5rem] items-center justify-between gap-11 px-5 py-0">
        <Link href="/" className="relative w-[8.125rem]">
          <Image
            src="/images/logo.png"
            alt="FSW Barber"
            width={130}
            height={22}
            className="size-full object-cover object-center"
          />
        </Link>
        <NavbarSearchForm />
        <div className="flex items-center gap-6 max-md:hidden">
          <Link href={navbarLinks[1].path} title={navbarLinks[1].label}>
            <Button
              type="button"
              variant={pathname === navbarLinks[1].path ? "secondary" : "ghost"}
              className="group gap-2 transition-all"
            >
              <Calendar className="size-4 max-lg:size-5" />
              <span className="max-lg:hidden max-lg:group-hover:flex">
                {navbarLinks[1].label}
              </span>
            </Button>
          </Link>
          {auth ? (
            <div
              onClick={handleChangeAuth}
              className="flex cursor-pointer items-center gap-2"
            >
              <Avatar className="relative size-9">
                <AvatarImage src="https://github.com/DevPedroHB.png" />
                <AvatarFallback>
                  <User2 className="size-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <p className="text-sm font-bold">Pedro Henrique Bérgamo</p>
                <small className="text-xs text-muted-foreground">
                  pedrohenriquebergamo.16@gmail.com
                </small>
              </div>
            </div>
          ) : (
            <Button type="button" onClick={handleChangeAuth} className="gap-2">
              <UserCircle2 className="size-4" />
              Perfil
            </Button>
          )}
        </div>
        <NavbarResponsive />
      </CardContent>
    </Card>
  );
}
