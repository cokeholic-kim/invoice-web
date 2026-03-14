"use client";

// 견적서 전용 에러 페이지 - 견적서 로드 실패 시 표시
// Next.js Error Boundary: "use client" 필수
import { useState } from "react";
import Link from "next/link";
import { FileWarning, LayoutList, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface InvoiceErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function InvoiceError({ error, reset }: InvoiceErrorProps) {
  // 에러 상세 정보 접힘/펼침 상태
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
      <Card className="w-full max-w-md border-destructive/20 shadow-sm">
        <CardContent className="flex flex-col items-center gap-6 pt-10 pb-10 text-center">
          {/* 경고 아이콘 영역 */}
          <div
            className="flex size-20 items-center justify-center rounded-full bg-destructive/10"
            aria-hidden="true"
          >
            <FileWarning className="size-10 text-destructive" />
          </div>

          {/* 제목 및 안내 메시지 */}
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-destructive">
              견적서 로드 실패
            </p>
            <h1 className="text-2xl font-bold text-foreground">
              견적서를 불러올 수 없습니다
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {error.message
                ? error.message
                : "견적서 데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."}
            </p>
          </div>

          {/* 액션 버튼 영역 */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            {/* 다시 시도 버튼 - reset 함수 호출 */}
            <Button
              onClick={() => reset()}
              className="gap-2"
              aria-label="견적서 다시 불러오기"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              다시 시도
            </Button>

            {/* 목록으로 이동 링크 - 버튼 스타일 직접 적용 */}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <LayoutList className="size-4" aria-hidden="true" />
              목록으로 돌아가기
            </Link>
          </div>

          {/* 에러 코드/디버깅 정보 - 접을 수 있는 상세 영역 */}
          {(error.digest || error.message) && (
            <div className="w-full">
              <button
                type="button"
                onClick={() => setIsDetailsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-muted/50 transition-colors"
                aria-expanded={isDetailsOpen}
                aria-controls="invoice-error-details"
              >
                <span>오류 상세 정보</span>
                {isDetailsOpen ? (
                  <ChevronUp className="size-3.5" aria-hidden="true" />
                ) : (
                  <ChevronDown className="size-3.5" aria-hidden="true" />
                )}
              </button>

              {/* 상세 정보 패널 */}
              {isDetailsOpen && (
                <div
                  id="invoice-error-details"
                  className="mt-1 rounded-md bg-muted/50 px-3 py-3 text-left"
                >
                  {error.digest && (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">오류 코드:</span>{" "}
                      <code className="font-mono">{error.digest}</code>
                    </p>
                  )}
                  {error.message && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className="font-medium">메시지:</span>{" "}
                      <code className="font-mono break-all">{error.message}</code>
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
