import { z } from "zod";

// ─────────────────────────────────────────────
// 견적서 상태
// ─────────────────────────────────────────────
export const invoiceStatusSchema = z.enum(["초안", "발행", "승인", "완료"]);

// ─────────────────────────────────────────────
// 견적 항목 (InvoiceItem)
// ─────────────────────────────────────────────
export const invoiceItemSchema = z.object({
  /** 항목 고유 식별자 (노션 페이지 ID) */
  id: z.string().min(1),
  /** 품목명/서비스명 */
  name: z.string().min(1),
  /** 수량 */
  quantity: z.number().positive(),
  /** 단가 */
  unitPrice: z.number().nonnegative(),
  /** 금액 (수량 × 단가) */
  amount: z.number().nonnegative(),
});

// ─────────────────────────────────────────────
// 견적서 (Invoice)
// ─────────────────────────────────────────────
export const invoiceSchema = z.object({
  /** 노션 페이지 ID — URL 파라미터로 사용 */
  id: z.string().min(1),
  /** 견적서 번호 (예: INV_2025_001) */
  invoiceNumber: z.string().min(1),
  /** 수신 클라이언트명 */
  clientName: z.string().min(1),
  /** 발행일 (ISO 8601 날짜 문자열) */
  issueDate: z.string(),
  /** 유효기간 (ISO 8601 날짜 문자열, 선택) */
  validUntil: z.string().optional(),
  /** 견적서 상태 */
  status: invoiceStatusSchema,
  /** 견적 항목 목록 */
  items: z.array(invoiceItemSchema),
  /** 합계 금액 */
  totalAmount: z.number().nonnegative(),
  /** 비고/메모 (선택) */
  notes: z.string().optional().default(""),
});

// ─────────────────────────────────────────────
// 목록용 요약 견적서 (InvoiceListItem)
// ─────────────────────────────────────────────
export const invoiceListItemSchema = z.object({
  id: z.string().min(1),
  invoiceNumber: z.string().min(1),
  clientName: z.string().min(1),
  issueDate: z.string(),
  totalAmount: z.number().nonnegative(),
  status: invoiceStatusSchema,
});

// ─────────────────────────────────────────────
// 공급자 정보 (SupplierInfo)
// ─────────────────────────────────────────────
export const supplierInfoSchema = z.object({
  /** 공급자(나) 이름/상호 */
  name: z.string().min(1),
  /** 연락처 이메일 */
  email: z.string().email(),
  /** 연락처 전화번호 */
  phone: z.string().min(1),
  /** 주소 */
  address: z.string().min(1),
});
