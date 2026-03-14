// 공급자 정보 카드 컴포넌트 - 공급자(발행인)와 수신자(클라이언트) 정보를 나란히 표시
import { MapPin, Mail, Phone, Building2, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SupplierInfo } from "@/types";

interface SupplierInfoCardProps {
  /** 공급자(발행인) 정보 */
  supplier: SupplierInfo;
  /** 수신자(클라이언트) 이름 */
  clientName: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

export function SupplierInfoCard({
  supplier,
  clientName,
  className,
}: SupplierInfoCardProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${className ?? ""}`}
    >
      {/* 공급자(발행인) 정보 카드 */}
      <Card>
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <Building2 className="size-4" aria-hidden="true" />
            공급자 (발행인)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 space-y-2">
          {/* 공급자 이름 */}
          <p className="font-semibold text-base">{supplier.name}</p>

          {/* 이메일 */}
          {supplier.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="size-3.5 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${supplier.email}`}
                className="hover:text-foreground transition-colors"
                aria-label={`이메일: ${supplier.email}`}
              >
                {supplier.email}
              </a>
            </div>
          )}

          {/* 전화번호 */}
          {supplier.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-3.5 shrink-0" aria-hidden="true" />
              <a
                href={`tel:${supplier.phone}`}
                className="hover:text-foreground transition-colors"
                aria-label={`전화번호: ${supplier.phone}`}
              >
                {supplier.phone}
              </a>
            </div>
          )}

          {/* 주소 */}
          {supplier.address && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin
                className="size-3.5 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <address className="not-italic">{supplier.address}</address>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 수신자(클라이언트) 정보 카드 */}
      <Card>
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            <User className="size-4" aria-hidden="true" />
            수신자 (클라이언트)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          {/* 클라이언트 이름 */}
          <p className="font-semibold text-base">{clientName}</p>
          {/* TODO: 클라이언트 상세 정보 (이메일, 주소 등) 노션 연동 후 추가 */}
        </CardContent>
      </Card>
    </div>
  );
}
