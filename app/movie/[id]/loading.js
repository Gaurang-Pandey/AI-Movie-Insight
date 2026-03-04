export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4 ">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      <p className="text-lg text-gray-300">
        Loading…
      </p>
    </div>
  );
}