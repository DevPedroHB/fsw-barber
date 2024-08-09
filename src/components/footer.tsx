import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Card className="rounded-none">
      <CardContent className="mx-auto max-w-[76.5rem] px-5 py-6">
        <h3 className="text-sm text-muted-foreground">
          Copyright &copy; {currentYear}, Todos os direitos reservados à{" "}
          <Link
            href="/"
            className="text-primary transition-all hover:text-primary/90 hover:underline"
          >
            FSW Barber
          </Link>
        </h3>
      </CardContent>
    </Card>
  );
}
