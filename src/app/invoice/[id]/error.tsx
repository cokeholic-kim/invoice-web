"use client";

export default function InvoiceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold">오류 발생</h1>
      <p className="mt-4 text-zinc-500">
        견적서를 불러오는 중 문제가 발생했습니다.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-zinc-400">
          오류 코드: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        다시 시도
      </button>
    </div>
  );
}
