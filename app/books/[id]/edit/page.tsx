import { notFound } from "next/navigation";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { BookWithGenre, genreService, bookService } from "@/lib/book-service";
import BookForm from "@/components/forms/BookForm";
import { Button } from "@/components/ui/button";

async function fetchGenres() {
  return await genreService.getGenres();
}

async function fetchBook(id: string): Promise<BookWithGenre | null> {
  return await bookService.getBookById(id);
}

export default async function EditBookPage({
  params,
}: {
  params: { id: string };
}) {
  // Busca dos dados no servidor
  const [genres, book] = await Promise.all([
    fetchGenres(),
    fetchBook(params.id),
  ]);

  if (!book) {
    notFound();
  }

  const initialData = book as BookWithGenre;

  return (
    <div className="space-y-6">
      <Button variant="ghost" className="mb-4" asChild>
        <Link href={`/books/${book.id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Detalhes
        </Link>
      </Button>

      <div className="flex items-center space-x-2 pb-4 border-b">
        <Edit className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">
          Editar Livro: {book.title}
        </h1>
      </div>

      <div className="max-w-3xl">
        {/* O formulário recebe o objeto 'book' para pré-preenchimento */}
        <BookForm initialData={initialData} genres={genres} />
      </div>
    </div>
  );
}
