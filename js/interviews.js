// Interviews Module - Interview Pipeline Tracker
const Interviews = {
  compactMode: true,

  // Column colors for headers
  columnColors: {
    'target': '#64748B',
    'applied': '#3B82F6',
    'hr-screening': '#8B5CF6',
    'technical-1': '#F59E0B',
    'technical-2': '#F97316',
    'manager': '#06B6D4',
    'final': '#EC4899',
    'selected': '#22C55E',
    'rejected': '#EF4444'
  },

  // Initialize interviews module
  init() {
    this.render();
    if (!this._bound) {
      this.bindEvents();
      this._bound = true;
    }
  },

  // Toggle compact mode (hide empty columns)
  toggleCompact(enabled) {
    this.compactMode = enabled;
    this.renderKanban();
  },

  // Get relative time for countdown
  getCountdown(dateStr) {
    if (!dateStr) return '';
    const target = new Date(dateStr);
    const now = new Date();
    const diffMs = target - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

    if (diffMs < 0) return { text: 'Passed', class: 'countdown-passed' };
    if (diffDays === 0) return { text: `In ${diffHours}h`, class: 'countdown-today' };
    if (diffDays === 1) return { text: 'Tomorrow', class: 'countdown-tomorrow' };
    if (diffDays <= 3) return { text: `In ${diffDays} days`, class: 'countdown-soon' };
    if (diffDays <= 7) return { text: `In ${diffDays} days`, class: 'countdown-week' };
    return { text: `In ${diffDays} days`, class: '' };
  },

  // Render interview pipeline
  render() {
    this.renderSummary();
    this.renderKanban();
  },

  // Render interviews summary metrics
  renderSummary() {
    const container = document.getElementById('interviews-summary');
    if (!container) return;

    const interviews = Storage.getInterviews();
    if (interviews.length === 0) {
      container.innerHTML = '';
      return;
    }

    const total = interviews.length;
    const active = interviews.filter(i => !['target', 'selected', 'rejected'].includes(i.column)).length;
    const selected = interviews.filter(i => i.column === 'selected').length;
    const rejected = interviews.filter(i => i.column === 'rejected').length;

    // Success rate: selected / (selected + rejected) — only count decided outcomes
    const decided = selected + rejected;
    const successRate = decided > 0 ? Math.round((selected / decided) * 100) : 0;
    const successLabel = decided > 0 ? `${successRate}%` : '—';

    container.innerHTML = `
      <div class="metrics-grid" style="margin-bottom: 0">
        <div class="metric-card">
          <div class="metric-icon primary">📄</div>
          <div class="metric-info">
            <span class="metric-value">${total}</span>
            <span class="metric-label">Total Companies</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon warning">🎤</div>
          <div class="metric-info">
            <span class="metric-value">${active}</span>
            <span class="metric-label">In Progress</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon success">🎉</div>
          <div class="metric-info">
            <span class="metric-value">${selected}</span>
            <span class="metric-label">Selected</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon danger">❌</div>
          <div class="metric-info">
            <span class="metric-value">${rejected}</span>
            <span class="metric-label">Rejected</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon ${successRate >= 50 ? 'success' : successRate >= 25 ? 'warning' : 'danger'}">📊</div>
          <div class="metric-info">
            <span class="metric-value">${successLabel}</span>
            <span class="metric-label">Success Rate</span>
          </div>
        </div>
      </div>
    `;
  },

  // Render Interview Kanban Board
  renderKanban() {
    const container = document.getElementById('interviews-kanban');
    if (!container) return;

    const interviews = Storage.getInterviews();

    let columns = SampleData.interviewColumns;

    // In compact mode, hide empty columns (except target and the next logical one)
    if (this.compactMode) {
      columns = columns.filter(col => {
        const hasCards = interviews.some(i => i.column === col.id);
        // Always show target and columns with cards
        return hasCards || col.id === 'target';
      });
    }

    const columnsHtml = columns.map(col => {
      const columnInterviews = interviews.filter(i => i.column === col.id);
      const cardsHtml = columnInterviews.map(interview => this.renderInterviewCard(interview)).join('');
      const isRejected = col.id === 'rejected';

      return `
        <div class="kanban-column ${isRejected ? 'column-rejected' : ''}" data-column="${col.id}">
          <div class="kanban-column-header" style="border-top: 3px solid ${this.columnColors[col.id] || '#64748B'}">
            <span class="kanban-column-title">${col.icon} ${col.label}</span>
            <span class="kanban-column-count">${columnInterviews.length}</span>
          </div>
          <div class="kanban-column-body" data-column="${col.id}"
               ondragover="Interviews.handleDragOver(event)"
               ondragleave="Interviews.handleDragLeave(event)"
               ondrop="Interviews.handleDrop(event, '${col.id}')">
            ${cardsHtml}
            ${columnInterviews.length === 0 ? '<div class="empty-column-hint">Drag cards here</div>' : ''}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = columnsHtml;
  },

  // Render a single interview card
  renderInterviewCard(interview) {
    const priorityClass = interview.priority || 'medium';
    const esc = Storage.escapeHtml;
    const isRejected = interview.column === 'rejected';
    const countdown = this.getCountdown(interview.nextDate);

    // Get resume name if linked
    let resumeLabel = '';
    if (interview.resumeId) {
      const resumes = Storage.get('resumes') || [];
      const resume = resumes.find(r => r.id === interview.resumeId);
      if (resume) resumeLabel = resume.fileName || resume.company || 'Resume';
    }

    return `
      <div class="kanban-card ${isRejected ? 'card-rejected' : ''}" draggable="true" data-id="${interview.id}"
           ondragstart="Interviews.handleDragStart(event, '${interview.id}')"
           ondblclick="Interviews.openEditModal('${interview.id}')">
        <div class="kanban-card-priority ${isRejected ? 'critical' : priorityClass}"></div>
        <div class="kanban-card-header">
          <span class="kanban-card-title">${esc(interview.company)}</span>
          <div class="kanban-card-actions">
            <button class="kanban-card-action" onclick="Interviews.openEditModal('${interview.id}')" title="Edit">✏️</button>
            <button class="kanban-card-action delete" onclick="Interviews.deleteInterview('${interview.id}')" title="Delete">🗑️</button>
          </div>
        </div>
        ${interview.role ? `<div class="interview-card-company">${esc(interview.role)}</div>` : ''}
        ${interview.description ? `<div class="kanban-card-desc">${esc(interview.description)}</div>` : ''}
        <div class="kanban-card-meta">
          ${interview.salary ? `<span class="kanban-card-tag">💰 ${esc(interview.salary)}</span>` : ''}
          ${interview.location ? `<span class="kanban-card-tag">📍 ${esc(interview.location)}</span>` : ''}
          ${interview.type ? `<span class="kanban-card-tag">💼 ${esc(interview.type)}</span>` : ''}
        </div>
        ${countdown && countdown.text ? `
          <div class="interview-countdown ${countdown.class}">
            🕐 ${countdown.text}
          </div>
        ` : ''}
        ${resumeLabel ? `<div class="interview-resume-tag">📝 ${esc(resumeLabel)}</div>` : ''}
        ${interview.contacts ? `<div class="kanban-card-meta" style="margin-top:4px"><span class="kanban-card-tag">👤 ${esc(interview.contacts)}</span></div>` : ''}
        ${(interview.history || []).length > 0 ? `<div class="interview-stage-count">📜 ${interview.history.length} stage${interview.history.length > 1 ? 's' : ''}</div>` : ''}
        ${(interview.feedback || []).length > 0 ? `<div class="interview-stage-count">📝 ${interview.feedback.length} round${interview.feedback.length > 1 ? 's' : ''} logged</div>` : ''}
      </div>
    `;
  },

  // Drag and Drop handlers
  handleDragStart(event, interviewId) {
    event.dataTransfer.setData('text/plain', interviewId);
    event.dataTransfer.setData('type', 'interview');
    const card = event.target.closest('.kanban-card');
    if (card) card.classList.add('dragging');
  },

  handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
  },

  handleDragLeave(event) {
    event.currentTarget.classList.remove('drag-over');
  },

  handleDrop(event, columnId) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');

    const interviewId = event.dataTransfer.getData('text/plain');
    const type = event.dataTransfer.getData('type');
    if (type !== 'interview') return;

    const interviews = Storage.getInterviews();
    const interviewIndex = interviews.findIndex(i => i.id === interviewId);
    if (interviewIndex > -1) {
      const oldColumn = interviews[interviewIndex].column;
      const newColumn = columnId;

      // Record stage history
      if (oldColumn !== newColumn) {
        if (!interviews[interviewIndex].history) interviews[interviewIndex].history = [];
        interviews[interviewIndex].history.push({
          from: oldColumn,
          to: newColumn,
          date: new Date().toISOString()
        });
      }

      interviews[interviewIndex].column = newColumn;
      interviews[interviewIndex].lastUpdated = new Date().toISOString();
      Storage.saveInterviews(interviews);
      this.render();

      // Auto-prompt: offer creation when moved to Selected
      if (newColumn === 'selected' && oldColumn !== 'selected') {
        const company = interviews[interviewIndex].company;
        const role = interviews[interviewIndex].role;
        // Show celebration first
        Offers.showCelebration(company);
        // After celebration finishes, show confirm
        setTimeout(() => {
          App.showConfirm(`Congrats on getting selected at ${company}! Would you like to create an offer entry?`).then(yes => {
            if (yes) {
              App.switchTab('offers');
              setTimeout(() => {
                // Check if offer already exists for this company
                const existingOffers = Storage.getOffers();
                const existing = existingOffers.find(o => o.company.toLowerCase() === company.toLowerCase());
                if (existing) {
                  Offers.openEditModal(existing.id);
                } else {
                  Offers.openCreateModal();
                  document.getElementById('offer-company').value = company || '';
                  document.getElementById('offer-role').value = role || '';
                }
              }, 300);
            }
          });
        }, 4500);
      }
    }

    document.querySelectorAll('.kanban-card.dragging').forEach(el => el.classList.remove('dragging'));
  },

  // Populate resume dropdown
  populateResumeDropdown() {
    const select = document.getElementById('interview-resume');
    if (!select) return;
    const resumes = Storage.get('resumes') || [];
    const options = resumes.map(r => {
      const label = `${r.company || 'General'} — ${r.fileName || 'Untitled'}`;
      return `<option value="${r.id}">${Storage.escapeHtml(label)}</option>`;
    }).join('');
    select.innerHTML = `<option value="">— None —</option>${options}`;
  },

  // ==================== ROUND FEEDBACK ====================

  // Add a new feedback entry form
  addFeedbackEntry() {
    const container = document.getElementById('interview-feedback-container');
    const index = container.querySelectorAll('.feedback-entry').length;
    const div = document.createElement('div');
    div.className = 'feedback-entry';
    div.innerHTML = `
      <div class="feedback-entry-header">
        <span class="feedback-entry-title">Round ${index + 1}</span>
        <button type="button" class="kanban-card-action delete" onclick="this.closest('.feedback-entry').remove()" title="Remove">✕</button>
      </div>
      <div class="feedback-entry-body">
        <input class="form-input" placeholder="Interviewer name" data-feedback-interviewer="${index}">
        <div class="feedback-rating" data-feedback-rating="${index}">
          ${[1,2,3,4,5].map(n => `<span class="rating-star" data-value="${n}" onclick="Interviews.setRating(this, ${index})">☆</span>`).join('')}
        </div>
        <textarea class="form-textarea" placeholder="Questions asked & what went well/poorly..." data-feedback-notes="${index}" style="min-height:50px"></textarea>
      </div>
    `;
    container.appendChild(div);
  },

  // Set star rating
  setRating(starEl, index) {
    const value = parseInt(starEl.dataset.value);
    const container = starEl.closest('.feedback-rating');
    container.dataset.ratingValue = value;
    container.querySelectorAll('.rating-star').forEach(star => {
      const v = parseInt(star.dataset.value);
      star.textContent = v <= value ? '★' : '☆';
      star.classList.toggle('active', v <= value);
    });
  },

  // Render existing feedback entries (for edit modal)
  renderFeedback(feedbackList) {
    const container = document.getElementById('interview-feedback-container');
    if (!container) return;

    container.innerHTML = (feedbackList || []).map((fb, i) => {
      const stars = [1,2,3,4,5].map(n =>
        `<span class="rating-star ${n <= (fb.rating || 0) ? 'active' : ''}" data-value="${n}" onclick="Interviews.setRating(this, ${i})">${n <= (fb.rating || 0) ? '★' : '☆'}</span>`
      ).join('');

      return `
        <div class="feedback-entry">
          <div class="feedback-entry-header">
            <span class="feedback-entry-title">Round ${i + 1}</span>
            <button type="button" class="kanban-card-action delete" onclick="this.closest('.feedback-entry').remove()" title="Remove">✕</button>
          </div>
          <div class="feedback-entry-body">
            <input class="form-input" placeholder="Interviewer name" data-feedback-interviewer="${i}" value="${Storage.escapeHtml(fb.interviewer || '')}">
            <div class="feedback-rating" data-feedback-rating="${i}" data-rating-value="${fb.rating || 0}">
              ${stars}
            </div>
            <textarea class="form-textarea" placeholder="Questions asked & what went well/poorly..." data-feedback-notes="${i}" style="min-height:50px">${Storage.escapeHtml(fb.notes || '')}</textarea>
          </div>
        </div>
      `;
    }).join('');
  },

  // Get feedback data from form
  getFeedbackFromForm() {
    const entries = document.querySelectorAll('.feedback-entry');
    const feedback = [];
    entries.forEach((entry, i) => {
      const interviewer = entry.querySelector(`[data-feedback-interviewer]`);
      const rating = entry.querySelector('.feedback-rating');
      const notes = entry.querySelector(`[data-feedback-notes]`);
      feedback.push({
        interviewer: interviewer ? interviewer.value.trim() : '',
        rating: rating ? parseInt(rating.dataset.ratingValue) || 0 : 0,
        notes: notes ? notes.value.trim() : ''
      });
    });
    return feedback.filter(f => f.interviewer || f.notes || f.rating > 0);
  },

  // Open create interview modal
  openCreateModal(column = 'target') {
    const modal = document.getElementById('interview-modal');
    const form = document.getElementById('interview-form');
    document.getElementById('interview-modal-title').textContent = 'Add Company';
    form.reset();
    form.dataset.mode = 'create';
    document.getElementById('interview-column').value = column;
    this.populateResumeDropdown();
    document.getElementById('interview-history-section').style.display = 'none';
    document.getElementById('interview-feedback-container').innerHTML = '';
    setMoreOptions('interview-modal', false);
    modal.classList.add('active');
    setTimeout(() => document.getElementById('interview-company').focus(), 100);
  },

  // Open edit interview modal
  openEditModal(interviewId) {
    const interviews = Storage.getInterviews();
    const interview = interviews.find(i => i.id === interviewId);
    if (!interview) return;

    const modal = document.getElementById('interview-modal');
    const form = document.getElementById('interview-form');
    document.getElementById('interview-modal-title').textContent = 'Edit Company';
    form.dataset.mode = 'edit';
    form.dataset.interviewId = interviewId;

    document.getElementById('interview-company').value = interview.company || '';
    document.getElementById('interview-role').value = interview.role || '';
    document.getElementById('interview-description').value = interview.description || '';
    document.getElementById('interview-salary').value = interview.salary || '';
    document.getElementById('interview-location').value = interview.location || '';
    document.getElementById('interview-type').value = interview.type || '';
    document.getElementById('interview-next-date').value = interview.nextDate || '';
    document.getElementById('interview-priority').value = interview.priority || 'medium';
    document.getElementById('interview-column').value = interview.column || 'target';
    document.getElementById('interview-contacts').value = interview.contacts || '';
    document.getElementById('interview-notes').value = interview.notes || '';

    // Resume dropdown
    this.populateResumeDropdown();
    document.getElementById('interview-resume').value = interview.resumeId || '';

    // Stage history
    const historySection = document.getElementById('interview-history-section');
    const historyContainer = document.getElementById('interview-history');
    const history = interview.history || [];
    if (history.length > 0) {
      historySection.style.display = 'block';
      const getLabel = (id) => {
        const col = SampleData.interviewColumns.find(c => c.id === id);
        return col ? `${col.icon} ${col.label}` : id;
      };
      historyContainer.innerHTML = history.map(h => {
        const date = new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return `<div class="history-entry">
          <span class="history-arrow">${getLabel(h.from)} → ${getLabel(h.to)}</span>
          <span class="history-date">${date}</span>
        </div>`;
      }).join('');
    } else {
      historySection.style.display = 'none';
    }

    // Render feedback entries
    this.renderFeedback(interview.feedback || []);

    setMoreOptions('interview-modal', true);
    modal.classList.add('active');
  },

  // Save interview
  saveInterview() {
    const form = document.getElementById('interview-form');
    const company = document.getElementById('interview-company').value.trim();
    if (!company) { App.showAlert('Please enter a company name to add to your pipeline.', 'warning'); return; }

    // Check for duplicate company name
    const existingInterviews = Storage.getInterviews();
    const editId = form.dataset.mode === 'edit' ? form.dataset.interviewId : null;
    const duplicate = existingInterviews.find(i => i.company.toLowerCase() === company.toLowerCase() && i.id !== editId);
    if (duplicate) {
      App.showAlert(`"${company}" already exists in your interview pipeline. Track your progress on the existing card!`, 'info');
      return;
    }

    const interviewData = {
      company,
      role: document.getElementById('interview-role').value.trim(),
      description: document.getElementById('interview-description').value.trim(),
      salary: document.getElementById('interview-salary').value.trim(),
      location: document.getElementById('interview-location').value.trim(),
      type: document.getElementById('interview-type').value.trim(),
      nextDate: document.getElementById('interview-next-date').value,
      priority: document.getElementById('interview-priority').value,
      column: document.getElementById('interview-column').value,
      contacts: document.getElementById('interview-contacts').value.trim(),
      resumeId: document.getElementById('interview-resume').value || '',
      notes: document.getElementById('interview-notes').value.trim(),
      feedback: this.getFeedbackFromForm(),
      lastUpdated: new Date().toISOString()
    };

    const interviews = Storage.getInterviews();

    if (form.dataset.mode === 'edit') {
      const index = interviews.findIndex(i => i.id === form.dataset.interviewId);
      if (index > -1) {
        const oldColumn = interviews[index].column;
        const newColumn = interviewData.column;

        // Record stage change via manual edit
        if (oldColumn !== newColumn) {
          if (!interviews[index].history) interviews[index].history = [];
          interviews[index].history.push({
            from: oldColumn,
            to: newColumn,
            date: new Date().toISOString()
          });
        }

        interviews[index] = { ...interviews[index], ...interviewData };
      }
    } else {
      interviewData.id = Storage.generateId();
      interviewData.createdAt = new Date().toISOString();
      interviewData.history = [{ from: null, to: interviewData.column, date: new Date().toISOString() }];
      interviews.push(interviewData);
    }

    Storage.saveInterviews(interviews);
    this.closeModal();
    this.render();
    App.showToast('Company saved successfully!');
  },

  // Delete interview with undo
  async deleteInterview(interviewId) {
    const confirmed = await App.showConfirm('This company and its interview history will be removed. You can undo this right after.');
    if (!confirmed) return;
    const interviews = Storage.getInterviews();
    const deleted = interviews.find(i => i.id === interviewId);
    const remaining = interviews.filter(i => i.id !== interviewId);
    Storage.saveInterviews(remaining);
    this.render();
    App.showUndoToast('Application deleted', () => {
      const current = Storage.getInterviews();
      current.push(deleted);
      Storage.saveInterviews(current);
      this.render();
    });
  },

  // Close modal
  closeModal() {
    document.getElementById('interview-modal').classList.remove('active');
  },

  // Bind events
  bindEvents() {
    const form = document.getElementById('interview-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveInterview();
      });
    }
  }
};
