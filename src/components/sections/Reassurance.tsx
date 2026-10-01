const items = [
  "Crédit d'impôt 50 % sur l'entretien",
  "Devis gratuit sur place",
  "Évacuation des déchets comprise",
  "Assurance RC professionnelle",
  "Réponse sous 24 heures",
  "Nettoyage complet en fin de chantier",
  "Val-d'Oise et Nièvre",
];

export function Reassurance() {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-forest-800/10 bg-forest-800 py-4 text-cream-50">
      <div className="mask-fade-x flex w-max animate-marquee gap-10 whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.14em]" aria-hidden>
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            {it}
            <span className="h-1 w-1 rounded-full bg-copper-400" />
          </span>
        ))}
      </div>
      <ul className="sr-only">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
