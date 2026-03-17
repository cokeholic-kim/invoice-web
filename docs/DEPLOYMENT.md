# Vercel 배포 가이드

## 사전 요구사항

- [Vercel 계정](https://vercel.com/signup)
- [노션 Integration](https://www.notion.so/my-integrations) 생성 완료
- 노션 견적서 데이터베이스 준비 완료

## 1. 환경변수 설정

Vercel 대시보드 > Project Settings > Environment Variables에서 아래 변수를 설정합니다.

### 필수 환경변수

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `NOTION_API_KEY` | 노션 Integration 토큰 | `secret_abc123...` |
| `NOTION_DATABASE_ID` | 노션 견적서 데이터베이스 ID | `abc123def456...` |
| `SUPPLIER_NAME` | 공급자(발행자) 이름/상호 | `홍길동` |
| `SUPPLIER_EMAIL` | 공급자 이메일 | `contact@example.com` |

### 선택 환경변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `NEXT_PUBLIC_BASE_URL` | 배포된 사이트 URL | (빈 문자열 — 상대경로 사용) |
| `SUPPLIER_PHONE` | 공급자 전화번호 | (빈 문자열) |
| `SUPPLIER_ADDRESS` | 공급자 주소 | (빈 문자열) |

### 노션 API 키 발급 방법

1. https://www.notion.so/my-integrations 접속
2. "새 통합 만들기" 클릭
3. 이름 입력 후 생성 → **Internal Integration Token** 복사
4. 노션 견적서 데이터베이스 페이지에서 우측 상단 `...` > "연결 추가" > 생성한 통합 선택

### 노션 데이터베이스 ID 확인 방법

노션 데이터베이스 URL에서 추출:
```
https://www.notion.so/your-workspace/[DATABASE_ID]?v=...
                                      ^^^^^^^^^^^^^^^^
                                      이 부분이 DATABASE_ID
```

## 2. Vercel 배포

### CLI로 배포

```bash
# Vercel CLI 설치 (전역)
npm i -g vercel

# 로그인
vercel login

# 프리뷰 배포 (테스트용)
vercel

# 프로덕션 배포
vercel --prod
```

### GitHub 연동 배포 (권장)

1. GitHub에 리포지토리 push
2. Vercel 대시보드 > "Import Project" > GitHub 리포지토리 선택
3. Framework Preset: **Next.js** (자동 감지)
4. Environment Variables에 위의 환경변수 입력
5. "Deploy" 클릭

이후 `main` 브랜치에 push할 때마다 자동 배포됩니다.

## 3. 배포 후 확인사항

- [ ] 메인 페이지(`/`) 접속 → 견적서 목록 정상 표시
- [ ] 견적서 클릭 → `/invoice/[id]` 페이지 정상 렌더링
- [ ] PDF 다운로드 버튼 동작 확인
- [ ] URL 복사 버튼 동작 확인 (토스트 알림 표시)
- [ ] 잘못된 견적서 ID 접근 → 404 페이지 표시
- [ ] 모바일 뷰포트에서 반응형 레이아웃 확인

## 4. 프로젝트 설정 참고

| 항목 | 값 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Node.js 버전 | 20.x |
| 빌드 명령 | `npm run build` |
| 출력 디렉토리 | `.next` (자동) |
| 설치 명령 | `npm install` |

## 5. 캐싱 전략

| 페이지 | 전략 | revalidate |
|--------|------|------------|
| `/` (목록) | ISR | 5분 (300초) |
| `/invoice/[id]` (상세) | ISR | 1시간 (3600초) |

노션 데이터베이스 업데이트 후 최대 위 시간만큼 반영이 지연될 수 있습니다.
즉시 반영이 필요한 경우 Vercel 대시보드에서 해당 경로를 수동 재검증(On-Demand Revalidation)할 수 있습니다.
