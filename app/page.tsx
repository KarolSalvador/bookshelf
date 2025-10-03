import * as React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo(a) ao BookShelf!</h1>
      <p className="text-lg text-muted-foreground">
        Sua biblioteca pessoal está pronta para ser construída.
      </p>
    </div>
  );
}
