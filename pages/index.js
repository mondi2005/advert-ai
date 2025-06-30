import { useState } from "react";

export default function Home() {
  const [businessType, setBusinessType] = useState("");
  const [product, setProduct] = useState("");
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAd = async () => {
    setLoading(true);
    setOutput("");

    const prompt = `Create a social media ad for a ${businessType}.\nProduct/Service: ${product}.\nGoal: ${goal}.\nTone: ${tone}.\nInclude hashtags.`;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setOutput(data.result);
    } catch (error) {
      setOutput("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1 style={{ fontSize: "2em", fontWeight: "bold" }}>AdVert AI</h1>
      <p>Generate creative social media ads instantly.</p>

      <input placeholder="Business type" value={businessType} onChange={(e) => setBusinessType(e.target.value)} />
      <input placeholder="Product or service" value={product} onChange={(e) => setProduct(e.target.value)} />
      <input placeholder="Goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
      <input placeholder="Tone" value={tone} onChange={(e) => setTone(e.target.value)} />

      <button onClick={generateAd} disabled={loading}>
        {loading ? "Generating..." : "Generate Ad"}
      </button>

      {output && <textarea value={output} rows={10} readOnly />}
    </main>
  );
}