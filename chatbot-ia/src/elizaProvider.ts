import { IAProvider } from './IAProvider';

export class ElizaProvider implements IAProvider {
  async getResponse(prompt: string): Promise<string> {
    // Lógica simplificada para simular uma resposta do Eliza
    return Promise.resolve(`Eliza diz: "Interessante, conte-me mais sobre ${prompt}"`);
  }
}