// 견적서 뷰어 로딩 페이지 - 견적서 문서 형태의 스켈레톤 UI
export default function InvoiceLoading() {
  return (
    <div className="space-y-6" aria-label="견적서 로딩 중" aria-busy="true">
      {/* 상단 액션 바 스켈레톤 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-48 animate-pulse rounded bg-muted" />
        </div>
        {/* PDF 다운로드 버튼 스켈레톤 */}
        <div className="h-9 w-36 animate-pulse rounded-md bg-muted" />
      </div>

      {/* 견적서 문서 본문 스켈레톤 */}
      <div
        className="space-y-6 rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8"
        aria-hidden="true"
      >
        {/* 1. 견적서 헤더 스켈레톤 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            {/* 견적서 제목 */}
            <div className="h-7 w-64 animate-pulse rounded bg-muted" />
            {/* 견적서 번호 */}
            <div className="h-4 w-40 animate-pulse rounded bg-muted/70" />
          </div>
          {/* 상태 배지 */}
          <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
        </div>

        {/* 발행일 / 유효기간 행 */}
        <div className="flex flex-wrap gap-4">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-4 w-36 animate-pulse rounded bg-muted" />
        </div>

        {/* 구분선 */}
        <hr className="border-border" />

        {/* 2. 공급자 및 수신자 정보 스켈레톤 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* 공급자 카드 */}
          <div className="rounded-lg border border-border p-4 space-y-2">
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-5 w-32 animate-pulse rounded bg-muted" />
            <div className="h-4 w-40 animate-pulse rounded bg-muted/70" />
            <div className="h-4 w-36 animate-pulse rounded bg-muted/70" />
          </div>
          {/* 수신자 카드 */}
          <div className="rounded-lg border border-border p-4 space-y-2">
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-5 w-28 animate-pulse rounded bg-muted" />
            <div className="h-4 w-36 animate-pulse rounded bg-muted/70" />
          </div>
        </div>

        {/* 구분선 */}
        <hr className="border-border" />

        {/* 3. 견적 항목 테이블 스켈레톤 */}
        <div className="space-y-3">
          {/* 테이블 헤더 */}
          <div className="flex gap-4 border-b border-border pb-2">
            <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
          {/* 테이블 행 3개 */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 py-1">
              <div
                className="h-4 flex-1 animate-pulse rounded bg-muted/70"
                style={{ width: `${50 + (index % 2) * 20}%` }}
              />
              <div className="h-4 w-16 animate-pulse rounded bg-muted/70" />
              <div className="h-4 w-20 animate-pulse rounded bg-muted/70" />
              <div className="h-4 w-20 animate-pulse rounded bg-muted/70" />
            </div>
          ))}
        </div>

        {/* 4. 합계 금액 스켈레톤 */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex w-full max-w-xs items-center justify-between gap-4">
            <div className="h-4 w-16 animate-pulse rounded bg-muted/70" />
            <div className="h-4 w-24 animate-pulse rounded bg-muted/70" />
          </div>
          <div className="flex w-full max-w-xs items-center justify-between gap-4">
            <div className="h-4 w-16 animate-pulse rounded bg-muted/70" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted/70" />
          </div>
          {/* 합계 강조 행 */}
          <div className="mt-1 flex w-full max-w-xs items-center justify-between gap-4 border-t border-border pt-2">
            <div className="h-5 w-12 animate-pulse rounded bg-muted" />
            <div className="h-6 w-32 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
