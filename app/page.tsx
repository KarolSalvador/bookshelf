import * as React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo(a) ao BookShelf!</h1>
      <p className="text-lg text-muted-foreground mb-4">
        Sua biblioteca pessoal está pronta para ser construída.
      </p>

      <Image
        src="/images/Gemini_Generated_bookshelf.png"
        alt="Ilustração de uma estante de livros para acompanhar leitura"
        width={700}
        height={500}
        priority
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
