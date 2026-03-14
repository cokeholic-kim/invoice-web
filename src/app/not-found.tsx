// 전역 404 페이지 - 존재하지 않는 경로에 접근할 때 표시
import Link from "next/link";
import { SearchX, Home, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
      <Card className="w-full max-w-md border-border shadow-sm">
        <CardContent className="flex flex-col items-center gap-6 pt-10 pb-10 text-center">
          {/* 아이콘 영역 */}
          <div
            className="flex size-20 items-center justify-center rounded-full bg-muted"
            aria-hidden="true"
          >
            <SearchX className="size-10 text-muted-foreground" />
          </div>

          {/* 제목 및 안내 메시지 */}
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              404 Not Found
            </p>
            <h1 className="text-2xl font-bold text-foreground">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              요청하신 페이지가 존재하지 않거나 이동되었습니다.
              <br />
              URL을 다시 확인하시거나 아래 버튼을 이용해 주세요.
            </p>
          </div>

          {/* 액션 버튼 */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            {/* 홈으로 이동 링크 - 버튼 스타일 직접 적용 */}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Home className="size-4" aria-hidden="true" />
              홈으로 돌아가기
            </Link>
          </div>

          {/* 관리자 연락 안내 */}
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
            <Mail className="size-3.5 shrink-0" aria-hidden="true" />
            <span>
              문제가 계속되면 관리자에게 문의해 주세요.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
