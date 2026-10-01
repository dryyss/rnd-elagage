import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "RND Élagage · Taille de haies et entretien extérieur · Val-d'Oise et Nièvre";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "logo-rnd.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #f6f2e9 0%, #e6ece3 100%)",
          padding: 64,
          fontFamily: "Georgia, serif",
          color: "#0e3b2e",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -120, top: -120, width: 520, height: 520, borderRadius: 9999, background: "#f6e7da", opacity: 0.8 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={260} height={199} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#b9622e", fontFamily: "sans-serif" }}>Val-d&apos;Oise · Nièvre</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 64, lineHeight: 1.05, maxWidth: 940 }}>
              <div>Votre haie retrouve sa ligne.</div>
              <div style={{ fontStyle: "italic", color: "#1f5f4a" }}>L&apos;État vous rembourse la moitié.</div>
            </div>
            <div style={{ fontSize: 26, color: "#2d3a33", fontFamily: "sans-serif" }}>Taille de haies · Entretien de jardin · Crédit d&apos;impôt 50 %</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
