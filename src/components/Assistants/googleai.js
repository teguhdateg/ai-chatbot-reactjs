import { GoogleGenerativeAI } from "@google/generative-ai"; 

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOGGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const chat = model.startChat({ history: [] });

export class AssistantGoogleAI {
    #chat;
  constructor() {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    this.#chat = model.startChat({ history: [] });
  }

  async chat(content) {
    try {
      const result = await this.#chat.sendMessage(content);
      return result.response.text();
    } catch (error) {
      console.error(error);
      throw new Error("Error processing request with Google AI Assistant");
    }
  }
}