// Enumeração para Status de Leitura
export type ReadingStatus =
  | "QUERO_LER"
  | "LENDO"
  | "LIDO"
  | "PAUSADO"
  | "ABANDONADO";

//Modelo de Livro
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  rating: number;
  synopsis: string;
  cover: string;
  status: ReadingStatus;
  notes?: string;
}

// Modelo de Categoria (Para Gêneros)
export interface Category {
  id: string;
  name: string;
}
