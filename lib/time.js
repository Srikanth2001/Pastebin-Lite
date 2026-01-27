export function nowMs(req) {
  if (process.env.TEST_MODE === "1") {
    const t = req.headers.get("x-test-now-ms");
    if (t) return Number(t);
  }
  return Date.now();
}
