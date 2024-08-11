import { nextAuthOptions } from "@/constants/next-auth-options";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Hero } from "./components/hero";

export const metadata: Metadata = {
  title: "Início",
};

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <main>
      <Hero user={session?.user!} />
      <div className="mx-auto min-h-screen max-w-[76.5rem] px-5">Home</div>
    </main>
  );
}
