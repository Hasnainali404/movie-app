const MovieCardSkeleton = () => (
  <div className="flex-none w-44 md:w-56 h-64 md:h-80 bg-zinc-800 rounded-md animate-pulse">
    <div className="w-full h-full bg-linear-to-t from-zinc-900/80 to-transparent" />
  </div>
);

export const MovieRowSkeleton = () => (
  <div className="py-8 px-4 md:px-12 space-y-4">
    <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse" />
    <div className="flex gap-4 overflow-hidden">
      {[1, 2, 3, 4, 5, 6].map(i => <MovieCardSkeleton key={i} />)}
    </div>
  </div>
);