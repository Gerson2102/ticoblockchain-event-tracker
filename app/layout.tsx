import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TicoBlockchain En Vivo",
  description: "Evento blockchain en vivo — Costa Rica",
};

export const viewport: Viewport = {
  themeColor: "#fbf9f5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ touchAction: "manipulation" }}
    >
      <head>
        {/* Material Symbols icon font. Loaded here because App Router
            root layout is the correct place for external fonts, and
            Tailwind v4 reorders CSS @imports in ways that break external
            font-face imports in globals.css. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-sans">
        <a href="#main" className="skip-link">
          Ir al contenido principal
        </a>
        <NavBar />
        <div className="flex-1 flex flex-col pt-[64px]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
