import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

// Metadata (informações básicas do app)
export const metadata: Metadata = {
  title: "BookShelf",
  description: "Gerenciamento de biblioteca pessoal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ThemeProvider configurações de Dark Mode */}
        <ThemeProvider
          attribute="class" // Adiciona 'dark' ou 'light' à tag <html>
          defaultTheme="system" // Padrão: Seguir a preferência do sistema
          enableSystem
          disableTransitionOnChange // Previne o "flash" inicial (FOUC)
        >
          <Header />

          {/* O container garante que o conteúdo central fique alinhado */}
          <main className="container py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
