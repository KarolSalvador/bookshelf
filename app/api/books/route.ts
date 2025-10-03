import { bookService } from "@/lib/book-service";
import { Book } from "@/lib/types";
import { NextResponse } from "next/server";

//método GET apra listar todos os livros
export async function GET() {
  try {
    //busca os livros
    const books = bookService.getBooks();

    //retorna lista de livros com status Ok
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    //retorna erro 500 em caso de falha
    return NextResponse.json(
      { message: "Erro ao listar livros" },
      { status: 500 }
    );
  }
}

//método POST para criar novo livro
export async function POST(request: Request) {
  try {
    //recebe requisição e converte para json
    const data = await request.json();

    //valida cmapos obrigatórios
    if (!data.title || !data.author) {
      return NextResponse.json(
        { message: "Título e autor são obrigatórios." },
        { status: 400 }
      );
    }

    //cria novo livro
    const newBook = bookService.createBook(data as Omit<Book, "id">);

    //retorna livro criado com status created
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    //retorna erro 500 em caso de falha
    return NextResponse.json(
      { message: "Erro ao criar novo livro." },
      { status: 500 }
    );
  }
}
