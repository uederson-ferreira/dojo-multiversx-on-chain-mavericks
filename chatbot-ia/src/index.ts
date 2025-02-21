import readline from 'readline';
import { GeminiProvider } from './geminiProvider';
import { OllamaProvider } from './ollamaProvider';
import { ElizaProvider } from './elizaProvider';
import { GroqProvider } from './groqProvider';
import { IAProvider } from './IAProvider';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function exibirMenu(): Promise<string> {
  return new Promise((resolve) => {
    console.log('\nSelecione a IA desejada:');
    console.log('1 - Gemini');
    console.log('2 - Ollama');
    console.log('3 - Eliza');
    console.log('4 - Groq');
    rl.question('Opção: ', resolve);
  });
}

async function selecionarProvider(opcao: string): Promise<IAProvider> {
  switch (opcao.trim()) {
    case '1':
      return new GeminiProvider();
    case '2':
      return new OllamaProvider();
    case '3':
      return new ElizaProvider();
    case '4':
      return new GroqProvider();
    default:
      console.log('Opção inválida, utilizando Gemini por padrão.');
      return new GeminiProvider();
  }
}

async function iniciarChat() {
  const opcao = await exibirMenu();
  const provider = await selecionarProvider(opcao);
  console.log('Chatbot iniciado. Digite sua mensagem:');
  
  rl.on('line', async (input: string) => {
    try {
      const resposta = await provider.getResponse(input);
      console.log("Resposta:", resposta);
    } catch (error) {
      console.error("Erro ao obter resposta:", error);
    }
  });
}

iniciarChat();