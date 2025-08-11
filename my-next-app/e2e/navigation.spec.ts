// @ts-check
const { test, expect } = require('@playwright/test');

// 테스트할 메뉴 항목들
const MENU_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Feed', path: '/feed' },
  { name: 'Search', path: '/search' },
  { name: 'settings', path: '/settings' }
];

test.describe('네비게이션 메뉴 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 메인 페이지로 이동
    await mcp0_browser_navigate({ url: 'http://localhost:3000' });
    await new Promise(resolve => setTimeout(resolve, 1000)); // 페이지 로딩 대기
  });

  test('메뉴 항목이 모두 표시되는지 확인', async () => {
    // 모든 메뉴 항목이 표시되는지 확인
    for (const menuItem of MENU_ITEMS) {
      const element = await mcp0_browser_evaluate({
        function: `() => {
          const elements = Array.from(document.querySelectorAll('a'));
          return elements.find(el => el.textContent.trim() === '${menuItem.name}');
        }`
      });
      expect(element).toBeTruthy();
    }
  });

  test('메뉴 클릭 시 해당 페이지로 이동하는지 확인', async () => {
    for (const menuItem of MENU_ITEMS) {
      // 메뉴 클릭
      await mcp0_browser_click({
        element: menuItem.name,
        ref: `a:has-text("${menuItem.name}")`
      });
      
      // 페이지 로딩 대기
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // URL 확인
      const url = await mcp0_browser_evaluate({
        function: '() => window.location.pathname'
      });
      
      expect(url).toBe(menuItem.path);
      
      // 스크린샷 저장 (디버깅용)
      await mcp0_browser_take_screenshot({
        filename: `${menuItem.name.toLowerCase()}_page.png`
      });
      
      // 메인 페이지로 돌아가기 (마지막 항목 제외)
      if (menuItem !== MENU_ITEMS[MENU_ITEMS.length - 1]) {
        await mcp0_browser_navigate({ url: 'http://localhost:3000' });
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  });

  test('메인 콘텐츠 영역이 정상적으로 표시되는지 확인', async () => {
    // Index Page 박스 확인
    const indexPageBox = await mcp0_browser_evaluate({
      function: `() => {
        const elements = Array.from(document.querySelectorAll('.box'));
        return elements.find(el => el.textContent.includes('Index Page'));
      }`
    });
    expect(indexPageBox).toBeTruthy();

    // Trends Slot 박스 확인
    const trendsSlot = await mcp0_browser_evaluate({
      function: `() => {
        const elements = Array.from(document.querySelectorAll('.box'));
        return elements.find(el => el.textContent.includes('Trends Slot'));
      }`
    });
    expect(trendsSlot).toBeTruthy();

    // UsersPage Slot 박스 확인
    const usersPageSlot = await mcp0_browser_evaluate({
      function: `() => {
        const elements = Array.from(document.querySelectorAll('.box'));
        return elements.find(el => el.textContent.includes('UsersPage Slot'));
      }`
    });
    expect(usersPageSlot).toBeTruthy();
  });
});
