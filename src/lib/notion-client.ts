/**
 * 노션 API 클라이언트 및 데이터 조회 함수 모듈.
 *
 * @notionhq/client SDK를 사용하여 견적서 데이터베이스를 조회합니다.
 */

import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getNotionApiKey, getNotionDatabaseId } from "@/lib/config";
import {
  mapNotionPageToInvoice,
  mapNotionPageToInvoiceListItem,
  type NotionInvoiceProperties,
  type NotionItemProperties,
  type NotionPage,
} from "@/lib/notion-mapper";
import type { Invoice, InvoiceListItem } from "@/types";

// ─────────────────────────────────────────────
// 노션 클라이언트 싱글톤
// ─────────────────────────────────────────────

let _client: Client | null = null;

/** 노션 API 클라이언트를 반환합니다 (싱글톤 패턴). */
function getNotionClient(): Client {
  if (!_client) {
    _client = new Client({
      auth: getNotionApiKey(),
    });
  }
  return _client;
}

// ─────────────────────────────────────────────
// 타입 변환 헬퍼
// ─────────────────────────────────────────────

/**
 * 노션 SDK의 PageObjectResponse를 내부 NotionPage 타입으로 캐스팅합니다.
 * 노션 SDK의 타입이 매우 복잡하므로, 우리가 정의한 간소화 타입으로 변환합니다.
 */
function toNotionPage<T>(page: PageObjectResponse): NotionPage<T> {
  return page as unknown as NotionPage<T>;
}

// ─────────────────────────────────────────────
// 데이터베이스 쿼리 헬퍼
// ─────────────────────────────────────────────

/** 견적서 데이터베이스를 발행일 내림차순으로 조회합니다. */
async function queryInvoiceDatabase(
  notion: Client,
  databaseId: string,
  startCursor?: string
) {
  return notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "발행일",
        direction: "descending",
      },
    ],
    page_size: 100,
    start_cursor: startCursor,
  });
}

/** 쿼리 결과에서 PageObjectResponse만 필터하여 대상 배열에 추가합니다. */
function collectPages(
  results: Awaited<ReturnType<Client["databases"]["query"]>>["results"],
  target: PageObjectResponse[]
) {
  for (const result of results) {
    if (result.object === "page" && "properties" in result) {
      target.push(result as PageObjectResponse);
    }
  }
}

// ─────────────────────────────────────────────
// 공개 API: 견적서 목록 조회
// ─────────────────────────────────────────────

/**
 * 노션 데이터베이스에서 전체 견적서 목록을 조회합니다.
 * 발행일 내림차순으로 정렬됩니다.
 *
 * @returns 견적서 목록 배열 (InvoiceListItem[])
 * @throws 노션 API 호출 실패 시 에러
 */
export async function getInvoiceList(): Promise<InvoiceListItem[]> {
  const notion = getNotionClient();
  const databaseId = getNotionDatabaseId();

  // 페이지네이션을 고려하여 모든 결과를 수집
  const allPages: PageObjectResponse[] = [];

  // 첫 번째 페이지 조회
  const firstResponse = await queryInvoiceDatabase(notion, databaseId);
  collectPages(firstResponse.results, allPages);

  // 이후 페이지 조회 (페이지네이션)
  let nextCursor = firstResponse.next_cursor;
  while (nextCursor) {
    const nextResponse = await queryInvoiceDatabase(notion, databaseId, nextCursor);
    collectPages(nextResponse.results, allPages);
    nextCursor = nextResponse.next_cursor;
  }

  // 노션 페이지를 InvoiceListItem으로 변환
  return allPages.map((page) =>
    mapNotionPageToInvoiceListItem(toNotionPage<NotionInvoiceProperties>(page))
  );
}

// ─────────────────────────────────────────────
// 공개 API: 개별 견적서 조회
// ─────────────────────────────────────────────

/**
 * 노션 페이지 ID로 개별 견적서를 조회합니다.
 * 관련 항목(InvoiceItem)도 함께 조회하여 포함합니다.
 *
 * @param id - 노션 페이지 ID (UUID 형식)
 * @returns 견적서 데이터 (Invoice) 또는 존재하지 않으면 null
 */
export async function getInvoiceById(id: string): Promise<Invoice | null> {
  const notion = getNotionClient();

  try {
    // 1. 견적서 페이지 조회
    const pageResponse = await notion.pages.retrieve({ page_id: id });

    // PageObjectResponse인지 확인
    if (!("properties" in pageResponse)) {
      return null;
    }

    const invoicePage = toNotionPage<NotionInvoiceProperties>(
      pageResponse as PageObjectResponse
    );

    // 2. relation에서 항목 페이지 ID 추출
    const relationItems = invoicePage.properties["항목"]?.relation ?? [];
    const itemPageIds = relationItems.map((rel) => rel.id);

    // 3. 각 항목 페이지를 개별 retrieve (병렬 처리)
    const itemPages: NotionPage<NotionItemProperties>[] = [];

    if (itemPageIds.length > 0) {
      const itemResponses = await Promise.all(
        itemPageIds.map((itemId) =>
          notion.pages.retrieve({ page_id: itemId })
        )
      );

      for (const itemResponse of itemResponses) {
        if ("properties" in itemResponse) {
          itemPages.push(
            toNotionPage<NotionItemProperties>(itemResponse as PageObjectResponse)
          );
        }
      }
    }

    // 4. 매퍼를 통해 Invoice 타입으로 변환
    return mapNotionPageToInvoice(invoicePage, itemPages);
  } catch (error: unknown) {
    // 노션 API에서 페이지를 찾을 수 없는 경우 null 반환
    if (isNotionNotFoundError(error)) {
      return null;
    }
    // 그 외 에러는 상위로 전파
    throw error;
  }
}

// ─────────────────────────────────────────────
// 에러 판별 헬퍼
// ─────────────────────────────────────────────

/** 노션 API의 "object not found" 에러인지 판별합니다. */
function isNotionNotFoundError(error: unknown): boolean {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    const code = (error as { code: string }).code;
    return code === "object_not_found" || code === "validation_error";
  }
  return false;
}

/**
 * 노션 API 에러를 사용자 친화적 메시지로 변환하여 throw합니다.
 * Error Boundary에서 에러 메시지가 그대로 표시되므로 한글 메시지를 사용합니다.
 */
export function toUserFriendlyError(error: unknown): Error {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code: string }).code;
    switch (code) {
      case "unauthorized":
        return new Error(
          "노션 API 인증에 실패했습니다. 관리자에게 문의해 주세요."
        );
      case "restricted_resource":
        return new Error(
          "노션 데이터에 접근할 권한이 없습니다. 관리자에게 문의해 주세요."
        );
      case "rate_limited":
        return new Error(
          "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요."
        );
      case "internal_server_error":
      case "service_unavailable":
        return new Error(
          "노션 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
        );
      default:
        return new Error(
          "견적서 데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        );
    }
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error(
    "예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
  );
}
