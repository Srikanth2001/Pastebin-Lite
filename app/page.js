"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");

  async function createPaste() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    setResult(`${window.location.origin}/p/${data.id}`);
  }

  return (
    <main style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows={10}
        style={{ width: "100%", padding: "10px" }}
        placeholder="Paste your text here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={createPaste}>Create Paste</button>

      {result && (
        <>
          <p>Paste URL:</p>
          <a href={result}>{result}</a>
        </>
      )}
    </main>
  );
}