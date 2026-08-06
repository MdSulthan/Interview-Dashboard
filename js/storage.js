// Storage Module - LocalStorage Utility
const Storage = {
  prefix: 'interviewPrep_',

  // Escape HTML to prevent XSS
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // Get item from LocalStorage
  get(key) {
    try {
      const data = localStorage.getItem(this.prefix + key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },

  // Set item in LocalStorage
  set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },

  // Remove item from LocalStorage
  remove(key) {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (e) {
      console.error('Storage remove error:', e);
      return false;
    }
  },

  // Clear all app data
  clearAll() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (e) {
      console.error('Storage clearAll error:', e);
      return false;
    }
  },

  // Get all goals
  getGoals() {
    return this.get('goals') || [];
  },

  // Save goals
  saveGoals(goals) {
    return this.set('goals', goals);
  },

  // Get all skills
  getSkills() {
    return this.get('skills') || [];
  },

  // Save skills
  saveSkills(skills) {
    this.set('lastActivity', new Date().toISOString());
    return this.set('skills', skills);
  },

  // Get all interviews
  getInterviews() {
    return this.get('interviews') || [];
  },

  // Save interviews
  saveInterviews(interviews) {
    this.set('lastActivity', new Date().toISOString());
    return this.set('interviews', interviews);
  },

  // Get all offers
  getOffers() {
    return this.get('offers') || [];
  },

  // Save offers
  saveOffers(offers) {
    this.set('lastActivity', new Date().toISOString());
    return this.set('offers', offers);
  },

  // Get user settings
  getSettings() {
    return this.get('settings') || SampleData.defaultSettings;
  },

  // Save user settings
  saveSettings(settings) {
    this.set('lastActivity', new Date().toISOString());
    return this.set('settings', settings);
  },

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
};
