import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { SITE_URL } from "./lib/url";
import { BRAND } from "./data/brand-colors";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TicoBlockchain 2026 — En Vivo",
    template: "%s · TicoBlockchain 2026",
  },
  description:
    "Tracker en vivo del TicoBlockchain 2026 — 14 de mayo en Hotel Barceló San José, Costa Rica. Sigue Main Stage y Escenario 2 en tiempo real.",
  applicationName: "TicoBlockchain 2026",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "TicoBlockchain",
    "blockchain",
    "Costa Rica",
    "Web3",
    "cripto",
    "fintech",
    "LATAM",
  ],
  openGraph: {
    type: "website",
    locale: "es_CR",
    siteName: "TicoBlockchain 2026",
    title: "TicoBlockchain 2026 — En Vivo",
    description:
      "Main Stage + Escenario 2 · 14 de mayo 2026 · Hotel Barceló San José.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicoBlockchain 2026 — En Vivo",
    description:
      "Main Stage + Escenario 2 · 14 de mayo 2026 · Hotel Barceló San José.",
  },
};

export const viewport: Viewport = {
  themeColor: BRAND.surface,
  // Let the app paint into the iOS notch / Dynamic Island area so safe-area
  // insets actually resolve to a non-zero value. Without this, env(safe-area-*)
  // always returns 0 on iPhones and fixed elements would still clip.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ touchAction: "manipulation" }}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-sans">
        <a href="#main" className="skip-link">
          Ir al contenido principal
        </a>
        <NavBar />
        {/* Offset matches NavBar's fixed height contract (see NavBar.tsx),
            plus the top safe-area so content isn't covered on notched devices. */}
        <div className="flex-1 flex flex-col pt-[calc(72px+env(safe-area-inset-top))]">
          {children}
        </div>
        <Footer />
        <Analytics />
        <SpeedInsights />
        {/* Developer credit in DevTools — visible only to people who open
            the console (devs, recruiters, the curious). Zero impact on
            normal users, near-100% on the technical audience this event
            attracts. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log(
              '%c\\n WEBSITES BY GER \\n',
              'background:#000d33;color:#fff;font-family:ui-monospace,Menlo,monospace;font-weight:900;font-size:15px;padding:10px 20px;letter-spacing:-0.02em'
            );
            console.log(
              '%cSitios web para profesionales y emprendedores en Costa Rica',
              'color:#000d33;font-family:ui-monospace,Menlo,monospace;font-size:11px;padding:4px 0'
            );
            console.log(
              '%c→ Instagram: @websites_by_ger',
              'color:#ba002e;font-family:ui-monospace,Menlo,monospace;font-size:11px;font-weight:bold;padding:2px 0 10px'
            );`,
          }}
        />
      </body>
    </html>
  );
}
