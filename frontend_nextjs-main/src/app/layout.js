import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  metadataBase: new URL("https://www.competirti.com"),
  title: "Competir TI",
  description: "Competir TI: Plataforma digital para gerenciar competições, avaliar atletas e acompanhar desempenho em tempo real",
  authors: [
    {
      name: "Competir TI",
    },
  ],
  openGraph: {
    title: "Competir TI: Plataforma de Avaliação de Competidores",
    description: "Gerencia competições, avalia atletas e acompanha desempenho em tempo real",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <QueryProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
