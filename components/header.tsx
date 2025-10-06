// components/header.tsx
import Link from "next/link";
import { BookOpenText } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* LADO ESQUERDO: Logo e Links */}
        <div className="flex items-center space-x-6">
          {/* Logo e Nome da Aplicação */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpenText className="h-6 w-6" />
            <span className="font-bold sm:inline-block">BookShelf</span>
          </Link>

          {/* Links de Navegação Principal */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/library"
              className="transition-colors hover:text-primary"
            >
              Biblioteca
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        {/* LADO DIREITO: Toggle de Tema e Botão */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button variant="secondary" size="sm" asChild>
            <Link href="/books/add">Adicionar Livro</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
