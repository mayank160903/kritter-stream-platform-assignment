export default function LoadingTrending() {
  return (
    <div className="px-4 md:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 w-40 bg-gray-800 rounded mb-4 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[360px] sm:h-[400px] md:h-[420px] bg-gray-800/60 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}


