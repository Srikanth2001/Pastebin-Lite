export const runtime = "nodejs";
export const dynamic = "force-dynamic";


import { redis } from "@/lib/redis";
import crypto from "crypto";

export async function POST(req) {
  const body = await req.json().catch(() => null);

  if (!body?.content || typeof body.content !== "string") {
    return Response.json({ error: "Invalid content" }, { status: 400 });
  }

  if (body.ttl_seconds && body.ttl_seconds < 1) {
    return Response.json({ error: "Invalid ttl_seconds" }, { status: 400 });
  }

  if (body.max_views && body.max_views < 1) {
    return Response.json({ error: "Invalid max_views" }, { status: 400 });
  }

  const id = crypto.randomBytes(6).toString("hex");

  await redis.set(`paste:${id}`, {
    content: body.content,
    created_at: Date.now(),
    ttl_seconds: body.ttl_seconds ?? null,
    max_views: body.max_views ?? null,
    views: 0,
  });

  return Response.json({
    id,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${id}`,
  });
}
