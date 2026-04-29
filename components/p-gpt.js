/**
 * P-GPT Chat renderer + 입력 동작
 *
 * Usage:
 *   <script src="components/components.js"></script>
 *   document.querySelector('.layout__right-panel').innerHTML = P_GPT_HTML;
 *   <script src="components/p-gpt.js"></script>
 *
 * Message types:
 *   - ai-block    : { type:'ai-block', title, desc }
 *   - ai-text     : { type:'ai-text', text }
 *   - ai-questions: { type:'ai-questions', items[] }
 *   - ai-section  : { type:'ai-section', title, desc }
 *   - ai-actions  : { type:'ai-actions' }
 *   - divider     : { type:'divider' }
 *   - user        : { type:'user', text }
 *   - user-short  : { type:'user-short', text }
 */

const PGPT_MESSAGES = [
  { type: 'ai-block', title: '메일 브리핑', desc: '안읽은 메일에 대한 요약 카드입니다.' },
  { type: 'ai-text', text: '안읽은 메일에 대한 요약 카드입니다.\n총 28건의 메일 중 중요도를 선별하여 4건의 메일을 우선적으로\n요약해드렸습니다.' },
  {
    type: 'ai-questions', items: [
      '원하시면 다음 단계로 이어서 답변해드릴게요.',
      '<strong>Q1.</strong> 추가적인 메일을 요약해드릴까요?',
      '<strong>Q2.</strong> 중요도 선별 방법을 수정할까요?',
      '<strong>Q3.</strong> 다른 방식으로 브리핑 카드를 구성할까요?',
    ]
  },
  { type: 'ai-actions' },
  { type: 'user', text: '앞으로 다른 방식으로 브리핑 카드를 받고 싶어. 나는 각각 하나가 어떤 메일이 왔는지는 궁금하지 않아. 받은 메일을 통해 내가 어떤 일을 해야하는지 한눈에 보고 싶어.' },
  { type: 'ai-text', text: '다른 방식으로 \'안읽은 메일 현황\' 브리핑 카드를 받고 싶으시군요.\n어떤 일을 해야하는지 한눈에 볼 수 있도록 정보를 구성해 보았어요.' },
  { type: 'ai-section', title: '안읽은 중요 메일들에 대한 현황', desc: '모든 메일이 아닌 중요 메일에 대한 요약 정보를 제공합니다.\n중여도는 발신자, 내용, 사용자님의 패턴을 기반으로 선정합니다. (중요도 선별 기준을 변경하고 싶으시면 언제든 말해주세요.)' },
  { type: 'ai-section', title: '메일 통합을 통합 인사이트 제공', desc: '개별 메일에 대한 요약이 아닌 유사한 주제의 메일을 묶어서 하나의 인사이트를 제공합니다.' },
  { type: 'ai-actions' },
  { type: 'user-short', text: '좋아, 이렇게 브리핑 카드 재구성해줘' },
];

function renderPgptMessage(msg) {
  let html = '';
  switch (msg.type) {
    case 'ai-block':
      html += `<div class="p-gpt__ai-block">`;
      html += `<span class="p-gpt__ai-block-title">${msg.title}</span>`;
      html += `<span class="p-gpt__ai-block-desc">${msg.desc}</span>`;
      html += `<hr class="p-gpt__divider">`;
      html += `</div>`;
      break;

    case 'divider':
      html += `<hr class="p-gpt__divider">`;
      break;

    case 'ai-text':
      html += `<p class="p-gpt__ai-text">${msg.text.replace(/\n/g, '<br>')}</p>`;
      break;

    case 'ai-questions':
      html += `<div class="p-gpt__ai-questions">`;
      msg.items.forEach(item => {
        html += `<p>${item}</p>`;
      });
      html += `</div>`;
      break;

    case 'ai-section':
      html += `<div class="p-gpt__ai-section">`;
      html += `<span class="p-gpt__ai-section-title">${msg.title}</span>`;
      html += `<div class="p-gpt__ai-section-desc">${msg.desc.split('\n').map(line => `<div class="p-gpt__ai-section-bullet"><span class="p-gpt__ai-section-bullet-dot">•</span><span>${line}</span></div>`).join('')}</div>`;
      html += `</div>`;
      break;

    case 'ai-actions':
      html += `<div class="p-gpt__ai-actions">`;
      html += `<button type="button" class="p-gpt__ai-action-btn" data-action="copy" aria-label="복사">`;
      html += `<span class="p-gpt__ai-action-icon"></span>`;
      html += `</button>`;
      html += `<button type="button" class="p-gpt__ai-action-btn" data-action="spreadsheet" aria-label="스프레드시트">`;
      html += `<span class="p-gpt__ai-action-icon"></span>`;
      html += `</button>`;
      html += `<button type="button" class="p-gpt__ai-action-btn" data-action="upload" aria-label="업로드">`;
      html += `<span class="p-gpt__ai-action-icon"></span>`;
      html += `</button>`;
      html += `<button type="button" class="p-gpt__ai-action-btn" data-action="more" aria-label="더보기">`;
      html += `<span class="p-gpt__ai-action-icon"></span>`;
      html += `</button>`;
      html += `</div>`;
      break;

    case 'user':
      html += `<div class="p-gpt__user-msg">`;
      html += `<p>${msg.text}</p>`;
      html += `</div>`;
      break;

    case 'user-short':
      html += `<div class="p-gpt__user-msg p-gpt__user-msg--short">`;
      html += `<p>${msg.text}</p>`;
      html += `</div>`;
      break;
  }
  return html;
}

(function initPgpt() {
  const chatArea = document.getElementById('pgptChat');
  const chatInput = document.querySelector('.p-gpt__input');
  if (!chatArea || !chatInput) return;

  chatArea.innerHTML = PGPT_MESSAGES.map(renderPgptMessage).join('');

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    const msgEl = document.createElement('div');
    const isShort = text.length <= 30 && !text.includes('\n');
    msgEl.className = isShort
      ? 'p-gpt__user-msg p-gpt__user-msg--short'
      : 'p-gpt__user-msg';
    msgEl.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
    chatArea.appendChild(msgEl);

    chatInput.value = '';
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  chatInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 105) + 'px';
  });

  chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      this.style.height = 'auto';
    }
  });
})();
