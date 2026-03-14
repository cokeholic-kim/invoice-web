// 데스크톱용 견적서 목록 테이블 컴포넌트
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

// ISO 날짜 문자열을 한국식 날짜 형식으로 변환
function formatKoreanDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

// 금액을 한국 원화 형식으로 변환
function formatKoreanCurrency(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}

interface InvoiceListTableProps {
  /** 견적서 목록 데이터 배열 */
  invoices: InvoiceListItem[];
  /** 기본 URL (견적서 뷰어 URL 생성용) */
  baseUrl: string;
}

export function InvoiceListTable({ invoices, baseUrl }: InvoiceListTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            {/* 견적서 번호 컬럼 */}
            <TableHead className="w-[140px] font-semibold">견적서 번호</TableHead>
            {/* 클라이언트명 컬럼 */}
            <TableHead className="font-semibold">클라이언트</TableHead>
            {/* 발행일 컬럼 */}
            <TableHead className="w-[120px] font-semibold">발행일</TableHead>
            {/* 금액 컬럼 */}
            <TableHead className="w-[140px] text-right font-semibold">
              금액
            </TableHead>
            {/* 상태 컬럼 */}
            <TableHead className="w-[80px] text-center font-semibold">
              상태
            </TableHead>
            {/* URL 및 액션 컬럼 */}
            <TableHead className="w-[240px] font-semibold">
              공유 URL
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const viewerUrl = `${baseUrl}/invoice/${invoice.id}`;

            return (
              <TableRow
                key={invoice.id}
                className="group hover:bg-muted/30"
              >
                {/* 견적서 번호 */}
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {invoice.invoiceNumber}
                </TableCell>

                {/* 클라이언트명 - 클릭 시 뷰어로 이동 */}
                <TableCell>
                  <Link
                    href={`/invoice/${invoice.id}`}
                    className="font-medium text-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
                    aria-label={`${invoice.clientName} 견적서 보기`}
                  >
                    {invoice.clientName}
                  </Link>
                </TableCell>

                {/* 발행일 */}
                <TableCell className="text-sm text-muted-foreground">
                  {formatKoreanDate(invoice.issueDate)}
                </TableCell>

                {/* 합계 금액 - 우측 정렬 */}
                <TableCell className="text-right font-semibold tabular-nums">
                  {formatKoreanCurrency(invoice.totalAmount)}
                </TableCell>

                {/* 상태 배지 */}
                <TableCell className="text-center">
                  <Badge
                    variant={getStatusVariant(invoice.status)}
                    aria-label={`견적서 상태: ${invoice.status}`}
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>

                {/* 공유 URL 및 복사/열기 버튼 */}
                <TableCell>
                  <div className="flex items-center gap-1">
                    {/* URL 텍스트 */}
                    <span className="min-w-0 flex-1 truncate text-xs font-mono text-muted-foreground">
                      /invoice/{invoice.id}
                    </span>
                    {/* URL 복사 버튼 */}
                    <CopyUrlButton
                      url={viewerUrl}
                      className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {/* 뷰어 열기 링크 버튼 */}
                    <Link
                      href={`/invoice/${invoice.id}`}
                      aria-label={`${invoice.clientName} 견적서 새 탭에서 열기`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100"
                    >
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
