export default function SettingsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-40 rounded-md bg-muted" />
        <div className="h-4 w-56 rounded-md bg-muted" />
      </div>

      {/* Profile Section Skeleton */}
      <div className="max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="h-6 w-24 rounded bg-muted" />
          <div className="h-4 w-44 rounded bg-muted" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="h-10 w-full rounded-md bg-muted" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="h-10 w-full rounded-md bg-muted" />
          </div>
          <div className="h-10 w-32 rounded-md bg-muted" />
        </div>
      </div>

      {/* Account Section Skeleton */}
      <div className="max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="space-y-1">
          <div className="h-6 w-24 rounded bg-muted" />
          <div className="h-4 w-40 rounded bg-muted" />
        </div>
        <div className="h-10 w-24 rounded-md bg-muted" />
      </div>
    </div>
  );
}
