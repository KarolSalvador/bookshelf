// components/BookCard.tsx
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteBookDialog } from "./DeleteBookDialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BookCardProps {
  book: Book;
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`h-4 w-4 ${
        index < rating
          ? "fill-yellow-500 text-yellow-500"
          : "text-muted-foreground"
      }`}
    />
  ));
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg p-0">
      <CardHeader className="p-0 relative aspect-[3/3] bg-muted">
        {/*capa do livro*/}
        <div className="w-full h-auto flex-shrink-0">
          <Image
            src={book.cover || "/placeholder-cover.jpg"}
            alt={`Capa do livro ${book.title}`}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            priority={false}
          />
        </div>
        {/* Status de Leitura */}
        {book.status === "LENDO" && (
          <Badge
            className="absolute top-2 right-2 text-xs font-semibold bg-red-500"
            variant="default"
          >
            {book.status}
          </Badge>
        )}
        {book.status === "LIDO" && (
          <Badge
            className="absolute top-2 right-2 text-xs font-semibold bg-green-500"
            variant="secondary"
          >
            {book.status}
          </Badge>
        )}
        {book.status === "QUERO_LER" && (
          <Badge
            className="absolute top-2 right-2 text-xs font-semibold bg-blue-500"
            variant="secondary"
          >
            {book.status}
          </Badge>
        )}

        
      </CardHeader>

      <CardContent className="p-2 flex-grow space-y-1">
        {/* Título e Autor*/}
        <CardTitle className="text-lg leading-snug line-clamp-2">
          {book.title}
        </CardTitle>
        <CardDescription className="text-sm">
          {book.author} ({book.year})
        </CardDescription>

        {/* Avaliação e Gênero*/}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1">
            {renderStars(book.rating)}
          </div>
          <Badge variant="outline" className="text-xs">
            {book.genre}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-1 flex justify-between border-t bg-muted/20">
        {/* Botões para Visualizar, Editar e Excluir*/}
        <Button size="icon" variant="ghost" asChild title="Visualizar Detalhes">
          <Link href={`/books/${book.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
        <Button size="icon" variant="ghost" asChild title="Editar Livro">
          <Link href={`/books/${book.id}/edit`}>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <DeleteBookDialog
            bookId={book.id}
            bookTitle={book.title}
            asIcon={true}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
