import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0B3E33",
};

export const metadata: Metadata = {
  title: "KUSA — L'Infrastructure de Paiement des Entreprises Africaines",
  description: "L'agrégateur de paiement unifié pour l'Afrique subsaharienne (12 pays). Encaissez par Mobile Money (Orange, MTN, Wave, Moov, Airtel) et Cartes bancaires avec une API moderne et des Liens de Paiement No-Code.",
  keywords: ["paiement afrique", "mobile money api", "orange money", "mtn momo", "wave cote d'ivoire", "fintech cemac uemoa", "kusa paiement"],
  icons: {
    icon: [
      { url: "/images/kusa-logo-icon.png", sizes: "any", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/images/kusa-logo-icon.png",
    apple: "/images/kusa-logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8F9FA] text-[#0D1B2A] antialiased selection:bg-[#D4AF37]/30 selection:text-[#0D1B2A] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
