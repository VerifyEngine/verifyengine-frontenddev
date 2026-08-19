"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button, Container } from "@/components/ui/Button";

/** Route-level error boundary for unexpected runtime failures. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfacing here keeps the failure visible in dev tools and in whatever
    // monitoring is wired up later.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <AlertTriangle className="size-7" strokeWidth={1.75} />
      </span>
      <h1 className="mt-6 text-2xl font-bold text-ink-900 sm:text-3xl">Something went wrong</h1>
      <p className="mt-3 max-w-md text-base text-slate-600">
        An unexpected error occurred while loading this page. You can try again, or head back to
        the homepage.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-slate-400">Reference: {error.digest}</p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="dark" onClick={reset}>
          <RotateCcw className="size-4" strokeWidth={2} /> Try again
        </Button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-navy-900/20 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5"
        >
          Back to home
        </Link>
      </div>
    </Container>
  );
}
