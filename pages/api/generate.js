export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ result: "Missing OpenAI API Key" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    const result = data.choices?.[0]?.message?.content?.trim();

    if (!result) {
      return res.status(500).json({ result: "OpenAI response was empty." });
    }

    res.status(200).json({ result });
  } catch (error) {
    console.error("Error from OpenAI API:", error);
    res.status(500).json({ result: "Failed to fetch ad. Try again later." });
  }
}
