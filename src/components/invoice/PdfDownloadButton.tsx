"use client";

// PDF 다운로드 버튼 컴포넌트 - Client Component (클릭 이벤트 처리)
import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfDownloadButtonProps {
  /** 견적서 번호 (파일명 생성에 사용) */
  invoiceNumber: string;
  /** 클라이언트 이름 (파일명 생성에 사용) */
  clientName: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

export function PdfDownloadButton({
  invoiceNumber,
  clientName,
  className,
}: PdfDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    setIsGenerating(true);
    try {
      // 견적서 문서 영역을 캡처 대상으로 선택
      const element = document.querySelector<HTMLElement>(
        'article[aria-label="견적서 문서"]'
      );
      if (!element) {
        throw new Error("견적서 영역을 찾을 수 없습니다.");
      }

      // 동적 임포트로 번들 사이즈 최적화
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      // html2canvas로 견적서 영역을 캡처
      const canvas = await html2canvas(element, {
        scale: 2, // 고해상도 캡처
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // A4 사이즈 PDF 생성
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // 이미지 비율 유지하며 PDF에 맞춤
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;

      // 페이지에 맞게 이미지 배치
      const marginX = (pdfWidth - scaledWidth) / 2;

      // 콘텐츠가 한 페이지를 초과할 경우 여러 페이지로 분할
      const pageContentHeight = pdfHeight - 10; // 상하 여백 5mm
      const totalPages = Math.ceil(scaledHeight / pageContentHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }
        const yOffset = -(page * pageContentHeight) + 5; // 5mm 상단 여백
        pdf.addImage(imgData, "PNG", marginX, yOffset, scaledWidth, scaledHeight);
      }

      // 파일명 생성: 견적서_INV_2025_001_클라이언트명.pdf
      const safeClientName = clientName.replace(/[/\\?%*:|"<>]/g, "");
      const fileName = `견적서_${invoiceNumber}_${safeClientName}.pdf`;

      pdf.save(fileName);
    } catch (error) {
      console.error("PDF 생성 실패:", error);
      alert("PDF 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Button
      size="default"
      className={className}
      aria-label={`${clientName} 견적서 PDF 다운로드`}
      onClick={handleDownload}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Download className="mr-2 size-4" aria-hidden="true" />
      )}
      {isGenerating ? "생성 중..." : "PDF 다운로드"}
    </Button>
  );
}
