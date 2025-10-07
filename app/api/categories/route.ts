import { NextResponse } from "next/server";
import { genreService } from "@/lib/book-service";

export async function GET() {
  try {
    //buscar gêneros no serviço
    const genres = await genreService.getGenres();

    //retorna lista dos generos com status 200 (OK)
    return NextResponse.json(genres, { status: 200 });
  } catch (_error) {
    //retorna erro 500 em caso de falha
    return NextResponse.json(
      { message: "Erro ao listar gêneros." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { messagem: "O nome do gênero é obrigatório." },
        { status: 400 }
      );
    }

    const updatedGenres = await genreService.addGenre(name.trim());
    return NextResponse.json(updatedGenres, { status: 201 });
  } catch (_error) {
    NextResponse.json(
      { message: "Erro ao adicionar novo gênero." },
      { status: 500 }
    );
  }
}
