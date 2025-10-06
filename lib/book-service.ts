import { initialBooks, initialGenres } from "./data";
import { Book, ReadingStatus } from "./types";

//variável de escopo global para simular o estado do BD
let bookStore: Book[] = [...initialBooks];

//Simular adição de um novo livro
function createBook(bookData: Omit<Book, "id">): Book {
  const newBook: Book = {
    id: Date.now().toString(),
    ...bookData,
    status: bookData.status || ("QUERO_LER" as ReadingStatus),
    currentPage: bookData.currentPage || 0,
  };
  bookStore.push(newBook);
  return newBook;
}

//Simular busca e listagem de todos os livros
function getBooks(): Book[] {
  return [...bookStore];
}

//Simular busca de livro por ID
function getBookById(id: string): Book | undefined {
  return bookStore.find((book) => book.id === id);
}

//Simular atualização de um livro, sobreescrever os campos alterados
function updateBook(
  id: string,
  updatedFields: Partial<Book>
): Book | undefined {
  const index = bookStore.findIndex((book) => book.id === id);
  if (index !== -1) {
    bookStore[index] = { ...bookStore[index], ...updatedFields };
    return bookStore[index];
  }
  return undefined;
}

//Simular remoção do livro, filtrar e remover livro com id correspondente, retornar com o livro removido
function deleteBook(id: string): boolean {
  const initialLength = bookStore.length;
  bookStore = bookStore.filter((book) => book.id !== id);
  return bookStore.length < initialLength;
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
let genreStore: string[] = [...initialGenres, "Realismo Mágico"];

function getGenres(): string[] {
  return [...genreStore].sort();
}

function addGenre(genre: string): string[] {
  const capitalizedGenre =
    genre.charAt(0).toUpperCase() + genre.slice(1).toLocaleLowerCase();
  if (!genreStore.includes(capitalizedGenre)) {
    genreStore.push(capitalizedGenre);
  }
  return getGenres();
}

function deleteGenre(genre: string): boolean {
  const initialLength = genreStore.length;
  genreStore = genreStore.filter((g) => g !== genre);
  return genreStore.length < initialLength;
}

export const genreService = {
  getGenres,
  addGenre,
  deleteGenre,
};
