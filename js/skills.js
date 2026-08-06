// Skills Module - Learning Progress Tracker
const Skills = {
  expandedSkill: null,
  filterText: '',

  // Column colors for headers
  columnColors: {
    'not-started': '#64748B',
    'learning': '#3B82F6',
    'practicing': '#F59E0B',
    'interview-ready': '#22C55E',
    'mastered': '#A855F7'
  },

  // Initialize skills module
  init() {
    this.render();
    if (!this._bound) {
      this.bindEvents();
      this._bound = true;
    }
  },

  // Render the entire skills tab
  render() {
    this.renderKanban();
  },

  // Filter skills by search text
  filterSkills(text) {
    this.filterText = text.toLowerCase().trim();
    this.renderKanban();
  },

  // Render Skills Kanban Board
  renderKanban() {
    const container = document.getElementById('skills-kanban');
    if (!container) return;

    let skills = Storage.getSkills();

    // Apply filter
    if (this.filterText) {
      skills = skills.filter(s =>
        s.name.toLowerCase().includes(this.filterText) ||
        (s.description || '').toLowerCase().includes(this.filterText) ||
        (s.topics || []).some(t => t.name.toLowerCase().includes(this.filterText))
      );
    }

    const columnsHtml = SampleData.skillColumns.map(col => {
      const columnSkills = skills.filter(s => s.column === col.id);
      const cardsHtml = columnSkills.map(skill => this.renderSkillCard(skill)).join('');
      const headerColor = this.columnColors[col.id] || '#64748B';

      return `
        <div class="kanban-column" data-column="${col.id}">
          <div class="kanban-column-header" style="border-top: 3px solid ${headerColor}">
            <span class="kanban-column-title">${col.icon} ${col.label}</span>
            <span class="kanban-column-count">${columnSkills.length}</span>
          </div>
          <div class="kanban-column-body" data-column="${col.id}"
               ondragover="Skills.handleDragOver(event)"
               ondragleave="Skills.handleDragLeave(event)"
               ondrop="Skills.handleDrop(event, '${col.id}')">
            ${cardsHtml}
            ${columnSkills.length === 0 && !this.filterText ? '<div class="empty-column-hint">Drag skills here</div>' : ''}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = columnsHtml;
  },

  // Render a single skill card
  renderSkillCard(skill) {
    const progressColor = skill.progress >= 75 ? 'success' : skill.progress >= 40 ? 'warning' : '';
    const topicsPreview = (skill.topics || []).slice(0, 3);
    const esc = Storage.escapeHtml;

    // Calculate subtopic completion
    const totalSubtopics = (skill.topics || []).reduce((sum, t) => sum + (t.subtopics || []).length, 0);
    const completedSubtopics = (skill.topics || []).reduce((sum, t) => sum + (t.subtopics || []).filter(st => typeof st === 'object' && st.completed).length, 0);

    return `
      <div class="kanban-card" draggable="true" data-id="${skill.id}"
           ondragstart="Skills.handleDragStart(event, '${skill.id}')"
           ondblclick="Skills.openEditModal('${skill.id}')">
        <div class="kanban-card-priority ${skill.priority || 'medium'}"></div>
        <div class="kanban-card-header">
          <span class="kanban-card-title">${esc(skill.name)}</span>
          <div class="kanban-card-actions">
            <button class="kanban-card-action" onclick="Skills.expandSkill('${skill.id}')" title="Expand">📋</button>
            <button class="kanban-card-action" onclick="Skills.openEditModal('${skill.id}')" title="Edit">✏️</button>
            <button class="kanban-card-action delete" onclick="Skills.deleteSkill('${skill.id}')" title="Delete">🗑️</button>
          </div>
        </div>
        ${skill.description ? `<div class="kanban-card-desc">${esc(skill.description)}</div>` : ''}
        ${topicsPreview.length > 0 ? `
          <div class="skill-card-topics" data-skill-id="${skill.id}">
            ${topicsPreview.map((t, idx) => {
              const tTotal = (t.subtopics || []).length;
              const tDone = (t.subtopics || []).filter(st => typeof st === 'object' && st.completed).length;
              return `
                <div class="skill-topic-expandable">
                  <div class="skill-topic" onclick="event.stopPropagation(); Skills.toggleCardTopic(this)">
                    <span class="card-topic-toggle">▶</span> ${esc(t.name)} ${tTotal > 0 ? `<span style="opacity:0.6">(${tDone}/${tTotal})</span>` : ''}
                  </div>
                  <div class="skill-topic-subtopics" style="display:none">
                    ${(t.subtopics || []).map(st => {
                      const stName = typeof st === 'string' ? st : st.name;
                      const stDone = typeof st === 'object' && st.completed;
                      return `<span class="card-subtopic-chip ${stDone ? 'done' : ''}">${stDone ? '✓ ' : ''}${esc(stName)}</span>`;
                    }).join('')}
                  </div>
                </div>`;
            }).join('')}
            ${(skill.topics || []).length > 3 ? `
              <div class="skill-card-topics-hidden" style="display:none" data-skill-id="${skill.id}">
                ${(skill.topics || []).slice(3).map(t => {
                  const tTotal = (t.subtopics || []).length;
                  const tDone = (t.subtopics || []).filter(st => typeof st === 'object' && st.completed).length;
                  return `
                    <div class="skill-topic-expandable">
                      <div class="skill-topic" onclick="event.stopPropagation(); Skills.toggleCardTopic(this)">
                        <span class="card-topic-toggle">▶</span> ${esc(t.name)} ${tTotal > 0 ? `<span style="opacity:0.6">(${tDone}/${tTotal})</span>` : ''}
                      </div>
                      <div class="skill-topic-subtopics" style="display:none">
                        ${(t.subtopics || []).map(st => {
                          const stName = typeof st === 'string' ? st : st.name;
                          const stDone = typeof st === 'object' && st.completed;
                          return `<span class="card-subtopic-chip ${stDone ? 'done' : ''}">${stDone ? '✓ ' : ''}${esc(stName)}</span>`;
                        }).join('')}
                      </div>
                    </div>`;
                }).join('')}
              </div>
              <div class="skill-topic show-more-btn" onclick="event.stopPropagation(); Skills.showMoreTopics(this, '${skill.id}')" style="color: var(--color-primary); cursor:pointer">+${skill.topics.length - 3} more</div>
            ` : ''}
          </div>
        ` : ''}
        <div class="kanban-card-progress">
          <div class="kanban-card-progress-label">
            <span>Progress ${totalSubtopics > 0 ? `(${completedSubtopics}/${totalSubtopics})` : ''}</span>
            <span>${skill.progress || 0}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill ${progressColor}" style="width: ${skill.progress || 0}%"></div>
          </div>
        </div>
        <div class="skill-readiness">
          <span class="skill-readiness-item">🧠 ${skill.knowledgeScore || 0}%</span>
          <span class="skill-readiness-item">💪 ${skill.practiceScore || 0}%</span>
          <span class="skill-readiness-item">🎯 ${skill.confidenceScore || 0}%</span>
        </div>
        <div class="kanban-card-footer">
          ${skill.lastRevised ? `<span class="kanban-card-tag">📅 ${new Date(skill.lastRevised).toLocaleDateString()}</span>` : '<span></span>'}
          ${(() => {
            const link = (skill.resources || []).find(r => r.url);
            return link ? `<a href="${esc(link.url)}" target="_blank" class="continue-learning-btn" onclick="event.stopPropagation()">▶ Continue</a>` : '';
          })()}
        </div>
      </div>
    `;
  },

  // Expand skill to show full details
  expandSkill(skillId) {
    const skills = Storage.getSkills();
    const skill = skills.find(s => s.id === skillId);
    if (!skill) return;

    const modal = document.getElementById('skill-detail-modal');
    const content = document.getElementById('skill-detail-content');
    modal.querySelector('.modal-title').textContent = 'Skill Details';
    const esc = Storage.escapeHtml;

    const topicsHtml = (skill.topics || []).map(topic => `
      <div class="skill-topic-card">
        <div class="skill-topic-title">${esc(topic.name)}</div>
        <ul class="skill-subtopics">
          ${(topic.subtopics || []).map(st => {
            const name = typeof st === 'string' ? st : st.name;
            const done = typeof st === 'object' && st.completed;
            return `<li class="skill-subtopic" style="${done ? 'color: var(--color-success)' : ''}">${done ? '✓ ' : ''}${esc(name)}</li>`;
          }).join('')}
        </ul>
      </div>
    `).join('');

    const resourcesHtml = (skill.resources || []).map(r => `
      <li class="focus-item">
        <span class="focus-item-icon">${r.type === 'link' ? '🔗' : r.type === 'video' ? '🎥' : r.type === 'article' ? '📰' : '📝'}</span>
        <span>${esc(r.title)}</span>
        ${r.url ? `<a href="${esc(r.url)}" target="_blank" style="margin-left:auto; font-size:0.7rem">Open ↗</a>` : `<span class="focus-item-type">${r.type}</span>`}
      </li>
    `).join('');

    const questionsHtml = this.renderQuestions(skill);
    const readiness = Math.round(((skill.knowledgeScore || 0) + (skill.practiceScore || 0) + (skill.confidenceScore || 0)) / 3);

    content.innerHTML = `
      <div class="skill-expanded-header">
        <h3>${esc(skill.name)}</h3>
        <span class="badge badge-primary">Readiness: ${readiness}%</span>
      </div>
      ${skill.description ? `<p style="margin-bottom: var(--spacing-md)">${esc(skill.description)}</p>` : ''}
      
      <div style="display:grid; grid-template-columns: repeat(3,1fr); gap: var(--spacing-sm); margin-bottom: var(--spacing-lg)">
        <div class="metric-card">
          <div class="metric-info">
            <span class="metric-value text-primary">${skill.knowledgeScore || 0}%</span>
            <span class="metric-label">Knowledge</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-info">
            <span class="metric-value text-warning">${skill.practiceScore || 0}%</span>
            <span class="metric-label">Practice</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-info">
            <span class="metric-value text-success">${skill.confidenceScore || 0}%</span>
            <span class="metric-label">Confidence</span>
          </div>
        </div>
      </div>

      ${(skill.topics || []).length > 0 ? `
        <h4 style="margin-bottom: var(--spacing-md)">📚 Topics & Subtopics</h4>
        <div class="skill-topics-list">${topicsHtml}</div>
      ` : ''}

      ${(skill.resources || []).length > 0 ? `
        <h4 style="margin: var(--spacing-lg) 0 var(--spacing-md)">📎 Resources</h4>
        <ul class="focus-list">${resourcesHtml}</ul>
      ` : ''}

      ${questionsHtml}

      ${skill.notes ? `
        <h4 style="margin: var(--spacing-lg) 0 var(--spacing-md)">📝 Notes</h4>
        <p>${esc(skill.notes)}</p>
      ` : ''}
    `;

    modal.classList.add('active');
  },

  // Render questions panel
  renderQuestions(skill) {
    const questions = skill.questions || { easy: [], medium: [], hard: [] };
    const hasQuestions = questions.easy.length > 0 || questions.medium.length > 0 || questions.hard.length > 0;

    if (!hasQuestions) return '';

    const esc = Storage.escapeHtml;

    return `
      <h4 style="margin: var(--spacing-lg) 0 var(--spacing-md)">❓ Interview Questions</h4>
      <div class="questions-panel">
        <div class="questions-tabs">
          <button class="question-tab active" onclick="Skills.switchQuestionTab(this, 'easy')">Easy (${questions.easy.length})</button>
          <button class="question-tab" onclick="Skills.switchQuestionTab(this, 'medium')">Medium (${questions.medium.length})</button>
          <button class="question-tab" onclick="Skills.switchQuestionTab(this, 'hard')">Hard (${questions.hard.length})</button>
        </div>
        <ul class="question-list" id="question-list">
          ${questions.easy.map(q => `<li class="question-item"><span>💚</span> ${esc(q)}</li>`).join('')}
        </ul>
      </div>
    `;
  },

  // Switch question difficulty tab
  switchQuestionTab(btn, difficulty) {
    document.querySelectorAll('.question-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const skillName = document.getElementById('skill-detail-content').querySelector('.skill-expanded-header h3')?.textContent;
    const skills = Storage.getSkills();
    const skill = skills.find(s => s.name === skillName);
    if (!skill) return;

    const questions = skill.questions || { easy: [], medium: [], hard: [] };
    const colors = { easy: '💚', medium: '🟡', hard: '🔴' };
    const esc = Storage.escapeHtml;
    const list = document.getElementById('question-list');
    if (list) {
      list.innerHTML = (questions[difficulty] || []).map(q => `<li class="question-item"><span>${colors[difficulty]}</span> ${esc(q)}</li>`).join('');
    }
  },

  // Drag and Drop handlers
  handleDragStart(event, skillId) {
    event.dataTransfer.setData('text/plain', skillId);
    event.dataTransfer.setData('type', 'skill');
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

    const skillId = event.dataTransfer.getData('text/plain');
    const type = event.dataTransfer.getData('type');
    if (type !== 'skill') return;

    const skills = Storage.getSkills();
    const skillIndex = skills.findIndex(s => s.id === skillId);
    if (skillIndex > -1) {
      skills[skillIndex].column = columnId;
      // Auto-update lastRevised when moving columns
      skills[skillIndex].lastRevised = new Date().toISOString().split('T')[0];

      if (columnId === 'mastered') {
        skills[skillIndex].progress = 100;
        skills[skillIndex].knowledgeScore = 100;
        skills[skillIndex].practiceScore = 100;
        skills[skillIndex].confidenceScore = 100;
      }
      Storage.saveSkills(skills);
      this.renderKanban();
    }

    document.querySelectorAll('.kanban-card.dragging').forEach(el => el.classList.remove('dragging'));
  },

  // Open create skill modal
  openCreateModal(column = 'not-started') {
    const modal = document.getElementById('skill-modal');
    const form = document.getElementById('skill-form');
    document.getElementById('skill-modal-title').textContent = 'Add New Skill';
    form.reset();
    form.dataset.mode = 'create';
    document.getElementById('skill-column').value = column;
    document.getElementById('skill-topics-container').innerHTML = '';
    document.getElementById('skill-resources-container').innerHTML = '';
    document.getElementById('skill-questions-easy').value = '';
    document.getElementById('skill-questions-medium').value = '';
    document.getElementById('skill-questions-hard').value = '';
    // Clear template state
    this._pendingTemplate = null;
    const banner = document.getElementById('skill-template-banner');
    if (banner) banner.classList.add('hidden');
    this.hideSuggestions();
    setMoreOptions('skill-modal', false);
    modal.classList.add('active');
    setTimeout(() => document.getElementById('skill-name').focus(), 100);
  },

  // Open edit skill modal
  openEditModal(skillId) {
    const skills = Storage.getSkills();
    const skill = skills.find(s => s.id === skillId);
    if (!skill) return;

    const modal = document.getElementById('skill-modal');
    const form = document.getElementById('skill-form');
    document.getElementById('skill-modal-title').textContent = 'Edit Skill';
    form.dataset.mode = 'edit';
    form.dataset.skillId = skillId;

    // Hide template banner for edits
    this._pendingTemplate = null;
    const banner = document.getElementById('skill-template-banner');
    if (banner) banner.classList.add('hidden');
    this.hideSuggestions();

    document.getElementById('skill-name').value = skill.name || '';
    document.getElementById('skill-description').value = skill.description || '';
    document.getElementById('skill-progress').value = skill.progress || 0;
    document.getElementById('skill-knowledge').value = skill.knowledgeScore || 0;
    document.getElementById('skill-practice').value = skill.practiceScore || 0;
    document.getElementById('skill-confidence').value = skill.confidenceScore || 0;
    document.getElementById('skill-column').value = skill.column || 'not-started';
    document.getElementById('skill-last-revised').value = skill.lastRevised || '';
    document.getElementById('skill-notes').value = skill.notes || '';

    // Load questions
    const questions = skill.questions || { easy: [], medium: [], hard: [] };
    document.getElementById('skill-questions-easy').value = questions.easy.join('\n');
    document.getElementById('skill-questions-medium').value = questions.medium.join('\n');
    document.getElementById('skill-questions-hard').value = questions.hard.join('\n');

    // Render topics with checkboxes
    const topics = (skill.topics || []).map(t => ({
      name: t.name,
      subtopics: (t.subtopics || []).map(st => {
        if (typeof st === 'string') return { name: st, completed: false };
        return { name: st.name || st, completed: !!st.completed };
      })
    }));
    this.renderTopicsWithCheckboxes(topics);

    // Render resources
    const resourcesContainer = document.getElementById('skill-resources-container');
    resourcesContainer.innerHTML = (skill.resources || []).map((res, i) => `
      <div class="form-group" style="display:flex; gap: var(--spacing-xs); margin-bottom: var(--spacing-xs); align-items:center">
        <select class="form-select" data-resource-type="${i}" style="width:90px">
          <option value="link" ${res.type === 'link' ? 'selected' : ''}>Link</option>
          <option value="article" ${res.type === 'article' ? 'selected' : ''}>Article</option>
          <option value="video" ${res.type === 'video' ? 'selected' : ''}>Video</option>
          <option value="note" ${res.type === 'note' ? 'selected' : ''}>Note</option>
        </select>
        <input class="form-input" placeholder="Title" value="${Storage.escapeHtml(res.title)}" data-resource-title="${i}">
        <input class="form-input" placeholder="URL" value="${Storage.escapeHtml(res.url || '')}" data-resource-url="${i}">
        ${res.url ? `<a href="${Storage.escapeHtml(res.url)}" target="_blank" class="btn btn-ghost btn-sm" title="Open link" style="flex-shrink:0">↗</a>` : ''}
        <button type="button" class="kanban-card-action delete" onclick="this.closest('.form-group').remove()" title="Remove" style="flex-shrink:0">✕</button>
      </div>
    `).join('');

    setMoreOptions('skill-modal', true);
    modal.classList.add('active');
  },

  // Add resource input
  addResource() {
    const container = document.getElementById('skill-resources-container');
    const index = container.children.length;
    const div = document.createElement('div');
    div.className = 'form-group';
    div.style.cssText = 'display:flex; gap: var(--spacing-xs); margin-bottom: var(--spacing-xs); align-items:center';
    div.innerHTML = `
      <select class="form-select" data-resource-type="${index}" style="width:90px">
        <option value="link">Link</option>
        <option value="article">Article</option>
        <option value="video">Video</option>
        <option value="note">Note</option>
      </select>
      <input class="form-input" placeholder="Title" data-resource-title="${index}">
      <input class="form-input" placeholder="URL" data-resource-url="${index}">
      <button type="button" class="kanban-card-action delete" onclick="this.closest('.form-group').remove()" title="Remove" style="flex-shrink:0">✕</button>
    `;
    container.appendChild(div);
  },

  // Save skill
  saveSkill() {
    const form = document.getElementById('skill-form');
    const name = document.getElementById('skill-name').value.trim();
    if (!name) { App.showAlert('Please enter a skill name to continue.', 'warning'); return; }

    // Check for duplicate skill name (across all columns)
    const existingSkills = Storage.getSkills();
    const editId = form.dataset.mode === 'edit' ? form.dataset.skillId : null;
    const duplicateSkill = existingSkills.find(s => s.name.toLowerCase() === name.toLowerCase() && s.id !== editId);
    if (duplicateSkill) {
      App.showAlert(`"${name}" already exists in your skills board. Continue learning from where you left off!`, 'info');
      return;
    }

    // Gather topics from new checkbox UI
    let topics = this.getTopicsFromForm();

    // Also handle any manually-added topics (plain inputs)
    const newTopicInputs = document.querySelectorAll('[data-new-topic]');
    newTopicInputs.forEach(input => {
      const topicName = input.value.trim();
      if (topicName) {
        // Skip if topic name already exists
        if (topics.some(t => t.name.toLowerCase() === topicName.toLowerCase())) return;
        const idx = input.dataset.newTopic;
        const subtopicInput = document.querySelector(`[data-new-subtopics="${idx}"]`);
        const rawSubtopics = subtopicInput ? subtopicInput.value.split(',').map(s => s.trim()).filter(Boolean) : [];
        // Deduplicate subtopics
        const seen = new Set();
        const subtopics = rawSubtopics.filter(s => {
          const key = s.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        }).map(s => ({ name: s, completed: false }));
        topics.push({ name: topicName, subtopics });
      }
    });

    // Gather resources
    const resources = [];
    const resourceTitles = document.querySelectorAll('[data-resource-title]');
    resourceTitles.forEach(input => {
      const idx = input.dataset.resourceTitle;
      const title = input.value.trim();
      if (title) {
        const typeSelect = document.querySelector(`[data-resource-type="${idx}"]`);
        const urlInput = document.querySelector(`[data-resource-url="${idx}"]`);
        resources.push({
          type: typeSelect ? typeSelect.value : 'link',
          title,
          url: urlInput ? urlInput.value.trim() : ''
        });
      }
    });

    // Gather questions
    const questions = {
      easy: document.getElementById('skill-questions-easy').value.split('\n').map(q => q.trim()).filter(Boolean),
      medium: document.getElementById('skill-questions-medium').value.split('\n').map(q => q.trim()).filter(Boolean),
      hard: document.getElementById('skill-questions-hard').value.split('\n').map(q => q.trim()).filter(Boolean)
    };

    // Calculate progress from subtopic completion
    const totalSubtopics = topics.reduce((sum, t) => sum + (t.subtopics || []).length, 0);
    const completedSubtopics = topics.reduce((sum, t) => sum + (t.subtopics || []).filter(st => st.completed).length, 0);
    const autoProgress = totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : parseInt(document.getElementById('skill-progress').value) || 0;

    const skillData = {
      name,
      description: document.getElementById('skill-description').value.trim(),
      progress: autoProgress,
      knowledgeScore: parseInt(document.getElementById('skill-knowledge').value) || 0,
      practiceScore: parseInt(document.getElementById('skill-practice').value) || 0,
      confidenceScore: parseInt(document.getElementById('skill-confidence').value) || 0,
      column: document.getElementById('skill-column').value,
      lastRevised: document.getElementById('skill-last-revised').value || new Date().toISOString().split('T')[0],
      notes: document.getElementById('skill-notes').value.trim(),
      topics,
      resources,
      questions
    };

    const skills = Storage.getSkills();

    if (form.dataset.mode === 'edit') {
      const index = skills.findIndex(s => s.id === form.dataset.skillId);
      if (index > -1) {
        skills[index] = { ...skills[index], ...skillData };
      }
    } else {
      skillData.id = Storage.generateId();
      skillData.createdAt = new Date().toISOString();
      skills.push(skillData);
    }

    Storage.saveSkills(skills);
    this.closeModal();
    this.render();
    App.showToast('Skill saved successfully!');
  },

  // Delete skill with undo
  async deleteSkill(skillId) {
    const confirmed = await App.showConfirm('This skill and all its progress will be removed. You can undo this right after.');
    if (!confirmed) return;
    const skills = Storage.getSkills();
    const deleted = skills.find(s => s.id === skillId);
    const remaining = skills.filter(s => s.id !== skillId);
    Storage.saveSkills(remaining);
    this.render();
    App.showUndoToast('Skill deleted', () => {
      const current = Storage.getSkills();
      current.push(deleted);
      Storage.saveSkills(current);
      this.render();
    });
  },

  // Close modals
  closeModal() {
    document.getElementById('skill-modal').classList.remove('active');
    this.hideSuggestions();
  },

  closeDetailModal() {
    document.getElementById('skill-detail-modal').classList.remove('active');
  },

  // ==================== AUTO-SUGGEST ====================

  // Pending template reference
  _pendingTemplate: null,

  // Show skill name suggestions
  showSuggestions(query) {
    const container = document.getElementById('skill-name-suggestions');
    if (!container) return;

    const suggestions = SkillTemplates.getSuggestions(query);
    if (suggestions.length === 0 || !query.trim()) {
      container.classList.add('hidden');
      return;
    }

    container.innerHTML = suggestions.map(s => `
      <div class="skill-suggestion-item" onclick="Skills.selectSuggestion('${s.key}')">
        <span class="skill-suggestion-item-name">${Storage.escapeHtml(s.label)}</span>
        <span class="skill-suggestion-item-meta">${s.topicCount} topics</span>
      </div>
    `).join('');
    container.classList.remove('hidden');
  },

  // Hide suggestions dropdown
  hideSuggestions() {
    const container = document.getElementById('skill-name-suggestions');
    if (container) container.classList.add('hidden');
  },

  // User selected a suggestion
  selectSuggestion(key) {
    const template = SkillTemplates.templates[key];
    if (!template) return;

    document.getElementById('skill-name').value = template.label;
    this.hideSuggestions();
    this._pendingTemplate = template;

    // Show template banner
    this.showTemplateBanner(template);
  },

  // Show banner offering to load template topics
  showTemplateBanner(template) {
    const banner = document.getElementById('skill-template-banner');
    const text = document.getElementById('skill-template-banner-text');
    if (!banner || !text) return;

    text.textContent = `📚 "${template.label}" has ${template.topics.length} predefined topics with subtopics. Load them?`;
    banner.classList.remove('hidden');
  },

  // Dismiss template banner
  dismissTemplateBanner() {
    const banner = document.getElementById('skill-template-banner');
    if (banner) banner.classList.add('hidden');
    this._pendingTemplate = null;
  },

  // Load template topics into the form
  loadTemplate() {
    if (!this._pendingTemplate) return;
    const template = this._pendingTemplate;

    // Get existing topics to avoid duplicates
    const existing = this.getTopicsFromForm();
    const existingNames = new Set(existing.map(t => t.name.toLowerCase()));

    // Convert template topics, skip any that already exist
    const newTopics = template.topics
      .filter(t => !existingNames.has(t.name.toLowerCase()))
      .map(t => ({
        name: t.name,
        subtopics: t.subtopics.map(st => ({ name: st, completed: false }))
      }));

    // Merge: existing first, then new from template
    const merged = [...existing, ...newTopics];

    // Render them
    this.renderTopicsWithCheckboxes(merged);

    // Hide banner
    const banner = document.getElementById('skill-template-banner');
    if (banner) banner.classList.add('hidden');
    this._pendingTemplate = null;

    // Auto-expand More Options so user sees the topics
    setMoreOptions('skill-modal', true);
  },

  // Check skill name on blur for template suggestion
  checkForTemplate() {
    const name = document.getElementById('skill-name').value.trim();
    if (!name) return;

    const template = SkillTemplates.getTemplate(name);
    if (template) {
      this._pendingTemplate = template;
      this.showTemplateBanner(template);
      // Auto-expand More Options
      setMoreOptions('skill-modal', true);
    }
  },

  // ==================== TOPICS WITH CHECKBOXES ====================

  // Render topics with checkbox-based subtopics
  renderTopicsWithCheckboxes(topics) {
    const container = document.getElementById('skill-topics-container');
    if (!container) return;

    container.innerHTML = topics.map((topic, ti) => {
      const subtopics = topic.subtopics || [];
      const completed = subtopics.filter(st => st.completed).length;
      const total = subtopics.length;

      return `
        <div class="skill-topic-group" data-topic-index="${ti}">
          <div class="skill-topic-header" onclick="Skills.toggleTopicBody(${ti})">
            <span class="skill-topic-name">
              <span class="topic-toggle" id="topic-toggle-${ti}">▶</span>
              ${Storage.escapeHtml(topic.name)}
            </span>
            <span style="display:flex; align-items:center; gap:6px">
              <span class="skill-topic-progress">${completed}/${total}</span>
              <button type="button" class="kanban-card-action delete" onclick="event.stopPropagation(); Skills.removeTopic(${ti})" title="Remove topic">✕</button>
            </span>
          </div>
          <div class="skill-topic-body" id="skill-topic-body-${ti}" style="display: none">
            ${subtopics.map((st, si) => `
              <label class="skill-subtopic-item ${st.completed ? 'completed' : ''}" data-topic="${ti}" data-subtopic="${si}">
                <input type="checkbox" class="skill-subtopic-checkbox" ${st.completed ? 'checked' : ''} onchange="Skills.toggleSubtopic(${ti}, ${si}, this.checked)">
                <span class="subtopic-text">${Storage.escapeHtml(typeof st === 'string' ? st : st.name)}</span>
                <span class="subtopic-delete" onclick="event.preventDefault(); event.stopPropagation(); Skills.removeSubtopic(${ti}, ${si})" title="Remove">×</span>
              </label>
            `).join('')}
            <div class="skill-subtopic-add">
              <input type="text" class="form-input" placeholder="Add subtopic..." style="padding:4px 8px; font-size:0.75rem; flex:1" data-add-subtopic="${ti}" onkeydown="if(event.key==='Enter'){event.preventDefault(); Skills.addSubtopic(${ti}, this)}">
              <button type="button" class="btn btn-ghost btn-sm" onclick="Skills.addSubtopic(${ti}, this.previousElementSibling)">+</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // Toggle topic body visibility in modal
  toggleTopicBody(topicIndex) {
    const body = document.getElementById(`skill-topic-body-${topicIndex}`);
    const toggle = document.getElementById(`topic-toggle-${topicIndex}`);
    if (!body) return;
    const isHidden = body.style.display === 'none';
    body.style.display = isHidden ? 'flex' : 'none';
    if (toggle) toggle.textContent = isHidden ? '▼' : '▶';
  },

  // Toggle subtopic visibility on kanban card
  toggleCardTopic(el) {
    const parent = el.closest('.skill-topic-expandable');
    if (!parent) return;
    const subtopics = parent.querySelector('.skill-topic-subtopics');
    const toggle = el.querySelector('.card-topic-toggle');
    if (subtopics) {
      const isHidden = subtopics.style.display === 'none' || subtopics.style.display === '';
      subtopics.style.display = isHidden ? 'flex' : 'none';
      if (toggle) toggle.textContent = isHidden ? '▼' : '▶';
    }
  },

  // Show/hide remaining topics on card
  showMoreTopics(btn, skillId) {
    const card = btn.closest('.skill-card-topics');
    if (!card) return;
    const hiddenSection = card.querySelector('.skill-card-topics-hidden');
    if (!hiddenSection) return;

    const isHidden = hiddenSection.style.display === 'none';
    hiddenSection.style.display = isHidden ? 'block' : 'none';
    const totalExtra = hiddenSection.querySelectorAll('.skill-topic-expandable').length;
    btn.textContent = isHidden ? '− Show less' : `+${totalExtra} more`;
  },

  // Toggle subtopic completion
  toggleSubtopic(topicIndex, subtopicIndex, checked) {
    const label = document.querySelector(`.skill-subtopic-item[data-topic="${topicIndex}"][data-subtopic="${subtopicIndex}"]`);
    if (label) {
      label.classList.toggle('completed', checked);
    }

    // Update topic progress display
    const group = document.querySelector(`.skill-topic-group[data-topic-index="${topicIndex}"]`);
    if (group) {
      const checkboxes = group.querySelectorAll('.skill-subtopic-checkbox');
      const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
      const progressEl = group.querySelector('.skill-topic-progress');
      if (progressEl) progressEl.textContent = `${completed}/${checkboxes.length}`;
    }

    // Update overall progress
    this.updateProgressFromTopics();
  },

  // Add a subtopic to an existing topic
  addSubtopic(topicIndex, inputEl) {
    const value = inputEl.value.trim();
    if (!value) return;

    const topics = this.getTopicsFromForm();
    if (topics[topicIndex]) {
      // Check for duplicate subtopic within this topic
      const exists = topics[topicIndex].subtopics.some(st => st.name.toLowerCase() === value.toLowerCase());
      if (exists) {
        App.showToast('Subtopic already exists in this topic', 'error');
        inputEl.value = '';
        return;
      }
      topics[topicIndex].subtopics.push({ name: value, completed: false });
      this.renderTopicsWithCheckboxes(topics);
      // Re-open the topic body
      this.toggleTopicBody(topicIndex);
    }
  },

  // Remove a subtopic
  removeSubtopic(topicIndex, subtopicIndex) {
    const topics = this.getTopicsFromForm();
    if (topics[topicIndex] && topics[topicIndex].subtopics[subtopicIndex] !== undefined) {
      topics[topicIndex].subtopics.splice(subtopicIndex, 1);
      this.renderTopicsWithCheckboxes(topics);
      // Re-open the topic body
      this.toggleTopicBody(topicIndex);
      this.updateProgressFromTopics();
    }
  },

  // Remove an entire topic
  removeTopic(topicIndex) {
    const topics = this.getTopicsFromForm();
    topics.splice(topicIndex, 1);
    this.renderTopicsWithCheckboxes(topics);
    this.updateProgressFromTopics();
  },

  // Calculate and update progress from all topic checkboxes
  updateProgressFromTopics() {
    const container = document.getElementById('skill-topics-container');
    if (!container) return;

    const allCheckboxes = container.querySelectorAll('.skill-subtopic-checkbox');
    if (allCheckboxes.length === 0) return;

    const completed = Array.from(allCheckboxes).filter(cb => cb.checked).length;
    const progress = Math.round((completed / allCheckboxes.length) * 100);

    document.getElementById('skill-progress').value = progress;
  },

  // Get topics data from the current form (with completion state)
  getTopicsFromForm() {
    const container = document.getElementById('skill-topics-container');
    if (!container) return [];

    const topicGroups = container.querySelectorAll('.skill-topic-group');
    const topics = [];

    topicGroups.forEach(group => {
      const header = group.querySelector('.skill-topic-name');
      // Get name from the text content minus the toggle arrow
      const nameText = header ? header.textContent.replace(/[▶▼]\s*/, '').trim() : '';
      const subtopicItems = group.querySelectorAll('.skill-subtopic-item');
      const subtopics = [];

      subtopicItems.forEach(item => {
        const checkbox = item.querySelector('.skill-subtopic-checkbox');
        const text = item.querySelector('.subtopic-text');
        if (text) {
          subtopics.push({
            name: text.textContent.trim(),
            completed: checkbox ? checkbox.checked : false
          });
        }
      });

      if (nameText) {
        topics.push({ name: nameText, subtopics });
      }
    });

    return topics;
  },

  // Add a new empty topic (manual)
  addTopic() {
    const container = document.getElementById('skill-topics-container');
    const index = container.querySelectorAll('.skill-topic-group').length;
    const div = document.createElement('div');
    div.className = 'skill-topic-group';
    div.setAttribute('data-topic-index', index);
    div.innerHTML = `
      <div class="skill-topic-header">
        <input class="form-input" placeholder="Topic name" style="flex:1; padding: 4px 8px; font-size: 0.8rem" data-new-topic="${index}">
        <button type="button" class="btn btn-ghost btn-sm" onclick="this.closest('.skill-topic-group').remove()">✕</button>
      </div>
      <div class="skill-topic-body" style="display: flex">
        <input class="form-input" placeholder="Subtopics (comma separated)" style="width:100%; padding: 4px 8px; font-size: 0.75rem" data-new-subtopics="${index}">
      </div>
    `;
    container.appendChild(div);
  },

  // Bind events
  bindEvents() {
    const form = document.getElementById('skill-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveSkill();
      });
    }

    // Skill name auto-suggest
    const nameInput = document.getElementById('skill-name');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        this.showSuggestions(e.target.value);
      });
      nameInput.addEventListener('blur', () => {
        // Delay to allow click on suggestion
        setTimeout(() => {
          this.hideSuggestions();
          this.checkForTemplate();
        }, 200);
      });
      nameInput.addEventListener('focus', (e) => {
        if (e.target.value.trim()) {
          this.showSuggestions(e.target.value);
        }
      });
    }
  }
};
