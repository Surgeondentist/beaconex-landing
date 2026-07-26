import type { Metadata } from "next";
import { Big_Shoulders, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.beaconex-solutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Beaconex — Soluciones Tecnológicas",
    template: "%s · Beaconex",
  },
  description:
    "Desarrollo de software, transformación digital, consultoría Shopify, ciberseguridad y automatización con IA para empresas en crecimiento.",
  alternates: {
    canonical: "https://www.beaconex-solutions.com",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.beaconex-solutions.com",
    siteName: "Beaconex",
    title: "Beaconex — Soluciones Tecnológicas",
    description: "Construimos la tecnología que tu negocio necesita.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beaconex — Soluciones Tecnológicas",
    description: "Construimos la tecnología que tu negocio necesita.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bigShoulders.variable} ${instrumentSans.variable} ${geistMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
