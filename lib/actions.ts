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
  //Extrair dados do FormData
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
    currentPage: Number(formData.get("currentPage")),
    isbn: formData.get("isbn") as string,
  };

  if (isNaN(data.year as number) || data.year === 0) delete data.year;
  if (isNaN(data.pages as number) || data.pages === 0) delete data.pages;
  if (isNaN(data.rating as number) || data.rating === 0) delete data.rating;

  if (data.notes !== undefined && data.notes.trim() === "") delete data.notes;
  if (!data.isbn || data.isbn.trim() === "") delete data.isbn;

  if (isNaN(data.currentPage as number) || (data.currentPage as number) < 0) {
    delete data.currentPage;
  }

  if (!data.title || !data.author) {
    throw new Error("Título e autor são obrigatórios.");
  }

  let result: Book | undefined;

  if (bookId) {
    result = bookService.updateBook(bookId, data);
  } else {
    result = bookService.createBook(data as Omit<Book, "id">);
  }

  if (!result) {
    throw new Error(
      "Falha na operação: Livro não encontrado ou erro de serviço."
    );
  }

  // Revalida a página de detalhes do livro
  revalidatePath("/library");
  revalidatePath(`/books/${result.id}`);
  revalidatePath(`/books/${result.id}/edit`);

  redirect(`/books/${result.id}`);
}

// Remoção de Livro
export async function deleteBookAction(id: string) {
  const wasDeleted = bookService.deleteBook(id);

  if (!wasDeleted) {
    throw new Error("Livro não encontrado para exclusão.");
  }

  revalidatePath("/library");
  redirect("/library");
}
