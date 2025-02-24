"use client";

import { useState } from "react";

export default function Home() {
  const [provider, setProvider] = useState("eliza");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ provider, prompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setResponse(data.response);
      } else {
        setResponse(data.error || "Erro ao buscar resposta.");
      }
    } catch (error) {
      console.error(error);
      setResponse("Erro ao buscar resposta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Chat com AI</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <label htmlFor="provider" className="block text-lg font-medium mb-2">
          Selecione o provider:
        </label>
        <select
          id="provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="eliza">Eliza</option>
          <option value="gemini">Gemini</option>
          <option value="groq">Groq</option>
          <option value="ollama">Ollama</option>
        </select>

        <label htmlFor="prompt" className="block text-lg font-medium mb-2">
          Digite seu prompt:
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Digite seu prompt..."
          rows={4}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Carregando..." : "Enviar"}
        </button>
      </form>

      {response && (
        <div className="mt-6 bg-white shadow rounded p-4 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Resposta:</h2>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
