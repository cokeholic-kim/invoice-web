import type { z } from "zod";
import type {
  invoiceStatusSchema,
  invoiceItemSchema,
  invoiceSchema,
  invoiceListItemSchema,
  supplierInfoSchema,
} from "@/lib/schemas";

// Zod 스키마에서 타입을 추론하여 단일 소스 유지

/** 견적서 상태 */
export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>;

/** 견적 항목 */
export type InvoiceItem = z.infer<typeof invoiceItemSchema>;

/** 견적서 전체 데이터 */
export type Invoice = z.infer<typeof invoiceSchema>;

/** 목록 조회용 견적서 요약 */
export type InvoiceListItem = z.infer<typeof invoiceListItemSchema>;

/** 공급자 정보 */
export type SupplierInfo = z.infer<typeof supplierInfoSchema>;
