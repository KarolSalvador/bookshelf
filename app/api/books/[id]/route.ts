import { NextResponse, NextRequest } from "next/server";
import { bookService, bookData } from "@/lib/book-service";

interface RouteContext {
  params: { id: string };
}

export async function GET(request: NextRequest, context: RouteContext) {
  const id = context.params.id;

  try {
    const book = await bookService.getBookById(id);

    if (!book) {
      return NextResponse.json(
        { message: "Livro não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro ao buscar detalhes do livro." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const id = context.params.id;

  try {
    const data = (await request.json()) as Partial<bookData>;

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "Corpo da requisição vazio." },
        { status: 400 }
      );
    }
    const updatedBook = await bookService.updateBook(id, data);

    if (!updatedBook) {
      return NextResponse.json(
        { message: "Livro não encontrado para atualização." },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro ao atualizar livro." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const id = context.params.id;

  try {
    const wasDeleted = await bookService.deleteBook(id);
    if (!wasDeleted) {
      return NextResponse.json(
        { message: "Livro não encontrado para remoção" },
        { status: 404 }
      );
    }

    //status 204 de excluão bem sucedida
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Erro ao remover livro." },
      { status: 500 }
    );
  }
}
