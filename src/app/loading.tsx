import { LoadingState } from "@/components/ui/Feedback";

/** Route-level loading UI shown while a page segment streams in. */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingState />
    </div>
  );
}
