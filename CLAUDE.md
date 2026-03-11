# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

- **항상 한국어로 답변할 것.** 코드, 변수명, 파일명은 영어를 유지하되, 모든 설명과 대화는 한국어로 작성한다.

## Commands

```bash
npm run dev      # Start development server (runs on port 3000)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

After code changes, run `npm run lint` to check for issues.

## Architecture

This is a **Next.js 16 App Router** project using React 19 and Tailwind CSS v4, hosted in Firebase Studio (Project IDX).

- `src/app/` — App Router root. All routes live here as `page.tsx` files.
- `src/app/layout.tsx` — Root layout with Geist font (sans + mono) and global CSS.
- `src/app/globals.css` — Global styles.
- `src/app/page.tsx` — Home page (`/` route).
- `/components` — Create reusable UI components here (doesn't exist yet).
- `/lib` — Utility functions and libraries (doesn't exist yet).

### Key patterns

- Components in `/app` are **React Server Components by default**. Add `"use client"` only when state, interactivity, or browser APIs are needed.
- Data fetching should be done directly in Server Components using `async/await`.
- For data mutations, use **Server Actions** (`"use server"` directive in `async` functions).
- Keep Client Components small and push them to the leaves of the component tree.

### Firebase Studio specifics

- The dev server is **already running** in Firebase Studio — do not start it manually.
- Environment is configured via `.idx/dev.nix` (Node 20, yarn, pnpm, bun available).
- Firebase MCP can be added via `.idx/mcp.json` if Firebase integration is needed.

### blueprint.md

The GEMINI.md file specifies that a `blueprint.md` should be maintained at the project root as a living document tracking all features, styles, and designs implemented. Reference it at the start of each session and update it when making changes.

## Project Context

- PRD 문서: @docs/PRD.md
- 개발 로드맵: @docs/ROADMAP.md
