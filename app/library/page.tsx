// app/library/page.tsx
import { BookOpen, PlusCircle } from "lucide-react";
import Link from "next/link";

import { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
import Filters from "@/components/Filters";
import { genreService } from "@/lib/book-service";

interface LibraryPageProps {
  searchParams: {
    q?: string; // Termo de busca por título ou autor
    genre?: string; // Gênero para filtro
  };
}

// Função para buscar dados e aplicar filtros no servidor
async function getFilteredBooks(q?: string, genre?: string): Promise<Book[]> {
  const { bookService } = await import("@/lib/book-service");
  let books = bookService.getBooks();

  //Filtrar por Gênero
  if (genre && genre !== "all") {
    books = books.filter((book) => book.genre === genre);
  }

  // Filtrar por Termo de Busca (Título ou Autor)
  if (q) {
    const query = q.toLowerCase();
    books = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
  }

  return books;
}

// Função para buscar os gêneros disponíveis
async function fetchGenres() {
  const { genreService } = await import("@/lib/book-service");
  return genreService.getGenres();
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  // Data Fetching no Server Component
  const [books, genres] = await Promise.all([
    getFilteredBooks(searchParams.q, searchParams.genre),
    fetchGenres(),
  ]);

  return (
    <div className="space-y-8">
      {/* HEADER DA PÁGINA */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Sua Biblioteca</h1>
        <Button asChild>
          <Link href="/books/add">
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Novo Livro
          </Link>
        </Button>
      </div>

      <Filters genres={genres} />

      {/* lista de livros */}
      {books.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed rounded-lg text-muted-foreground">
          <BookOpen className="mx-auto h-12 w-12 mb-4" />
          <h2 className="text-xl font-semibold">Nenhum livro encontrado</h2>
          <p>Ajuste seus filtros ou adicione um novo livro.</p>
          <Button asChild className="mt-4">
            <Link href="/books/add">Adicionar Livro</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
