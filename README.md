# Next.js 실습 프로젝트 모음

이 저장소는 Next.js 학습을 위한 3개의 실습 프로젝트를 포함합니다.

## 📁 프로젝트 구조

```
NextRepo/
├── my-first-next-app/      # 기본 Next.js 학습
├── my-next-app/           # 고급 Next.js 기능 학습
├── khs-mini-community/    # 풀스택 커뮤니티 앱
└── README.md             # 이 파일
```

---

## 🚀 프로젝트별 상세 정보

### 1. `my-first-next-app` - Next.js 기초 학습

**목적**: Next.js 기본 개념과 구조 학습

**기술 스택**:

- Next.js 15.4.4
- React 19.1.0
- TypeScript 5.8.3

**학습 내용**:

- Next.js 프로젝트 생성 및 기본 구조
- App Router 기본 사용법
- TypeScript 설정 및 타입 정의
- 기본 페이지 라우팅

**주요 파일**:

```
my-first-next-app/
├── app/
│   ├── layout.tsx    # 루트 레이아웃
│   └── page.tsx      # 메인 페이지 (Hello Next.js!)
├── package.json      # 기본 의존성
└── tsconfig.json     # TypeScript 설정
```

**실행 방법**:

```bash
cd my-first-next-app
npm run dev
```

---

### 2. `my-next-app` - 고급 Next.js 기능 학습

**목적**: Next.js 고급 기능 및 테스팅 학습

**기술 스택**:

- Next.js 15.4.4 (Turbopack)
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4.1.12
- Supabase (데이터베이스)
- SWR (데이터 페칭)
- Playwright (E2E 테스팅)
- Jest (단위 테스팅)

**학습 내용**:

- **Parallel Routes**: `@trends`, `@users` 슬롯 활용
- **API Routes**: 게시글 CRUD API 구현
- **동적 라우팅**: `[postId]` 파라미터 사용
- **레이아웃 시스템**: 중첩 레이아웃 및 템플릿
- **테스팅**: E2E 테스트 (Playwright) 및 단위 테스트 (Jest)
- **데이터 페칭**: SWR을 활용한 클라이언트 사이드 데이터 관리
- **외부 API**: Supabase 연동

**주요 기능**:

- 📱 반응형 네비게이션 (모바일 최적화)
- 🔄 실시간 데이터 페칭
- 📝 게시글 작성/조회/수정/삭제
- 🔍 검색 기능
- ⚙️ 설정 페이지
- 🧪 포괄적인 테스트 커버리지

**주요 파일**:

```
my-next-app/
├── app/
│   ├── @trends/           # Parallel Routes
│   ├── @users/            # Parallel Routes
│   ├── api/posts/         # API Routes
│   ├── feed/              # 피드 페이지
│   ├── posts/[postId]/    # 동적 라우팅
│   └── search/            # 검색 페이지
├── components/            # 재사용 컴포넌트
├── lib/                   # 유틸리티 및 타입
├── e2e/                   # E2E 테스트
└── TESTING.md            # 테스팅 가이드
```

**실행 방법**:

```bash
cd my-next-app
npm run dev          # 개발 서버
npm run test         # 단위 테스트
npm run test:e2e     # E2E 테스트
```

---

### 3. `khs-mini-community` - 풀스택 커뮤니티 앱

**목적**: 완전한 풀스택 웹 애플리케이션 구현

**기술 스택**:

- Next.js 15.5.0 (Turbopack)
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Drizzle ORM (데이터베이스 ORM)
- SQLite (데이터베이스)
- NextAuth.js (인증)
- Radix UI (UI 컴포넌트)
- Lucide React (아이콘)

**학습 내용**:

- **데이터베이스 설계**: 사용자, 게시글, 댓글 테이블 관계 설계
- **ORM 사용**: Drizzle ORM을 활용한 데이터베이스 조작
- **복잡한 쿼리**: JOIN, GROUP BY, JSON 그룹화
- **Prepared Queries**: 성능 최적화된 쿼리
- **인증 시스템**: NextAuth.js를 활용한 사용자 인증
- **API 설계**: RESTful API 설계 및 구현
- **컴포넌트 아키텍처**: 재사용 가능한 UI 컴포넌트 설계

**주요 기능**:

- 👤 사용자 회원가입/로그인
- 📝 게시글 작성/조회/수정/삭제
- 💬 댓글 시스템
- 🔐 JWT 기반 인증
- 📊 복잡한 데이터 관계 처리
- ⚡ 최적화된 데이터베이스 쿼리

**데이터베이스 스키마**:

```sql
-- 사용자 테이블
user (id, email, password, name, createdAt, updatedAt)

-- 게시글 테이블
user_post (id, userId, title, content, createdAt, updatedAt)

-- 댓글 테이블
user_post_comment (id, userId, postId, content, createdAt, updatedAt)
```

**주요 파일**:

```
khs-mini-community/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth 설정
│   │   ├── sign-up/             # 회원가입 API
│   │   └── posts/               # 게시글 API
│   ├── sign-in/                 # 로그인 페이지
│   ├── sign-up/                 # 회원가입 페이지
│   └── posts/[postId]/          # 게시글 상세 페이지
├── components/
│   ├── pages/                   # 페이지 컴포넌트
│   └── ui/                      # UI 컴포넌트
├── database/
│   ├── schema.ts                # 데이터베이스 스키마
│   ├── prepareQueries/          # 최적화된 쿼리
│   └── migrations/              # 데이터베이스 마이그레이션
└── lib/
    └── authOptions.ts           # 인증 설정
```

**실행 방법**:

```bash
cd khs-mini-community
npm run dev          # 개발 서버
npm run db:generate  # 데이터베이스 마이그레이션 생성
npm run db:push      # 데이터베이스 스키마 적용
```

---

## 🎯 학습 진행 순서

1. **`my-first-next-app`**: Next.js 기본 개념 이해
2. **`my-next-app`**: 고급 기능 및 테스팅 학습
3. **`khs-mini-community`**: 풀스택 애플리케이션 구현

## 🛠️ 공통 개발 환경

- **Node.js**: 18.x 이상
- **npm**: 9.x 이상
- **개발 서버**: `npm run dev`
- **빌드**: `npm run build`
- **린팅**: `npm run lint`

## 📚 주요 학습 포인트

### Next.js 핵심 개념

- App Router vs Pages Router
- Server Components vs Client Components
- API Routes 설계
- 동적 라우팅 및 중첩 라우팅
- Parallel Routes 및 Intercepting Routes

### 데이터베이스 및 ORM

- 관계형 데이터베이스 설계
- ORM을 활용한 데이터 조작
- 복잡한 쿼리 최적화
- 마이그레이션 관리

### 테스팅

- 단위 테스트 (Jest)
- E2E 테스트 (Playwright)
- 테스트 주도 개발 (TDD)

### 인증 및 보안

- JWT 토큰 기반 인증
- NextAuth.js 활용
- API 보안 및 인증 미들웨어

---

## 📝 실습 기록

### 최근 실습 내용 (khs-mini-community)

- ✅ 데이터베이스 스키마 설계 및 관계 설정
- ✅ Drizzle ORM을 활용한 복잡한 JOIN 쿼리 구현
- ✅ Prepared Queries를 통한 성능 최적화
- ✅ JSON_GROUP_ARRAY를 활용한 댓글 그룹화
- ✅ API 라우트 설계 및 에러 처리
- ✅ 문법 오류 수정 및 코드 최적화

### 다음 학습 목표

- [ ] 프론트엔드 UI 컴포넌트 구현
- [ ] 실시간 댓글 시스템 구현
- [ ] 파일 업로드 기능 추가
- [ ] 검색 및 필터링 기능 구현
- [ ] 성능 최적화 및 모니터링

---

## 🤝 기여 방법

1. 각 프로젝트별로 독립적인 개발 환경 구성
2. 새로운 기능 추가 시 해당 프로젝트의 README 업데이트
3. 테스트 코드 작성 및 실행
4. 코드 리뷰 및 리팩토링

---

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해 주세요.
