import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import type { ReactNode } from "react";

interface IFSWBarberLayout {
  children: ReactNode;
}

export default function FSWBarberLayout({
  children,
}: Readonly<IFSWBarberLayout>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
