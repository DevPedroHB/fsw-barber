import { nextAuthOptions } from "@/constants/next-auth-options";
import { fetchBarbershops } from "@/http/fetch-barbershops";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Hero } from "./components/hero";

export const metadata: Metadata = {
  title: "Início",
};

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  const { barbershops } = await fetchBarbershops();

  return (
    <main>
      <Hero user={session?.user} barbershops={barbershops} />
      <div className="mx-auto min-h-screen max-w-[76.5rem] px-5">Home</div>
    </main>
  );
}
