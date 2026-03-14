import type { Invoice, InvoiceListItem, SupplierInfo } from "@/types";

// ─────────────────────────────────────────────
// 공급자 정보 더미 데이터
// ─────────────────────────────────────────────

export const mockSupplierInfo: SupplierInfo = {
  name: "홍길동 개발소",
  email: "contact@gildong.dev",
  phone: "010-1234-5678",
  address: "서울특별시 마포구 월드컵북로 400",
};

// ─────────────────────────────────────────────
// 견적서 전체 데이터 더미
// ─────────────────────────────────────────────

export const mockInvoice: Invoice = {
  id: "mock-invoice-001",
  invoiceNumber: "INV_2025_001",
  clientName: "주식회사 예시클라이언트",
  issueDate: "2025-03-01",
  validUntil: "2025-03-31",
  status: "발행",
  items: [
    {
      id: "item-001",
      name: "웹 애플리케이션 기획 및 설계",
      quantity: 1,
      unitPrice: 1500000,
      amount: 1500000,
    },
    {
      id: "item-002",
      name: "프론트엔드 UI/UX 개발",
      quantity: 1,
      unitPrice: 3000000,
      amount: 3000000,
    },
    {
      id: "item-003",
      name: "백엔드 API 개발",
      quantity: 1,
      unitPrice: 2500000,
      amount: 2500000,
    },
    {
      id: "item-004",
      name: "배포 및 운영 설정",
      quantity: 1,
      unitPrice: 500000,
      amount: 500000,
    },
  ],
  totalAmount: 7500000,
  notes:
    "본 견적서는 발행일로부터 30일간 유효합니다.\n작업 착수 전 계약금 50%를 선입금 후 진행됩니다.\n문의 사항은 이메일로 연락 부탁드립니다.",
};

// ─────────────────────────────────────────────
// 견적서 목록 더미 데이터
// ─────────────────────────────────────────────

export const mockInvoiceList: InvoiceListItem[] = [
  {
    id: "mock-invoice-001",
    invoiceNumber: "INV_2025_001",
    clientName: "주식회사 예시클라이언트",
    issueDate: "2025-03-01",
    totalAmount: 7500000,
    status: "발행",
  },
  {
    id: "mock-invoice-002",
    invoiceNumber: "INV_2025_002",
    clientName: "테스트 스타트업",
    issueDate: "2025-02-15",
    totalAmount: 3200000,
    status: "완료",
  },
  {
    id: "mock-invoice-003",
    invoiceNumber: "INV_2025_003",
    clientName: "디자인 에이전시 ABC",
    issueDate: "2025-01-20",
    totalAmount: 1800000,
    status: "초안",
  },
  {
    id: "mock-invoice-004",
    invoiceNumber: "INV_2024_012",
    clientName: "이커머스 플랫폼 XYZ",
    issueDate: "2024-12-10",
    totalAmount: 5500000,
    status: "완료",
  },
];
