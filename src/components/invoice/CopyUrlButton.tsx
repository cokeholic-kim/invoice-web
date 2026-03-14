"use client";

// URL 복사 버튼 컴포넌트 - 클립보드 복사 기능을 위한 Client Component
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyUrlButtonProps {
  /** 복사할 URL 문자열 */
  url: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

export function CopyUrlButton({ url, className }: CopyUrlButtonProps) {
  // 복사 완료 상태 (체크 아이콘 표시용)
  const [copied, setCopied] = useState(false);

  // TODO: 실제 클립보드 복사 로직 구현 - 현재는 플레이스홀더
  const handleCopy = async () => {
    // TODO: 클립보드 복사 및 토스트 알림 구현
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      // 2초 후 원래 상태로 복원
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // TODO: 복사 실패 시 에러 처리
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={className}
      onClick={handleCopy}
      aria-label={copied ? "URL이 복사되었습니다" : "URL 복사"}
      title={url}
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-green-600" aria-hidden="true" />
          <span className="sr-only">복사됨</span>
        </>
      ) : (
        <>
          <Copy className="size-3.5" aria-hidden="true" />
          <span className="sr-only">URL 복사</span>
        </>
      )}
    </Button>
  );
}
