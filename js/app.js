// App Module - Main Application Controller
const App = {
  currentTab: 'goals',
  undoStack: [], // For undo delete feature
  tabKeys: ['goals', 'skills', 'interviews', 'offers', 'resumes'],

  // Theme definitions - Inspired by top products
  themes: [
    // Discord-inspired dark theme with blurple accents
    { id: 'discord', label: 'Discord', icon: '🎮', vars: {
      '--bg-primary': '#1E1F22', '--bg-surface': '#2B2D31', '--bg-surface-hover': '#35373C',
      '--bg-surface-light': '#313338', '--color-primary': '#5865F2', '--color-primary-hover': '#4752C4',
      '--color-primary-light': 'rgba(88, 101, 242, 0.15)', '--text-primary': '#F2F3F5',
      '--text-secondary': '#B5BAC1', '--text-muted': '#6D6F78', '--border-color': '#3F4147'
    }},
    // Notion-inspired clean light theme
    { id: 'notion', label: 'Notion', icon: '📝', vars: {
      '--bg-primary': '#FFFFFF', '--bg-surface': '#FBFBFA', '--bg-surface-hover': '#F1F1EF',
      '--bg-surface-light': '#E8E8E5', '--color-primary': '#2383E2', '--color-primary-hover': '#1B6EC2',
      '--color-primary-light': 'rgba(35, 131, 226, 0.08)', '--text-primary': '#191919',
      '--text-secondary': '#5A5A5A', '--text-muted': '#9B9A97', '--border-color': '#E8E8E5'
    }},
    // Spotify-inspired dark with green
    { id: 'spotify', label: 'Spotify', icon: '🎵', vars: {
      '--bg-primary': '#121212', '--bg-surface': '#1E1E1E', '--bg-surface-hover': '#282828',
      '--bg-surface-light': '#2A2A2A', '--color-primary': '#1DB954', '--color-primary-hover': '#1AA34A',
      '--color-primary-light': 'rgba(29, 185, 84, 0.15)', '--text-primary': '#FFFFFF',
      '--text-secondary': '#B3B3B3', '--text-muted': '#6A6A6A', '--border-color': '#333333'
    }},
    // GitHub dark - the modern dimmed look
    { id: 'github', label: 'GitHub', icon: '🐙', vars: {
      '--bg-primary': '#0D1117', '--bg-surface': '#161B22', '--bg-surface-hover': '#21262D',
      '--bg-surface-light': '#1C2128', '--color-primary': '#58A6FF', '--color-primary-hover': '#79C0FF',
      '--color-primary-light': 'rgba(88, 166, 255, 0.12)', '--text-primary': '#E6EDF3',
      '--text-secondary': '#8B949E', '--text-muted': '#6E7681', '--border-color': '#30363D'
    }},
    // Linear-inspired sleek purple
    { id: 'linear', label: 'Linear', icon: '⚡', vars: {
      '--bg-primary': '#111113', '--bg-surface': '#1A1A1F', '--bg-surface-hover': '#232329',
      '--bg-surface-light': '#1F1F25', '--color-primary': '#7C5CFC', '--color-primary-hover': '#6B4EE0',
      '--color-primary-light': 'rgba(124, 92, 252, 0.12)', '--text-primary': '#EDEDEF',
      '--text-secondary': '#8A8A95', '--text-muted': '#5C5C66', '--border-color': '#2C2C35'
    }},
    // Vercel-inspired minimal black & white
    { id: 'vercel', label: 'Vercel', icon: '▲', vars: {
      '--bg-primary': '#000000', '--bg-surface': '#111111', '--bg-surface-hover': '#1A1A1A',
      '--bg-surface-light': '#171717', '--color-primary': '#FFFFFF', '--color-primary-hover': '#E5E5E5',
      '--color-primary-light': 'rgba(255, 255, 255, 0.08)', '--text-primary': '#EDEDED',
      '--text-secondary': '#A1A1A1', '--text-muted': '#666666', '--border-color': '#2E2E2E'
    }},
    // Figma-inspired warm light with purple
    { id: 'figma', label: 'Figma', icon: '🎨', vars: {
      '--bg-primary': '#F5F5F5', '--bg-surface': '#FFFFFF', '--bg-surface-hover': '#F0F0F0',
      '--bg-surface-light': '#E8E8E8', '--color-primary': '#A259FF', '--color-primary-hover': '#8B3FE0',
      '--color-primary-light': 'rgba(162, 89, 255, 0.1)', '--text-primary': '#1E1E1E',
      '--text-secondary': '#5F5F5F', '--text-muted': '#999999', '--border-color': '#E5E5E5'
    }},
    // Slack-inspired cozy dark with cyan
    { id: 'slack', label: 'Slack', icon: '💬', vars: {
      '--bg-primary': '#1A1D21', '--bg-surface': '#222529', '--bg-surface-hover': '#2C2F33',
      '--bg-surface-light': '#272A2E', '--color-primary': '#36C5F0', '--color-primary-hover': '#2EB0D6',
      '--color-primary-light': 'rgba(54, 197, 240, 0.12)', '--text-primary': '#F8F8F8',
      '--text-secondary': '#ABABAD', '--text-muted': '#6B6B6D', '--border-color': '#35383C'
    }},
    // Twitter/X dark mode
    { id: 'twitter', label: 'X (Twitter)', icon: '𝕏', vars: {
      '--bg-primary': '#15202B', '--bg-surface': '#192734', '--bg-surface-hover': '#22303C',
      '--bg-surface-light': '#1E2C3A', '--color-primary': '#1D9BF0', '--color-primary-hover': '#1A8CD8',
      '--color-primary-light': 'rgba(29, 155, 240, 0.12)', '--text-primary': '#E7E9EA',
      '--text-secondary': '#8899A6', '--text-muted': '#6E767D', '--border-color': '#2F3336'
    }},
    // VS Code dark+ theme
    { id: 'vscode', label: 'VS Code', icon: '💻', vars: {
      '--bg-primary': '#1E1E1E', '--bg-surface': '#252526', '--bg-surface-hover': '#2D2D2D',
      '--bg-surface-light': '#333333', '--color-primary': '#007ACC', '--color-primary-hover': '#1A8FDB',
      '--color-primary-light': 'rgba(0, 122, 204, 0.15)', '--text-primary': '#D4D4D4',
      '--text-secondary': '#9CDCFE', '--text-muted': '#6A9955', '--border-color': '#3E3E3E'
    }},
    // Image-based themes
    { id: 'sunrise', label: 'Sunrise Office', icon: '🌅', bg: 'assets/bg-sunrise.svg', vars: {
      '--bg-primary': 'rgba(10, 10, 10, 0.75)', '--bg-surface': 'rgba(20, 15, 30, 0.85)', '--bg-surface-hover': 'rgba(40, 30, 50, 0.85)',
      '--bg-surface-light': 'rgba(30, 20, 40, 0.85)', '--color-primary': '#FB8500', '--color-primary-hover': '#E85D04',
      '--color-primary-light': 'rgba(251, 133, 0, 0.15)', '--text-primary': '#FFF7ED',
      '--text-secondary': '#FDBA74', '--text-muted': '#8B7355', '--border-color': 'rgba(251, 133, 0, 0.2)'
    }},
    { id: 'citynight', label: 'City Night', icon: '🌃', bg: 'assets/bg-citynight.svg', vars: {
      '--bg-primary': 'rgba(2, 0, 36, 0.7)', '--bg-surface': 'rgba(9, 9, 121, 0.4)', '--bg-surface-hover': 'rgba(15, 15, 60, 0.6)',
      '--bg-surface-light': 'rgba(10, 10, 46, 0.6)', '--color-primary': '#00D4FF', '--color-primary-hover': '#00B8E6',
      '--color-primary-light': 'rgba(0, 212, 255, 0.12)', '--text-primary': '#E8F4FD',
      '--text-secondary': '#87CEEB', '--text-muted': '#5B8BA0', '--border-color': 'rgba(0, 212, 255, 0.15)'
    }},
    { id: 'focus', label: 'Focus Mode', icon: '🧠', bg: 'assets/bg-focus.svg', vars: {
      '--bg-primary': 'rgba(10, 10, 15, 0.8)', '--bg-surface': 'rgba(26, 26, 46, 0.85)', '--bg-surface-hover': 'rgba(35, 35, 55, 0.85)',
      '--bg-surface-light': 'rgba(30, 30, 50, 0.85)', '--color-primary': '#5865F2', '--color-primary-hover': '#4752C4',
      '--color-primary-light': 'rgba(88, 101, 242, 0.15)', '--text-primary': '#EDEDEF',
      '--text-secondary': '#8A8AFF', '--text-muted': '#5C5C8A', '--border-color': 'rgba(88, 101, 242, 0.2)'
    }},
    { id: 'coffee', label: 'Coffee Shop', icon: '☕', bg: 'assets/bg-coffee.svg', vars: {
      '--bg-primary': 'rgba(26, 15, 10, 0.8)', '--bg-surface': 'rgba(45, 31, 20, 0.85)', '--bg-surface-hover': 'rgba(61, 43, 31, 0.85)',
      '--bg-surface-light': 'rgba(50, 35, 24, 0.85)', '--color-primary': '#D4A574', '--color-primary-hover': '#C4956A',
      '--color-primary-light': 'rgba(212, 165, 116, 0.15)', '--text-primary': '#F5E6D3',
      '--text-secondary': '#D4A574', '--text-muted': '#8B7355', '--border-color': 'rgba(212, 165, 116, 0.2)'
    }}
  ],

  // Initialize application
  init() {
    this.loadTheme();
    this.bindNavigation();
    this.bindModals();
    this.bindSettings();
    this.bindKeyboardShortcuts();
    this.switchTab('goals');
    Chatbot.init();
  },

  // Load saved theme
  loadTheme() {
    const savedTheme = Storage.get('theme') || 'discord';
    this.applyTheme(savedTheme);
  },

  // Apply theme by id
  applyTheme(themeId) {
    const theme = this.themes.find(t => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });

    // Handle background image themes
    if (theme.bg) {
      document.body.classList.add('has-bg-image');
      document.body.style.backgroundImage = `url('${theme.bg}')`;
    } else {
      document.body.classList.remove('has-bg-image');
      document.body.style.backgroundImage = '';
    }

    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = theme.icon;

    Storage.set('theme', themeId);
  },

  // Cycle to next theme
  cycleTheme() {
    const current = Storage.get('theme') || 'dark';
    const currentIndex = this.themes.findIndex(t => t.id === current);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.applyTheme(this.themes[nextIndex].id);
    this.showToast(`Theme: ${this.themes[nextIndex].label}`, 'info');
  },

  // ==================== KEYBOARD SHORTCUTS ====================
  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger shortcuts when typing in input/textarea
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      // Don't trigger if modal is open
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal && e.key !== 'Escape') return;

      // Ctrl+K or Cmd+K = Global search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openGlobalSearch();
        return;
      }

      // Number keys 1-5 = switch tabs
      if (e.key >= '1' && e.key <= '5') {
        const index = parseInt(e.key) - 1;
        if (this.tabKeys[index]) {
          this.switchTab(this.tabKeys[index]);
        }
        return;
      }

      // N = new item in current tab
      if (e.key === 'n' || e.key === 'N') {
        this.createNewInCurrentTab();
        return;
      }

      // T = cycle theme
      if (e.key === 't' || e.key === 'T') {
        this.cycleTheme();
        return;
      }
    });
  },

  // Create new item based on current tab
  createNewInCurrentTab() {
    switch (this.currentTab) {
      case 'skills': Skills.openCreateModal(); break;
      case 'interviews': Interviews.openCreateModal(); break;
      case 'offers': Offers.openCreateModal(); break;
      case 'resumes': Resumes.openCreateModal(); break;
    }
  },

  // ==================== GLOBAL SEARCH ====================
  openGlobalSearch() {
    const existing = document.getElementById('global-search-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'global-search-overlay';
    overlay.className = 'global-search-overlay active';
    overlay.innerHTML = `
      <div class="global-search-box">
        <div class="global-search-input-row">
          <span class="global-search-icon">🔍</span>
          <input type="text" id="global-search-input" class="global-search-input" placeholder="Search skills, companies, offers..." autofocus>
          <span class="global-search-hint">Esc to close</span>
        </div>
        <div id="global-search-results" class="global-search-results"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById('global-search-input');
    input.addEventListener('input', () => this.performGlobalSearch(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') overlay.remove();
    });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    setTimeout(() => input.focus(), 50);
  },

  // Perform search across all data
  performGlobalSearch(query) {
    const results = document.getElementById('global-search-results');
    if (!results) return;

    if (!query.trim()) {
      results.innerHTML = '<div class="global-search-empty">Type to search across all tabs...</div>';
      return;
    }

    const q = query.toLowerCase().trim();
    const matches = [];

    // Search skills
    Storage.getSkills().forEach(s => {
      if (s.name.toLowerCase().includes(q) || (s.description || '').toLowerCase().includes(q)) {
        matches.push({ type: 'Skill', icon: '🚀', name: s.name, sub: s.column, tab: 'skills' });
      }
    });

    // Search interviews
    Storage.getInterviews().forEach(i => {
      if (i.company.toLowerCase().includes(q) || (i.role || '').toLowerCase().includes(q)) {
        matches.push({ type: 'Interview', icon: '📄', name: i.company, sub: i.role || i.column, tab: 'interviews' });
      }
    });

    // Search offers
    Storage.getOffers().forEach(o => {
      if (o.company.toLowerCase().includes(q) || (o.role || '').toLowerCase().includes(q)) {
        matches.push({ type: 'Offer', icon: '💰', name: o.company, sub: o.role || o.salary, tab: 'offers' });
      }
    });

    // Search resumes
    (Storage.get('resumes') || []).forEach(r => {
      if ((r.company || '').toLowerCase().includes(q) || (r.fileName || '').toLowerCase().includes(q)) {
        matches.push({ type: 'Resume', icon: '📝', name: r.fileName || r.company, sub: r.company, tab: 'resumes' });
      }
    });

    if (matches.length === 0) {
      results.innerHTML = `<div class="global-search-empty">No results for "${Storage.escapeHtml(query)}"</div>`;
      return;
    }

    results.innerHTML = matches.slice(0, 10).map(m => `
      <div class="global-search-item" onclick="App.searchNavigate('${m.tab}')">
        <span class="global-search-item-icon">${m.icon}</span>
        <div class="global-search-item-info">
          <span class="global-search-item-name">${Storage.escapeHtml(m.name)}</span>
          <span class="global-search-item-sub">${Storage.escapeHtml(m.sub || '')}</span>
        </div>
        <span class="global-search-item-type">${m.type}</span>
      </div>
    `).join('');
  },

  // Navigate from search result
  searchNavigate(tab) {
    const overlay = document.getElementById('global-search-overlay');
    if (overlay) overlay.remove();
    this.switchTab(tab);
  },

  // ==================== UNDO DELETE ====================
  showUndoToast(message, undoCallback) {
    // Remove any existing undo toast
    const existing = document.querySelector('.undo-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'undo-toast';
    toast.innerHTML = `
      <span class="undo-toast-message">${message}</span>
      <button class="undo-toast-btn" id="undo-btn">Undo</button>
      <span class="undo-toast-timer" id="undo-timer">10s</span>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('active'));

    let secondsLeft = 10;
    const timer = setInterval(() => {
      secondsLeft--;
      const timerEl = document.getElementById('undo-timer');
      if (timerEl) timerEl.textContent = secondsLeft + 's';
      if (secondsLeft <= 0) {
        clearInterval(timer);
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 300);
      }
    }, 1000);

    document.getElementById('undo-btn').addEventListener('click', () => {
      clearInterval(timer);
      undoCallback();
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 300);
      this.showToast('Restored!', 'success');
    });
  },

  // Bind navigation tab switching
  bindNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        this.switchTab(tabId);
      });
    });
  },

  // Switch active tab
  switchTab(tabId) {
    this.currentTab = tabId;

    // Update tab buttons
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabId);
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabId}`);
    });

    // Initialize the respective module
    switch (tabId) {
      case 'goals': Goals.init(); break;
      case 'skills': Skills.init(); break;
      case 'interviews': Interviews.init(); break;
      case 'offers': Offers.init(); break;
      case 'resumes': Resumes.init(); break;
    }
  },

  // Bind modal close events
  bindModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close global search first
        const search = document.getElementById('global-search-overlay');
        if (search) { search.remove(); return; }
        // Then close modals
        document.querySelectorAll('.modal-overlay.active').forEach(modal => modal.classList.remove('active'));
      }
    });
  },

  // Bind settings form
  bindSettings() {
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveSettings();
      });
      this.loadSettings();
    }
  },

  // Load settings into form
  loadSettings() {
    const settings = Storage.getSettings();
    const nameInput = document.getElementById('settings-name');
    const goalInput = document.getElementById('settings-goal');
    const salaryInput = document.getElementById('settings-salary');
    const dateInput = document.getElementById('settings-date');

    if (nameInput) nameInput.value = settings.userName || '';
    if (goalInput) goalInput.value = settings.primaryGoal || '';
    if (salaryInput) salaryInput.value = settings.targetSalary || '';
    if (dateInput) dateInput.value = settings.targetDate || '';
  },

  // Save settings
  saveSettings() {
    const settings = Storage.getSettings();
    settings.userName = document.getElementById('settings-name').value.trim() || 'User';
    settings.primaryGoal = document.getElementById('settings-goal').value.trim();
    settings.targetSalary = document.getElementById('settings-salary').value.trim();
    settings.targetDate = document.getElementById('settings-date').value;
    Storage.saveSettings(settings);

    if (this.currentTab === 'goals') Goals.renderWelcome();
    this.closeProfileModal();
    this.showToast('Settings saved successfully!');
  },

  // Show toast notification
  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed; bottom: 24px; right: 24px;
      background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-danger)' : 'var(--color-primary)'};
      color: white; padding: 12px 24px; border-radius: var(--border-radius-sm);
      font-size: 0.9rem; font-weight: 500; box-shadow: var(--shadow-lg);
      z-index: 9999; animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // Show styled alert popup
  showAlert(message, type = 'warning') {
    return new Promise((resolve) => {
      // Remove any existing popup overlays to prevent stacking
      document.querySelectorAll('.popup-overlay').forEach(el => el.remove());
      const overlay = document.createElement('div');
      overlay.className = 'popup-overlay';
      const configs = {
        error: { icon: '🚫', title: 'Oops!', color: 'var(--color-danger)', bg: 'var(--color-danger-light)' },
        success: { icon: '🎉', title: 'Great!', color: 'var(--color-success)', bg: 'var(--color-success-light)' },
        warning: { icon: '💡', title: 'Heads up', color: 'var(--color-warning)', bg: 'var(--color-warning-light)' },
        info: { icon: '📌', title: 'Just so you know', color: 'var(--color-primary)', bg: 'var(--color-primary-light)' }
      };
      const cfg = configs[type] || configs.warning;
      overlay.innerHTML = `
        <div class="popup-box">
          <div class="popup-icon-wrapper" style="background: ${cfg.bg}; color: ${cfg.color}">
            <span class="popup-icon">${cfg.icon}</span>
          </div>
          <div class="popup-title" style="color: ${cfg.color}">${cfg.title}</div>
          <div class="popup-message">${message}</div>
          <div class="popup-actions"><button class="btn btn-primary popup-btn-ok">Got it</button></div>
        </div>
      `;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('active'));
      const close = () => { overlay.classList.remove('active'); setTimeout(() => overlay.remove(), 200); resolve(); };
      overlay.querySelector('.popup-btn-ok').addEventListener('click', close);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    });
  },

  // Show styled confirm popup
  showConfirm(message) {
    return new Promise((resolve) => {
      // Remove any existing popup overlays to prevent stacking
      document.querySelectorAll('.popup-overlay').forEach(el => el.remove());
      const overlay = document.createElement('div');
      overlay.className = 'popup-overlay';
      overlay.innerHTML = `
        <div class="popup-box">
          <div class="popup-icon-wrapper" style="background: var(--color-warning-light); color: var(--color-warning)">
            <span class="popup-icon">🤔</span>
          </div>
          <div class="popup-title" style="color: var(--color-warning)">Are you sure?</div>
          <div class="popup-message">${message}</div>
          <div class="popup-actions">
            <button class="btn btn-ghost popup-btn-cancel">Cancel</button>
            <button class="btn btn-danger popup-btn-confirm">Confirm</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('active'));
      const close = (result) => { overlay.classList.remove('active'); setTimeout(() => overlay.remove(), 200); resolve(result); };
      overlay.querySelector('.popup-btn-confirm').addEventListener('click', () => close(true));
      overlay.querySelector('.popup-btn-cancel').addEventListener('click', () => close(false));
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false); });
    });
  },

  openProfileModal() { this.loadSettings(); document.getElementById('profile-modal').classList.add('active'); },
  closeProfileModal() { document.getElementById('profile-modal').classList.remove('active'); },

  // Export data
  exportData() {
    const data = {
      goals: Storage.getGoals(), skills: Storage.getSkills(),
      interviews: Storage.getInterviews(), offers: Storage.getOffers(),
      resumes: Storage.get('resumes') || [], settings: Storage.getSettings(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-prep-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Data exported successfully!');
  },

  // Import data
  importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.goals) Storage.saveGoals(data.goals);
          if (data.skills) Storage.saveSkills(data.skills);
          if (data.interviews) Storage.saveInterviews(data.interviews);
          if (data.offers) Storage.saveOffers(data.offers);
          if (data.resumes) Storage.set('resumes', data.resumes);
          if (data.settings) Storage.saveSettings(data.settings);
          this.showToast('Data imported successfully!');
          this.switchTab(this.currentTab);
          this.loadSettings();
        } catch (err) {
          this.showToast('Invalid file format', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  },

  // Reset all data
  async resetData() {
    const first = await this.showConfirm('This will erase all your data including skills, interviews, offers, and resumes. This cannot be undone.');
    if (!first) return;
    const second = await this.showConfirm('Last chance! All your progress and data will be permanently deleted. Are you absolutely sure?');
    if (!second) return;
    Storage.clearAll();
    this.loadSettings();
    this.switchTab(this.currentTab);
    this.showToast('All data has been reset');
  }
};

// Toggle More Options in modals
function toggleMoreOptions(btn) {
  const content = btn.nextElementSibling;
  const isExpanded = content.classList.contains('expanded');

  if (isExpanded) {
    content.classList.remove('expanded');
    btn.classList.remove('expanded');
    btn.innerHTML = '<span class="toggle-icon">▼</span> More Options';
  } else {
    content.classList.add('expanded');
    btn.classList.add('expanded');
    btn.innerHTML = '<span class="toggle-icon">▲</span> Less Options';
  }
}

// Expand or collapse the more-options section within a modal
function setMoreOptions(modalId, expand) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  const btn = modal.querySelector('.more-options-toggle');
  const content = modal.querySelector('.more-options-content');
  if (!btn || !content) return;

  if (expand) {
    content.classList.add('expanded');
    btn.classList.add('expanded');
    btn.innerHTML = '<span class="toggle-icon">▲</span> Less Options';
  } else {
    content.classList.remove('expanded');
    btn.classList.remove('expanded');
    btn.innerHTML = '<span class="toggle-icon">▼</span> More Options';
  }
}

// Company name auto-suggest helper
function setupCompanySuggest(inputId, suggestionsId) {
  const input = document.getElementById(inputId);
  const container = document.getElementById(suggestionsId);
  if (!input || !container) return;

  input.addEventListener('input', () => {
    const suggestions = CompanyData.getSuggestions(input.value);
    if (suggestions.length === 0) {
      container.classList.add('hidden');
      return;
    }
    container.innerHTML = suggestions.map(c => `
      <div class="skill-suggestion-item" onmousedown="document.getElementById('${inputId}').value='${c.name.replace(/'/g, "\\'")}'; document.getElementById('${suggestionsId}').classList.add('hidden')">
        <span class="skill-suggestion-item-name">${Storage.escapeHtml(c.name)}</span>
        <span class="skill-suggestion-item-meta">${c.sector}</span>
      </div>
    `).join('');
    container.classList.remove('hidden');
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length >= 2) {
      input.dispatchEvent(new Event('input'));
    }
  });

  input.addEventListener('blur', () => {
    setTimeout(() => container.classList.add('hidden'), 150);
  });
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  seedSampleData();
  migrateToRupees();
  App.init();

  // Setup company auto-suggest on all company inputs
  setupCompanySuggest('interview-company', 'interview-company-suggestions');
  setupCompanySuggest('offer-company', 'offer-company-suggestions');
  setupCompanySuggest('resume-company', 'resume-company-suggestions');
});
