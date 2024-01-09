import { Skeleton } from '../components/ui/skeleton';
export const ListSkeleton = () => {
  return (
    <div className="flex flex-col items-center h-[400px] w-full gap-y-2 p-1 pt-1.5">
      <Skeleton className="h-9 w-full rounded-md bg-slate-700" />
      <Skeleton className="h-9 w-full rounded-md bg-slate-700" />
      <Skeleton className="h-9 w-full rounded-md bg-slate-700" />
      <Skeleton className="h-9 w-full rounded-md bg-slate-700" />
      <Skeleton className="h-9 w-full rounded-md bg-slate-700" />
      <Skeleton className="h-9 w-full rounded-md bg-slate-700" />
      <Skeleton className="h-9 w-full rounded-md bg-slate-700" />
      <Skeleton className="h-9 w-full rounded-md bg-slate-700" />
      <Skeleton className="h-9 w-full rounded-md bg-slate-700" />
    </div>
  );
};
