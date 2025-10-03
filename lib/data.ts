import { Book, ReadingStatus } from "./types";

export const initialGenres: string[] = [
  "Ficção Científica",
  "Fantasia",
  "Romance",
  "Biografia",
  "História",
  "Programação",
  "Psicologia",
  "Filosofia",
];

export const initialBooks: Book[] = [
  {
    id: "b1",
    title: "A Estrada",
    author: "Cormac McCarthy",
    genre: "Ficção Científica",
    year: 2006,
    pages: 300,
    rating: 5,
    synopsis:
      "Um pai e seu filho viajam por uma paisagem pós-apocalíptica, devastada e fria. A jornada é uma luta constante pela sobrevivência e pela preservação da humanidade. [cite: 199]",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/41K%2B6x21LAL._SX324_BO1,204,203,200_.jpg",
    status: "LIDO" as ReadingStatus,
    notes:
      "Um livro sombrio e emocionante sobre esperança em meio ao desespero.",
  },
  {
    id: "b2",
    title: "Código Limpo",
    author: "Robert C. Martin",
    genre: "Programação",
    year: 2008,
    pages: 462,
    rating: 4,
    synopsis:
      "Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com um projeto de desenvolvimento. Este livro é um manual para a escrita de software elegante e eficaz. [cite: 199]",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51r2K4J-i4L._SX331_BO1,204,203,200_.jpg",
    status: "LENDO" as ReadingStatus, // Livro em progresso [cite: 100]
  },
  {
    id: "b3",
    title: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    genre: "Realismo Mágico", // Gênero presente nos requisitos [cite: 153]
    year: 1967,
    pages: 417,
    rating: 5,
    synopsis:
      "A história da família Buendía na aldeia de Macondo, uma obra-prima que mistura fantasia e realidade histórica. [cite: 199]",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51s7I3oPz3L._SX323_BO1,204,203,200_.jpg",
    status: "QUERO_LER" as ReadingStatus, // Livro na lista de desejos [cite: 147]
  },
  {
    id: "b4",
    title: "Sapiens: Uma Breve História da Humanidade",
    author: "Yuval Noah Harari",
    genre: "História",
    year: 2011,
    pages: 498,
    rating: 4,
    synopsis:
      "Uma análise fascinante sobre a história da humanidade, desde a Idade da Pedra até os dias atuais, explorando como o Homo Sapiens conseguiu dominar o planeta. [cite: 199]",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51Z491eKzFL._SX323_BO1,204,203,200_.jpg",
    status: "PAUSADO" as ReadingStatus,
  },
  {
    id: "b5",
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    author: "J.R.R. Tolkien",
    genre: "Fantasia",
    year: 1954,
    pages: 423,
    rating: 5,
    synopsis:
      "O início da épica jornada para destruir o Um Anel, reunindo a Sociedade e enfrentando as forças do mal. [cite: 199]",
    cover:
      "https://images-na.ssl-images-amazon.com/images/I/51gP94lE1VL._SX342_BO1,204,203,200_.jpg",
    status: "LIDO" as ReadingStatus,
  },
];
