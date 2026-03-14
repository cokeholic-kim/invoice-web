// 견적서 헤더 컴포넌트 - 견적서 제목, 번호, 발행일, 유효기간, 상태 배지를 표시
import { CalendarDays, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Invoice, InvoiceStatus } from "@/types";

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

// ISO 날짜 문자열을 한국식 날짜 형식으로 변환 (예: 2025-03-01 → 2025년 3월 1일)
function formatKoreanDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface InvoiceHeaderProps {
  /** 견적서 전체 데이터 (제목 대신 invoiceNumber 사용) */
  invoice: Pick<
    Invoice,
    "invoiceNumber" | "clientName" | "issueDate" | "validUntil" | "status"
  >;
  /** 추가 CSS 클래스 */
  className?: string;
}

export function InvoiceHeader({ invoice, className }: InvoiceHeaderProps) {
  const { invoiceNumber, issueDate, validUntil, status } = invoice;

  return (
    <div className={className}>
      {/* 상단 행: 견적서 제목 및 상태 배지 */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-2">
          <FileText
            className="mt-0.5 size-6 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">견적서</h1>
            {/* 견적서 번호 */}
            <p className="text-sm text-muted-foreground">
              No. {invoiceNumber}
            </p>
          </div>
        </div>
        {/* 상태 배지 */}
        <Badge
          variant={getStatusVariant(status)}
          className="w-fit text-sm"
          aria-label={`견적서 상태: ${status}`}
        >
          {status}
        </Badge>
      </div>

      {/* 하단 행: 날짜 정보 */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
          <span>
            <span className="font-medium text-foreground">발행일</span>{" "}
            {formatKoreanDate(issueDate)}
          </span>
        </div>

        {/* 유효기간 (선택 항목) */}
        {validUntil && (
          <div className="flex items-center gap-1.5">
            <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
            <span>
              <span className="font-medium text-foreground">유효기간</span>{" "}
              {formatKoreanDate(validUntil)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
