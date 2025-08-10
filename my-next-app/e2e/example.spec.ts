// Playwright MCP를 사용한 상단 메뉴 네비게이션 테스트

// 테스트할 URL
const BASE_URL = 'http://localhost:3000';

// 테스트할 메뉴 항목들
const MENU_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' },
  { name: 'Login', path: '/login' }
];

// 메뉴 항목 표시 여부 테스트
async function testMenuItemsVisibility() {
  console.log('메뉴 항목 표시 여부 확인 중...');
  
  // 브라우저 열기
  await mcp0_browser_navigate({ url: BASE_URL });
  
  // 각 메뉴 항목이 존재하는지 확인
  for (const item of MENU_ITEMS) {
    const menuElement = `a:has-text("${item.name}")`;
    
    // 요소가 보이는지 확인
    try {
      await mcp0_browser_click({
        element: item.name,
        ref: menuElement,
        button: 'none' // 클릭 없이 요소만 확인
      });
      console.log(`✅ ${item.name} 메뉴가 표시됨`);
    } catch (error) {
      console.error(`❌ ${item.name} 메뉴를 찾을 수 없음`);
      throw error;
    }
  }
}

// 메뉴 네비게이션 테스트
async function testMenuNavigation() {
  console.log('\n메뉴 네비게이션 테스트 시작...');
  
  // 브라우저 열기
  await mcp0_browser_navigate({ url: BASE_URL });
  
  // 각 메뉴 항목 테스트
  for (const menuItem of MENU_ITEMS) {
    console.log(`\n테스트 중: ${menuItem.name} 메뉴`);
    
    // 메뉴 요소 클릭
    const menuElement = `a:has-text("${menuItem.name}")`;
    await mcp0_browser_click({
      element: menuItem.name,
      ref: menuElement
    });
    
    // 페이지 로드 대기
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 스크린샷 저장
    await mcp0_browser_take_screenshot({
      filename: `${menuItem.name.toLowerCase()}_page.png`
    });
    
    // URL 확인
    const snapshot = await mcp0_browser_snapshot();
    if (!snapshot.url.includes(menuItem.path)) {
      console.error(`❌ ${menuItem.name} 페이지 로드 실패: ${snapshot.url}`);
      throw new Error(`Expected URL to contain ${menuItem.path}, but got ${snapshot.url}`);
    }
    
    console.log(`✅ ${menuItem.name} 페이지 로드 확인`);
    
    // 메인 페이지로 돌아가기 (마지막 항목 제외)
    if (menuItem.path !== '/') {
      await mcp0_browser_navigate({ url: BASE_URL });
    }
  }
  
  console.log('\n✅ 모든 메뉴 네비게이션 테스트 완료');
}

// 모바일 메뉴 테스트
async function testMobileMenu() {
  console.log('\n모바일 메뉴 테스트 시작...');
  
  // 모바일 뷰포트로 설정 (예: iPhone 12)
  await mcp0_browser_resize({ width: 390, height: 844 });
  
  // 브라우저 열기
  await mcp0_browser_navigate({ url: BASE_URL });
  
  // 햄버거 메뉴 버튼 클릭
  try {
    await mcp0_browser_click({
      element: '햄버거 메뉴',
      ref: 'button[aria-label="Toggle menu"]'
    });
    
    // 메뉴가 펼쳐졌는지 확인
    const snapshot = await mcp0_browser_snapshot();
    const menuVisible = snapshot.elements.some(el => 
      el.role === 'navigation' && el.ariaLabel === 'Main navigation' && el.visible
    );
    
    if (!menuVisible) {
      throw new Error('모바일 메뉴가 표시되지 않음');
    }
    
    // 각 메뉴 항목이 보이는지 확인
    for (const item of MENU_ITEMS) {
      const menuItem = snapshot.elements.find(el => 
        el.text === item.name && el.visible && el.role === 'link'
      );
      
      if (!menuItem) {
        console.error(`❌ ${item.name} 메뉴를 찾을 수 없음`);
      } else {
        console.log(`✅ ${item.name} 메뉴가 표시됨`);
      }
    }
    
    console.log('✅ 모바일 메뉴 테스트 완료');
  } catch (error) {
    console.error('❌ 모바일 메뉴 테스트 실패:', error);
    throw error;
  }
}

// 테스트 실행
(async () => {
  try {
    console.log('=== 메뉴 테스트 시작 ===');
    
    // 1. 메뉴 항목 표시 여부 테스트
    await testMenuItemsVisibility();
    
    // 2. 메뉴 네비게이션 테스트
    await testMenuNavigation();
    
    // 3. 모바일 메뉴 테스트 (선택사항)
    // await testMobileMenu();
    
    console.log('\n=== 모든 테스트가 성공적으로 완료되었습니다 ===');
  } catch (error) {
    console.error('\n❌ 테스트 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
})();
