// 모바일용 견적서 목록 카드 컴포넌트 - 각 견적서를 카드 형태로 표시
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyUrlButton } from "./CopyUrlButton";
import type { InvoiceListItem, InvoiceStatus } from "@/types";

// 견적서 상태에 따른 배지 variant 매핑
function getStatusVariant(
  status: InvoiceStatus
): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case "발행":
      return "default";
    case "완료":
      return "secondary";
    case "초안":
      return "outline";
    default:
      return "outline";
  }
}

// ISO 날짜 문자열을 한국식 날짜 형식으로 변환 (예: 2025-03-01 → 2025. 3. 1.)
function formatKoreanDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

// 금액을 한국 원화 형식으로 변환 (예: 7500000 → ₩7,500,000)
function formatKoreanCurrency(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}

interface InvoiceListCardProps {
  /** 견적서 목록 아이템 데이터 */
  invoice: InvoiceListItem;
  /** 견적서 뷰어 URL */
  viewerUrl: string;
}

export function InvoiceListCard({ invoice, viewerUrl }: InvoiceListCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          {/* 좌측: 견적서 정보 */}
          <div className="min-w-0 flex-1 space-y-1.5">
            {/* 견적서 번호 및 상태 배지 */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">
                {invoice.invoiceNumber}
              </span>
              <Badge
                variant={getStatusVariant(invoice.status)}
                aria-label={`견적서 상태: ${invoice.status}`}
              >
                {invoice.status}
              </Badge>
            </div>

            {/* 클라이언트명 */}
            <p className="text-sm font-semibold text-foreground truncate">
              {invoice.clientName}
            </p>

            {/* 발행일 */}
            <p className="text-xs text-muted-foreground">
              발행일: {formatKoreanDate(invoice.issueDate)}
            </p>

            {/* 합계 금액 */}
            <p className="text-base font-bold text-foreground">
              {formatKoreanCurrency(invoice.totalAmount)}
            </p>
          </div>

          {/* 우측: 액션 버튼 영역 */}
          <div className="flex shrink-0 flex-col items-end gap-1">
            {/* 뷰어 페이지로 이동 링크 버튼 */}
            <Link
              href={viewerUrl}
              aria-label={`${invoice.clientName} 견적서 열기`}
              className="inline-flex h-7 items-center gap-1 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
              열기
            </Link>
          </div>
        </div>

        {/* URL 영역 */}
        <div className="mt-3 flex items-center gap-1 rounded-md bg-muted/50 px-2 py-1.5">
          <span className="min-w-0 flex-1 truncate text-xs font-mono text-muted-foreground">
            /invoice/{invoice.id}
          </span>
          <CopyUrlButton url={viewerUrl} className="shrink-0 h-6 w-6 p-0" />
        </div>
      </CardContent>
    </Card>
  );
}
