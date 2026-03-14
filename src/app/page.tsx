// 견적서 목록 페이지 - 관리자용 대시보드, 발행된 견적서 목록을 표시하는 Server Component
import type { Metadata } from "next";
import { headers } from "next/headers";
import { FileText, ArrowUpDown } from "lucide-react";
import { InvoiceListTable } from "@/components/invoice/InvoiceListTable";
import { InvoiceListCard } from "@/components/invoice/InvoiceListCard";
import { mockInvoiceList } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "견적서 관리 | invoice-web",
  description: "발행된 견적서 목록을 확인하고 공유 URL을 복사하세요.",
};

export default async function Home() {
  // TODO: 노션 API 연동 후 실제 데이터 페칭으로 교체
  // 현재는 더미 데이터 사용, 최신순(발행일 내림차순) 정렬
  const invoices = [...mockInvoiceList].sort(
    (a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
  );

  // 요청 헤더에서 호스트 정보를 가져와 절대 URL 구성
  // TODO: 환경변수(NEXT_PUBLIC_BASE_URL)로 대체 권장
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 영역 */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileText
              className="size-6 text-muted-foreground"
              aria-hidden="true"
            />
            <h1 className="text-2xl font-bold tracking-tight">견적서 관리</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            발행된 견적서 목록을 확인하고 클라이언트에게 공유할 URL을
            복사하세요.
          </p>
        </div>

        {/* 총 건수 뱃지 */}
        <div
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm"
          aria-label={`전체 견적서 ${invoices.length}건`}
        >
          <span className="text-muted-foreground">전체</span>
          <span className="font-semibold text-foreground">{invoices.length}건</span>
        </div>
      </div>

      {/* 정렬 기준 안내 */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <ArrowUpDown className="size-3.5" aria-hidden="true" />
        <span>발행일 최신순 정렬</span>
      </div>

      {/* 데스크톱: 테이블 형태 (md 이상) */}
      {invoices.length > 0 ? (
        <>
          <div className="hidden md:block" aria-label="견적서 목록 테이블">
            <InvoiceListTable invoices={invoices} baseUrl={baseUrl} />
          </div>

          {/* 모바일: 카드 형태 (md 미만) */}
          <div
            className="flex flex-col gap-3 md:hidden"
            aria-label="견적서 목록"
          >
            {invoices.map((invoice) => {
              const viewerUrl = `${baseUrl}/invoice/${invoice.id}`;
              return (
                <InvoiceListCard
                  key={invoice.id}
                  invoice={invoice}
                  viewerUrl={viewerUrl}
                />
              );
            })}
          </div>
        </>
      ) : (
        /* 데이터 없음 상태 */
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <FileText
            className="mb-3 size-10 text-muted-foreground/50"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-muted-foreground">
            발행된 견적서가 없습니다.
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            노션 데이터베이스에 견적서를 추가하면 여기에 표시됩니다.
          </p>
        </div>
      )}
    </div>
  );
}
