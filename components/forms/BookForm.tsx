"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { Book, ReadingStatus } from "@/lib/types";
import { saveBookAction } from "@/lib/actions"; // Importa a Server Action
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookFormProps {
  initialData?: Book; // Dados para pré-preenchimento em modo de edição
  genres: string[];
}

// Sub-componente para exibir o estado de envio do formulário
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : "Salvar Livro"}
    </Button>
  );
}

export default function BookForm({ initialData, genres }: BookFormProps) {
  // O id é opcional na criação, mas necessário na edição
  const bookId = initialData?.id;

  // Usa .bind(null, bookId) para passar o ID do livro (se existir) como primeiro argumento
  const boundSaveAction = saveBookAction.bind(null, bookId);

  // Array de opções de status de leitura
  const statusOptions: ReadingStatus[] = [
    "QUERO_LER",
    "LENDO",
    "LIDO",
    "PAUSADO",
    "ABANDONADO",
  ];

  return (
    <form action={boundSaveAction} className="space-y-6">
      {/* Título e Autor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={initialData?.title}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Autor *</Label>
          <Input
            id="author"
            name="author"
            required
            defaultValue={initialData?.author}
          />
        </div>
      </div>

      {/* Gênero e Ano */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="genre">Gênero</Label>
          {/* Componente Select para Gêneros */}
          <Select name="genre" defaultValue={initialData?.genre}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um gênero" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Ano de Publicação</Label>
          <Input
            id="year"
            name="year"
            type="number"
            defaultValue={initialData?.year || new Date().getFullYear()}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pages">Total de Páginas</Label>
          <Input
            id="pages"
            name="pages"
            type="number"
            defaultValue={initialData?.pages}
          />
        </div>
      </div>

      {/* Status e Avaliação */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status de Leitura</Label>
          {/* Componente Select para Status */}
          <Select
            name="status"
            defaultValue={initialData?.status || "QUERO_LER"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rating">Avaliação (1-5)</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            defaultValue={initialData?.rating}
          />
        </div>
      </div>

      {/* Sinopse e Capa */}
      <div className="space-y-2">
        <Label htmlFor="synopsis">Sinopse</Label>
        <Textarea
          id="synopsis"
          name="synopsis"
          rows={4}
          defaultValue={initialData?.synopsis}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cover">URL da Capa</Label>
        <Input
          id="cover"
          name="cover"
          type="url"
          defaultValue={initialData?.cover}
        />
      </div>

      {/* Notas */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notas Pessoais</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={initialData?.notes}
        />
      </div>

      {/* Botão de Envio (usa o hook useFormStatus) */}
      <SubmitButton />
    </form>
  );
}
