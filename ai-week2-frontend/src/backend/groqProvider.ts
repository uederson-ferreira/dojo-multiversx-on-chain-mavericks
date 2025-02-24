import dotenv from "dotenv";
import { IAProvider } from "./IAProvider";
// Importação do SDK do Groq
import Groq from "groq-sdk";

dotenv.config();

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
if (!GROQ_API_KEY) {
  throw new Error("A API Key do Groq não foi configurada.");
}

export class GroqProvider implements IAProvider {
  async getResponse(prompt: string): Promise<string> {
    // Instancia o cliente do Groq passando a API key
    const groq = new Groq({ apiKey: GROQ_API_KEY });

    // Cria a requisição de chat completions com streaming habilitado.
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });

    let result = "";
    // Itera de forma assíncrona sobre os chunks da resposta
    for await (const chunk of chatCompletion) {
      result += chunk.choices[0]?.delta?.content || "";
    }
    return result.trim();
  }
}
