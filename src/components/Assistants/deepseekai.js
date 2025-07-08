// deepseekai.js
import OpenAI from "openai";
import { AssistantOpenAI } from "./openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: import.meta.env.VITE_DEEPSEEK_AI_API_URL,
  dangerouslyAllowBrowser: true,
});

export class Assistant extends AssistantOpenAI {
  constructor(model = "deepseek-chat", client = openai) {
    super(model, client);
  }
}

//note: 402 payment required error is returned when the model is not available or the API key is invalid
