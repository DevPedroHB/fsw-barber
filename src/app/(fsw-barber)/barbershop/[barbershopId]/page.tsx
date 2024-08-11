import type { Metadata } from "next";

interface IBarbershop {
  params: {
    barbershopId: string;
  };
}

export async function generateMetadata({
  params,
}: IBarbershop): Promise<Metadata> {
  return {
    title: `Barbearia ${params.barbershopId}`,
  };
}

export default function Barbershop({ params }: IBarbershop) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>Page Barbershop</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </main>
  );
}
