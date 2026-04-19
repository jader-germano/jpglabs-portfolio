/* openClaude Hub — prototype interactions
 * Plain JS, no deps. Only light UX wiring.
 */
(() => {
  const root = document.documentElement;
  const app = document.getElementById('app');

  // --- Theme toggle (persists in localStorage) ---
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const setTheme = (mode) => {
    if (mode === 'dark') {
      root.classList.add('darkTheme');
      themeIcon.innerHTML = '<use href="#i-sun"/>';
      themeBtn.setAttribute('aria-label', 'Switch to light theme');
    } else {
      root.classList.remove('darkTheme');
      themeIcon.innerHTML = '<use href="#i-moon"/>';
      themeBtn.setAttribute('aria-label', 'Switch to dark theme');
    }
    try { localStorage.setItem('openclaude.theme', mode); } catch (_) {}
  };
  const saved = (() => { try { return localStorage.getItem('openclaude.theme'); } catch (_) { return null; } })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (prefersDark ? 'dark' : 'light'));
  themeBtn.addEventListener('click', () => {
    setTheme(root.classList.contains('darkTheme') ? 'light' : 'dark');
  });

  // --- Sidebar collapse ---
  const sidebarToggle = document.getElementById('toggleSidebar');
  sidebarToggle.addEventListener('click', () => {
    app.classList.toggle('is-collapsed');
  });

  // --- Model picker ---
  const picker = document.getElementById('modelPicker');
  const modelBtn = document.getElementById('modelBtn');
  const modelLabel = document.getElementById('modelLabel');
  const options = picker.querySelectorAll('.model-option');

  modelBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = picker.classList.toggle('is-open');
    modelBtn.setAttribute('aria-expanded', String(open));
  });
  options.forEach((opt) => {
    opt.addEventListener('click', () => {
      options.forEach((o) => o.classList.remove('is-selected'));
      opt.classList.add('is-selected');
      modelLabel.textContent = opt.dataset.label || opt.textContent.trim();
      picker.classList.remove('is-open');
      modelBtn.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', (e) => {
    if (!picker.contains(e.target)) {
      picker.classList.remove('is-open');
      modelBtn.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') picker.classList.remove('is-open');
  });

  // --- Mode tabs (Chat / Agent) ---
  document.querySelectorAll('.mode-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.mode-tab').forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
    });
  });

  // --- Conversation list (just a visual toggle) ---
  document.querySelectorAll('.conv').forEach((c) => {
    c.addEventListener('click', () => {
      document.querySelectorAll('.conv').forEach((x) => x.classList.remove('is-active'));
      c.classList.add('is-active');
    });
  });

  // --- Auto-grow textarea ---
  const input = document.getElementById('input');
  const autoGrow = () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 220) + 'px';
  };
  input.addEventListener('input', autoGrow);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // No-op for prototype — would submit here.
      input.value = '';
      autoGrow();
    }
  });
})();
