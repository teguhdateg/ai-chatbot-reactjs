import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_URL,
  dangerouslyAllowBrowser: true,
});

export class AssistantOpenAI {
    #model;
    
    constructor(model = "gpt-4o-mini") {
        this.#model= model;
    }

    async chat(content, history) {
        try {
            const result = await openai.chat.completions.create({
                model: this.#model,
                messages: [
                    ...history,
                    { role: "user", content: content }
                ],
            });
            return result.choices[0].message.content;
        } catch (error) {
            // Optionally handle error here
        }
    }
}