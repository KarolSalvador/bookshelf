"use client";

import * as React from "react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { Book, ReadingStatus } from "@/lib/types";
import { saveBookAction } from "@/lib/actions"; // Importa a Server Action
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Progress({ value }: { value: number }) {
  const normalizedValue = Math.min(100, Math.max(0, value));
  return (
    <div className="w-full bg-muted rounded-full h-2.5">
      <div
        className="h-2.5 rounded-full bg-primary transition-all duration-500"
        style={{ width: `${normalizedValue}%` }}
      ></div>
    </div>
  );
}

interface BookFormProps {
  initialData?: Book; // Dados para pré-preenchimento em modo de edição
  genres: string[];
}

// Sub-componente para exibir o estado de envio do formulário
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
        </>
      ) : (
        "Salvar Livro"
      )}
    </Button>
  );
}

export default function BookForm({ initialData, genres }: BookFormProps) {
  // O id é opcional na criação, mas necessário na edição
  const bookId = initialData?.id;

  const [coverUrl, setCoverUrl] = React.useState(initialData?.cover || "");
  const [formData, setFormData] = React.useState<Partial<Book>>(
    initialData || {}
  );
  const [formProgress, setFormProgress] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  // Hook para usar a Server Action com binding do ID
  const boundSaveAction = saveBookAction.bind(null, bookId);

  // Lógica para calcular o progresso do preenchimento
  const calculateProgress = (currentData: Partial<Book>) => {
    // Campos considerados para cálculo de progresso
    const allFields = [
      "title",
      "author",
      "genre",
      "year",
      "pages",
      "status",
      "rating",
      "synopsis",
      "cover",
      "notes",
      "currentPage",
      "isbn",
    ];
    let filledCount = 0;
    const totalFields = allFields.length;

    allFields.forEach((field) => {
      const value = currentData[field as keyof Book];
      if (typeof value === "string" && value.trim() !== "") {
        filledCount++;
      } else if (typeof value === "number" && !isNaN(value) && value !== 0) {
        filledCount++;
      }
    });

    setFormProgress(Math.round((filledCount / totalFields) * 100));
  };

  // Handler genérico para capturar mudanças no formulário
  const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;

    // Adiciona uma verificação para garantir que o elemento tem 'name' e 'value'
    if (!target || !target.name) return;

    const { name, value } = target;

    setFormData((prev) => {
      let newValue: string | number = value;
      // Converte para Number apenas os campos numéricos
      if (["year", "pages", "rating", "currentPage"].includes(name)) {
        // Se for string vazia ou inválida, usa 0 (para cálculo de progresso)
        newValue = Number(value) || 0;
      }

      const updatedData = {
        ...prev,
        [name]: newValue,
      } as Partial<Book>;

      return updatedData;
    });

    // 2. Atualiza o Preview da Capa
    if (name === "cover") {
      setCoverUrl(value);
    }
  };

  // Handler específico para o componente Select
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: value,
      };
      calculateProgress(updatedData);
      return updatedData;
    });
  };

  // Ação que envolve a validação do lado do cliente e o Server Action
  const handleSubmitWrapper = async (formData: FormData) => {
    setError(null);

    // Validação do lado do cliente: Título e Autor obrigatórios
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;

    if (!title.trim() || !author.trim()) {
      setError("Título e Autor são campos obrigatórios.");
      // O formulário não será enviado.
      return;
    }

    try {
      await boundSaveAction(formData);
      // O redirect dentro da action já cuida da navegação.
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Erro desconhecido ao salvar o livro."; // Fallback seguro

      setError(message);
    }
  };

  // Array de opções de status de leitura
  const statusOptions: ReadingStatus[] = [
    "QUERO_LER",
    "LENDO",
    "LIDO",
    "PAUSADO",
    "ABANDONADO",
  ];

  return (
    <form
      action={handleSubmitWrapper}
      className="space-y-6"
      onChange={handleInputChange}
    >
      <div className="space-y-2">
        <Label>Progresso do Formulário</Label>
        <Progress value={formProgress} />
        <p className="text-xs text-muted-foreground">
          {formProgress}% completo
        </p>
      </div>

      {error && (
        <div
          className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-md flex items-center gap-2"
          role="alert"
        >
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="genre">Gênero</Label>
          {/* Componente Select para Gêneros */}
          <Select
            name="genre"
            defaultValue={initialData?.genre}
            onValueChange={(value) => handleSelectChange("genre", value)}
          >
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

        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            name="isbn"
            type="text"
            defaultValue={initialData?.isbn}
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
            onValueChange={(value) => handleSelectChange("status", value)}
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

        <div className="space-y-2">
          <Label htmlFor="currentPage">Página Atual</Label>
          <Input
            id="currentPage"
            name="currentPage"
            type="number"
            defaultValue={initialData?.currentPage || 0}
            min="0"
            max={formData.pages || undefined}
          />
        </div>

        <div className="space-y-2">
          <Label>Progresso Leitura</Label>
          {/* Mostra uma barra de progresso de leitura em tempo real */}
          <Progress
            value={
              formData.pages && formData.currentPage
                ? Math.round((formData.currentPage / formData.pages) * 100)
                : 0
            }
          />
          <p className="text-xs text-muted-foreground">
            {formData.currentPage || 0} de {formData.pages || 0} páginas.
          </p>
        </div>
      </div>

      {/* Sinopse e Capa */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2 md:col-span-2">
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
          <div className="relative w-full aspect-[2/3] bg-muted rounded-md overflow-hidden border mt-4">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt="Preview da Capa"
                fill
                style={{ objectFit: "contain" }}
                sizes="200px"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                Sem Preview
              </div>
            )}
          </div>
        </div>
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
