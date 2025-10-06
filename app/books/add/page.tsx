// app/books/add/page.tsx
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";

import BookForm from "@/components/forms/BookForm";
import { Button } from "@/components/ui/button";
import { genreService } from "@/lib/book-service";

// Função para buscar os gêneros no servidor (usando o serviço diretamente)
async function fetchGenres() {
  return genreService.getGenres();
}

export default async function AddBookPage() {
  // busca os gêneros disponíveis no lado do servidor
  const genres = await fetchGenres();

  return (
    <div className="space-y-6">
      <Button variant="ghost" className="mb-4" asChild>
        <Link href="/library">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Biblioteca
        </Link>
      </Button>

      <div className="flex items-center space-x-2 pb-4 border-b">
        <PlusCircle className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">
          Adicionar Novo Livro
        </h1>
      </div>

      <div className="max-w-3xl">
        <BookForm genres={genres} />
      </div>
    </div>
  );
}
