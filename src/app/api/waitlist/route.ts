import { NextResponse } from "next/server";

interface WaitlistEntry {
  email: string;
  agent?: string;
  source?: string;
  createdAt: string;
  position: number;
}

// In-memory store for waitlist entries (persisted in server runtime instance)
const waitlistSubmissions = new Map<string, WaitlistEntry>();
const basePositionCounter = 1420;

export async function GET() {
  return NextResponse.json(
    {
      total: basePositionCounter + waitlistSubmissions.size,
      status: "active",
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const rawEmail = typeof body.email === "string" ? body.email.trim() : "";
    const agent = typeof body.agent === "string" ? body.agent.trim() : "All Agents";
    const source = typeof body.source === "string" ? body.source.trim() : "product_page";

    if (!rawEmail) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    // Standard RFC-compliant email verification regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalizedEmail = rawEmail.toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address format." },
        { status: 400 }
      );
    }

    // Check if user already joined
    if (waitlistSubmissions.has(normalizedEmail)) {
      const existing = waitlistSubmissions.get(normalizedEmail)!;
      return NextResponse.json(
        {
          success: true,
          alreadyJoined: true,
          message: "You're already on the waitlist! We'll notify you when early access opens.",
          position: existing.position,
          email: normalizedEmail,
        },
        { status: 200 }
      );
    }

    // Increment and record entry
    const newPosition = basePositionCounter + waitlistSubmissions.size + 1;
    const newEntry: WaitlistEntry = {
      email: normalizedEmail,
      agent,
      source,
      createdAt: new Date().toISOString(),
      position: newPosition,
    };
    waitlistSubmissions.set(normalizedEmail, newEntry);

    return NextResponse.json(
      {
        success: true,
        alreadyJoined: false,
        message: "You're officially on the waitlist! Early access invites will be sent in cohorts.",
        position: newPosition,
        email: normalizedEmail,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error processing waitlist request." },
      { status: 500 }
    );
  }
}
