export const TaskSkeleton = () => {
  return (
    <div className="2xl:w-3/4 xl:w-[80%] sm:w-[95%] mx-auto my-10 animate-pulse space-y-6">
      {/* Parent task & metadata */}
      <div className="h-5 w-32 bg-muted rounded" />
      <div className="flex items-center gap-2">
        <div className="h-8 w-20 bg-muted rounded" />
        <div className="h-8 w-32 bg-muted rounded" />
      </div>

      {/* Title */}
      <div className="h-10 w-full bg-muted rounded" />

      {/* Meta sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-8 w-full bg-muted rounded" />
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-8 w-full bg-muted rounded" />
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-8 w-full bg-muted rounded" />
        </div>
        <div className="space-y-4">
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-8 w-full bg-muted rounded" />
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-8 w-full bg-muted rounded" />
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-8 w-full bg-muted rounded" />
        </div>
      </div>

      {/* Description editor */}
      <div className="h-40 w-full bg-muted rounded" />

      {/* Subtasks section */}
      <div className="space-y-2">
        <div className="h-6 w-1/4 bg-muted rounded" />
        <div className="h-40 w-full bg-muted rounded" />
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        <div className="h-6 w-1/4 bg-muted rounded" />
        <div className="h-40 w-full bg-muted rounded" />
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <div className="h-6 w-1/4 bg-muted rounded" />
        <div className="h-32 w-full bg-muted rounded" />
      </div>
    </div>
  );
};
