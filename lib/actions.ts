"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { bookService } from "./book-service";
import { Book } from "./types";

//Cria ou Atualiza um Livro
export async function saveBookAction(
  bookId: string | undefined,
  formData: FormData
) {
  // 1. Extrair dados do FormData
  const data: Partial<Book> = {
    title: formData.get("title") as string,
    author: formData.get("author") as string,
    genre: formData.get("genre") as string,
    year: Number(formData.get("year")),
    pages: Number(formData.get("pages")),
    status: formData.get("status") as Book["status"],
    rating: Number(formData.get("rating")),
    synopsis: formData.get("synopsis") as string,
    cover: formData.get("cover") as string,
    notes: formData.get("notes") as string,
  };

  if (!data.title || !data.author) {
    throw new Error("Título e autor são obrigatórios.");
  }

  let result: Book | undefined;

  if (bookId) {
    // atualiza o livro se tiver
    result = bookService.updateBook(bookId, data);
  } else {
    // se não tiver cria novo livro
    result = bookService.createBook(data as Omit<Book, "id">);
  }

  if (!result) {
    throw new Error(
      "Falha na operação: Livro não encontrado ou erro de serviço."
    );
  }

  // Revalidação e Redirecionamento (Requisito: Revalidação e Redirect pós-ação)
  revalidatePath("/library");
  redirect(`/books/${result.id}`);
}

//Remover um Livro
export async function deleteBookAction(id: string) {
  const wasDeleted = bookService.deleteBook(id);

  if (!wasDeleted) {
    throw new Error("Livro não encontrado para exclusão.");
  }

  //Garante que a listagem seja atualizada
  revalidatePath("/library");

  //Volta para a lista após a exclusão
  redirect("/library");
}
