import { Skeleton } from '../components/ui/skeleton';
export const ListSkeleton = () => {
  return (
    <div className="space-y-2 items-center h-[70vh] w-[256px] p-1 pt-1.5">
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
