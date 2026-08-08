export default function CourseDetailLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Back Link Skeleton */}
      <div className="h-4 w-32 rounded bg-muted" />

      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-64 rounded-md bg-muted" />
        <div className="h-4 w-40 rounded-md bg-muted" />
      </div>

      {/* Assignments Section Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-7 w-40 rounded bg-muted" />
          <div className="h-9 w-36 rounded-md bg-muted" />
        </div>

        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-5 shadow-sm flex items-start justify-between"
            >
              <div className="space-y-2 flex-1">
                <div className="h-5 w-48 rounded bg-muted" />
                <div className="h-4 w-72 rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>
              <div className="h-6 w-20 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
