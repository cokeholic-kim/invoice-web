// 전역 로딩 페이지 - 견적서 목록 형태의 스켈레톤 UI
export default function Loading() {
  return (
    <div className="space-y-6" aria-label="로딩 중" aria-busy="true">
      {/* 페이지 헤더 스켈레톤 */}
      <div className="space-y-2">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
      </div>

      {/* 테이블 컨테이너 스켈레톤 */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {/* 테이블 헤더 스켈레톤 */}
        <div className="border-b border-border bg-muted/30 px-6 py-3">
          <div className="flex gap-6">
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
            <div className="h-4 w-28 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded bg-muted ml-auto" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          </div>
        </div>

        {/* 테이블 행 스켈레톤 - 5개 행 */}
        <div className="divide-y divide-border">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-6 px-6 py-4"
              aria-hidden="true"
            >
              {/* 견적서 제목 */}
              <div className="flex-1 space-y-1.5">
                <div
                  className="h-4 animate-pulse rounded bg-muted"
                  style={{ width: `${60 + (index % 3) * 15}%` }}
                />
                <div className="h-3 w-32 animate-pulse rounded bg-muted/60" />
              </div>

              {/* 클라이언트명 */}
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />

              {/* 발행일 */}
              <div className="hidden h-4 w-20 animate-pulse rounded bg-muted sm:block" />

              {/* 금액 */}
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />

              {/* 상태 배지 */}
              <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />

              {/* URL 복사 버튼 */}
              <div className="hidden h-8 w-20 animate-pulse rounded-md bg-muted sm:block" />
            </div>
          ))}
        </div>
      </div>

      {/* 총 건수 스켈레톤 */}
      <div className="h-4 w-32 animate-pulse rounded bg-muted" />
    </div>
  );
}
