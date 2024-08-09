"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { Button } from "../ui/button";

interface INavbarLink extends ComponentProps<typeof Link> {}

export function NavbarLink({ children, className, ...rest }: INavbarLink) {
  const pathname = usePathname();

  return (
    <Link {...rest}>
      <Button
        type="button"
        variant={pathname === rest.href ? "default" : "ghost"}
        className={className}
      >
        {children}
      </Button>
    </Link>
  );
}
