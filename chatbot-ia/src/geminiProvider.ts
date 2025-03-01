import axios from 'axios';
import dotenv from 'dotenv';
import { IAProvider } from './IAProvider';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("A API Key do Gemini não foi configurada.");
}

// Atualize com o endpoint correto utilizando a API key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export class GeminiProvider implements IAProvider {
  async getResponse(prompt: string): Promise<string> {
    try {
      const payload = {
        contents: [{
          parts: [{ text: prompt }]
        }]
      };

      const headers = {
        'Content-Type': 'application/json'
      };

      const { data } = await axios.post(GEMINI_API_URL, payload, { headers });

      let responseText = "";
      if (data && data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          responseText = candidate.content.parts[0].text.trim();
        }
      } else {
        responseText = JSON.stringify(data);
      }

      return responseText;
    } catch (error) {
      console.error('Erro na requisição ao Gemini:', error);
      throw error;
    }
  }
}
