"use client";

// URL 복사 버튼 컴포넌트 - 클립보드 복사 기능을 위한 Client Component
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CopyUrlButtonProps {
  /** 복사할 URL 문자열 (절대 또는 상대 경로) */
  url: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

export function CopyUrlButton({ url, className }: CopyUrlButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // 상대 경로인 경우 현재 origin을 붙여 절대 URL로 변환
      const absoluteUrl = url.startsWith("http")
        ? url
        : `${window.location.origin}${url}`;
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      toast.success("URL이 클립보드에 복사되었습니다.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("URL 복사에 실패했습니다. 직접 복사해 주세요.");
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
