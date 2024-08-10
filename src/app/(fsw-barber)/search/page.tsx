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

export default function Search({ searchParams }: ISearch) {
  const { query } = searchParams;

  if (!query) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>Page Search</h1>
      <pre>{JSON.stringify(searchParams, null, 2)}</pre>
    </main>
  );
}
