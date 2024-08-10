"use client";

import { themes } from "@/constants/themes";
import { User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { tv, type VariantProps } from "tailwind-variants";
import { SignOutDialog } from "../sign-out-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const navbarProfile = tv({
  slots: {
    trigger: "flex items-center outline-none",
    avatar: "relative",
  },
  variants: {
    variant: {
      default: {
        trigger: "gap-2",
        avatar: "size-9",
      },
      responsive: {
        trigger: "gap-3 my-6",
        avatar: "size-12 border-2 border-primary",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface INavbarProfile extends VariantProps<typeof navbarProfile> {}

export function NavbarProfile({ variant }: INavbarProfile) {
  const { theme, setTheme } = useTheme();
  const { data } = useSession();
  const { trigger, avatar } = navbarProfile({ variant });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={trigger()}>
        <Avatar className={avatar()}>
          <AvatarImage src={data?.user?.image || ""} />
          <AvatarFallback>
            <User2 className="size-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col items-start">
          <p className="text-sm font-bold">{data?.user?.name}</p>
          <small className="text-xs text-muted-foreground">
            {data?.user?.email}
          </small>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Tema</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                {themes.map((theme) => {
                  return (
                    <DropdownMenuRadioItem key={theme.id} value={theme.id}>
                      {theme.label}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>Configurações</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOutDialog className="w-full">Sair da conta</SignOutDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
