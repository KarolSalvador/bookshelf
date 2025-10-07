import { Prisma, ReadingStatus, Book as PrismaBook } from "./generated/prisma";
import { prisma } from "./prisma";
import { Book } from "./types";

type bookData = Omit<
  Prisma.BookCreateInput,
  "id" | "createdAt" | "updatedAt" | "genre"
> & {
  genre: string;
  status: ReadingStatus;
};

export type BookWithGenre = PrismaBook & { genre: { name: string } };

//Criação de livro
async function createBook(bookData: bookData): Promise<PrismaBook> {
  const { genre: genreName, ...data } = bookData;

  return prisma.book.create({
    data: {
      ...data,
      genre: {
        connect: { name: genreName },
      },
    },
  });
}

//Simular busca e listagem de todos os livros
async function getBooks(): Promise<BookWithGenre[]> {
  const books = await prisma.book.findMany({
    include: {
      genre: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return books as BookWithGenre[];
}

//Simular busca de livro por ID
async function getBookById(id: string): Promise<BookWithGenre | null> {
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      genre: true,
    },
  });
  return book as BookWithGenre | null;
}

//Simular atualização de um livro, sobreescrever os campos alterados
async function updateBook(
  id: string,
  updatedFields: Partial<Book>
): Promise<PrismaBook | null> {
  const { genre: genreName, ...data } = updatedFields;

  const updateData: Prisma.BookUpdateInput = {
    ...data,
  };

  if (genreName) {
    updateData.genre = {
      connect: { name: genreName },
    };
  }

  try {
    return await prisma.book.update({
      where: { id },
      data: updateData,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return null;
    }
    throw error;
  }
}

//Simular remoção do livro, filtrar e remover livro com id correspondente, retornar com o livro removido
async function deleteBook(id: string): Promise<boolean> {
  try {
    await prisma.book.delete({ where: { id } });
    return true;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return false;
    }
    throw error;
  }
}

//Exporta as funções para uso na API Routes e Server Actions
export const bookService = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};

//Adiciona gênero usado nos dados iniciais

async function getGenres(): Promise<string[]> {
  const genres = await prisma.genre.findMany({
    orderBy: { name: "asc" },
  });
  return genres.map((g) => g.name);
}

async function addGenre(genre: string): Promise<string[]> {
  const capitalizedGenre =
    genre.charAt(0).toUpperCase() + genre.slice(1).toLocaleLowerCase();

  await prisma.genre.upsert({
    where: { name: capitalizedGenre },
    update: {},
    create: { name: capitalizedGenre },
  });

  return getGenres();
}

async function deleteGenre(genre: string): Promise<boolean> {
  try {
    await prisma.genre.delete({ where: { name: genre } });
    return true;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return false;
    }
    throw error;
  }
}

export const genreService = {
  getGenres,
  addGenre,
  deleteGenre,
};
