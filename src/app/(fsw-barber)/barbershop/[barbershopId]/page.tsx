import { getBarbershop } from "@/http/get-barbershop";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BarbershopCard } from "../components/barbershop-card";
import { BarbershopHero } from "../components/barbershop-hero";
import { BarbershopListServices } from "../components/barbershop-list-services";

interface IBarbershop {
  params: {
    barbershopId: string;
  };
}

export async function generateMetadata({
  params,
}: IBarbershop): Promise<Metadata> {
  const { barbershop } = await getBarbershop(params.barbershopId);

  if (!barbershop) {
    return { title: "Barbearia não encontrada" };
  }

  return {
    title: `${barbershop.name}`,
  };
}

export default async function Barbershop({ params }: IBarbershop) {
  const { barbershop } = await getBarbershop(params.barbershopId);

  if (!barbershop) {
    return redirect("/");
  }

  return (
    <main className="mx-auto my-10 flex min-h-screen max-w-[76.5rem] flex-wrap gap-10 px-5">
      <section className="flex flex-1 flex-col gap-10">
        <BarbershopHero barbershop={barbershop} />
        <BarbershopListServices
          barbershopName={barbershop.name}
          services={barbershop.services}
        />
      </section>
      <section className="max-w-[24.125rem] flex-1">
        <BarbershopCard barbershop={barbershop} />
      </section>
    </main>
  );
}
