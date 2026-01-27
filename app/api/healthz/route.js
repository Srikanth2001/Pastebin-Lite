import { redis } from "@/lib/redis";

export async function GET() {
  try {
    await redis.set("healthz", "ok");
    const value = await redis.get("healthz");

    return new Response(
      JSON.stringify({ ok: value === "ok" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Health check failed:", err);
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


