"use client";

// PDF 다운로드 버튼 컴포넌트 - Client Component (클릭 이벤트 처리)
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfDownloadButtonProps {
  /** 견적서 번호 (파일명 생성에 사용 예정 - Task 009) */
  invoiceNumber: string;
  /** 클라이언트 이름 (파일명 생성에 사용 예정 - Task 009) */
  clientName: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

export function PdfDownloadButton(props: PdfDownloadButtonProps) {
  const { clientName, className } = props;

  return (
    <Button
      size="default"
      className={className}
      aria-label={`${clientName} 견적서 PDF 다운로드`}
      onClick={() => {
        // TODO: PDF 생성 및 다운로드 로직 구현 (Task 009)
        // props.invoiceNumber와 props.clientName을 활용하여 파일명 생성
        // 예: 견적서_INV_2025_001_주식회사예시클라이언트.pdf
      }}
    >
      <Download className="mr-2 size-4" aria-hidden="true" />
      PDF 다운로드
    </Button>
  );
}
