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

  async *chatStream(content) {
    try {
      const result = await this.#chat.sendMessageStream(content);

      for await (const chunk of result.stream) {
        const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          yield text;
        }
      }
    } catch (error) {
      console.error("Stream error:", error);
      throw error;
    }
  }
}
