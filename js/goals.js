// Goals Module - Dashboard Widgets
const Goals = {
  quoteInterval: null,

  // Initialize goals module
  init() {
    this.render();
    this.startQuoteRotation();
  },

  // Render the entire goals dashboard
  render() {
    this.renderWelcome();
    this.renderMetrics();
    this.renderUpcoming();
    this.renderMotivation();
    this.renderFocus();
    this.renderReadiness();
    this.renderOnboarding();
  },

  // Show onboarding when no data exists
  renderOnboarding() {
    const skills = Storage.getSkills();
    const interviews = Storage.getInterviews();
    const offers = Storage.getOffers();
    const resumes = Storage.get('resumes') || [];
    if (skills.length > 0 || interviews.length > 0 || offers.length > 0 || resumes.length > 0) return;

    const container = document.getElementById('metrics-grid');
    if (!container) return;
    container.innerHTML = `
      <div class="onboarding-banner">
        <div class="onboarding-title">🚀 Welcome! Let's get started</div>
        <div class="onboarding-steps">
          <div class="onboarding-step" onclick="App.switchTab('skills')">
            <span class="onboarding-step-num">1</span>
            <span class="onboarding-step-text">Add skills you want to master</span>
            <span class="onboarding-step-arrow">→</span>
          </div>
          <div class="onboarding-step" onclick="App.switchTab('interviews')">
            <span class="onboarding-step-num">2</span>
            <span class="onboarding-step-text">Target companies to apply</span>
            <span class="onboarding-step-arrow">→</span>
          </div>
          <div class="onboarding-step" onclick="App.switchTab('resumes')">
            <span class="onboarding-step-num">3</span>
            <span class="onboarding-step-text">Upload your resume</span>
            <span class="onboarding-step-arrow">→</span>
          </div>
          <div class="onboarding-step" onclick="App.openProfileModal()">
            <span class="onboarding-step-num">4</span>
            <span class="onboarding-step-text">Set your goal & target salary</span>
            <span class="onboarding-step-arrow">→</span>
          </div>
        </div>
      </div>
    `;
  },

  // Start auto-rotating quotes every 30 seconds
  startQuoteRotation() {
    if (this.quoteInterval) clearInterval(this.quoteInterval);
    this.quoteInterval = setInterval(() => {
      this.renderMotivation();
    }, 30000);
  },

  // Render welcome section with progress bar
  renderWelcome() {
    const settings = Storage.getSettings();
    const container = document.getElementById('welcome-section');
    if (!container) return;

    const hour = new Date().getHours();
    let greeting = 'Good Evening';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 17) greeting = 'Good Afternoon';

    const targetDate = settings.targetDate ? new Date(settings.targetDate) : null;
    const daysRemaining = targetDate ? Math.max(0, Math.ceil((targetDate - new Date()) / (1000 * 60 * 60 * 24))) : null;

    // Urgency color for days remaining
    let daysClass = '';
    let daysDisplay = '—';
    if (daysRemaining !== null) {
      daysDisplay = daysRemaining;
      if (daysRemaining <= 7) daysClass = 'urgency-critical';
      else if (daysRemaining <= 30) daysClass = 'urgency-warning';
      else daysClass = 'urgency-safe';
    }

    // Overall journey progress
    const readiness = Analytics.calculateReadiness();
    const overallProgress = readiness.total;

    // Last activity
    const lastActivity = Storage.get('lastActivity');
    let lastActiveText = 'Just now';
    if (lastActivity) {
      const diff = Date.now() - new Date(lastActivity).getTime();
      const mins = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);
      if (days > 0) lastActiveText = `${days}d ago`;
      else if (hours > 0) lastActiveText = `${hours}h ago`;
      else if (mins > 0) lastActiveText = `${mins}m ago`;
      else lastActiveText = 'Just now';
    }

    container.innerHTML = `
      <div class="welcome-greeting">${greeting}, <span>${settings.userName}</span> 👋</div>
      <div class="welcome-meta">
        <div class="welcome-meta-item">
          <span class="welcome-meta-label">Primary Goal</span>
          <span class="welcome-meta-value">${settings.primaryGoal || 'Not set'}</span>
        </div>
        <div class="welcome-meta-item">
          <span class="welcome-meta-label">Target Salary</span>
          <span class="welcome-meta-value">${settings.targetSalary || 'Not set'}</span>
        </div>
        <div class="welcome-meta-item">
          <span class="welcome-meta-label">Target Date</span>
          <span class="welcome-meta-value">${targetDate ? targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not set'}</span>
        </div>
        <div class="welcome-meta-item">
          <span class="welcome-meta-label">Days Remaining</span>
          <span class="welcome-meta-value ${daysClass}">${daysDisplay}</span>
        </div>
        <div class="welcome-meta-item">
          <span class="welcome-meta-label">Last Active</span>
          <span class="welcome-meta-value">${lastActiveText}</span>
        </div>
      </div>
      <div class="welcome-progress">
        <div class="welcome-progress-header">
          <span class="welcome-progress-label">Overall Journey</span>
          <span class="welcome-progress-value">${overallProgress}%</span>
        </div>
        <div class="progress-bar" style="height: 5px">
          <div class="progress-bar-fill ${overallProgress >= 70 ? 'success' : overallProgress >= 40 ? 'warning' : ''}" style="width: ${overallProgress}%"></div>
        </div>
      </div>
    `;
  },

  // Render clickable metrics that jump to relevant tabs
  renderMetrics() {
    const container = document.getElementById('metrics-grid');
    if (!container) return;

    const skills = Storage.getSkills();
    const interviews = Storage.getInterviews();
    const offers = Storage.getOffers();

    const skillsInProgress = skills.filter(s => s.column === 'learning' || s.column === 'practicing').length;
    const skillsReady = skills.filter(s => s.column === 'interview-ready' || s.column === 'mastered').length;
    const activeApps = interviews.filter(i => i.column !== 'rejected' && i.column !== 'selected').length;
    const activeInterviews = interviews.filter(i => ['hr-screening', 'technical-1', 'technical-2', 'manager', 'final'].includes(i.column)).length;
    const offersReceived = offers.length;

    container.innerHTML = `
      <div class="metric-card metric-clickable" onclick="App.switchTab('skills')" title="Go to Skills">
        <div class="metric-icon warning">🚀</div>
        <div class="metric-info">
          <span class="metric-value">${skillsInProgress}</span>
          <span class="metric-label">Skills In Progress</span>
        </div>
      </div>
      <div class="metric-card metric-clickable" onclick="App.switchTab('skills')" title="Go to Skills">
        <div class="metric-icon success">✅</div>
        <div class="metric-info">
          <span class="metric-value">${skillsReady}</span>
          <span class="metric-label">Skills Ready</span>
        </div>
      </div>
      <div class="metric-card metric-clickable" onclick="App.switchTab('interviews')" title="Go to Pipeline">
        <div class="metric-icon primary">📄</div>
        <div class="metric-info">
          <span class="metric-value">${activeApps}</span>
          <span class="metric-label">Applications Active</span>
        </div>
      </div>
      <div class="metric-card metric-clickable" onclick="App.switchTab('interviews')" title="Go to Pipeline">
        <div class="metric-icon primary">🎤</div>
        <div class="metric-info">
          <span class="metric-value">${activeInterviews}</span>
          <span class="metric-label">Interviews Active</span>
        </div>
      </div>
      <div class="metric-card metric-clickable" onclick="App.switchTab('offers')" title="Go to Offers">
        <div class="metric-icon success">💰</div>
        <div class="metric-info">
          <span class="metric-value">${offersReceived}</span>
          <span class="metric-label">Offers Received</span>
        </div>
      </div>
    `;
  },

  // Render compact motivation widget with auto-rotate
  renderMotivation() {
    const container = document.getElementById('motivation-widget');
    if (!container) return;

    const quotes = SampleData.quotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    container.innerHTML = `
      <div class="card-title">💡 Daily Motivation</div>
      <div class="motivation-quote">"${quote.text}"</div>
      <div class="motivation-footer">
        <span class="motivation-author">— ${quote.author}</span>
        <button class="btn btn-ghost btn-sm" onclick="Goals.renderMotivation()" title="New quote">🔄</button>
      </div>
    `;
  },

  // Render actionable focus widget with "Go" links
  renderFocus() {
    const container = document.getElementById('focus-widget');
    if (!container) return;

    const skills = Storage.getSkills();
    const interviews = Storage.getInterviews();

    const focusItems = [];

    // Add skills being learned
    skills.filter(s => s.column === 'learning' || s.column === 'practicing')
      .slice(0, 3)
      .forEach(s => focusItems.push({ text: `Practice: ${s.name}`, type: 'Skill', icon: '📚', tab: 'skills', id: s.id }));

    // Add upcoming interviews
    interviews.filter(i => ['hr-screening', 'technical-1', 'technical-2', 'manager', 'final'].includes(i.column))
      .slice(0, 3)
      .forEach(i => focusItems.push({ text: `Interview: ${i.company}`, type: 'Interview', icon: '🎤', tab: 'interviews', id: i.id }));

    // Fill remaining with generic actions
    if (focusItems.length === 0) {
      focusItems.push({ text: 'Add skills to track', type: 'Action', icon: '📖', tab: 'skills', id: '' });
      focusItems.push({ text: 'Target companies to apply', type: 'Action', icon: '🏢', tab: 'interviews', id: '' });
      focusItems.push({ text: 'Upload your resume', type: 'Action', icon: '📝', tab: 'resumes', id: '' });
    }

    const itemsHtml = focusItems.map(item => `
      <li class="focus-item">
        <span class="focus-item-icon">${item.icon}</span>
        <span class="focus-item-text">${item.text}</span>
        <button class="focus-item-go" onclick="Goals.navigateAndHighlight('${item.tab}', '${item.id}')" title="Go to ${item.type}">Go →</button>
      </li>
    `).join('');

    container.innerHTML = `
      <div class="card-title">⚡ Today's Focus</div>
      <ul class="focus-list">${itemsHtml}</ul>
    `;
  },

  // Render upcoming interviews countdown widget
  renderUpcoming() {
    const container = document.getElementById('upcoming-interviews-widget');
    if (!container) return;

    const interviews = Storage.getInterviews();
    const now = new Date();

    // Get interviews with future dates, sorted by date
    const upcoming = interviews
      .filter(i => i.nextDate && new Date(i.nextDate) > now)
      .sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate))
      .slice(0, 3);

    if (upcoming.length === 0) {
      container.innerHTML = '';
      return;
    }

    const itemsHtml = upcoming.map(i => {
      const date = new Date(i.nextDate);
      const diffMs = date - now;
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      let countdownText, countdownClass;
      if (diffDays === 0) { countdownText = `In ${diffHours}h`; countdownClass = 'countdown-today'; }
      else if (diffDays === 1) { countdownText = 'Tomorrow'; countdownClass = 'countdown-tomorrow'; }
      else if (diffDays <= 3) { countdownText = `In ${diffDays} days`; countdownClass = 'countdown-soon'; }
      else if (diffDays <= 7) { countdownText = `In ${diffDays} days`; countdownClass = 'countdown-week'; }
      else { countdownText = `In ${diffDays} days`; countdownClass = ''; }

      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const stage = SampleData.interviewColumns.find(c => c.id === i.column);
      const stageLabel = stage ? stage.label : i.column;

      return `
        <div class="upcoming-item" onclick="Goals.navigateAndHighlight('interviews', '${i.id}')">
          <div class="upcoming-item-left">
            <span class="upcoming-item-company">${Storage.escapeHtml(i.company)}</span>
            <span class="upcoming-item-detail">${Storage.escapeHtml(i.role || stageLabel)} &middot; ${dateStr} at ${timeStr}</span>
          </div>
          <span class="upcoming-item-badge ${countdownClass}">${countdownText}</span>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="card-title">🗓️ Upcoming Interviews</div>
      <div class="upcoming-list">${itemsHtml}</div>
    `;
  },

  // Render career readiness score
  renderReadiness() {
    const container = document.getElementById('readiness-widget');
    if (!container) return;

    const score = Analytics.calculateReadiness();
    const circumference = 2 * Math.PI * 60;
    const offset = circumference - (score.total / 100) * circumference;

    container.innerHTML = `
      <div class="card-title">📊 Career Readiness</div>
      <div class="readiness-circle">
        <svg viewBox="0 0 140 140">
          <circle class="bg-ring" cx="70" cy="70" r="60"></circle>
          <circle class="progress-ring" cx="70" cy="70" r="60" 
                  stroke-dasharray="${circumference}" 
                  stroke-dashoffset="${offset}"></circle>
        </svg>
        <div class="readiness-value">
          <div class="readiness-percent">${score.total}%</div>
          <div class="readiness-label">Ready</div>
        </div>
      </div>
      <div class="readiness-breakdown">
        <div class="readiness-item">
          <span class="readiness-item-label">🚀 Skills</span>
          <span class="readiness-item-value text-warning">${score.skills}%</span>
        </div>
        <div class="readiness-item">
          <span class="readiness-item-label">🎤 Interviews</span>
          <span class="readiness-item-value text-success">${score.interviews}%</span>
        </div>
        <div class="readiness-item">
          <span class="readiness-item-label">💰 Offers</span>
          <span class="readiness-item-value text-primary">${score.offers}%</span>
        </div>
      </div>
    `;
  },

  // Navigate to tab and highlight specific card
  navigateAndHighlight(tab, itemId) {
    App.switchTab(tab);
    if (!itemId) return;

    // Wait for the tab to render, then find and highlight the card
    setTimeout(() => {
      const card = document.querySelector(`.kanban-card[data-id="${itemId}"]`);
      if (card) {
        // Scroll the card into view
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add highlight animation
        card.classList.add('card-highlight');
        setTimeout(() => card.classList.remove('card-highlight'), 2000);
      }
    }, 150);
  }
};
