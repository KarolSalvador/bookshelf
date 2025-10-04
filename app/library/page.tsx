import { BookOpen, PlusCircle } from "lucide-react";
import Link from "next/link";

import { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
// import Filters from '@/components/Filters'; // Será adicionado depois

// Função para buscar dados
async function getBooks(): Promise<Book[]> {
  // chama o serviço diretamente, que simula o DB.
  const { bookService } = await import("@/lib/book-service");
  return bookService.getBooks();
}

export default async function LibraryPage() {
  // Data Fetching no Server Component
  const books = await getBooks();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Sua Biblioteca</h1>
        <Button asChild>
          <Link href="/books/add">
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Novo Livro
          </Link>
        </Button>
      </div>

      {/* LISTAGEM DE LIVROS */}
      {books.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed rounded-lg text-muted-foreground">
          <BookOpen className="mx-auto h-12 w-12 mb-4" />
          <h2 className="text-xl font-semibold">Nenhum livro encontrado</h2>
          <p>Comece adicionando seu primeiro livro.</p>
          <Button asChild className="mt-4">
            <Link href="/books/add">Adicionar Livro</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start grid-rows-[auto]">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
