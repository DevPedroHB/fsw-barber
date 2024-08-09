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
      <main className="mx-auto max-w-[76.5rem] px-5">{children}</main>
      <Footer />
    </>
  );
}
