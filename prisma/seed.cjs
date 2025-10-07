const { PrismaClient } = require("../lib/generated/prisma");
const seedData = require("./seed-data.cjs");

const initialBooks = seedData.initialBooks;
const initialGenres = seedData.initialGenres;

const prisma = new PrismaClient();

// Função que contém a lógica de seeding
async function main() {
  console.log(`Iniciando o seeding...`);

  let uniqueGenres = new Set(initialGenres);

  initialBooks.forEach((book) => {
    uniqueGenres.add(book.genre);
  });

  const allGenres = Array.from(uniqueGenres).sort();

  if (!allGenres || allGenres.length === 0) {
    throw new Error("Erro de dados: A lista de gêneros não pode ser vazia.");
  }

  for (const name of allGenres) {
    // Insere o gênero no banco
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log(`Seeding de ${allGenres.length} gêneros concluído.`);

  // ===================================
  // 2. Livros
  for (const book of initialBooks) {
    // Desestrutura o objeto para separar 'id', 'genre', e pega o restante em 'restData'
    const { id, genre, ...restData } = book;

    const upsertedBook = await prisma.book.upsert({
      where: { id: id },
      update: {
        //Espalha APENAS os dados que não são 'id' ou 'genre'
        ...restData,
        // Conecta ao gênero pelo nome
        genre: { connect: { name: genre } },
        // Garante que campos opcionais sejam tratados como Int
        year: restData.year || 0,
        pages: restData.pages || 0,
        rating: restData.rating || 0,
        currentPage: restData.currentPage || 0,
      },
      create: {
        //Define o ID explicitamente (para preservar o ID original)
        id: id,
        //Espalha o restante dos dados
        ...restData,
        // Conecta ao gênero pelo nome
        genre: { connect: { name: genre } },
        // Garante valores padrão
        currentPage: restData.currentPage || 0,
      },
    });
    console.log(
      `Livro migrado (ID: ${upsertedBook.id}): ${upsertedBook.title}`
    );
  }

  console.log(`Seeding de ${initialBooks.length} livros concluído.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
