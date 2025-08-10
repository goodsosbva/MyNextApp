# 테스트 과정 문서

## 개요
이 문서는 Next.js 애플리케이션의 테스트 설정 및 실행 과정을 문서화합니다.

## 테스트 환경
- **프레임워크**: Next.js
- **테스트 도구**: Playwright
- **테스트 유형**: E2E(End-to-End) 테스트

## 테스트 파일 구조
```
e2e/
  ├── menu-navigation.spec.ts  # 메뉴 네비게이션 테스트
  └── navigation.spec.ts       # 기본 네비게이션 테스트
```

## 주요 테스트 케이스

### 1. 메뉴 네비게이션 테스트 (`menu-navigation.spec.ts`)
- 메뉴 항목 클릭 시 해당 페이지로 정상 이동하는지 확인
- 모바일 뷰에서 메뉴 토글 동작 테스트
- 활성 메뉴 항목 스타일링 확인

### 2. 기본 네비게이션 테스트 (`navigation.spec.ts`)
- 메인 페이지 로딩 테스트
- 페이지 간 이동 시 정상 동작 확인
- 404 페이지 테스트

## 테스트 실행 방법

### 개발 모드에서 테스트 실행
```bash
npm run test:e2e
```

### UI 모드로 테스트 실행 (Playwright UI)
```bash
npm run test:e2e:ui
```

### 특정 테스트 파일 실행
```bash
npx playwright test e2e/menu-navigation.spec.ts
```

## 테스트 설정
테스트 설정은 `playwright.config.ts`에서 관리됩니다.
- 브라우저: Chromium, Firefox, WebKit 지원
- 뷰포트: 데스크톱 및 모바일 뷰포트 설정 포함
- 타임아웃: 기본 30초

## 테스트 작성 가이드
1. 새로운 테스트 파일은 `e2e` 디렉토리에 `*.spec.ts` 형식으로 생성
2. 테스트 케이스는 `test()` 함수로 작성
3. 페이지 객체 모델(POM) 패턴을 사용하여 유지보수성 향상
4. 테스트 간 독립성 유지를 위해 각 테스트는 서로 의존하지 않도록 작성

## 문제 해결
- 테스트 실패 시 `test-results` 디렉토리에 스크린샷과 동영상이 저장됨
- `--debug` 플래그를 사용하여 디버그 모드로 테스트 실행 가능

## 참고 문서
- [Playwright 공식 문서](https://playwright.dev/)
- [Next.js 테스팅 가이드](https://nextjs.org/docs/testing)

## 테스트 결과
![alt text](image.png)