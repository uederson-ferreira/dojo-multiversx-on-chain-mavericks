"use client";

import { FC } from "react";

interface ResponseCardProps {
  response: string;
}

const ResponseCard: FC<ResponseCardProps> = ({ response }) => {
  if (!response) return null;

  return (
    <div className="w-full max-w-lg mt-6 bg-[#1a1a1a]/80 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-2">Resposta:</h2>
      <p className="text-gray-200 whitespace-pre-wrap">{response}</p>
    </div>
  );
};

export default ResponseCard;
