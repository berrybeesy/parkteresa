document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js loaded');


  const menuBtn = document.getElementById('menuBtn');
  const header  = document.getElementById('header-anchor');
  const menuIcon = document.getElementById('menuIcon');
  const menuText = document.querySelector('.menu-label');

  menuBtn.addEventListener('click', (e)=>{
    e.preventDefault();                  
    header.classList.toggle('expanded'); 
    const isOpen = header.classList.contains('expanded');
    // 접근성 상태 업데이트
    menuBtn.setAttribute('aria-expanded', String(isOpen));

    // 아이콘/텍스트 스왑
    menuIcon.src = isOpen ? 'assets/icon_close.svg' : 'assets/icon_menu.svg';
    menuIcon.alt = isOpen ? 'Close menu' : 'Open menu';
    menuText.textContent = isOpen ? 'CLOSE' : 'MENU';
  });

  document.querySelector('#header-anchor').addEventListener('click', (e)=>{
    if (e.target.closest('.menu-drop a')) {
      document.querySelector('#header-anchor').classList.remove('expanded');
    }
  });

  const modal   = document.getElementById('pdfModal');
  const iframe  = document.getElementById('pdfFrame');
  const closeBtn = modal.querySelector('.modal__close');
  let lastFocusedEl = null;

  // pdf modal
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('a[data-pdf]');
    if (!trigger) return;

    e.preventDefault();
    lastFocusedEl = trigger;

    const url = trigger.getAttribute('data-pdf');
    iframe.src = url + '#zoom=page-fit&toolbar=0&navpanes=0&statusbar=0&messages=0';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('body-lock');
    closeBtn.focus();
  });

  function closePdfModal(){
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('body-lock');
    iframe.src = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  closeBtn.addEventListener('click', closePdfModal);
  modal.addEventListener('mousedown', (e)=>{ if (e.target === modal) closePdfModal(); });
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closePdfModal();
  });
});
