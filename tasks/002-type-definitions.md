# Task 002: 타입 정의 및 데이터 모델 설계

## 개요

PRD의 데이터 모델을 기반으로 TypeScript 인터페이스, Zod 스키마, 환경변수 설정 유틸리티를 정의한다.
노션 API 응답을 앱 내부 타입으로 안전하게 변환하기 위한 기반을 구축한다.

## 관련 파일

- `src/types/invoice.ts` — Invoice, InvoiceItem, SupplierInfo 인터페이스 (신규)
- `src/types/index.ts` — 타입 배럴 export (신규)
- `src/lib/schemas.ts` — Zod 스키마 정의 (신규)
- `src/lib/config.ts` — 환경변수 설정 유틸리티 (신규)
- `src/lib/notion-mapper.ts` — 노션 API 응답 → 앱 타입 매퍼 타입 정의 (신규)
- `package.json` — zod 의존성 추가
- `.env.example` — 환경변수 템플릿 (신규)

## 수락 기준

- [ ] `Invoice`, `InvoiceItem`, `SupplierInfo` 타입이 정의되어 있다
- [ ] Zod 스키마로 데이터 검증이 가능하다
- [ ] 환경변수(`NOTION_API_KEY`, `NOTION_DATABASE_ID`, 공급자 정보)가 타입 안전하게 접근 가능하다
- [ ] 노션 API 응답을 앱 타입으로 변환하는 매퍼 타입이 정의되어 있다
- [ ] `.env.example` 파일에 필요한 환경변수 목록이 문서화되어 있다
- [ ] `npm run build` 에러 없이 통과한다
- [ ] `npm run lint` 에러 없이 통과한다

## 구현 단계

### 1단계: Zod 설치

- [ ] `npm install zod` 실행

### 2단계: TypeScript 인터페이스 정의

- [ ] `src/types/invoice.ts` 생성
  - `InvoiceStatus` — 견적서 상태 타입 (`"draft" | "published" | "completed"`)
  - `InvoiceItem` — 견적 항목 (id, name, quantity, unitPrice, amount, description)
  - `Invoice` — 견적서 (id, title, clientName, issueDate, validUntil, status, items, totalAmount, notes)
  - `SupplierInfo` — 공급자 정보 (name, email, phone, address)
  - `InvoiceListItem` — 목록용 요약 타입 (id, title, clientName, issueDate, totalAmount, status)
- [ ] `src/types/index.ts` — 배럴 export 파일 생성

### 3단계: Zod 스키마 정의

- [ ] `src/lib/schemas.ts` 생성
  - `invoiceItemSchema` — InvoiceItem 검증
  - `invoiceSchema` — Invoice 검증
  - `supplierInfoSchema` — SupplierInfo 검증
  - 각 스키마에서 타입 추론 (`z.infer<>`) 확인

### 4단계: 환경변수 설정 유틸리티

- [ ] `src/lib/config.ts` 생성
  - `NOTION_API_KEY` — 노션 API 인증 키
  - `NOTION_DATABASE_ID` — 견적서 데이터베이스 ID
  - 공급자 정보 (`SUPPLIER_NAME`, `SUPPLIER_EMAIL`, `SUPPLIER_PHONE`, `SUPPLIER_ADDRESS`)
  - 환경변수 누락 시 명확한 에러 메시지와 함께 throw
- [ ] `.env.example` 템플릿 파일 생성

### 5단계: 노션 API 매퍼 타입 정의

- [ ] `src/lib/notion-mapper.ts` 생성
  - 노션 API 응답 구조에 대응하는 타입 정의
  - `mapNotionPageToInvoice` 함수 시그니처 정의 (구현은 Task 007에서)
  - `mapNotionPageToInvoiceListItem` 함수 시그니처 정의

### 6단계: 빌드 및 린트 검증

- [ ] `npm run lint` 실행 및 통과
- [ ] `npm run build` 실행 및 통과

## 테스트 체크리스트

- [ ] Given: 유효한 Invoice 데이터 / When: Zod 스키마로 검증 / Then: 검증 통과
- [ ] Given: 필수 필드 누락된 데이터 / When: Zod 스키마로 검증 / Then: 검증 실패 및 에러 메시지 반환
- [ ] Given: 환경변수가 설정된 상태 / When: config 유틸리티 호출 / Then: 타입 안전하게 값 반환
- [ ] Given: 환경변수가 누락된 상태 / When: config 유틸리티 호출 / Then: 명확한 에러 메시지와 함께 throw

## 참고 사항

- PRD 데이터 모델 참조: `docs/PRD.md` 126~163줄
- 노션 API 응답 구조는 `@notionhq/client` 타입에 의존 (Task 007에서 설치)
  - 매퍼 타입은 일반적인 타입으로 먼저 정의하고, SDK 설치 후 구체화
- Zod 스키마와 TypeScript 인터페이스는 단일 소스(Zod)에서 추론하여 중복 방지 권장

## 변경 사항 요약

(작업 완료 후 작성)
