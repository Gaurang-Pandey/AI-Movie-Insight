export async function POST(req) {
  try {
    const { plot } = await req.json();

    const prompt = `
You are a movie critic AI. Based on this movie plot predict audience sentiment_classification.
Return STRICT JSON in this format:
{
  "summary_of_audience_sentiment": "...",
  "sentiment_classification": "positive | mixed | negative"
}

Plot:
${plot}
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
          },
        }),
      },
    );

    const data = await res.json();

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        summary_of_audience_sentiment: cleaned || "AI insight unavailable.",
        sentiment_classification: "mixed",
      };
    }

    return Response.json(parsed);
  } catch (err) {
    console.error("Gemini route error:", err);
    return Response.json({
      summary_of_audience_sentiment: "AI insight unavailable.",
      sentiment_classification: "mixed",
    });
  }
}
