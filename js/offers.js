// Offers Module - Offer Tracking with Comparison & Decision Helper
const Offers = {
  // Column colors for headers
  columnColors: {
    'verbal': '#F59E0B',
    'written': '#3B82F6',
    'negotiating': '#8B5CF6',
    'accepted': '#22C55E',
    'declined': '#EF4444'
  },

  // Initialize offers module
  init() {
    this.render();
    if (!this._bound) {
      this.bindEvents();
      this._bound = true;
    }
  },

  // Render offers tab
  render() {
    this.renderKanban();
    this.renderSummary();
    this.updateCompareButton();
  },

  // Show/hide compare button based on offer count
  updateCompareButton() {
    const btn = document.getElementById('compare-btn');
    if (!btn) return;
    const offers = Storage.getOffers();
    btn.style.display = offers.length >= 2 ? 'inline-flex' : 'none';
  },

  // Parse a salary string to number
  parseSalary(str) {
    if (!str) return 0;
    const num = parseInt(str.replace(/[^0-9]/g, ''));
    return isNaN(num) ? 0 : num;
  },

  // Calculate total compensation
  calculateTC(offer) {
    const base = this.parseSalary(offer.salary);
    const bonus = this.parseSalary(offer.bonus);
    const equity = this.parseSalary(offer.equity);
    // TC = base + bonus + equity/4 (annualized)
    const tc = base + bonus + Math.round(equity / 4);
    return tc;
  },

  // Get deadline urgency info
  getDeadlineUrgency(deadline) {
    if (!deadline) return { class: '', label: '' };
    const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (days < 0) return { class: 'urgency-expired', label: 'Expired' };
    if (days <= 3) return { class: 'urgency-critical', label: `${days}d left!` };
    if (days <= 7) return { class: 'urgency-warning', label: `${days}d left` };
    return { class: '', label: '' };
  },

  // Render Offers Kanban Board
  renderKanban() {
    const container = document.getElementById('offers-kanban');
    if (!container) return;

    const offers = Storage.getOffers();

    const columnsHtml = SampleData.offerColumns.map(col => {
      const columnOffers = offers.filter(o => o.column === col.id);
      const cardsHtml = columnOffers.map(offer => this.renderOfferCard(offer)).join('');

      return `
        <div class="kanban-column" data-column="${col.id}">
          <div class="kanban-column-header" style="border-top: 3px solid ${this.columnColors[col.id] || '#64748B'}">
            <span class="kanban-column-title">${col.icon} ${col.label}</span>
            <span class="kanban-column-count">${columnOffers.length}</span>
          </div>
          <div class="kanban-column-body" data-column="${col.id}"
               ondragover="Offers.handleDragOver(event)"
               ondragleave="Offers.handleDragLeave(event)"
               ondrop="Offers.handleDrop(event, '${col.id}')">
            ${cardsHtml}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = columnsHtml;
  },

  // Render a single offer card with TC and deadline urgency
  renderOfferCard(offer) {
    const esc = Storage.escapeHtml;
    const tc = this.calculateTC(offer);
    const urgency = this.getDeadlineUrgency(offer.deadline);

    return `
      <div class="kanban-card" draggable="true" data-id="${offer.id}"
           ondragstart="Offers.handleDragStart(event, '${offer.id}')"
           ondblclick="Offers.openEditModal('${offer.id}')">
        <div class="kanban-card-priority ${offer.priority || 'medium'}"></div>
        <div class="kanban-card-header">
          <span class="kanban-card-title">${esc(offer.company)}</span>
          <div class="kanban-card-actions">
            <button class="kanban-card-action" onclick="Offers.openEditModal('${offer.id}')" title="Edit">✏️</button>
            <button class="kanban-card-action delete" onclick="Offers.deleteOffer('${offer.id}')" title="Delete">🗑️</button>
          </div>
        </div>
        ${offer.role ? `<div class="interview-card-company">${esc(offer.role)}</div>` : ''}
        ${offer.salary ? `<div class="offer-card-salary">${esc(offer.salary)}</div>` : ''}
        ${tc > 0 ? `<div class="offer-card-tc">CTC: ₹${tc.toLocaleString()}/yr</div>` : ''}
        <div class="offer-card-details">
          ${offer.bonus ? `<span class="offer-card-detail">🎁 Bonus: ${esc(offer.bonus)}</span>` : ''}
          ${offer.equity ? `<span class="offer-card-detail">📈 Equity: ${esc(offer.equity)}</span>` : ''}
          ${offer.startDate ? `<span class="offer-card-detail">📅 Start: ${new Date(offer.startDate).toLocaleDateString()}</span>` : ''}
          ${offer.location ? `<span class="offer-card-detail">📍 ${esc(offer.location)}</span>` : ''}
          ${offer.remote ? `<span class="offer-card-detail">🏠 ${esc(offer.remote)}</span>` : ''}
        </div>
        ${urgency.label ? `<div class="offer-deadline-badge ${urgency.class}">⏰ ${urgency.label}</div>` : ''}
        ${(offer.pros && offer.pros.length) || (offer.cons && offer.cons.length) ? `
          <div class="offer-card-proscons">
            ${(offer.pros || []).length ? `<span class="offer-pro-count">✅ ${offer.pros.length} pros</span>` : ''}
            ${(offer.cons || []).length ? `<span class="offer-con-count">❌ ${offer.cons.length} cons</span>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  },

  // Render offers summary
  renderSummary() {
    const container = document.getElementById('offers-summary');
    if (!container) return;

    const offers = Storage.getOffers();
    if (offers.length === 0) {
      container.innerHTML = '';
      return;
    }

    const totalOffers = offers.length;
    const accepted = offers.filter(o => o.column === 'accepted').length;
    const negotiating = offers.filter(o => o.column === 'negotiating').length;

    // TC comparison
    const tcs = offers.map(o => this.calculateTC(o)).filter(n => n > 0);
    const highestTC = tcs.length > 0 ? Math.max(...tcs) : 0;

    container.innerHTML = `
      <div class="metrics-grid" style="margin-bottom: 0">
        <div class="metric-card">
          <div class="metric-icon success">📨</div>
          <div class="metric-info">
            <span class="metric-value">${totalOffers}</span>
            <span class="metric-label">Total Offers</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon primary">🤝</div>
          <div class="metric-info">
            <span class="metric-value">${negotiating}</span>
            <span class="metric-label">Negotiating</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon success">✅</div>
          <div class="metric-info">
            <span class="metric-value">${accepted}</span>
            <span class="metric-label">Accepted</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon warning">💰</div>
          <div class="metric-info">
            <span class="metric-value">${highestTC > 0 ? '₹' + highestTC.toLocaleString() : '—'}</span>
            <span class="metric-label">Highest CTC</span>
          </div>
        </div>
      </div>
    `;
  },

  // Open comparison modal
  openCompareModal() {
    const offers = Storage.getOffers();
    if (offers.length < 2) {
      App.showAlert('You need at least 2 offers to compare them side by side.', 'info');
      return;
    }

    const esc = Storage.escapeHtml;
    const modal = document.getElementById('skill-detail-modal');
    const content = document.getElementById('skill-detail-content');
    // Update modal title for offer comparison
    modal.querySelector('.modal-title').textContent = '📊 Offer Comparison';

    // Build comparison table
    const fields = [
      { key: 'role', label: 'Role' },
      { key: 'salary', label: 'Base Salary' },
      { key: 'bonus', label: 'Bonus' },
      { key: 'equity', label: 'Equity' },
      { key: 'tc', label: 'Total CTC (Annual)', computed: true },
      { key: 'location', label: 'Location' },
      { key: 'remote', label: 'Remote Policy' },
      { key: 'startDate', label: 'Start Date' },
      { key: 'deadline', label: 'Decision Deadline' },
      { key: 'benefits', label: 'Benefits' },
      { key: 'pros', label: 'Pros', list: true },
      { key: 'cons', label: 'Cons', list: true }
    ];

    const headerCells = offers.map(o => `<th class="compare-company">${esc(o.company)}</th>`).join('');
    const rows = fields.map(field => {
      const cells = offers.map(o => {
        let val = '';
        if (field.computed && field.key === 'tc') {
          const tc = this.calculateTC(o);
          val = tc > 0 ? '₹' + tc.toLocaleString() : '—';
        } else if (field.list) {
          const items = o[field.key] || [];
          val = items.length > 0 ? items.map(i => esc(i)).join('<br>') : '—';
        } else if (field.key === 'startDate' || field.key === 'deadline') {
          val = o[field.key] ? new Date(o[field.key]).toLocaleDateString() : '—';
        } else {
          val = o[field.key] ? esc(o[field.key]) : '—';
        }
        return `<td>${val}</td>`;
      }).join('');
      return `<tr><td class="compare-label">${field.label}</td>${cells}</tr>`;
    }).join('');

    content.innerHTML = `
      <div class="skill-expanded-header">
        <h3>📊 Offer Comparison</h3>
      </div>
      <div class="compare-table-wrapper">
        <table class="compare-table">
          <thead>
            <tr><th class="compare-label">Field</th>${headerCells}</tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;

    modal.classList.add('active');
  },

  // Drag and Drop handlers
  handleDragStart(event, offerId) {
    event.dataTransfer.setData('text/plain', offerId);
    event.dataTransfer.setData('type', 'offer');
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

    const offerId = event.dataTransfer.getData('text/plain');
    const type = event.dataTransfer.getData('type');
    if (type !== 'offer') return;

    const offers = Storage.getOffers();
    const offerIndex = offers.findIndex(o => o.id === offerId);
    if (offerIndex > -1) {
      const oldColumn = offers[offerIndex].column;
      offers[offerIndex].column = columnId;
      offers[offerIndex].lastUpdated = new Date().toISOString();
      Storage.saveOffers(offers);
      this.render();

      // Celebration when offer is accepted
      if (columnId === 'accepted' && oldColumn !== 'accepted') {
        this.showCelebration(offers[offerIndex].company);
      }
    }

    document.querySelectorAll('.kanban-card.dragging').forEach(el => el.classList.remove('dragging'));
  },

  // Show celebration animation for accepted offers
  showCelebration(company) {
    // Remove any existing celebration to prevent stacking
    document.querySelectorAll('.celebration-overlay').forEach(el => el.remove());
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = `
      <div class="celebration-confetti"></div>
      <div class="celebration-content">
        <div class="celebration-emoji">🎉</div>
        <div class="celebration-title">Congratulations!</div>
        <div class="celebration-sub">You accepted the offer from <strong>${Storage.escapeHtml(company)}</strong></div>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    // Create confetti particles
    const confettiContainer = overlay.querySelector('.celebration-confetti');
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.animationDelay = Math.random() * 0.6 + 's';
      piece.style.backgroundColor = ['#3B82F6','#22C55E','#F59E0B','#EF4444','#A855F7','#06B6D4'][Math.floor(Math.random() * 6)];
      confettiContainer.appendChild(piece);
    }

    setTimeout(() => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 500);
    }, 4000);
    overlay.addEventListener('click', () => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 500);
    });
  },

  // Open create offer modal
  openCreateModal(column = 'verbal') {
    const modal = document.getElementById('offer-modal');
    const form = document.getElementById('offer-form');
    document.getElementById('offer-modal-title').textContent = 'Add New Offer';
    form.reset();
    form.dataset.mode = 'create';
    document.getElementById('offer-column').value = column;
    document.getElementById('offer-pros').value = '';
    document.getElementById('offer-cons').value = '';
    setMoreOptions('offer-modal', false);
    modal.classList.add('active');
    setTimeout(() => document.getElementById('offer-company').focus(), 100);
  },

  // Open edit offer modal
  openEditModal(offerId) {
    const offers = Storage.getOffers();
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;

    const modal = document.getElementById('offer-modal');
    const form = document.getElementById('offer-form');
    document.getElementById('offer-modal-title').textContent = 'Edit Offer';
    form.dataset.mode = 'edit';
    form.dataset.offerId = offerId;

    document.getElementById('offer-company').value = offer.company || '';
    document.getElementById('offer-role').value = offer.role || '';
    document.getElementById('offer-salary').value = offer.salary || '';
    document.getElementById('offer-bonus').value = offer.bonus || '';
    document.getElementById('offer-equity').value = offer.equity || '';
    document.getElementById('offer-location').value = offer.location || '';
    document.getElementById('offer-remote').value = offer.remote || '';
    document.getElementById('offer-start-date').value = offer.startDate || '';
    document.getElementById('offer-deadline').value = offer.deadline || '';
    document.getElementById('offer-benefits').value = offer.benefits || '';
    document.getElementById('offer-priority').value = offer.priority || 'medium';
    document.getElementById('offer-column').value = offer.column || 'verbal';
    document.getElementById('offer-notes').value = offer.notes || '';
    document.getElementById('offer-pros').value = (offer.pros || []).join('\n');
    document.getElementById('offer-cons').value = (offer.cons || []).join('\n');

    setMoreOptions('offer-modal', true);
    modal.classList.add('active');
  },

  // Save offer
  saveOffer() {
    const form = document.getElementById('offer-form');
    const company = document.getElementById('offer-company').value.trim();
    if (!company) { App.showAlert('Please enter a company name for this offer.', 'warning'); return; }

    // Check for duplicate company name
    const existingOffers = Storage.getOffers();
    const editId = form.dataset.mode === 'edit' ? form.dataset.offerId : null;
    const duplicate = existingOffers.find(o => o.company.toLowerCase() === company.toLowerCase() && o.id !== editId);
    if (duplicate) {
      App.showAlert(`"${company}" already has an offer entry. Update the existing offer instead!`, 'info');
      return;
    }

    const offerData = {
      company,
      role: document.getElementById('offer-role').value.trim(),
      salary: document.getElementById('offer-salary').value.trim(),
      bonus: document.getElementById('offer-bonus').value.trim(),
      equity: document.getElementById('offer-equity').value.trim(),
      location: document.getElementById('offer-location').value.trim(),
      remote: document.getElementById('offer-remote').value.trim(),
      startDate: document.getElementById('offer-start-date').value,
      deadline: document.getElementById('offer-deadline').value,
      benefits: document.getElementById('offer-benefits').value.trim(),
      priority: document.getElementById('offer-priority').value,
      column: document.getElementById('offer-column').value,
      notes: document.getElementById('offer-notes').value.trim(),
      pros: document.getElementById('offer-pros').value.split('\n').map(s => s.trim()).filter(Boolean),
      cons: document.getElementById('offer-cons').value.split('\n').map(s => s.trim()).filter(Boolean),
      lastUpdated: new Date().toISOString()
    };

    const offers = Storage.getOffers();

    if (form.dataset.mode === 'edit') {
      const index = offers.findIndex(o => o.id === form.dataset.offerId);
      if (index > -1) {
        const wasAccepted = offers[index].column === 'accepted';
        offers[index] = { ...offers[index], ...offerData };
        Storage.saveOffers(offers);
        this.closeModal();
        this.render();
        App.showToast('Offer saved successfully!');
        // Celebration only when newly moved to accepted
        if (offerData.column === 'accepted' && !wasAccepted) {
          setTimeout(() => this.showCelebration(offerData.company), 300);
        }
      } else {
        Storage.saveOffers(offers);
        this.closeModal();
        this.render();
        App.showToast('Offer saved successfully!');
      }
    } else {
      offerData.id = Storage.generateId();
      offerData.createdAt = new Date().toISOString();
      offers.push(offerData);
      Storage.saveOffers(offers);
      this.closeModal();
      this.render();
      App.showToast('Offer saved successfully!');
      // Celebration when new offer is created as accepted
      if (offerData.column === 'accepted') {
        setTimeout(() => this.showCelebration(offerData.company), 300);
      }
    }
  },

  // Delete offer with undo
  async deleteOffer(offerId) {
    const confirmed = await App.showConfirm('This offer and its details will be removed. You can undo this right after.');
    if (!confirmed) return;
    const offers = Storage.getOffers();
    const deleted = offers.find(o => o.id === offerId);
    const remaining = offers.filter(o => o.id !== offerId);
    Storage.saveOffers(remaining);
    this.render();
    App.showUndoToast('Offer deleted', () => {
      const current = Storage.getOffers();
      current.push(deleted);
      Storage.saveOffers(current);
      this.render();
    });
  },

  // Close modal
  closeModal() {
    document.getElementById('offer-modal').classList.remove('active');
  },

  // Bind events
  bindEvents() {
    const form = document.getElementById('offer-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveOffer();
      });
    }
  }
};
