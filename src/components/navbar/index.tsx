"use client";

import { navbarLinks } from "@/constants/navbar-links";
import { Calendar, UserCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { SearchForm } from "../search-form";
import { SignInDialog } from "../sign-in-dialog";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { NavbarProfile } from "./navbar-profile";
import { NavbarResponsive } from "./navbar-responsive";

export function Navbar() {
  const pathname = usePathname();
  const { data } = useSession();

  return (
    <Card className="sticky top-0 z-10 h-24 w-full rounded-none">
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
        <Suspense>
          <SearchForm variant="navbar" />
        </Suspense>
        <div className="flex items-center gap-6 max-md:hidden">
          <Button
            type="button"
            variant={pathname === navbarLinks[1].path ? "secondary" : "ghost"}
            className="group transition-all"
            asChild
          >
            <Link href={navbarLinks[1].path} title={navbarLinks[1].label}>
              <Calendar className="size-4 max-lg:size-5" />
              <span className="max-lg:hidden max-lg:group-hover:flex">
                {navbarLinks[1].label}
              </span>
            </Link>
          </Button>
          {data?.user ? (
            <NavbarProfile />
          ) : (
            <SignInDialog asChild>
              <Button type="button">
                <UserCircle2 className="size-4" />
                Perfil
              </Button>
            </SignInDialog>
          )}
        </div>
        <Suspense>
          <NavbarResponsive />
        </Suspense>
      </CardContent>
    </Card>
  );
}
