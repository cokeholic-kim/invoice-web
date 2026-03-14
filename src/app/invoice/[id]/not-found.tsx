// 견적서 전용 404 페이지 - 특정 견적서 ID를 찾을 수 없을 때 표시
import Link from "next/link";
import { FileX, LayoutList, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function InvoiceNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
      <Card className="w-full max-w-md border-border shadow-sm">
        <CardContent className="flex flex-col items-center gap-6 pt-10 pb-10 text-center">
          {/* 아이콘 영역 */}
          <div
            className="flex size-20 items-center justify-center rounded-full bg-muted"
            aria-hidden="true"
          >
            <FileX className="size-10 text-muted-foreground" />
          </div>

          {/* 제목 및 안내 메시지 */}
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              견적서 없음
            </p>
            <h1 className="text-2xl font-bold text-foreground">
              견적서를 찾을 수 없습니다
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              요청하신 견적서가 존재하지 않거나 삭제되었습니다.
              <br />
              URL이 올바른지 확인하시거나 관리자에게 문의해 주세요.
            </p>
          </div>

          {/* 액션 버튼 */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            {/* 목록으로 이동 링크 - 버튼 스타일 직접 적용 */}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <LayoutList className="size-4" aria-hidden="true" />
              견적서 목록으로 돌아가기
            </Link>
          </div>

          {/* 관리자 연락 안내 */}
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
            <Mail className="size-3.5 shrink-0" aria-hidden="true" />
            <span>
              올바른 링크가 필요하시면 견적서를 발행한 담당자에게 문의해 주세요.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
