"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function NavbarSearchForm() {
  return (
    <form className="flex flex-1 items-center gap-2 max-md:hidden">
      <Input type="search" placeholder="Buscar barbearias" className="flex-1" />
      <Button type="submit" size="icon" className="max-lg:hidden">
        <Search className="size-5" />
      </Button>
    </form>
  );
}
