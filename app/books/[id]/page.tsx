import Image from "next/image";
import { notFound } from "next/navigation";
import { bookService, BookWithGenre } from "@/lib/book-service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, ArrowLeft, BookOpen, Hash } from "lucide-react";
import Link from "next/link";
import { DeleteBookDialog } from "@/components/DeleteBookDialog";

async function getBookDetails(id: string): Promise<BookWithGenre | null> {
  return await bookService.getBookById(id);
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`h-5 w-5 ${
        index < rating
          ? "fill-yellow-500 text-yellow-500"
          : "text-muted-foreground"
      }`}
    />
  ));
};

export default async function BookDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const book = await getBookDetails(params.id);

  if (!book) {
    notFound();
  }

  const totalPages = book.pages ?? 0;
  const pagesRead = book.currentPage ?? 0;

  const readingProgress =
    totalPages > 0 && pagesRead > 0
      ? Math.round((pagesRead / totalPages) * 100)
      : 0;

  const genreName = book.genre?.name || book.genreId;
  const bookRating = book.rating ?? 0;

  return (
    <div className="space-y-8">
      <Button variant="ghost" className="mb-4" asChild>
        <Link href="/library">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Biblioteca
        </Link>
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Coluna 1: Capa e Notas */}
        <div className="md:col-span-1 space-y-6">
          <div className="relative w-full aspect-[2/3] bg-muted shadow-lg rounded-lg overflow-hidden">
            <Image
              src={book.cover || "/placeholder-cover.jpg"}
              alt={`Capa do livro ${book.title}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 50vw, 33vw"
              priority
            />
          </div>

          <div className="mt-4 p-4 border rounded-lg bg-card shadow-sm">
            <h3 className="font-semibold mb-2">Notas Pessoais</h3>
            <p className="text-sm text-muted-foreground italic">
              {book.notes || "Nenhuma nota pessoal registrada."}
            </p>
          </div>
        </div>

        {/* Coluna 2 e 3: Detalhes e Ações */}
        <div className="md:col-span-2 space-y-6">
          {/* Título e Autor */}
          <div className="pb-4 border-b">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground">{book.author}</p>
          </div>

          {/* Sinopse */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Sinopse</h2>
            <p className="text-muted-foreground leading-relaxed">
              {book.synopsis || "Nenhuma sinopse disponível."}
            </p>
          </div>

          {/* Informações e Ações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Informações Detalhadas */}
            <div className="space-y-3">
              <p>
                <strong>Gênero:</strong>{" "}
                <Badge variant="outline">{genreName}</Badge>
              </p>
              <p>
                <strong>Ano:</strong> {book.year}
              </p>
              <div className="flex items-center">
                <strong>Avaliação:</strong>
                <span className="flex ml-2">{renderStars(bookRating)}</span>
              </div>
              <div className="flex items-center">
                <strong>Status:</strong>
                <Badge
                  className="ml-2"
                  variant={book.status === "LENDO" ? "default" : "secondary"}
                >
                  {book.status}
                </Badge>
              </div>

              {book.isbn && (
                <p>
                  <Hash className="inline h-4 w-4 mr-1 text-muted-foreground" />
                  <strong>ISBN:</strong> {book.isbn}
                </p>
              )}
            </div>

            {/* Progresso e Páginas*/}
            <div className="space-y-3 p-4 border rounded-lg bg-secondary/20">
              <h3 className="font-semibold flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Progresso de Leitura
              </h3>
              <p>
                <strong>Páginas Lidas:</strong> {pagesRead} / {totalPages}
              </p>
              <p>
                <strong>Progresso:</strong> {readingProgress}%
              </p>
              {/* BARRA DE PROGRESSO SIMPLES */}
              <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="h-2.5 rounded-full bg-primary"
                  style={{ width: `${readingProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Ações */}
            <div className="md:col-span-2 flex space-x-3 mt-6">
              <Button asChild className="flex-1">
                <Link href={`/books/${book.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Editar Livro
                </Link>
              </Button>
              <div className="flex-1">
                <DeleteBookDialog bookId={book.id} bookTitle={book.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Para lidar com o caso de o livro não ser encontrado e usar o 404
export async function generateMetadata({ params }: { params: { id: string } }) {
  const book = await getBookDetails(params.id);

  if (!book) {
    return {
      title: "Livro não encontrado | BookShelf",
    };
  }

  return {
    title: `${book.title} - Detalhes | BookShelf`,
    description:
      book.synopsis?.substring(0, 150) ||
      `Detalhes sobre o livro ${book.title}.`,
  };
}
