// Shared app JS: navigation, login simulation, wiring
(function(){
  const pages = [
    '00-login.html','01-design-system.html','02-global-components.html','03-screens-executive.html','04-screens-hr.html','05-screens-committee.html','06-screens-finance.html','07-screens-audit.html','08-screens-payroll.html','09-reports-exports.html','10-admin-settings.html','11-prototype-flow.html'
  ];

  function setupNav(){
    document.querySelectorAll('.page-link').forEach(el=>{
      el.addEventListener('click',e=>{
        const href = el.dataset.href || '#';
        if(href && href!==window.location.pathname.split('/').pop()) window.location.href = href;
      });
    });

    // device rail buttons
    document.querySelectorAll('.rail .btn[data-href]').forEach(b=>b.addEventListener('click',e=>{
      const h = b.dataset.href; if(h) window.location.href = h;
    }));

    // topbar title clicks to go home
    document.querySelectorAll('.topbar .title').forEach(t=>t.addEventListener('click',()=>{
      window.location.href = '03-screens-executive.html';
    }));
  }

  function setupLogin(){
    const form = document.getElementById('login-form');
    if(!form) return;
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const user = form.username.value.trim();
      const pass = form.password.value.trim();
      if(user==='demo' && pass==='demo'){
        // store session (simulated)
        sessionStorage.setItem('boss-role','Executive');
        window.location.href = '03-screens-executive.html';
      } else {
        const err = document.getElementById('login-error');
        err.textContent = 'Invalid demo credentials — use demo / demo';
      }
    });
  }

  function applyRole(){
    const role = sessionStorage.getItem('boss-role') || 'Executive';
    document.querySelectorAll('.role-label').forEach(el=>el.textContent = role);
    // highlight executive rail item for demo
    const payrollBtn = document.querySelector('.rail .btn[data-key="payroll"]');
    if(payrollBtn) payrollBtn.classList.add('active');
  }

  document.addEventListener('DOMContentLoaded',()=>{ setupNav(); setupLogin(); applyRole(); });
})();
