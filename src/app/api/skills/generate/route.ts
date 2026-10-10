import { NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";

// Base system prompt designed for the Skillhouse playground skills
const SYSTEM_PROMPT = `You are Isang AI, the official Skillhouse intelligence assistant.
Your job is to transform, polish, shorten, lengthen, or generate high-leverage agent workflows and professional copy.
Tone: Concise, elegant, direct, clear, highly structured.
Never include unnecessary conversational filler. Deliver output formatted with clean clarity.`;

export async function POST(req: Request) {
  try {
    const { action, input } = await req.json();

    if (!input && action !== "generate") {
      return NextResponse.json({ error: "Input text is required" }, { status: 400 });
    }

    // Determine the instruction based on the action chip
    let promptDirective = "";
    switch (action) {
      case "shorten":
        promptDirective = "Shorten the following text while retaining 100% of the core signal and clarity:\n\n" + input;
        break;
      case "lengthen":
        promptDirective = "Expand the following text with richer depth, persuasive context, and clear structure:\n\n" + input;
        break;
      case "rewrite":
        promptDirective = "Rewrite and polish the following text into punchy, high-impact copy:\n\n" + input;
        break;
      case "generate":
      default:
        promptDirective = input 
          ? "Generate a complete, high-impact workflow based on this prompt: " + input 
          : "Generate a sample high-leverage AI agent workflow specification.";
        break;
    }

    // If an API key is provided, use Anthropic Prompt Caching
    if (process.env.ANTHROPIC_API_KEY) {
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" }, // Anthropic prompt caching enabled
          },
        ],
        messages: [{ role: "user", content: promptDirective }],
      });

      const textBlock = response.content.find((block) => block.type === "text");
      const usage = response.usage as unknown as { cache_read_input_tokens?: number; cache_creation_input_tokens?: number };

      return NextResponse.json({
        result: textBlock ? textBlock.text : "",
        cached: Boolean(usage?.cache_read_input_tokens && usage.cache_read_input_tokens > 0),
        cacheStats: {
          cacheCreationTokens: usage?.cache_creation_input_tokens || 0,
          cacheReadTokens: usage?.cache_read_input_tokens || 0,
        },
      });
    }

    // Fallback Mock with Prompt Caching simulation for dev
    let simulatedResult = "";
    if (action === "shorten") {
      simulatedResult = input.split(" ").slice(0, 15).join(" ") + "... (Shortened signal).";
    } else if (action === "lengthen") {
      simulatedResult = `${input}\n\nExpanded Context: By operationalizing this workflow across agent memory and continuous execution loops, teams reduce turnaround latency by 68% while ensuring zero loss of brand fidelity.`;
    } else if (action === "rewrite") {
      simulatedResult = `Refined: ${input}\n\nStreamlined with active verbs and high-clarity delivery.`;
    } else {
      simulatedResult = `Generated Workflow: Automated Multi-Agent Pipeline\n1. Trigger intake from workspace.\n2. Run deterministic validation check.\n3. Synthesize structured output via Claude 3.5 Sonnet.`;
    }

    return NextResponse.json({
      result: simulatedResult,
      cached: true,
      cacheStats: {
        cacheCreationTokens: 0,
        cacheReadTokens: 142,
      },
      notice: "Mock response (Configure ANTHROPIC_API_KEY in .env.local to query live Anthropic Prompt Caching).",
    });
  } catch (error: unknown) {
    console.error("Playground generation error:", error);
    const errMsg = error instanceof Error ? error.message : "Failed to generate";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
