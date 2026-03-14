import Link from "next/link";

export default function InvoiceNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold">견적서를 찾을 수 없습니다</h1>
      <p className="mt-4 text-zinc-500">
        요청하신 견적서가 존재하지 않거나 삭제되었습니다.
      </p>
      <p className="mt-2 text-sm text-zinc-400">
        URL을 다시 확인하시거나 관리자에게 문의해 주세요.
      </p>
      <Link
        href="/"
        className="mt-6 text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
      >
        견적서 목록으로 돌아가기
      </Link>
    </div>
  );
}
