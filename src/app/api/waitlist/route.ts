import { NextResponse } from "next/server";

interface WaitlistEntry {
  email: string;
  source?: string;
  createdAt: string;
  position: number;
}

// In-memory store for waitlist entries (persisted in server runtime instance)
const waitlistSubmissions = new Map<string, WaitlistEntry>();

export async function GET() {
  return NextResponse.json(
    {
      total: waitlistSubmissions.size,
      status: "active",
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const rawEmail = typeof body.email === "string" ? body.email.trim() : "";
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

    // Assign dynamic position based on actual queue entries
    const assignedPosition = waitlistSubmissions.size + 1;
    const entry: WaitlistEntry = {
      email: normalizedEmail,
      source,
      createdAt: new Date().toISOString(),
      position: assignedPosition,
    };

    waitlistSubmissions.set(normalizedEmail, entry);

    return NextResponse.json(
      {
        success: true,
        alreadyJoined: false,
        message: "Successfully joined the early access waitlist!",
        position: assignedPosition,
        email: normalizedEmail,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
