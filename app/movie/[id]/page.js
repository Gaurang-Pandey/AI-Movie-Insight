import Link from "next/link";

async function getMovie(id) {
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_KEY}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return { Response: "False" };
    }

    return res.json();
  } catch (e) {
    return { Response: "False" };
  }
}

async function aicall(plot) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`;

    const res = await fetch(`${baseUrl}/api/sentiment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plot }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("AI API failed:", await res.text());
      return {
        summary_of_audience_sentiment: "AI insight unavailable.",
        sentiment_classification: "mixed",
      };
    }

    const data=res.json();
    return data;
  } catch (e) {
    console.error("AI call error:", e);
    return {
      summary_of_audience_sentiment: "AI insight unavailable.",
      sentiment_classification: "mixed",
    };
  }
}

export default async function MovieDetails({ params }) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (movie.Response === "False") {
    return (
      <div className="p-10 text-white bg-black min-h-screen">
        Movie Not Found
      </div>
    );
  }

  const sentiment = await aicall(movie.Plot);

  const sentimentColor =
    sentiment.sentiment_classification === "positive"
      ? "text-green-500"
      : sentiment.sentiment_classification === "negative"
        ? "text-red-500"
        : "text-yellow-500";

  return (
    <div className="p-6 md:p-10 text-white min-h-screen bg-[url('/insight_bg.jpg')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-black/80 -z-10" />

      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-black/70 backdrop-blur hover:bg-white/20 transition"
      >
        ← Back to Home
      </Link>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img
            className="w-full h-full object-cover"
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
            alt={movie.Title}
          />
        </div>

        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {movie.Title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-white">
            <span className="bg-white/10 px-3 py-1 rounded-lg">
              Year: {movie.Year}
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-lg">
              IMDb ⭐ {movie.imdbRating}
            </span>
          </div>

          <p className="text-white">
            <b>Cast:</b> {movie.Actors}
          </p>

          <div>
            <h2 className="text-xl font-semibold mt-6 mb-2">Plot</h2>{" "}
            <p className="text-white leading-relaxed">
              {" "}
              {movie.Plot}
            </p>
          </div>

          <div className="mt-8 p-5 bg-white/5 backdrop-blur border border-white/10 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-3">Audience Insight</h2>

            <p className="text-white/80 leading-relaxed">
              {sentiment.summary_of_audience_sentiment}
            </p>

            <div className="mt-4">
              <span className="text-sm text-white">Overall Sentiment:</span>{" "}
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-white/10 ${sentimentColor}`}
              >
                {sentiment.sentiment_classification}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
