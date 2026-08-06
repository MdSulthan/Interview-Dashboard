// Resumes Module - File Upload & Company-wise Resume Storage
const Resumes = {
  pendingFile: null,

  // Initialize resumes module
  init() {
    this.render();
    this.renderStorageIndicator();
    if (!this._bound) {
      this.bindEvents();
      this._bound = true;
    }
  },

  // Render storage usage indicator
  renderStorageIndicator() {
    const indicator = document.getElementById('storage-indicator');
    if (!indicator) return;

    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      totalSize += localStorage.getItem(key).length * 2; // UTF-16 = 2 bytes per char
    }

    const maxSize = 10 * 1024 * 1024; // ~10MB localStorage limit in modern browsers
    const usedMB = (totalSize / (1024 * 1024)).toFixed(1);
    const percent = Math.min(100, Math.round((totalSize / maxSize) * 100));

    let colorClass = 'storage-safe';
    if (percent > 80) colorClass = 'storage-danger';
    else if (percent > 50) colorClass = 'storage-warning';

    indicator.innerHTML = `
      <span class="storage-label">💾 ${usedMB}MB / 10MB</span>
      <div class="storage-bar">
        <div class="storage-bar-fill ${colorClass}" style="width: ${percent}%"></div>
      </div>
    `;
  },

  // Render resumes as tile grid
  render() {
    const container = document.getElementById('resumes-list');
    if (!container) return;

    const resumes = Storage.get('resumes') || [];

    // Update count badge
    const badge = document.getElementById('resume-count-badge');
    if (badge) badge.textContent = resumes.length > 0 ? resumes.length : '';

    if (resumes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <p class="empty-state-text">No resumes uploaded yet. Upload your first resume to get started.</p>
          <button class="btn btn-primary" onclick="Resumes.openCreateModal()">+ Upload Resume</button>
        </div>
      `;
      return;
    }

    // Sort: master first, then by company then date
    resumes.sort((a, b) => {
      if (a.isMaster && !b.isMaster) return -1;
      if (!a.isMaster && b.isMaster) return 1;
      return (a.company || '').localeCompare(b.company || '') || (b.dateSubmitted || '').localeCompare(a.dateSubmitted || '');
    });

    const cardsHtml = resumes.map(r => this.renderResumeCard(r)).join('');
    container.innerHTML = cardsHtml;
  },

  // Get list of interviews that used a specific resume
  getLinkedInterviews(resumeId) {
    const interviews = Storage.getInterviews();
    return interviews.filter(i => i.resumeId === resumeId);
  },

  // Render a single resume card
  renderResumeCard(resume) {
    const esc = Storage.escapeHtml;
    const date = resume.dateSubmitted ? new Date(resume.dateSubmitted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
    const fileIcon = this.getFileIcon(resume.fileName);
    const fileSize = resume.fileSize ? this.formatFileSize(resume.fileSize) : '';
    const linkedInterviews = this.getLinkedInterviews(resume.id);
    const isPdf = resume.fileName && resume.fileName.toLowerCase().endsWith('.pdf');
    const hasFile = !!resume.fileData;

    // Border color: master=gold, has file=green, no file=gray
    const borderColor = resume.isMaster ? 'var(--color-warning)' : hasFile ? 'var(--color-success)' : 'var(--border-color)';

    return `
      <div class="resume-card-v2" ondblclick="Resumes.openEditModal('${resume.id}')" style="border-left: 4px solid ${borderColor}">
        ${resume.isMaster ? '<div class="resume-badge-master">⭐ Master</div>' : ''}
        
        <!-- Header: Company + Actions -->
        <div class="resume-v2-header">
          <h4 class="resume-v2-company">${esc(resume.company || 'General')}</h4>
          <div class="resume-v2-actions">
            ${isPdf ? `<button class="resume-v2-action-btn" onclick="Resumes.previewResume('${resume.id}')" title="Preview">👁️</button>` : ''}
            <button class="resume-v2-action-btn" onclick="Resumes.downloadResume('${resume.id}')" title="Download">⬇️</button>
            <button class="resume-v2-action-btn" onclick="Resumes.duplicateResume('${resume.id}')" title="Duplicate">📋</button>
            <button class="resume-v2-action-btn" onclick="Resumes.openEditModal('${resume.id}')" title="Edit">✏️</button>
            <button class="resume-v2-action-btn delete" onclick="Resumes.deleteResume('${resume.id}')" title="Delete">🗑️</button>
          </div>
        </div>

        <!-- Meta row: Role • Version • Date -->
        <div class="resume-v2-meta">
          ${resume.role ? `<span>${esc(resume.role)}</span>` : ''}
          ${resume.version ? `<span>${esc(resume.version)}</span>` : ''}
          ${date ? `<span>${date}</span>` : ''}
        </div>

        <!-- File info -->
        <div class="resume-v2-file">
          <span class="resume-v2-file-icon">${fileIcon}</span>
          <span class="resume-v2-file-name">${esc(resume.fileName || 'No file uploaded')}</span>
          ${fileSize ? `<span class="resume-v2-file-size">${fileSize}</span>` : ''}
        </div>

        <!-- Linked interviews -->
        ${linkedInterviews.length > 0 ? `
          <div class="resume-v2-linked">
            ${linkedInterviews.map(i => `<span class="resume-v2-linked-pill">${esc(i.company)}</span>`).join('')}
          </div>
        ` : ''}

        <!-- Notes preview -->
        ${resume.notes ? `<div class="resume-v2-notes">${esc(resume.notes.substring(0, 80))}${resume.notes.length > 80 ? '...' : ''}</div>` : ''}
      </div>
    `;
  },

  // Preview PDF resume in modal
  previewResume(resumeId) {
    const resumes = Storage.get('resumes') || [];
    const resume = resumes.find(r => r.id === resumeId);
    if (!resume || !resume.fileData) {
      App.showAlert('No file attached to this resume. Please edit and upload one.', 'info');
      return;
    }

    if (!resume.fileName || !resume.fileName.toLowerCase().endsWith('.pdf')) {
      App.showAlert('Preview is only available for PDF files. Use the download button for DOC/DOCX formats.', 'info');
      return;
    }

    const modal = document.getElementById('resume-preview-modal');
    const content = document.getElementById('resume-preview-content');
    document.getElementById('resume-preview-title').textContent = `Preview: ${resume.fileName}`;

    content.innerHTML = `
      <div class="pdf-preview-toolbar">
        <label class="compact-toggle">
          <input type="checkbox" id="pdf-dark-toggle" onchange="Resumes.togglePdfDark(this.checked)">
          <span class="compact-toggle-label">🌙 Dark Mode</span>
        </label>
      </div>
      <iframe id="pdf-iframe" src="${resume.fileData}" style="width:100%; height:calc(100% - 36px); border:none; border-radius: var(--border-radius-sm); background: white;"></iframe>
    `;
    modal.classList.add('active');
  },

  // Close preview modal
  closePreview() {
    const modal = document.getElementById('resume-preview-modal');
    const content = document.getElementById('resume-preview-content');
    content.innerHTML = '';
    modal.classList.remove('active');
  },

  // Toggle dark mode for PDF viewer
  togglePdfDark(enabled) {
    const iframe = document.getElementById('pdf-iframe');
    if (iframe) {
      iframe.style.filter = enabled ? 'invert(0.88) hue-rotate(180deg)' : 'none';
    }
  },

  // Get file icon based on extension
  getFileIcon(fileName) {
    if (!fileName) return '📄';
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📕';
    if (ext === 'doc' || ext === 'docx') return '📘';
    return '📄';
  },

  // Format file size
  formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  },

  // Open create modal
  openCreateModal() {
    const modal = document.getElementById('resume-modal');
    const form = document.getElementById('resume-form');
    document.getElementById('resume-modal-title').textContent = 'Upload Resume';
    form.reset();
    form.dataset.mode = 'create';
    this.pendingFile = null;
    document.getElementById('file-upload-placeholder').classList.remove('hidden');
    document.getElementById('file-upload-selected').classList.add('hidden');
    document.getElementById('resume-master').checked = false;
    setMoreOptions('resume-modal', false);
    modal.classList.add('active');
    setTimeout(() => document.getElementById('resume-company').focus(), 100);
  },

  // Open edit modal
  openEditModal(resumeId) {
    const resumes = Storage.get('resumes') || [];
    const resume = resumes.find(r => r.id === resumeId);
    if (!resume) return;

    const modal = document.getElementById('resume-modal');
    const form = document.getElementById('resume-form');
    document.getElementById('resume-modal-title').textContent = 'Edit Resume';
    form.dataset.mode = 'edit';
    form.dataset.resumeId = resumeId;

    document.getElementById('resume-company').value = resume.company || '';
    document.getElementById('resume-role').value = resume.role || '';
    document.getElementById('resume-version').value = resume.version || '';
    document.getElementById('resume-date').value = resume.dateSubmitted || '';
    document.getElementById('resume-notes').value = resume.notes || '';
    document.getElementById('resume-master').checked = !!resume.isMaster;

    // Show existing file
    this.pendingFile = null;
    if (resume.fileName) {
      document.getElementById('file-upload-placeholder').classList.add('hidden');
      document.getElementById('file-upload-selected').classList.remove('hidden');
      document.getElementById('file-upload-filename').textContent = resume.fileName;
    } else {
      document.getElementById('file-upload-placeholder').classList.remove('hidden');
      document.getElementById('file-upload-selected').classList.add('hidden');
    }

    setMoreOptions('resume-modal', true);
    modal.classList.add('active');
  },

  // Handle file selection
  handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      App.showAlert('This file is too large. Please choose a file under 10MB.', 'error');
      return;
    }

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validExts = ['.pdf', '.doc', '.docx'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();

    if (!validTypes.includes(file.type) && !validExts.includes(ext)) {
      App.showAlert('Unsupported file format. Please upload a PDF, DOC, or DOCX file.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.pendingFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        data: e.target.result
      };

      document.getElementById('file-upload-placeholder').classList.add('hidden');
      document.getElementById('file-upload-selected').classList.remove('hidden');
      document.getElementById('file-upload-filename').textContent = file.name + ' (' + this.formatFileSize(file.size) + ')';
    };
    reader.readAsDataURL(file);
  },

  // Clear selected file
  clearFile() {
    this.pendingFile = null;
    document.getElementById('resume-file').value = '';
    document.getElementById('file-upload-placeholder').classList.remove('hidden');
    document.getElementById('file-upload-selected').classList.add('hidden');
  },

  // Handle drag and drop
  handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
  },

  handleDragLeave(event) {
    event.currentTarget.classList.remove('drag-over');
  },

  handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    const file = event.dataTransfer.files[0];
    if (file) {
      const input = document.getElementById('resume-file');
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      this.handleFileSelect({ target: input });
    }
  },

  // Save resume
  saveResume() {
    const form = document.getElementById('resume-form');
    const company = document.getElementById('resume-company').value.trim();
    if (!company) { App.showAlert('Please enter a company name for this resume.', 'warning'); return; }

    const resumes = Storage.get('resumes') || [];
    const isEdit = form.dataset.mode === 'edit';

    // For new resumes, file is required
    if (!isEdit && !this.pendingFile) {
      const existing = resumes.find(r => r.id === form.dataset.resumeId);
      if (!existing || !existing.fileData) {
        App.showAlert('Please upload a resume file (PDF, DOC, or DOCX) to continue.', 'warning');
        return;
      }
    }

    const isMaster = document.getElementById('resume-master').checked;

    // If marking as master, unmark all others
    if (isMaster) {
      resumes.forEach(r => r.isMaster = false);
    }

    const resumeData = {
      company,
      role: document.getElementById('resume-role').value.trim(),
      version: document.getElementById('resume-version').value.trim(),
      dateSubmitted: document.getElementById('resume-date').value || new Date().toISOString().split('T')[0],
      notes: document.getElementById('resume-notes').value.trim(),
      isMaster
    };

    // Attach file if new one selected
    if (this.pendingFile) {
      resumeData.fileName = this.pendingFile.name;
      resumeData.fileSize = this.pendingFile.size;
      resumeData.fileType = this.pendingFile.type;
      resumeData.fileData = this.pendingFile.data;
    }

    if (isEdit) {
      const index = resumes.findIndex(r => r.id === form.dataset.resumeId);
      if (index > -1) {
        resumes[index] = { ...resumes[index], ...resumeData };
      }
    } else {
      resumeData.id = Storage.generateId();
      resumeData.createdAt = new Date().toISOString();
      resumes.push(resumeData);
    }

    try {
      Storage.set('resumes', resumes);
    } catch (e) {
      App.showAlert('Browser storage is full! Try using a smaller file or remove some old resumes to free up space.', 'error');
      return;
    }

    this.pendingFile = null;
    this.closeModal();
    this.render();
    this.renderStorageIndicator();
    App.showToast('Resume saved successfully!');
  },

  // Download resume file
  downloadResume(resumeId) {
    const resumes = Storage.get('resumes') || [];
    const resume = resumes.find(r => r.id === resumeId);
    if (!resume || !resume.fileData) {
      App.showAlert('No file attached to this resume. Edit it to upload a file first.', 'info');
      return;
    }

    const a = document.createElement('a');
    a.href = resume.fileData;
    a.download = resume.fileName || 'resume';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  // Duplicate resume (copy with new ID, opens edit modal)
  duplicateResume(resumeId) {
    const resumes = Storage.get('resumes') || [];
    const original = resumes.find(r => r.id === resumeId);
    if (!original) return;

    const duplicate = {
      ...original,
      id: Storage.generateId(),
      company: original.company + ' (Copy)',
      version: (original.version || 'v1') + ' copy',
      isMaster: false,
      createdAt: new Date().toISOString(),
      dateSubmitted: new Date().toISOString().split('T')[0]
    };

    resumes.push(duplicate);
    Storage.set('resumes', resumes);
    this.render();
    this.renderStorageIndicator();
    App.showToast('Resume duplicated! Edit the copy below.', 'success');

    // Open edit modal for the duplicate
    setTimeout(() => this.openEditModal(duplicate.id), 300);
  },

  // Delete resume with undo
  async deleteResume(resumeId) {
    const confirmed = await App.showConfirm('This resume file will be permanently removed. You can undo this right after.');
    if (!confirmed) return;
    const resumes = Storage.get('resumes') || [];
    const deleted = resumes.find(r => r.id === resumeId);
    const remaining = resumes.filter(r => r.id !== resumeId);
    Storage.set('resumes', remaining);
    this.render();
    this.renderStorageIndicator();
    App.showUndoToast('Resume deleted', () => {
      const current = Storage.get('resumes') || [];
      current.push(deleted);
      Storage.set('resumes', current);
      this.render();
      this.renderStorageIndicator();
    });
  },

  // Close modal
  closeModal() {
    document.getElementById('resume-modal').classList.remove('active');
    this.pendingFile = null;
  },

  // Bind events
  bindEvents() {
    const form = document.getElementById('resume-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveResume();
      });
    }

    const fileInput = document.getElementById('resume-file');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    }

    const uploadArea = document.getElementById('file-upload-area');
    if (uploadArea) {
      uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
      uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
      uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
    }
  }
};
