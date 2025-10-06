import { NextResponse } from "next/server";
import { bookService } from "@/lib/book-service";
import { Book } from "@/lib/types";

//contexto para acessar o parâmetro id
// type Context = {
//   params: { id: string };
// };

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const  id = params.id;

  try {
    const book = bookService.getBookById(id);

    if (!book) {
      return NextResponse.json(
        { message: "Livro não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar detalhes do livro." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "Corpo da requisição vazio." },
        { status: 400 }
      );
    }
    const updatedBook = bookService.updateBook(id, data as Partial<Book>);

    if (!updatedBook) {
      return NextResponse.json(
        { message: "Livro não encontrado para atualização." },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar livro." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const wasDeleted = bookService.deleteBook(id);
    if (!wasDeleted) {
      NextResponse.json(
        { message: "Livro não encontrado para remoção" },
        { status: 404 }
      );
    }

    //status 204 de excluão bem sucedida
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao remover livro." },
      { status: 500 }
    );
  }
}
