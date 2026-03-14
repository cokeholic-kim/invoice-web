// 견적 항목 테이블 컴포넌트 - 품목명, 수량, 단가, 금액을 테이블 형태로 표시
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { InvoiceItem } from "@/types";

// 금액을 원화 형식으로 포맷 (예: 1500000 → 1,500,000원)
function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

interface InvoiceItemTableProps {
  /** 견적 항목 배열 */
  items: InvoiceItem[];
  /** 추가 CSS 클래스 */
  className?: string;
}

export function InvoiceItemTable({ items, className }: InvoiceItemTableProps) {
  return (
    <div className={className}>
      <h2 className="mb-3 text-base font-semibold">견적 내역</h2>
      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          {/* 테이블 헤더 */}
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-full min-w-[200px] px-4 py-3">
                품목명
              </TableHead>
              <TableHead className="min-w-[80px] px-4 py-3 text-right">
                수량
              </TableHead>
              <TableHead className="min-w-[120px] px-4 py-3 text-right">
                단가
              </TableHead>
              <TableHead className="min-w-[130px] px-4 py-3 text-right">
                금액
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* 테이블 바디 */}
          <TableBody>
            {items.length === 0 ? (
              // 항목이 없을 때 안내 메시지
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-muted-foreground"
                >
                  등록된 견적 항목이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  }
                >
                  {/* 품목명 */}
                  <TableCell className="px-4 py-3 font-medium">
                    {item.name}
                  </TableCell>
                  {/* 수량 */}
                  <TableCell className="px-4 py-3 text-right tabular-nums">
                    {item.quantity.toLocaleString("ko-KR")}
                  </TableCell>
                  {/* 단가 */}
                  <TableCell className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                    {formatKRW(item.unitPrice)}
                  </TableCell>
                  {/* 금액 */}
                  <TableCell className="px-4 py-3 text-right tabular-nums font-medium">
                    {formatKRW(item.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
