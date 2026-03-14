// 견적서 금액 요약 컴포넌트 - 소계, VAT, 합계 금액을 표시
import type { InvoiceItem } from "@/types";

// 금액을 원화 형식으로 포맷 (예: 1500000 → 1,500,000원)
function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

// VAT 세율 (10%)
const VAT_RATE = 0.1;

interface InvoiceSummaryProps {
  /** 견적 항목 배열 (소계 계산용) */
  items: InvoiceItem[];
  /** 합계 금액 (VAT 포함, 노션에서 읽어온 값) */
  totalAmount: number;
  /** 추가 CSS 클래스 */
  className?: string;
}

export function InvoiceSummary({
  items,
  totalAmount,
  className,
}: InvoiceSummaryProps) {
  // 소계 (VAT 제외) 계산
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  // VAT 금액 계산
  const vatAmount = Math.round(subtotal * VAT_RATE);

  return (
    <div className={className}>
      {/* 금액 요약 테이블 */}
      <div className="flex justify-end">
        <div className="w-full max-w-xs space-y-2">
          {/* 소계 행 */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">소계</span>
            <span className="tabular-nums">{formatKRW(subtotal)}</span>
          </div>

          {/* VAT (10%) 행 */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              부가세{" "}
              <span className="text-xs">
                (VAT {(VAT_RATE * 100).toFixed(0)}%)
              </span>
            </span>
            <span className="tabular-nums">{formatKRW(vatAmount)}</span>
          </div>

          {/* 구분선 */}
          <div className="border-t border-border pt-2">
            {/* 합계 행 */}
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold">합계</span>
              <span className="text-lg font-bold tabular-nums text-primary">
                {formatKRW(totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
