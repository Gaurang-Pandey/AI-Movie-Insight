"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [id, setid] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!id.startsWith("tt")) {
      alert("Enter Valid Movie ID");
      return;
    }
    router.push(`/movie/${id}`);
  };

  return (
    <main
      className="relative flex min-h-screen justify-center items-center bg-[url('/home_bg.jpg')] bg-cover bg-center bg-fixed text-white px-4"
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative w-full max-w-xl">
        <div
          className="space-y-8 text-center backdrop-blur-lg bg-white/5 border border-white/10 p-10 md:p-14 rounded-3xl shadow-2xl"
        >
          <div className="space-y-3">
            <h1 className="mb-10 text-4xl md:text-5xl font-bold font-serif tracking-tight">
              <u>AudienceLens AI</u>
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Enter an IMDb ID to see what audiences think
            </p>
          </div>

          <div className="space-y-4">
            <input
              value={id}
              placeholder="e.g. tt0133093"
              onChange={(e) => setid(e.target.value)}
              className="w-full border border-white/15 p-4 rounded-xl bg-black/40 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/80 focus:border-transparent transition" // ⭐ upgraded input styling
            />

            <button
              onClick={handleSearch}
              className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all duration-150 shadow-lg" // ⭐ premium button
            >
              Analyze Movie
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}