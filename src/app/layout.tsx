import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { getSite } from "@/lib/content";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  // Seul l'axe optique est conservé : SOFT et WONK triplaient le poids du fichier.
  axes: ["opsz"],
  display: "swap",
  adjustFontFallback: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  adjustFontFallback: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(site.urlSite),
    title: {
      default: `${site.nom} · Taille de haies et entretien extérieur · Val-d'Oise et Nièvre`,
      template: `%s · ${site.nom}`,
    },
    description:
      "Taille de haies, entretien de jardin, abattage et travaux extérieurs dans le Val-d'Oise et la Nièvre. Devis gratuit, évacuation comprise, 50 % de crédit d'impôt sur l'entretien.",
    applicationName: site.nom,
    openGraph: { type: "website", locale: "fr_FR", siteName: site.nom },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: "/icon-192.png", sizes: "192x192" },
        { url: "/icon-512.png", sizes: "512x512" },
      ],
      apple: "/apple-icon.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0e3b2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable} h-full`} data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
