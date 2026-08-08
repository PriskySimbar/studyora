export default function AssignmentsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-48 rounded-md bg-muted" />
        <div className="h-4 w-64 rounded-md bg-muted" />
      </div>

      {/* Form Skeleton */}
      <div className="max-w-2xl rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-muted" />
          <div className="h-10 w-full rounded-md bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="h-10 w-full rounded-md bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-10 w-full rounded-md bg-muted" />
        </div>
        <div className="h-10 w-36 rounded-md bg-muted" />
      </div>

      {/* Assignments List Skeleton */}
      <div className="max-w-2xl space-y-4">
        <div className="h-6 w-40 rounded bg-muted" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-5 shadow-sm flex items-start justify-between"
            >
              <div className="space-y-2">
                <div className="h-5 w-44 rounded bg-muted" />
                <div className="h-4 w-28 rounded bg-muted" />
                <div className="h-4 w-64 rounded bg-muted" />
              </div>
              <div className="flex gap-2">
                <div className="h-7 w-16 rounded-full bg-muted" />
                <div className="h-7 w-14 rounded bg-muted" />
                <div className="h-7 w-14 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
