import Link from "next/link";
import { ArrowRight, CalendarRange, Euro, Images, MessageSquareQuote, Settings } from "lucide-react";
import { getPlanning, getRealisations, getSite, getTemoignages } from "@/lib/content";
import { formatPeriode, sortTournees, toISODate, tourneeEnCours, zoneById } from "@/lib/planning";

export default async function AdminDashboard() {
  const [site, planning, realisations, temoignages] = await Promise.all([getSite(), getPlanning(), getRealisations(), getTemoignages()]);
  const today = toISODate(new Date());
  const enCours = tourneeEnCours(planning);
  const prochaines = sortTournees(planning.tournees).filter((t) => t.debut > today).slice(0, 2);

  const cards = [
    { href: "/admin/planning", icon: CalendarRange, t: "Planning des tournées", d: enCours ? `En cours : ${zoneById(planning, enCours.zone).nom} ${formatPeriode(enCours)}` : "Aucune tournée en cours", warn: !enCours && prochaines.length === 0 },
    { href: "/admin/realisations", icon: Images, t: "Réalisations", d: `${realisations.length} chantier${realisations.length > 1 ? "s" : ""} publié${realisations.length > 1 ? "s" : ""}, ${realisations.filter((r) => r.miseEnAvant).length} en page d'accueil` },
    { href: "/admin/tarifs", icon: Euro, t: "Tarifs", d: "Grille haies, autres prestations, exemple crédit d'impôt" },
    { href: "/admin/avis", icon: MessageSquareQuote, t: "Avis clients", d: temoignages.length ? `${temoignages.length} avis affichés` : "Aucun avis : la section affiche un état d'attente", warn: temoignages.length === 0 },
    { href: "/admin/coordonnees", icon: Settings, t: "Coordonnées", d: `${site.telephone} · ${site.email}`, warn: site.telephone.includes("00 00 00") },
  ];

  return (
    <div>
      <h1 className="text-3xl text-forest-900">Bonjour {site.gerant.split(" ")[0]}.</h1>
      <p className="mt-2 text-[15px] text-ink-500">Tout ce que vous modifiez ici est publié immédiatement sur le site.</p>

      {prochaines.length > 0 && (
        <div className="card mt-6 p-5">
          <p className="eyebrow text-ink-500">Prochaines tournées</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {prochaines.map((t) => (
              <li key={t.debut} className="rounded-xl bg-sage-100 px-4 py-3 text-[14px]">
                <span className="font-semibold text-forest-900">{zoneById(planning, t.zone).nom}</span> <span className="text-ink-700">{formatPeriode(t)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="card group flex items-start gap-4 p-5 transition hover:shadow-lift">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.warn ? "bg-copper-100 text-copper-600" : "bg-sage-100 text-forest-800"}`}>
              <c.icon size={20} />
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-forest-900">{c.t}</span>
              <span className="mt-1 block text-[14px] text-ink-500">{c.d}</span>
            </span>
            <ArrowRight size={16} className="mt-3 text-ink-300 transition group-hover:text-copper-600" />
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-ink-900/15 p-5 text-[14px] leading-relaxed text-ink-500">
        <p className="font-semibold text-forest-900">Rappels</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Mettez à jour le planning dès qu&apos;une tournée change : le site affiche automatiquement « tournée en cours » ou « prochaine tournée ».</li>
          <li>Ajoutez une réalisation après chaque chantier marquant : photo avant/après, commune, quelques mots. C&apos;est ce qui convainc le plus.</li>
          <li>Demandez un avis Google après chaque chantier, puis recopiez-le dans « Avis clients ».</li>
        </ul>
      </div>
    </div>
  );
}
