document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded');
  
    const modal   = document.getElementById('pdfModal');
    const iframe  = document.getElementById('pdfFrame');
    const closeBtn = modal.querySelector('.modal__close');
  
    let lastFocusedEl = null;
  
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
  