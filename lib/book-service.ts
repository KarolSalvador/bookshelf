import { initialBooks, initialGenres } from "./data";
import { Book, ReadingStatus } from "./types";

const globalState = global as typeof global & {
  bookStore?: Book[];
  genreStore?: string[];
};

if (!globalState.bookStore) {
  globalState.bookStore = [...initialBooks];
}
// A variável local 'bookStore' agora referencia o array persistente
let bookStore: Book[] = globalState.bookStore;

// A mesma lógica para genres
if (!globalState.genreStore) {
  globalState.genreStore = [...initialGenres, "Realismo Mágico"];
}
let genreStore: string[] = globalState.genreStore;

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
  globalState.bookStore = bookStore;
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
  globalState.genreStore = genreStore;
  return genreStore.length < initialLength;
}

export const genreService = {
  getGenres,
  addGenre,
  deleteGenre,
};
