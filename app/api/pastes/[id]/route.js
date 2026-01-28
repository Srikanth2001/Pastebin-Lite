export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { redis } from "@/lib/redis";
import { nowMs } from "@/lib/time";

export async function GET(req, { params }) {
  const key = `paste:${params.id}`;
  const paste = await redis.get(key);

  if (!paste) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const now = nowMs(req);

  if (paste.ttl_seconds) {
    const exp = paste.created_at + paste.ttl_seconds * 1000;
    if (now >= exp) {
      await redis.del(key);
      return Response.json({ error: "Expired" }, { status: 404 });
    }
  }

  if (paste.max_views && paste.views >= paste.max_views) {
    return Response.json({ error: "View limit exceeded" }, { status: 404 });
  }

  paste.views += 1;
  await redis.set(key, paste);

  return Response.json({
    content: paste.content,
    remaining_views:
      paste.max_views ? paste.max_views - paste.views : null,
    expires_at: paste.ttl_seconds
      ? new Date(paste.created_at + paste.ttl_seconds * 1000).toISOString()
      : null,
  });
}
