import { NextResponse } from "next/server";
import { genreService } from "@/lib/book-service";

//contexto para acessar o parâmetro id
type Context = {
  params: { genre: string };
};

export async function DELETE(request: Request, context: Context) {
  const { genre } = context.params;
  //decodificar caso haja espaços
  const decodeGenre = decodeURIComponent(genre);

  try {
    const wasDeleted = await genreService.deleteGenre(decodeGenre);
    if (!wasDeleted) {
      return NextResponse.json(
        { message: `Gênero ${decodeGenre} não encontrado para remoção.` },
        { status: 404 }
      );
    }
    //status 204 de excluão bem sucedida
    return new NextResponse(null, { status: 204 });
  } catch (_error) {
    return NextResponse.json(
      { message: "Erro ao remover gênero." },
      { status: 500 }
    );
  }
}
