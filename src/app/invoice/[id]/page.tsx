// 견적서 뷰어 페이지 - 특정 견적서의 전체 내용을 표시하는 Server Component
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InvoiceHeader,
  InvoiceItemTable,
  InvoiceSummary,
  SupplierInfoCard,
  PdfDownloadButton,
} from "@/components/invoice";
import { mockInvoice, mockSupplierInfo } from "@/lib/mock-data";

interface InvoicePageProps {
  params: Promise<{ id: string }>;
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: InvoicePageProps): Promise<Metadata> {
  const { id } = await params;
  // TODO: 노션 API 연동 후 실제 데이터로 교체
  if (id === mockInvoice.id) {
    return {
      title: `견적서 ${mockInvoice.invoiceNumber} | invoice-web`,
      description: `${mockInvoice.clientName} 견적서`,
    };
  }
  return {
    title: "견적서 | invoice-web",
  };
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { id } = await params;

  // TODO: 노션 API 연동 후 실제 데이터 페칭으로 교체
  // 현재는 더미 데이터에서 해당 ID의 견적서를 찾음
  const invoice = id === mockInvoice.id ? mockInvoice : null;

  // 견적서를 찾을 수 없으면 not-found 페이지로 이동
  if (!invoice) {
    notFound();
  }

  const supplier = mockSupplierInfo;

  return (
    <>
      {/* 인쇄 시 숨길 액션 영역 */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        {/* 견적서 번호 및 클라이언트명 요약 */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="size-4 shrink-0" aria-hidden="true" />
          <span>
            <span className="font-medium text-foreground">
              {invoice.invoiceNumber}
            </span>
            {" · "}
            {invoice.clientName}
          </span>
        </div>

        {/* PDF 다운로드 버튼 */}
        <PdfDownloadButton
          invoiceNumber={invoice.invoiceNumber}
          clientName={invoice.clientName}
        />
      </div>

      {/* 견적서 문서 영역 */}
      <article
        className="space-y-6 rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8 print:border-0 print:shadow-none print:p-0"
        aria-label="견적서 문서"
      >
        {/* 1. 견적서 헤더 - 제목, 번호, 발행일, 유효기간, 상태 배지 */}
        <InvoiceHeader
          invoice={{
            invoiceNumber: invoice.invoiceNumber,
            clientName: invoice.clientName,
            issueDate: invoice.issueDate,
            validUntil: invoice.validUntil,
            status: invoice.status,
          }}
        />

        {/* 구분선 */}
        <hr className="border-border" />

        {/* 2. 공급자 및 수신자 정보 카드 */}
        <SupplierInfoCard
          supplier={supplier}
          clientName={invoice.clientName}
          aria-label="공급자 및 수신자 정보"
        />

        {/* 구분선 */}
        <hr className="border-border" />

        {/* 3. 견적 항목 테이블 */}
        <InvoiceItemTable items={invoice.items} />

        {/* 4. 소계 / VAT / 합계 금액 요약 */}
        <InvoiceSummary
          items={invoice.items}
          totalAmount={invoice.totalAmount}
        />

        {/* 5. 비고/메모 섹션 */}
        {invoice.notes && (
          <>
            <hr className="border-border" />
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  비고
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* 줄바꿈 문자를 보존하여 비고 내용 출력 */}
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                  {invoice.notes}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </article>

      {/* 인쇄용 하단 여백 */}
      <div className="mt-6 hidden print:block print:mt-8">
        <p className="text-xs text-muted-foreground text-center">
          본 견적서는 {supplier.name}이(가) 발행하였습니다. 문의: {supplier.email}
        </p>
      </div>

      {/* 인쇄 최적화 스타일 */}
      <style>{`
        @media print {
          /* 불필요한 레이아웃 요소 숨기기 */
          header,
          footer,
          nav {
            display: none !important;
          }

          /* 본문 여백 제거 */
          body {
            padding: 0;
            margin: 0;
          }

          /* 견적서 문서 전체 페이지 사용 */
          main {
            padding: 0;
            max-width: 100%;
          }

          /* 페이지 나눔 방지 */
          article {
            page-break-inside: avoid;
          }

          /* 테이블 행 페이지 나눔 방지 */
          tr {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </>
  );
}
