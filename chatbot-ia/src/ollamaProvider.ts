import { Ollama } from 'ollama';
import dotenv from 'dotenv';
import { IAProvider } from './IAProvider';

dotenv.config();

// Define o host do servidor Ollama; se não estiver definido no .env, utiliza o padrão localhost:11434
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';

// Cria uma instância do cliente Ollama com o host configurado
const ollamaClient = new Ollama({ host: OLLAMA_HOST });

export class OllamaProvider implements IAProvider {
  async getResponse(prompt: string): Promise<string> {
    try {
      // Realiza uma chamada à API de chat do Ollama
      const response = await ollamaClient.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: prompt }],
        stream: false  // Define false para receber a resposta completa em uma única requisição
      });
      return response.message.content.trim();
    } catch (error) {
      console.error('Erro na requisição ao Ollama:', error);
      throw error;
    }
  }
}