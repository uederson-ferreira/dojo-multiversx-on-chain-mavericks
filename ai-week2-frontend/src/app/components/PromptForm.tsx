"use client";

import { FC } from "react";

interface PromptFormProps {
  provider: string;
  setProvider: (value: string) => void;
  prompt: string;
  setPrompt: (value: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const PromptForm: FC<PromptFormProps> = ({
  provider,
  setProvider,
  prompt,
  setPrompt,
  loading,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-lg bg-[#1a1a1a]/80 p-6 rounded-lg shadow-lg"
    >
      <label
        htmlFor="provider"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Selecione o provider:
      </label>
      <select
        id="provider"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        className="w-full p-2 mb-4 bg-[#2c2c2c] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <option value="eliza">Eliza</option>
        <option value="gemini">Gemini</option>
        <option value="groq">Groq</option>
        <option value="ollama">Ollama</option>
      </select>

      <label
        htmlFor="prompt"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Digite seu prompt:
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Digite seu prompt..."
        rows={4}
        className="w-full p-2 mb-4 bg-[#2c2c2c] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 disabled:bg-gray-500 transition-colors"
      >
        {loading ? "Carregando..." : "Enviar"}
      </button>
    </form>
  );
};

export default PromptForm;
