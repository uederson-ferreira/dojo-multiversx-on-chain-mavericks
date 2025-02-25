"use client";

import { useState } from "react";
import PromptForm from "./components/PromptForm";
import ResponseCard from "./components/ResponseCard";
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
    <main className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-cyan-500">Chatbot com IA</h1>

      <PromptForm
        provider={provider}
        setProvider={setProvider}
        prompt={prompt}
        setPrompt={setPrompt}
        loading={loading}
        onSubmit={handleSubmit}
      />

      <ResponseCard response={response} />
    </main>
  );
}
