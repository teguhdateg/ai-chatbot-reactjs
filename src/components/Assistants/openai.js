import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_URL,
  dangerouslyAllowBrowser: true,
});

export class AssistantOpenAI {
    #client;
    #model;
    
    constructor(model = "gpt-4o-mini", client = openai) {
        this.#client = client;
        this.#model= model;
    }

    async chat(content, history) {
        try {
            const result = await this.#client.chat.completions.create({
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

    async *chatStream(content, history) {
        try {
            const result = await this.#client.chat.completions.create({
                model: this.#model,
                messages: [
                    ...history,
                    { role: "user", content: content }
                ],
                stream: true,
            });

            for await (const chunk of result) {
                    yield chunk.choices[0].delta.content||"";
                
            }
        } catch (error) {
            console.error("Stream error:", error);
            throw error;
        }
    }
}