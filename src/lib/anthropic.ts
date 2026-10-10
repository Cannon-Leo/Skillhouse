import Anthropic from "@anthropic-ai/sdk";

// Initialize Anthropic client with the prompt caching beta header.
// To use prompt caching, pass `cache_control: { type: "ephemeral" }` 
// on large blocks of text or system messages.
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
  defaultHeaders: {
    "anthropic-beta": "prompt-caching-2024-07-31"
  }
});

// Example helper function demonstrating how to cache a system prompt
export async function generateWithCache(systemPrompt: string, userMessage: string) {
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: [
      {
        type: "text",
        text: systemPrompt,
        cache_control: { type: "ephemeral" } // Caches the system prompt
      }
    ],
    messages: [
      { role: "user", content: userMessage }
    ]
  });
  return msg.content;
}
