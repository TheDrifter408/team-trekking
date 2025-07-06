// components/skeletons/ListSkeleton.tsx
export const ListSkeleton = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      {/* PageHeader skeleton */}
      <div className="px-[20px] pt-6">
        <div className="h-8 w-40 bg-muted rounded mb-2 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* FilterSection skeleton */}
      <div className="mt-4 px-[20px]">
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
      </div>

      {/* ListCard + Table skeleton */}
      <div className="flex-1 min-h-0 flex flex-col px-[20px] mt-[40px] pb-[40px] flex-shrink-0 w-full overflow-hidden space-y-4">
        <div className="h-32 w-full bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-12 w-full bg-muted rounded animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* TabActionBar placeholder */}
      <div className="h-[60px] bg-muted/30 border-t border-border" />
    </div>
  );
};
