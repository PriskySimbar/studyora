export default function CoursesLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-40 rounded-md bg-muted" />
        <div className="h-4 w-60 rounded-md bg-muted" />
      </div>

      {/* Form Skeleton */}
      <div className="max-w-2xl rounded-lg border border-border bg-card p-4 shadow-sm flex gap-3">
        <div className="h-10 flex-1 rounded-md bg-muted" />
        <div className="h-10 w-24 rounded-md bg-muted" />
      </div>

      {/* Course List Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-32 rounded bg-muted" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-5 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-5 w-44 rounded bg-muted" />
                  <div className="h-4 w-32 rounded bg-muted" />
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-16 rounded bg-muted" />
                  <div className="h-8 w-16 rounded bg-muted" />
                  <div className="h-8 w-16 rounded bg-muted" />
                </div>
              </div>
              <div className="h-12 rounded-md bg-muted/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
