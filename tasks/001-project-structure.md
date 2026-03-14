# Task 001: 프로젝트 구조 및 라우팅 설정

## 개요

Next.js App Router 기반 전체 라우트 구조를 생성하고, 모든 주요 페이지의 빈 껍데기 파일 및 공통 레이아웃을 구현한다.
현재 `src/app/`에는 `page.tsx`, `layout.tsx`, `globals.css`, `favicon.ico`만 존재하므로, 견적서 뷰어(`/invoice/[id]`), 에러 페이지, 로딩 상태 등의 라우트를 추가한다.

## 관련 파일

- `src/app/layout.tsx` — 루트 레이아웃 (기존, 수정)
- `src/app/page.tsx` — 홈/견적서 목록 페이지 (기존, 수정)
- `src/app/not-found.tsx` — 글로벌 404 페이지 (신규)
- `src/app/error.tsx` — 글로벌 에러 페이지 (신규)
- `src/app/loading.tsx` — 글로벌 로딩 상태 (신규)
- `src/app/invoice/[id]/page.tsx` — 견적서 뷰어 페이지 (신규)
- `src/app/invoice/[id]/not-found.tsx` — 견적서 없음 페이지 (신규)
- `src/app/invoice/[id]/error.tsx` — 견적서 에러 페이지 (신규)
- `src/app/invoice/[id]/loading.tsx` — 견적서 로딩 상태 (신규)
- `src/components/` — 공통 컴포넌트 디렉토리 (신규)
- `src/lib/` — 유틸리티 함수 디렉토리 (신규)
- `src/types/` — 타입 정의 디렉토리 (신규)

## 수락 기준

- [ ] `/` 루트 경로에서 견적서 목록 페이지 껍데기가 렌더링된다
- [ ] `/invoice/[id]` 경로에서 견적서 뷰어 페이지 껍데기가 렌더링된다
- [ ] 존재하지 않는 경로 접근 시 not-found 페이지가 표시된다
- [ ] 에러 발생 시 error 페이지가 표시된다
- [ ] 로딩 중 loading 상태가 표시된다
- [ ] 공통 레이아웃(헤더, 푸터)이 모든 페이지에 적용된다
- [ ] `src/components/`, `src/lib/`, `src/types/` 디렉토리가 생성된다
- [ ] `npm run build` 에러 없이 통과한다
- [ ] `npm run lint` 에러 없이 통과한다

## 구현 단계

### 1단계: 디렉토리 구조 생성

- [ ] `src/components/` 디렉토리 생성 (빈 `.gitkeep` 또는 placeholder)
- [ ] `src/lib/` 디렉토리 생성
- [ ] `src/types/` 디렉토리 생성
- [ ] `src/app/invoice/[id]/` 디렉토리 생성

### 2단계: 공통 레이아웃 구현

- [ ] `src/app/layout.tsx` 수정 — 헤더(사이트명, 네비게이션), 푸터(저작권) 포함 공통 레이아웃
- [ ] 헤더 컴포넌트: 사이트명 "invoice-web", 홈 링크
- [ ] 푸터 컴포넌트: 간단한 저작권 텍스트
- [ ] 레이아웃은 Server Component로 유지

### 3단계: 라우트별 페이지 껍데기 생성

- [ ] `src/app/page.tsx` — 홈 페이지 (견적서 목록 자리표시) 수정
- [ ] `src/app/not-found.tsx` — 글로벌 404 페이지
- [ ] `src/app/error.tsx` — 글로벌 에러 페이지 (`"use client"` 필수)
- [ ] `src/app/loading.tsx` — 글로벌 로딩 상태
- [ ] `src/app/invoice/[id]/page.tsx` — 견적서 뷰어 페이지 (params에서 id 받기)
- [ ] `src/app/invoice/[id]/not-found.tsx` — 견적서 not-found
- [ ] `src/app/invoice/[id]/error.tsx` — 견적서 에러 (`"use client"` 필수)
- [ ] `src/app/invoice/[id]/loading.tsx` — 견적서 로딩

### 4단계: 빌드 및 린트 검증

- [ ] `npm run lint` 실행 및 통과
- [ ] `npm run build` 실행 및 통과

## 참고 사항

- 모든 페이지는 최소한의 자리표시 텍스트만 포함 (UI는 Phase 2에서 구현)
- `error.tsx`는 반드시 `"use client"` 디렉티브 필요 (Next.js 요구사항)
- 공통 레이아웃은 Tailwind CSS 기본 유틸리티만 사용 (shadcn/ui는 Task 003에서 설치)
- `blueprint.md` 파일 업데이트 필요 (구조 변경 반영)

## 변경 사항 요약

(작업 완료 후 작성)
