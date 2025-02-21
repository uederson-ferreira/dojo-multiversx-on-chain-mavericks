# Chatbot IA com TypeScript

Este projeto implementa um chatbot simples utilizando TypeScript com suporte para múltiplos provedores de IA:

- **Gemini:** Integração com a API do Google Generative Language.
- **Groq:** Integração com o SDK do Groq para respostas em streaming.
- **Ollama:** Integração com o SDK do Ollama para gerar respostas de chat.

## 🚀 Recursos

- **Seletor de IA:** Escolha o provedor de IA a ser utilizado via interface de linha de comando.
- **Integração com múltiplos provedores:** Implementações específicas para Gemini, Groq e Ollama.
- **Streaming de respostas:** Suporte para streaming de respostas (Groq e, opcionalmente, Ollama).

## 📂 Estrutura do Projeto

```plaintext
chatbot-ia/
│── .env                  # Variáveis de ambiente (API keys, host, etc.)
│── .gitignore            # Arquivos e pastas ignorados pelo Git (node_modules, dist, .env, etc.)
│── package.json          # Configurações e dependências do NPM
│── tsconfig.json         # Configurações do TypeScript
│── README.md             # Este arquivo
│
└── src/                  # Código-fonte do projeto
    │── index.ts          # Arquivo principal que inicia o chatbot e exibe o menu
    │── IAProvider.ts     # Interface comum para os provedores de IA
    │── geminiProvider.ts # Implementação do provedor Gemini
    │── groqProvider.ts   # Implementação do provedor Groq
    └── ollamaProvider.ts # Implementação do provedor Ollama

## 🛠️ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- NPM (geralmente instalado com o Node.js)
- **Para o Ollama:**  
  Certifique-se de que o servidor Ollama esteja instalado e em execução.  
  O servidor padrão roda em: `http://127.0.0.1:11434`.

## 📥 Instalação

### 1️⃣ Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd chatbot-ia
2️⃣ Instale as dependências:
npm install
3️⃣ Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

# Gemini: API Key obtida na plataforma do Google
GEMINI_API_KEY=your_gemini_api_key_here

# Groq: API Key obtida na plataforma do Groq
GROQ_API_KEY=your_groq_api_key_here

# Ollama: Endereço do servidor Ollama (padrão: http://127.0.0.1:11434)
OLLAMA_HOST=http://127.0.0.1:11434
▶️ Executando o Projeto

Para rodar o chatbot, execute:

npx ts-node src/index.ts
Após iniciar, você verá um menu como este:

Selecione a IA desejada:
1 - Gemini
2 - Ollama
3 - Eliza
4 - Groq
Opção:
Escolha um número e pressione Enter para testar o chatbot.

🔎 Detalhes dos Provedores

🔹 Gemini
Descrição: API do Google Generative Language.
Endpoint:
https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=<GEMINI_API_KEY>
Configuração:
Defina a chave de API no .env como GEMINI_API_KEY.
🔹 Groq
Descrição: API do Groq para geração de respostas em streaming.
Endpoint:
https://api.groq.com/openai/v1/chat/completions
Configuração:
Defina a chave de API no .env como GROQ_API_KEY.
🔹 Ollama
Descrição: Utiliza o SDK do Ollama para chat.
Modelo Padrão: llama3.1
Se o modelo não for encontrado:
Execute ollama pull llama3.1 para baixar o modelo.
Ou altere o nome do modelo em src/ollamaProvider.ts.
Configuração:
O host é configurado via OLLAMA_HOST no .env.
⚠️ Problemas Comuns e Soluções

❌ Erro: model 'llama3.1' not found
Solução: Execute o comando abaixo para baixar o modelo:

ollama pull llama3.1
Ou altere o nome do modelo em src/ollamaProvider.ts.

❌ Erro: ECONNREFUSED (Conexão recusada)
Solução:

Verifique se o servidor Ollama está rodando (http://127.0.0.1:11434).
Confirme a variável OLLAMA_HOST no .env.
🔧 Comandos Úteis

Instalar dependências:
npm install
Executar o projeto:
npx ts-node src/index.ts
📜 Licença

Este projeto está licenciado sob a MIT License.

🙌 Agradecimentos

Projeto desenvolvido como parte do desafio "IA com TypeScript".

A equipe **MultiversX Dojo** é composta pelos seguintes membros:

| Nome | GitHub |
|------|--------|
| Uederson Ferreira | [@uederson-ferreira](https://github.com/uederson-ferreira) |
| Luciano Zanin | [@usuario2](https://github.com/usuario2) |
| Kelvin Tanita | [@usuario3](https://github.com/usuario3) |
