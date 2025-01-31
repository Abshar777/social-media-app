import { Skeleton } from "@/components/ui/skeleton"
import { ChatMsgLoading } from "./chatMsgLoading"

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
    <ChatMsgLoading/>

      {/* Right Sidebar */}
      
    </div>
  )
}