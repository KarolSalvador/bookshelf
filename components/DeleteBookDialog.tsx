// components/DeleteBookDialog.tsx
"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteBookAction } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface DeleteBookDialogProps {
  bookId: string;
  bookTitle: string;
  asIcon?: boolean;
}

export function DeleteBookDialog({
  bookId,
  bookTitle,
  asIcon = false,
}: DeleteBookDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteBookAction(bookId);
      // redireciona para library
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      {/* Botão que abre o diálogo */}
      <DialogTrigger asChild>
        {asIcon ? (
          <Button size="icon" variant="ghost" title="Excluir Livro">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        ) : (
          <Button variant="destructive" size="sm" className="w-full">
            <Trash2 className="mr-2 h-4 w-4" /> Excluir Livro
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmação de Exclusão</DialogTitle>
          <DialogDescription className="!text-gray-900 dark:!text-white">
            Tem certeza que deseja excluir o livro **"{bookTitle}"**? Esta ação
            é irreversível.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" disabled={isLoading}>
              Cancelar
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Excluindo..." : "Sim, Excluir Definitivamente"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
