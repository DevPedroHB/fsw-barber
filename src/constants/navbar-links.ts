import { Calendar, Home, type LucideIcon } from "lucide-react";

export interface INavbarLink {
  path: string;
  icon: LucideIcon;
  label: string;
}

export const navbarLinks: INavbarLink[] = [
  {
    path: "/",
    icon: Home,
    label: "Início",
  },
  {
    path: "/bookings",
    icon: Calendar,
    label: "Agendamentos",
  },
];
