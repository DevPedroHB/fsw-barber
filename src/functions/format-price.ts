export function formatPrice(price: number, minimumFractionDigits = 2) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits,
  });
}
