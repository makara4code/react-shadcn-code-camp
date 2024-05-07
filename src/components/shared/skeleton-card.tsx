import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col p-4 space-y-3 border rounded-3xl ">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <Skeleton className="h-[150px] w-[350px] rounded-3xl" />
    </div>
  );
}
