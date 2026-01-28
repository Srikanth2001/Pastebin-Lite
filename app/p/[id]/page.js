import { redis } from "@/lib/redis";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function PastePage({ params }) {
  const raw = await redis.get(`paste:${params.id}`);
const paste = raw ? JSON.parse(raw) : null;
  if (!paste) {
    return <h1>404 – Paste not found</h1>;
  }

  return (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {paste.content}
    </pre>
  );
}
