import type { ReactNode } from "react";

interface IFSWBarberLayout {
  children: ReactNode;
}

export default function FSWBarberLayout({
  children,
}: Readonly<IFSWBarberLayout>) {
  return <>{children}</>;
}
