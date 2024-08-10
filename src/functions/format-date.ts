import { format, type FormatOptions } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(
  date: Date | number | string,
  formatStr: string,
  options?: FormatOptions,
) {
  return format(date, formatStr, {
    locale: ptBR,
    ...options,
  });
}
