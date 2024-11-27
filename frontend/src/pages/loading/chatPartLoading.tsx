import { Skeleton } from "@/components/ui/skeleton"

export default function ChatLoading() {
  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Sidebar */}
      <div className="w-[300px] border-r border-zinc-800 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        <div className="flex-1 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-zinc-800 p-4 flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-zinc-800">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>

      {/* Right Sidebar */}
      
    </div>
  )
}