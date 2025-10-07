// app/dashboard/page.tsx
import { Book, CheckCircle, Clock, Hash, TrendingUp } from "lucide-react";
import { bookService } from "@/lib/book-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

// Função para buscar dados (simulando uma chamada de API)
async function getDashboardStats() {
  const books = await bookService.getBooks();

  // 1. Calcular Estatísticas
  const totalBooks = books.length;
  const readingBooks = books.filter((b) => b.status === "LENDO").length;
  const finishedBooks = books.filter((b) => b.status === "LIDO").length;

  // 2. Calcular Páginas Lidas (simulação: se o status é LIDO, conta todas as páginas)
  const totalPagesRead = books
    .filter((b) => b.status === "LIDO")
    .reduce((sum, book) => sum + (book.pages ?? 0), 0);

  return {
    totalBooks,
    readingBooks,
    finishedBooks,
    totalPagesRead,
    books,
  };
}

// Componente para exibir o Card de Estatística
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight pb-4 border-b">
        Dashboard Principal
      </h1>

      {/* Grid de Estatísticas Gerais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Livros Cadastrados"
          value={stats.totalBooks}
          icon={<Hash className="h-4 w-4 text-muted-foreground" />}
          description="Total de títulos na sua biblioteca."
        />
        <StatCard
          title="Livros Sendo Lidos Atualmente"
          value={stats.readingBooks}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          description="Títulos em progresso."
        />
        <StatCard
          title="Livros Já Finalizados"
          value={stats.finishedBooks}
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
          description="Títulos marcados como LIDO."
        />
        <StatCard
          title="Total de Páginas Lidas (LIDO)"
          value={stats.totalPagesRead}
          icon={<Book className="h-4 w-4 text-muted-foreground" />}
          description="Soma de páginas de livros finalizados."
        />
      </div>

      {/* Área para Gráficos e Componentes de Destaque (Serão implementados depois) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Progresso e Tendências</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <TrendingUp className="h-6 w-6 mr-2" /> Área reservada para
              gráficos de progresso.
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Próximas Leituras (Quero Ler)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Lista dos seus próximos livros da lista de desejos.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
