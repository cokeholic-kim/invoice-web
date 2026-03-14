import type { SupplierInfo } from "@/types";

/**
 * 필수 환경변수를 읽어 반환합니다.
 * 값이 없으면 명확한 에러 메시지와 함께 예외를 던집니다.
 */
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `환경변수 "${key}"가 설정되지 않았습니다. .env.local 파일을 확인하세요.`
    );
  }
  return value;
}

/**
 * 선택적 환경변수를 읽어 반환합니다.
 * 값이 없으면 빈 문자열을 반환합니다.
 */
function optionalEnv(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

// ─────────────────────────────────────────────
// 노션 API 설정
// ─────────────────────────────────────────────

/** 노션 API 키 */
export function getNotionApiKey(): string {
  return requireEnv("NOTION_API_KEY");
}

/** 노션 견적서 데이터베이스 ID */
export function getNotionDatabaseId(): string {
  return requireEnv("NOTION_DATABASE_ID");
}

// ─────────────────────────────────────────────
// 공급자 정보 설정
// ─────────────────────────────────────────────

/**
 * 환경변수에서 공급자 정보를 읽어 반환합니다.
 * 필수 항목(name, email)이 없으면 예외를 던집니다.
 */
export function getSupplierInfo(): SupplierInfo {
  return {
    name: requireEnv("SUPPLIER_NAME"),
    email: requireEnv("SUPPLIER_EMAIL"),
    phone: optionalEnv("SUPPLIER_PHONE"),
    address: optionalEnv("SUPPLIER_ADDRESS"),
  };
}
