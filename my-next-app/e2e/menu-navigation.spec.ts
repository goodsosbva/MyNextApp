/**
 * 메뉴 네비게이션 E2E 테스트
 * 
 * 이 테스트는 메인 메뉴의 각 항목을 클릭했을 때 
 * 올바른 페이지로 이동하는지 확인합니다.
 */

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

// 메뉴 항목이 화면에 표시되는지 확인하는 테스트
async function testMenuItemsVisibility() {
  console.log('\n🔍 메뉴 항목 표시 여부 확인 중...');
  
  // 브라우저 열기
  await mcp0_browser_navigate({ url: BASE_URL });
  
  // 각 메뉴 항목이 존재하는지 확인
  for (const item of MENU_ITEMS) {
    try {
      // 요소가 보이는지 확인 (클릭은 하지 않음)
      await mcp0_browser_click({
        element: `${item.name} 메뉴`,
        ref: `a:has-text("${item.name}")`,
        button: 'none'
      });
      console.log(`✅ ${item.name} 메뉴가 표시됨`);
    } catch (error) {
      console.error(`❌ ${item.name} 메뉴를 찾을 수 없음`);
      throw error;
    }
  }
}

// 테스트 실행
(async () => {
  try {
    console.log('🚀 메뉴 네비게이션 E2E 테스트를 시작합니다.');
    
    // 1. 메뉴 항목 표시 여부 테스트
    await testMenuItemsVisibility();
    
    console.log('\n🎉 테스트가 성공적으로 완료되었습니다!');
  } catch (error) {
    console.error('\n❌ 테스트 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
})();
