import { test, expect, type Page, type Browser } from '@playwright/test';

// 테스트 환경 설정
test.describe.configure({ 
  mode: 'serial', // 테스트를 순차적으로 실행
  retries: 2,     // 실패 시 재시도 횟수
});

// TypeScript 인터페이스 정의
interface MenuItem {
  name: string;
  path: string;
}

// 테스트할 메뉴 항목들
const MENU_ITEMS: MenuItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Feed', path: '/feed' },
  { name: 'Search', path: '/search' },
  { name: 'settings', path: '/settings' }
];

// 테스트 타임아웃 설정 (기본값: 30초)
test.setTimeout(90000); // 90초로 증가

test.describe('네비게이션 메뉴 테스트', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    // 테스트 정보 로깅
    const testTitle = test.info().title;
    console.log(`[${new Date().toISOString()}] 테스트 시작: ${testTitle}`);
    
    // 테스트 실패 시 스크린샷 저장
    test.info().annotations.push({
      type: 'test_info',
      description: `테스트 시작: ${testTitle}`
    });

    try {
      // 각 테스트 전에 메인 페이지로 이동
      console.log('메인 페이지로 이동 중...');
      await page.goto('http://localhost:3000', { 
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });
      
      // 네비게이션 메뉴가 로드될 때까지 대기
      console.log('네비게이션 메뉴 로드 대기 중...');
      await page.waitForSelector('nav', { 
        state: 'visible',
        timeout: 10000
      });
      
      // 추가적인 로딩 대기 (Firefox용)
      await page.waitForLoadState('networkidle');
      console.log('페이지 로드 완료');
    } catch (error) {
      console.error('페이지 로드 중 오류 발생:', error);
      await page.screenshot({ path: 'test-results/error_beforeEach.png', fullPage: true });
      throw error;
    }
  });

  test('메뉴 항목이 모두 표시되는지 확인', async ({ page, browserName }: { page: Page, browserName: string }) => {
    try {
      console.log('메뉴 항목 표시 확인 테스트 시작');
      
      // 네비게이션 메뉴가 로드될 때까지 대기
      console.log('네비게이션 메뉴 대기 중...');
      await page.waitForSelector('nav a', { 
        state: 'visible',
        timeout: 10000
      });
      
      // 모든 메뉴 항목이 표시되는지 확인
      for (const menuItem of MENU_ITEMS) {
        console.log(`검증 중: ${menuItem.name} 메뉴`);
        
        // Firefox의 경우 대소문자 구분이 다를 수 있으므로 정확한 텍스트 매칭 사용
        const menuText = browserName === 'firefox' 
          ? new RegExp(`^${menuItem.name}$`, 'i')
          : menuItem.name;
        
        const menuSelector = `nav a:has-text("${menuItem.name}")`;
        
        // 메뉴 요소가 로드될 때까지 대기
        await page.waitForSelector(menuSelector, { 
          state: 'visible',
          timeout: 10000
        });
        
        // 스크롤하여 메뉴가 보이도록 함
        await page.locator(menuSelector).scrollIntoViewIfNeeded();
        
        // 메뉴 요소 가져오기
        const menuElement = await page.$(menuSelector);
        expect(menuElement, `${menuItem.name} 메뉴를 찾을 수 없습니다.`).not.toBeNull();
        
        if (!menuElement) continue;
        
        // 메뉴가 화면에 보이는지 확인
        const isVisible = await menuElement.isVisible();
        expect(isVisible, `${menuItem.name} 메뉴가 화면에 표시되지 않습니다.`).toBeTruthy();
        
        // 메뉴 텍스트가 정확한지 확인 (대소문자 구분 없이 비교)
        const textContent = await menuElement.textContent();
        expect(
          textContent?.trim().toLowerCase(), 
          `${menuItem.name} 메뉴의 텍스트가 일치하지 않습니다.`
        ).toBe(menuItem.name.toLowerCase());
        
        console.log(`✅ ${menuItem.name} 메뉴 검증 완료`);
      }
    } catch (error) {
      console.error('메뉴 항목 표시 확인 중 오류 발생:', error);
      await page.screenshot({ 
        path: `test-results/error_menu_visibility_${browserName}.png`, 
        fullPage: true 
      });
      throw error;
    }
  });

  test('메뉴 클릭 시 해당 페이지로 이동하는지 확인', async ({ page, browserName }: { page: Page, browserName: string }) => {
    test.slow(); // 이 테스트는 느릴 수 있음
    
    try {
      console.log('메뉴 클릭 테스트 시작');
      
      for (const menuItem of MENU_ITEMS) {
        console.log(`테스트 중: ${menuItem.name} 메뉴 클릭`);
        
        // Firefox의 경우 대소문자 구분이 다를 수 있으므로 정확한 텍스트 매칭 사용
        const menuText = browserName === 'firefox' 
          ? new RegExp(`^${menuItem.name}$`, 'i')
          : menuItem.name;
        
        // 메뉴 선택자 (Firefox 호환성을 위해 여러 선택자 전략 사용)
        const menuSelectors = [
          `nav a:has-text("${menuItem.name}")`,
          `nav a:has-text("${menuItem.name.toLowerCase()}")`,
          `nav a >> text=${menuItem.name}`,
          `nav a >> text=${menuItem.name.toLowerCase()}`
        ];
        
        let menuElement = null;
        let lastError = null;
        
        // 여러 선택자로 시도
        for (const selector of menuSelectors) {
          try {
            await page.waitForSelector(selector, { 
              state: 'visible', 
              timeout: 5000 
            });
            menuElement = await page.$(selector);
            if (menuElement) break;
          } catch (error) {
            lastError = error;
            continue;
          }
        }
        
        if (!menuElement) {
          throw new Error(`${menuItem.name} 메뉴를 찾을 수 없습니다. 마지막 오류: ${lastError?.message || '알 수 없음'}`);
        }
        
        // 스크롤하여 메뉴가 보이도록 함
        await menuElement.scrollIntoViewIfNeeded();
        
        // 클릭 이전에 대기
        await page.waitForTimeout(500);
        
        // 클릭 이벤트가 제대로 동작하도록 여러 방법으로 시도
        try {
          await menuElement.click({ delay: 100 });
        } catch (clickError) {
          console.warn(`표준 클릭 실패, 대체 방법으로 시도: ${clickError}`);
          await page.evaluate((element: HTMLElement) => element.click(), await menuElement.elementHandle());
        }
        
        // 페이지 로딩 대기 (최대 20초)
        try {
          await page.waitForURL(`**${menuItem.path}`, { 
            timeout: 20000,
            waitUntil: 'domcontentloaded'
          });
        } catch (urlError) {
          console.warn(`URL 변경 감지 실패, 현재 URL 확인: ${page.url()}`);
          // URL 변경이 감지되지 않아도 계속 진행
        }
        
        // URL 확인
        const currentURL = page.url();
        expect(
          currentURL, 
          `${menuItem.name} 메뉴 클릭 시 ${menuItem.path}로 이동해야 합니다. (현재: ${currentURL})`
        ).toContain(menuItem.path);
        
        // 스크린샷 저장 (디버깅용)
        await page.screenshot({ 
          path: `test-results/${browserName}_${menuItem.name.toLowerCase()}_page.png`,
          fullPage: true
        });
        
        console.log(`✅ ${menuItem.name} 메뉴 클릭 테스트 완료`);
        
        // 메인 페이지로 돌아가기 (마지막 항목 제외)
        if (menuItem !== MENU_ITEMS[MENU_ITEMS.length - 1]) {
          console.log('메인 페이지로 복귀 중...');
          await page.goto('http://localhost:3000', { 
            waitUntil: 'domcontentloaded',
            timeout: 10000
          });
          await page.waitForSelector('nav', { 
            state: 'visible',
            timeout: 10000
          });
          // 추가적인 로딩 대기
          await page.waitForTimeout(1000);
        }
      }
    } catch (error) {
      console.error('메뉴 클릭 테스트 중 오류 발생:', error);
      // 오류 발생 시 스크린샷 저장
      await page.screenshot({ 
        path: `test-results/error_${browserName}_menu_click.png`,
        fullPage: true 
      });
      
      // 오류 메시지에 브라우저 정보 추가
      const errorMessage = error instanceof Error ? error.message : String(error);
      const enhancedError = new Error(`[${browserName.toUpperCase()}] ${errorMessage}`);
      if (error instanceof Error) {
        enhancedError.stack = error.stack;
      }
      throw enhancedError;
    }
  });

  test('메인 콘텐츠 영역이 정상적으로 표시되는지 확인', async ({ page, browserName }: { page: Page, browserName: string }) => {
    try {
      console.log('메인 콘텐츠 영역 확인 테스트 시작');
      
      // 각 요소가 로드될 때까지 대기
      console.log('콘텐츠 박스 로드 대기 중...');
      await page.waitForSelector('.box', { 
        state: 'visible',
        timeout: 10000
      });
      
      // Index Page 박스 확인
      console.log('Index Page 박스 확인 중...');
      const indexPageBox = await page.$('text=Index Page');
      expect(indexPageBox, 'Index Page 박스를 찾을 수 없습니다.').not.toBeNull();
      
      if (indexPageBox) {
        const isIndexVisible = await indexPageBox.isVisible();
        expect(
          isIndexVisible, 
          'Index Page 박스가 화면에 표시되지 않습니다.'
        ).toBeTruthy();
      }

      // Trends Slot 박스 확인
      console.log('Trends Slot 박스 확인 중...');
      const trendsSlot = await page.$('text=Trends Slot');
      expect(trendsSlot, 'Trends Slot 박스를 찾을 수 없습니다.').not.toBeNull();
      
      if (trendsSlot) {
        const isTrendsVisible = await trendsSlot.isVisible();
        expect(
          isTrendsVisible, 
          'Trends Slot 박스가 화면에 표시되지 않습니다.'
        ).toBeTruthy();
      }

      // UsersPage Slot 박스 확인
      console.log('UsersPage Slot 박스 확인 중...');
      const usersPageSlot = await page.$('text=UsersPage Slot');
      expect(usersPageSlot, 'UsersPage Slot 박스를 찾을 수 없습니다.').not.toBeNull();
      
      if (usersPageSlot) {
        const isUsersPageVisible = await usersPageSlot.isVisible();
        expect(
          isUsersPageVisible, 
          'UsersPage Slot 박스가 화면에 표시되지 않습니다.'
        ).toBeTruthy();
      }
      
      console.log('✅ 메인 콘텐츠 영역 확인 테스트 완료');
    } catch (error) {
      console.error('메인 콘텐츠 확인 중 오류 발생:', error);
      await page.screenshot({ 
        path: `test-results/error_${browserName}_content_check.png`,
        fullPage: true 
      });
      throw error;
    }
  });
});
