/**
 * 노션 API 응답을 앱 내부 타입으로 변환하는 매퍼 모듈.
 *
 * @notionhq/client 설치 전이므로 노션 API 응답 구조를 일반 타입으로 정의합니다.
 * 실제 구현은 Task 007 (노션 API 연동)에서 완성합니다.
 */

import type { Invoice, InvoiceItem, InvoiceListItem } from "@/types";

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
// 매퍼 함수 시그니처
// (실제 구현은 Task 007에서 완성)
// ─────────────────────────────────────────────

/**
 * 노션 Invoice 페이지와 관련 Item 페이지들을 Invoice 타입으로 변환합니다.
 * @param page - 노션 Invoice 페이지 API 응답
 * @param itemPages - 노션 Items DB에서 가져온 관련 항목 페이지 배열
 */
export function mapNotionPageToInvoice(
  page: NotionPage<NotionInvoiceProperties>,
  itemPages: NotionPage<NotionItemProperties>[]
): Invoice {
  // Task 007에서 구현
  throw new Error(
    `mapNotionPageToInvoice 미구현: pageId=${page.id}, items=${itemPages.length}`
  );
}

/**
 * 노션 Invoice 페이지를 InvoiceListItem 요약 타입으로 변환합니다.
 * @param page - 노션 Invoice 페이지 API 응답
 */
export function mapNotionPageToInvoiceListItem(
  page: NotionPage<NotionInvoiceProperties>
): InvoiceListItem {
  // Task 007에서 구현
  throw new Error(
    `mapNotionPageToInvoiceListItem 미구현: pageId=${page.id}`
  );
}

/**
 * 노션 Item 페이지 배열을 InvoiceItem 배열로 변환합니다.
 * @param itemPages - 노션 Items DB에서 가져온 항목 페이지 배열
 */
export function mapNotionItemPagesToInvoiceItems(
  itemPages: NotionPage<NotionItemProperties>[]
): InvoiceItem[] {
  // Task 007에서 구현
  throw new Error(
    `mapNotionItemPagesToInvoiceItems 미구현: items=${itemPages.length}`
  );
}
