import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonUI() {
  return (
    <div className="flex items-center space-x-4 w-full ">
      <Skeleton className="h-12 w-12 bg-gray-300 rounded-full" />
      <div className="space-y-2  w-full  ">
        <Skeleton className="h-4 w-full bg-gray-300 " />
        <Skeleton className="h-4 w-full bg-gray-300 " />
      </div>
    </div>
  )
}
