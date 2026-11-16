import { describe, it, expect } from "vitest";
import { GET, POST } from "./route";

describe("Waitlist API (/api/waitlist)", () => {
  it("GET returns current waitlist total and active status", async () => {
    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.status).toBe("active");
    expect(typeof data.total).toBe("number");
    expect(data.total).toBeGreaterThanOrEqual(1420);
  });

  it("POST returns 400 when email is missing", async () => {
    const req = new Request("http://localhost:3000/api/waitlist", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toMatch(/email address is required/i);
  });

  it("POST returns 400 when email format is invalid", async () => {
    const req = new Request("http://localhost:3000/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email: "invalid-email" }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toMatch(/valid email address/i);
  });

  it("POST registers new valid email with 201 Created and increments position", async () => {
    const uniqueEmail = `engineer_${Date.now()}@example.com`;
    const req = new Request("http://localhost:3000/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email: uniqueEmail, agent: "Cursor" }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.alreadyJoined).toBe(false);
    expect(data.position).toBeGreaterThanOrEqual(1421);
    expect(data.email).toBe(uniqueEmail.toLowerCase());

    // Second registration of same email returns 200 with alreadyJoined: true
    const repeatReq = new Request("http://localhost:3000/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email: uniqueEmail }),
    });
    const repeatRes = await POST(repeatReq);
    const repeatData = await repeatRes.json();

    expect(repeatRes.status).toBe(200);
    expect(repeatData.alreadyJoined).toBe(true);
    expect(repeatData.position).toBe(data.position);
  });
});
