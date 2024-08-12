import { CardBarbershop } from "@/components/card-barbershop";
import { search } from "@/http/search";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

interface ISearch {
  searchParams: {
    query: string;
  };
}

export async function generateMetadata({
  searchParams,
}: ISearch): Promise<Metadata> {
  return {
    title: `Pesquisando por ${searchParams.query}`,
  };
}

export default async function Search({ searchParams }: ISearch) {
  const { query } = searchParams;

  if (!query) {
    redirect("/");
  }

  const { barbershops } = await search(query);

  return (
    <main className="mx-auto my-10 min-h-screen max-w-[76.5rem] space-y-5 px-5">
      <h1 className="text-xl font-bold">Resultados para “{query}”</h1>
      <section className="flex flex-wrap gap-5">
        {barbershops.map((barbershop) => {
          return <CardBarbershop key={barbershop.id} barbershop={barbershop} />;
        })}
        {barbershops.length === 0 && (
          <h2 className="text-muted-foreground">
            Nenhum resultado foi encontrado. Tente novamente com outro termo.
          </h2>
        )}
      </section>
    </main>
  );
}
