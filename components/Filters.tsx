"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  genres: string[];
}

export default function Filters({ genres }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Estados locais para input de busca
  const [searchTerm, setSearchTerm] = React.useState(
    searchParams.get("q") || ""
  );
  const currentGenre = searchParams.get("genre") || "all";

  // 2. Manipula a mudança de gênero
  const handleGenreChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      newParams.delete("genre");
    } else {
      newParams.set("genre", value);
    }

    // Atualiza a URL sem recarregar a página (Navegação otimista)
    router.push(`${pathname}?${newParams.toString()}`);
  };

  // 3. Submissão da busca (gerenciada por um formulário)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      newParams.set("q", searchTerm.trim());
    } else {
      newParams.delete("q");
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center p-4 border rounded-lg bg-card shadow-sm">
      {/* Filtro de Gênero */}
      <div className="w-full sm:w-auto">
        <Select value={currentGenre} onValueChange={handleGenreChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por Gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Gêneros</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Busca por Título/Autor */}
      <form onSubmit={handleSearchSubmit} className="flex flex-1 w-full gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por título ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Buscar</Button>
      </form>

      {/* Botão de Limpar Filtros */}
      {(searchParams.get("q") || searchParams.get("genre")) && (
        <Button
          variant="outline"
          onClick={() => router.push(pathname)}
          className="w-full sm:w-auto"
        >
          Limpar Filtros
        </Button>
      )}
    </div>
  );
}
