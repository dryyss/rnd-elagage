export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function telHref(tel: string) {
  const digits = tel.replace(/\D/g, "");
  return `tel:+33${digits.replace(/^0/, "")}`;
}

export function formatEuro(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: n % 1 === 0 ? 0 : 2 }).format(n);
}
