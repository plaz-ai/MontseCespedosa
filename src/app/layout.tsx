import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/content";
import { ModalProvider } from "@/context/ModalContext";
import { ConsultoriaModal } from "@/components/consultoria/ConsultoriaModal";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "hipoteca",
    "broker hipotecario",
    "consultoría hipotecaria",
    "Montse Cespedosa",
    "MC Group",
    "exbanqueros",
    "mejores condiciones hipoteca",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="font-body antialiased">
        <ModalProvider>
          {children}
          <ConsultoriaModal />
        </ModalProvider>
      </body>
    </html>
  );
}
