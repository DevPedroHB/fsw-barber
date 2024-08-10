import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SearchForm } from "@/components/search-form";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/functions/format-date";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Início",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const currentDate = new Date();

  return (
    <main>
      <div className="bg-hero-img bg-cover bg-center bg-no-repeat">
        <div className="backdrop-brightness-[.25]">
          <div className="mx-auto flex max-w-[76.5rem] flex-wrap gap-4 px-5 py-16">
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl">
                  Olá,{" "}
                  <span className="font-bold">
                    {!session ? "Faça seu login!" : `${session?.user?.name}`}
                  </span>
                </h1>
                <p className="text-sm">
                  {formatDate(currentDate, "eeee ',' dd 'de' MMMM")}
                </p>
              </div>
              <SearchForm className="my-auto max-w-md" />
            </div>
            <div className="flex flex-1 flex-col gap-5">
              <h4 className="text-sm font-bold uppercase text-muted-foreground">
                Recomendados
              </h4>
              <div className="flex gap-5">
                <Card>
                  <CardContent className="p-5">Cards</CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto min-h-screen max-w-[76.5rem] px-5">Home</div>
    </main>
  );
}
