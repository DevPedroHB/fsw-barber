"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { toast } from "sonner";

interface IListPhones {
  phones: string[];
}

export function ListPhones({ phones }: IListPhones) {
  async function handleCopyPhone(phone: string) {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(phone);

        toast.success(`Número ${phone} copiado com sucesso!`);
      } catch (error) {
        window.location.href = `tel:${phone}`;

        toast.error("Ocorreu um erro ao tentar copiar o número.");
      }
    } else {
      window.location.href = `tel:${phone}`;

      toast.warning(
        "Seu navegador não suporta a funcionalidade de copiar texto. Tente usar o Ctrl+C para copiar o número manualmente.",
      );
    }
  }

  return (
    <div className="flex flex-col gap-2.5 py-5">
      {phones.map((phone) => {
        return (
          <div
            key={phone}
            className="flex items-center justify-between gap-2.5"
          >
            <span className="flex items-center gap-2.5 text-nowrap text-sm">
              <Phone className="size-6" />
              {phone}
            </span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleCopyPhone(phone)}
            >
              Copiar
            </Button>
          </div>
        );
      })}
    </div>
  );
}
