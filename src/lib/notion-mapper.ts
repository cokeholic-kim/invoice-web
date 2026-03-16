/**
 * 노션 API 응답을 앱 내부 타입으로 변환하는 매퍼 모듈.
 *
 * 노션 API 응답의 속성을 추출하고 Zod 스키마로 검증하여
 * 안전한 앱 타입으로 변환합니다.
 */

import type { Invoice, InvoiceItem, InvoiceListItem } from "@/types";
import {
  invoiceSchema,
  invoiceListItemSchema,
  invoiceItemSchema,
} from "@/lib/schemas";

// ─────────────────────────────────────────────
// 노션 API 응답 원시 타입
// ─────────────────────────────────────────────

/** 노션 리치 텍스트 항목 */
export interface NotionRichText {
  plain_text: string;
  href: string | null;
}

/** 노션 날짜 속성 */
export interface NotionDateProperty {
  start: string | null;
  end: string | null;
}

/** 노션 Select 속성 */
export interface NotionSelectProperty {
  id: string;
  name: string;
  color: string;
}

/** 노션 Relation 속성 항목 */
export interface NotionRelationItem {
  id: string;
}

// ─────────────────────────────────────────────
// Invoice 데이터베이스 속성 (노션 실제 구조)
// ─────────────────────────────────────────────

/** 노션 Invoice 페이지 속성 */
export interface NotionInvoiceProperties {
  /** 견적서 번호 (Title 속성, 예: INV_2025_001) */
  "견적서 번호": {
    type: "title";
    title: NotionRichText[];
  };
  /** 클라이언트명 (Rich text 속성) */
  "클라이언트명": {
    type: "rich_text";
    rich_text: NotionRichText[];
  };
  /** 발행일 (Date 속성) */
  "발행일": {
    type: "date";
    date: NotionDateProperty | null;
  };
  /** 유효기간 (Date 속성) */
  "유효기간": {
    type: "date";
    date: NotionDateProperty | null;
  };
  /** 상태 (Select 속성) */
  "상태": {
    type: "select";
    select: NotionSelectProperty | null;
  };
  /** 총 금액 (Number 속성) */
  "총 금액": {
    type: "number";
    number: number | null;
  };
  /** 항목 (Relation 속성 — items DB와 연결) */
  "항목": {
    type: "relation";
    relation: NotionRelationItem[];
  };
  /** 비고 (Rich text 속성, 선택적) */
  "비고"?: {
    type: "rich_text";
    rich_text: NotionRichText[];
  };
}

// ─────────────────────────────────────────────
// Items 데이터베이스 속성 (노션 실제 구조)
// ─────────────────────────────────────────────

/** 노션 Item 페이지 속성 */
export interface NotionItemProperties {
  /** 항목명 (Title 속성) */
  "항목명": {
    type: "title";
    title: NotionRichText[];
  };
  /** 수량 (Number 속성) */
  "수량": {
    type: "number";
    number: number | null;
  };
  /** 단가 (Number 속성) */
  "단가": {
    type: "number";
    number: number | null;
  };
  /** 금액 (Number 속성, 수량 × 단가) */
  "금액": {
    type: "number";
    number: number | null;
  };
  /** invoice (Relation 속성 — invoice DB와 연결) */
  invoice: {
    type: "relation";
    relation: NotionRelationItem[];
  };
}

/** 노션 페이지 응답 구조 */
export interface NotionPage<T = NotionInvoiceProperties> {
  id: string;
  object: "page";
  created_time: string;
  last_edited_time: string;
  properties: T;
  url: string;
}

/** 노션 데이터베이스 쿼리 응답 */
export interface NotionDatabaseQueryResponse<T = NotionInvoiceProperties> {
  object: "list";
  results: NotionPage<T>[];
  next_cursor: string | null;
  has_more: boolean;
}

// ─────────────────────────────────────────────
// 속성 추출 헬퍼 함수
// ─────────────────────────────────────────────

/** 리치 텍스트 배열에서 plain_text를 결합하여 반환합니다. */
function extractRichText(richTexts: NotionRichText[]): string {
  return richTexts.map((rt) => rt.plain_text).join("");
}

/** 타이틀 속성에서 텍스트를 추출합니다. */
function extractTitle(titleProp: { title: NotionRichText[] }): string {
  return extractRichText(titleProp.title);
}

/** 날짜 속성에서 start 날짜를 추출합니다. */
function extractDate(dateProp: { date: NotionDateProperty | null }): string | undefined {
  return dateProp.date?.start ?? undefined;
}

/** 숫자 속성에서 값을 추출합니다 (null이면 기본값 반환). */
function extractNumber(
  numberProp: { number: number | null },
  defaultValue = 0
): number {
  return numberProp.number ?? defaultValue;
}

/** Select 속성에서 name을 추출합니다. */
function extractSelect(
  selectProp: { select: NotionSelectProperty | null },
  defaultValue = "초안"
): string {
  return selectProp.select?.name ?? defaultValue;
}

// ─────────────────────────────────────────────
// 매퍼 함수
// ─────────────────────────────────────────────

/**
 * 노션 Invoice 페이지와 관련 Item 페이지들을 Invoice 타입으로 변환합니다.
 *
 * @param page - 노션 Invoice 페이지 API 응답
 * @param itemPages - 노션 Items DB에서 가져온 관련 항목 페이지 배열
 * @returns 검증된 Invoice 객체
 * @throws Zod 검증 실패 시 에러
 */
export function mapNotionPageToInvoice(
  page: NotionPage<NotionInvoiceProperties>,
  itemPages: NotionPage<NotionItemProperties>[]
): Invoice {
  const props = page.properties;

  // 항목 페이지들을 InvoiceItem 배열로 변환
  const items = mapNotionItemPagesToInvoiceItems(itemPages);

  // 비고 필드 추출 (속성이 존재하면)
  const notes = props["비고"]
    ? extractRichText(props["비고"].rich_text)
    : "";

  // 원시 데이터 구성
  const rawInvoice = {
    id: page.id,
    invoiceNumber: extractTitle(props["견적서 번호"]),
    clientName: extractRichText(props["클라이언트명"].rich_text),
    issueDate: extractDate(props["발행일"]) ?? "",
    validUntil: extractDate(props["유효기간"]),
    status: extractSelect(props["상태"]),
    items,
    totalAmount: extractNumber(props["총 금액"]),
    notes,
  };

  // Zod 스키마로 검증 후 반환
  return invoiceSchema.parse(rawInvoice);
}

/**
 * 노션 Invoice 페이지를 InvoiceListItem 요약 타입으로 변환합니다.
 *
 * @param page - 노션 Invoice 페이지 API 응답
 * @returns 검증된 InvoiceListItem 객체
 * @throws Zod 검증 실패 시 에러
 */
export function mapNotionPageToInvoiceListItem(
  page: NotionPage<NotionInvoiceProperties>
): InvoiceListItem {
  const props = page.properties;

  // 원시 데이터 구성
  const rawListItem = {
    id: page.id,
    invoiceNumber: extractTitle(props["견적서 번호"]),
    clientName: extractRichText(props["클라이언트명"].rich_text),
    issueDate: extractDate(props["발행일"]) ?? "",
    totalAmount: extractNumber(props["총 금액"]),
    status: extractSelect(props["상태"]),
  };

  // Zod 스키마로 검증 후 반환
  return invoiceListItemSchema.parse(rawListItem);
}

/**
 * 노션 Item 페이지 배열을 InvoiceItem 배열로 변환합니다.
 *
 * @param itemPages - 노션 Items DB에서 가져온 항목 페이지 배열
 * @returns 검증된 InvoiceItem 배열
 * @throws Zod 검증 실패 시 에러
 */
export function mapNotionItemPagesToInvoiceItems(
  itemPages: NotionPage<NotionItemProperties>[]
): InvoiceItem[] {
  return itemPages.map((itemPage) => {
    const props = itemPage.properties;

    const quantity = extractNumber(props["수량"], 1);
    const unitPrice = extractNumber(props["단가"]);
    // 금액이 노션에 있으면 사용, 없으면 수량 × 단가로 계산
    const amount = extractNumber(props["금액"]) || quantity * unitPrice;

    const rawItem = {
      id: itemPage.id,
      name: extractTitle(props["항목명"]),
      quantity,
      unitPrice,
      amount,
    };

    return invoiceItemSchema.parse(rawItem);
  });
}
