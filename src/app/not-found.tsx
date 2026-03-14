import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-zinc-500">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="mt-6 text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
