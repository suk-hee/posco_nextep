/**
 * Component HTML constants
 *
 * Usage:
 *   <script src="components/components.js"></script>
 *   document.getElementById('lnb').innerHTML = SIDEBAR_HTML;
 *
 * Note:
 *   - Each line is a separate `+=` assignment so developers can insert
 *     if / for logic between lines when customizing.
 *   - Asset paths (./assets/...) are resolved relative to the consuming HTML file.
 *     This constant assumes the HTML is at the project root. Adjust paths if used elsewhere.
 *   - Sidebar interactions require loading components/layout/sidebar.js AFTER the HTML is injected.
 */

let SIDEBAR_HTML = '';
SIDEBAR_HTML += `<aside class="side-bar" aria-label="주요 메뉴">`;
SIDEBAR_HTML +=   `<div class="side-bar__top">`;
SIDEBAR_HTML +=     `<div class="side-bar__logo">`;
SIDEBAR_HTML +=       `<a href="/index.html" aria-label="홈으로 이동">`;
SIDEBAR_HTML +=         `<img src="./assets/icons/logo-default.svg" alt="Logo" width="48" height="48">`;
SIDEBAR_HTML +=       `</a>`;
SIDEBAR_HTML +=     `</div>`;
SIDEBAR_HTML +=     `<nav class="side-bar__menu" aria-label="메인 내비게이션">`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__item" data-menu="to-do">`;
SIDEBAR_HTML +=         `<span class="side-bar__item-icon"></span>`;
SIDEBAR_HTML +=         `<span class="side-bar__item-label">To-Do</span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__item" data-menu="mail">`;
SIDEBAR_HTML +=         `<span class="side-bar__item-icon"></span>`;
SIDEBAR_HTML +=         `<span class="side-bar__item-label">메일</span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__item" data-menu="ecm">`;
SIDEBAR_HTML +=         `<span class="side-bar__item-icon"></span>`;
SIDEBAR_HTML +=         `<span class="side-bar__item-label">ECM</span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__item" data-menu="schedule">`;
SIDEBAR_HTML +=         `<span class="side-bar__item-icon"></span>`;
SIDEBAR_HTML +=         `<span class="side-bar__item-label">일정</span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__item" data-menu="sign">`;
SIDEBAR_HTML +=         `<span class="side-bar__item-icon"></span>`;
SIDEBAR_HTML +=         `<span class="side-bar__item-label">결재</span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__item" data-menu="people">`;
SIDEBAR_HTML +=         `<span class="side-bar__item-icon"></span>`;
SIDEBAR_HTML +=         `<span class="side-bar__item-label">사람찾기</span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__item" data-menu="gpt">`;
SIDEBAR_HTML +=         `<span class="side-bar__item-icon"></span>`;
SIDEBAR_HTML +=         `<span class="side-bar__item-label">P-GPT</span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__item" data-menu="app">`;
SIDEBAR_HTML +=         `<span class="side-bar__item-icon"></span>`;
SIDEBAR_HTML +=         `<span class="side-bar__item-label">App</span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__item" data-menu="search">`;
SIDEBAR_HTML +=         `<span class="side-bar__item-icon"></span>`;
SIDEBAR_HTML +=         `<span class="side-bar__item-label">검색</span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__item" data-menu="more">`;
SIDEBAR_HTML +=         `<span class="side-bar__item-icon"></span>`;
SIDEBAR_HTML +=         `<span class="side-bar__item-label">더보기</span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=     `</nav>`;
SIDEBAR_HTML +=   `</div>`;
SIDEBAR_HTML +=   `<div class="side-bar__bottom">`;
SIDEBAR_HTML +=     `<div class="side-bar__actions">`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__action" data-action="help" aria-label="도움말">`;
SIDEBAR_HTML +=         `<span class="side-bar__action-icon"></span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=       `<button type="button" class="side-bar__action" data-action="setting" aria-label="설정">`;
SIDEBAR_HTML +=         `<span class="side-bar__action-icon"></span>`;
SIDEBAR_HTML +=       `</button>`;
SIDEBAR_HTML +=     `</div>`;
SIDEBAR_HTML +=     `<div class="side-bar__profile" role="button" tabindex="0" aria-label="내 프로필">`;
SIDEBAR_HTML +=       `<span class="side-bar__profile-image">`;
SIDEBAR_HTML +=         `<img src="./assets/avatar/female01.jpg" alt="프로필 이미지">`;
SIDEBAR_HTML +=       `</span>`;
SIDEBAR_HTML +=     `</div>`;
SIDEBAR_HTML +=   `</div>`;
SIDEBAR_HTML += `</aside>`;


/**
 * Card-Task data + renderer
 *
 * 데이터 모델:
 *   - style          (선택)  'warning' | 'success' | 'accent' | 'danger'  (생략 = default)
 *   - title          (필수)  카드 제목
 *   - summary        (필수)  요약 본문
 *   - startDate      (필수)  ex) '생성일 2026.01.02'
 *   - endDate        (필수)  ex) '마감일 2026.01.02 11:00'
 *   - update         (선택)  ex) '1분 전' (없으면 update 영역 숨김)
 *   - share          (선택)  { avatar, count }  공유 뱃지 (없으면 숨김)
 *   - startButton    (선택)  좌측 버튼 { label, icon?, iconPos?, variant? } (없으면 숨김)
 *   - endButton      (선택)  우측 버튼 { label, icon?, iconPos?, variant? } (없으면 숨김)
 *       icon       : 'envelope' | 'folder' | 'arrow-up-right' | 'ai-star' (생략 = 기본 cog)
 *       iconPos    : 'right' (생략 = left)
 *       variant    : 'ai' (생략 = default outline)
 *   - share/start/end 모두 없으면 actionbar 자체 숨김
 *
 * 라인별 += 누적 스타일 — 분기/반복 삽입 시 SIDEBAR_HTML 패턴과 동일하게 라인 사이에 if/for 삽입 가능.
 */

const TASK_LIST_DATA = [
  {
    style: 'warning',
    title: '2025년 귀속 연말정산 추가 서류 제출 D-1',
    summary: '추가하신 부양가족에 대한 가족관계증명서를 제출해 주세요.',
    startDate: '생성일 2026.01.02',
    endDate: '마감일 2026.01.02 11:00',
    update: '1분 전',
    startButton: { label: '가족관계증명서 신청', icon: 'arrow-up-right', iconPos: 'right' },
    endButton: { label: '연말정산 서류 제출', icon: 'envelope' },
  },
  {
    title: '1월 4주차 주간보고 작성',
    summary: '수행하신 업무를 Task Hub에서 확인하고 4주차 주간보고서 초안을 작성했습니다.',
    startDate: '생성일 2026.01.02',
    endDate: '마감일 2026.01.02',
    update: '1분 전',
    endButton: { label: '주간보고서 작성', icon: 'folder' },
  },
  {
    title: '구매 프로세스 관련 메일 문의',
    summary: '설비투자그룹 장성욱 대리의 구매 프로세스 관련 문의에 답장 메일 초안을 작성했습니다.',
    startDate: '생성일 2026.01.02',
    endDate: '마감일 2026.01.02',
    startButton: { label: '답장 초안 확인', icon: 'envelope' },
    endButton: { label: '답장 발송', icon: 'envelope' },
  },
  {
    style: 'warning',
    title: '부서 필수 교육 수료 D-4',
    summary: '진행중인 부서 필수 교육을 01.22.까지 완료해 주세요.',
    startDate: '생성일 2026.01.02',
    endDate: '마감일 2026.01.22',
    endButton: { label: '교육 받기', icon: 'arrow-up-right', iconPos: 'right' },
  },
  {
    title: '01.19. 고객사 미팅 결과 보고서 작성',
    summary: '01.19. (월) 고객사 미팅 회의록에서 김일도 리더님께 보낼 보고서 초안을 작성했습니다.',
    startDate: '생성일 2026.01.02',
    endDate: '마감일 2026.01.02 11:00',
    share: { avatar: './assets/avatar/female01.jpg', count: '+20' },
    startButton: { label: '미팅 회의록 확인', icon: 'folder' },
    endButton: { label: '보고서 초안 작성', icon: 'folder' },
  },
  {
    title: '법인카드 사용내역 정산 신청',
    summary: '01.20. 12:00에 사용하신 법인카드 사용내역 정산 신청을 하셔야 합니다.',
    startDate: '생성일 2026.01.02',
    endDate: '마감일 2026.01.22',
    endButton: { label: '법인카드 정산 신청', icon: 'ai-star', variant: 'ai' },
  },
  {
    style: 'warning',
    title: '설계지연 알림',
    summary: '이번주 섹션 주간회의 시 팀장님 지시사항으로 금요일까지 처리할 설계지연 건이 9,234톤 있습니다.',
    startDate: '생성일 2026.01.02',
    endDate: '마감일 2026.01.22',
  },
];

/**
 * P-GPT 컴포넌트 HTML
 *
 * Usage:
 *   <script src="components/components.js"></script>
 *   document.querySelector('.layout__right-panel').innerHTML = P_GPT_HTML;
 *   <script src="components/p-gpt.js"></script>  // 채팅 렌더링 + 입력 동작
 *
 * Note:
 *   - 채팅 메시지 데이터(PGPT_MESSAGES) 및 동작은 components/p-gpt.js 에 분리되어 있음
 */

let P_GPT_HTML = '';
P_GPT_HTML += `<div class="p-gpt">`;
P_GPT_HTML +=   `<header class="p-gpt__header">`;
P_GPT_HTML +=     `<div class="p-gpt__logo">`;
P_GPT_HTML +=       `<img class="p-gpt__logo-icon" src="./assets/icons/IconAI-3Star-Color.svg" alt="AI">`;
P_GPT_HTML +=       `<span class="p-gpt__logo-text">P-GPT</span>`;
P_GPT_HTML +=     `</div>`;
P_GPT_HTML +=     `<div class="p-gpt__header-actions">`;
P_GPT_HTML +=       `<button type="button" class="p-gpt__header-btn" data-action="history" aria-label="히스토리">`;
P_GPT_HTML +=         `<span class="p-gpt__header-btn-icon"></span>`;
P_GPT_HTML +=       `</button>`;
P_GPT_HTML +=       `<button type="button" class="p-gpt__header-btn" data-action="edit" aria-label="편집">`;
P_GPT_HTML +=         `<span class="p-gpt__header-btn-icon"></span>`;
P_GPT_HTML +=       `</button>`;
P_GPT_HTML +=       `<button type="button" class="p-gpt__header-btn" data-action="export" aria-label="내보내기">`;
P_GPT_HTML +=         `<span class="p-gpt__header-btn-icon"></span>`;
P_GPT_HTML +=       `</button>`;
P_GPT_HTML +=       `<button type="button" class="p-gpt__header-btn" data-action="close" aria-label="닫기">`;
P_GPT_HTML +=         `<span class="p-gpt__header-btn-icon"></span>`;
P_GPT_HTML +=       `</button>`;
P_GPT_HTML +=     `</div>`;
P_GPT_HTML +=   `</header>`;
P_GPT_HTML +=   `<div class="p-gpt__chat" id="pgptChat"></div>`;
P_GPT_HTML +=   `<footer class="p-gpt__footer">`;
P_GPT_HTML +=     `<div class="p-gpt__input-wrap">`;
P_GPT_HTML +=       `<textarea class="p-gpt__input" placeholder="무엇이든지 물어보세요." rows="1"></textarea>`;
P_GPT_HTML +=       `<div class="p-gpt__input-actions">`;
P_GPT_HTML +=         `<button type="button" class="p-gpt__input-btn" data-action="link" aria-label="링크">`;
P_GPT_HTML +=           `<span class="p-gpt__input-btn-icon"></span>`;
P_GPT_HTML +=         `</button>`;
P_GPT_HTML +=         `<button type="button" class="p-gpt__input-btn" data-action="grid" aria-label="그리드">`;
P_GPT_HTML +=           `<span class="p-gpt__input-btn-icon"></span>`;
P_GPT_HTML +=         `</button>`;
P_GPT_HTML +=       `</div>`;
P_GPT_HTML +=     `</div>`;
P_GPT_HTML +=   `</footer>`;
P_GPT_HTML += `</div>`;


function renderCardTask(card) {
  const showActionbar = Boolean(card.share || card.startButton || card.endButton);

  let html = '';
  html += `<div class="card-task"`;
  if (card.style)            html += ` data-style="${card.style}"`;
  if (!card.share)           html += ` data-show-share="false"`;
  if (!card.update)          html += ` data-show-update="false"`;
  if (!card.startButton)     html += ` data-show-startbutton="false"`;
  if (!showActionbar)        html += ` data-show-actionbar="false"`;
                             html += `>`;
  html +=   `<div class="card-task__block">`;
  html +=     `<div class="card-task__info">`;
  html +=       `<div class="card-task__title-row">`;
  html +=         `<button class="card-task__check" type="button" aria-label="완료 체크">`;
  html +=           `<span class="card-task__check-box"></span>`;
  html +=         `</button>`;
  html +=         `<span class="card-task__title">${card.title}</span>`;
  html +=         `<button class="card-task__delete" type="button" aria-label="삭제">`;
  html +=           `<span class="card-task__delete-icon" aria-hidden="true"></span>`;
  html +=         `</button>`;
  html +=       `</div>`;
  html +=       `<div class="card-task__summary">`;
  html +=         `<span class="card-task__ai-icon" aria-hidden="true"></span>`;
  html +=         `<p class="card-task__summary-text">${card.summary}</p>`;
  html +=       `</div>`;
  html +=     `</div>`;
  html +=     `<div class="card-task__datebar">`;
  html +=       `<div class="card-task__dates">`;
  html +=         `<span class="card-task__date card-task__date--start">${card.startDate}</span>`;
  html +=         `<span class="card-task__date card-task__date--end">${card.endDate}</span>`;
  html +=       `</div>`;
  if (card.update) {
    html +=     `<div class="card-task__update">`;
    html +=       `<span class="card-task__update-dot" aria-hidden="true"></span>`;
    html +=       `<span class="card-task__update-text">${card.update}</span>`;
    html +=     `</div>`;
  }
  html +=     `</div>`;
  if (showActionbar) {
    html +=   `<div class="card-task__actionbar">`;
    if (card.share) {
      html += `<div class="card-task__share">`;
      html +=   `<img class="card-task__share-avatar" src="${card.share.avatar}" alt="">`;
      html +=   `<span class="card-task__share-count">${card.share.count}</span>`;
      html += `</div>`;
    }
    if (card.startButton) {
      html += `<button class="card-task__btn card-task__btn--start" type="button"`;
      if (card.startButton.iconPos) html += ` data-icon-pos="${card.startButton.iconPos}"`;
      if (card.startButton.variant) html += ` data-variant="${card.startButton.variant}"`;
      html += `>`;
      html +=   `<span class="card-task__btn-icon" aria-hidden="true"`;
      if (card.startButton.icon)    html += ` data-icon="${card.startButton.icon}"`;
      html += `></span>`;
      html +=   `<span>${card.startButton.label}</span>`;
      html += `</button>`;
    }
    if (card.endButton) {
      html += `<button class="card-task__btn card-task__btn--end" type="button"`;
      if (card.endButton.iconPos)   html += ` data-icon-pos="${card.endButton.iconPos}"`;
      if (card.endButton.variant)   html += ` data-variant="${card.endButton.variant}"`;
      html += `>`;
      html +=   `<span class="card-task__btn-icon" aria-hidden="true"`;
      if (card.endButton.icon)      html += ` data-icon="${card.endButton.icon}"`;
      html += `></span>`;
      html +=   `<span>${card.endButton.label}</span>`;
      html += `</button>`;
    }
    html +=   `</div>`;
  }
  html +=   `</div>`;
  html += `</div>`;
  return html;
}
