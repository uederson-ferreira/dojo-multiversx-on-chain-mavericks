import { NextRequest, NextResponse } from "next/server";
import { ElizaProvider } from "@/backend/elizaProvider";
import { GeminiProvider } from "@/backend/geminiProvider";
import { GroqProvider } from "@/backend/groqProvider";
import { OllamaProvider } from "@/backend/ollamaProvider";

export async function POST(request: NextRequest) {
  try {
    const { provider, prompt } = (await request.json()) as {
      provider?: string;
      prompt: string;
    };

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt não informado" },
        { status: 400 }
      );
    }

    let responseText: string;

    switch (provider) {
      case "eliza":
        responseText = await new ElizaProvider().getResponse(prompt);
        break;
      case "gemini":
        responseText = await new GeminiProvider().getResponse(prompt);
        break;
      case "groq":
        responseText = await new GroqProvider().getResponse(prompt);
        break;
      case "ollama":
        responseText = await new OllamaProvider().getResponse(prompt);
        break;
      default:
        // Se provider não for especificado ou for desconhecido, usa o Eliza como padrão
        responseText = await new ElizaProvider().getResponse(prompt);
        break;
    }

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Erro na rota /api/ia:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
