import { redis } from "@/lib/redis";

export default async function PastePage({ params }) {
  const paste = await redis.get(`paste:${params.id}`);

  if (!paste) {
    return <h1>404 – Paste not found</h1>;
  }

  return (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {paste.content}
    </pre>
  );
}
