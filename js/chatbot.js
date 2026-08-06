// AI Interview Assistant - Chatbot Module
const Chatbot = {
  isOpen: false,
  messages: [],

  // Quick action suggestions
  quickActions: [
    { label: '💡 Interview Tips', query: 'Give me some interview tips' },
    { label: '🎯 Mock Question', query: 'Ask me a mock interview question' },
    { label: '📊 My Progress', query: 'How is my preparation going?' },
    { label: '🔥 Motivate Me', query: 'I need some motivation' }
  ],

  // Knowledge base for pre-programmed responses
  responses: {
    greeting: [
      "Hey! 👋 I'm your Interview Prep Assistant. How can I help you today?",
      "Hi there! Ready to crush your next interview? Ask me anything!",
      "Hello! 🎯 Let's get you prepared. What do you need help with?"
    ],
    tips: [
      "Here are my top interview tips:\n\n1. **Research the company** — Know their products, culture, and recent news\n2. **Practice STAR method** — Situation, Task, Action, Result for behavioral questions\n3. **Prepare questions to ask** — Shows genuine interest\n4. **Test your setup** — For virtual interviews, check camera/mic/internet\n5. **Follow up** — Send a thank-you email within 24 hours",
      "Quick prep checklist before any interview:\n\n✅ Review the job description thoroughly\n✅ Prepare 3 stories using STAR method\n✅ Research interviewer on LinkedIn\n✅ Practice your introduction (60 seconds)\n✅ Have 2-3 questions ready to ask\n✅ Get a good night's sleep!"
    ],
    mock: [
      "Here's a behavioral question:\n\n**\"Tell me about a time you had to deal with a difficult bug in production. How did you approach it?\"**\n\nUse the STAR method: Situation → Task → Action → Result",
      "Technical question:\n\n**\"How would you design a test automation framework from scratch? What tools and patterns would you use?\"**\n\nThink about: Framework architecture, reporting, CI/CD integration, parallel execution",
      "Here's one:\n\n**\"What's the difference between unit testing, integration testing, and end-to-end testing? When would you use each?\"**\n\nConsider: Scope, speed, reliability, and maintenance cost",
      "Behavioral question:\n\n**\"Describe a situation where you had to push back on a deadline. How did you handle it?\"**\n\nFocus on: Communication, prioritization, and outcome",
      "System design:\n\n**\"How would you design a notification system that handles millions of users?\"**\n\nThink about: Message queues, delivery channels, rate limiting, user preferences"
    ],
    motivation: [
      "Remember: Every rejection is just redirection to something better. You've got this! 💪\n\nThe fact that you're here preparing puts you ahead of 90% of candidates.",
      "🌟 \"The only way to do great work is to love what you do.\" — Steve Jobs\n\nYou're investing in yourself right now. That's never wasted time.",
      "Think about it — every skill you've learned, every topic you've practiced... it all compounds. You're building something incredible.\n\nKeep going! 🚀"
    ],
    progress: null, // Dynamic — generated from actual data
    salary: [
      "Salary negotiation tips:\n\n1. **Never give a number first** — Let them make the initial offer\n2. **Know your market value** — Research on Glassdoor, Levels.fyi\n3. **Negotiate total compensation** — Base + Bonus + Equity + Benefits\n4. **Get it in writing** — Verbal offers mean nothing\n5. **Be prepared to walk away** — Your best leverage"
    ],
    nervous: [
      "Interview anxiety is completely normal! Here's what helps:\n\n🧘 **Before:** Take 5 deep breaths, power pose for 2 minutes\n📝 **During:** It's a conversation, not an interrogation. Ask questions too!\n💭 **Reframe:** They need YOU as much as you need them\n🎯 **Focus:** On one question at a time, not the outcome\n\nYou've prepared. Trust your preparation!"
    ],
    default: [
      "That's a great question! While I'm a basic assistant for now, I can help with:\n\n• Interview tips & strategies\n• Mock interview questions\n• Your prep progress overview\n• Motivation & confidence building\n• Salary negotiation advice\n\nTry clicking one of the quick actions below!",
      "I'm still learning! For now, try asking me about:\n\n• \"Give me interview tips\"\n• \"Ask me a mock question\"\n• \"How's my progress?\"\n• \"Salary negotiation advice\"\n• \"I'm nervous about interviews\""
    ]
  },

  // Initialize chatbot
  init() {
    this.renderChatButton();
  },

  // Render the floating chat button
  renderChatButton() {
    const btn = document.createElement('div');
    btn.id = 'chatbot-fab';
    btn.className = 'chatbot-fab';
    btn.innerHTML = `<span class="chatbot-fab-icon">🤖</span>`;
    btn.onclick = () => this.toggle();
    document.body.appendChild(btn);

    // Render chat panel (hidden)
    const panel = document.createElement('div');
    panel.id = 'chatbot-panel';
    panel.className = 'chatbot-panel';
    panel.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <span class="chatbot-avatar">🤖</span>
          <div>
            <span class="chatbot-name">Interview Assistant</span>
            <span class="chatbot-status">Online</span>
          </div>
        </div>
        <button class="chatbot-close" onclick="Chatbot.toggle()">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages"></div>
      <div class="chatbot-quick-actions" id="chatbot-quick-actions">
        ${this.quickActions.map(a => `<button class="chatbot-quick-btn" onclick="Chatbot.sendMessage('${a.query}')">${a.label}</button>`).join('')}
      </div>
      <div class="chatbot-input-area">
        <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Ask me anything..." onkeydown="if(event.key==='Enter')Chatbot.sendFromInput()">
        <button class="chatbot-send-btn" onclick="Chatbot.sendFromInput()">➤</button>
      </div>
    `;
    document.body.appendChild(panel);

    // Show greeting after a short delay
    setTimeout(() => {
      this.addBotMessage(this.getRandomResponse('greeting'));
    }, 500);
  },

  // Toggle chat panel
  toggle() {
    this.isOpen = !this.isOpen;
    const panel = document.getElementById('chatbot-panel');
    const fab = document.getElementById('chatbot-fab');
    if (this.isOpen) {
      panel.classList.add('open');
      fab.classList.add('active');
      document.getElementById('chatbot-input').focus();
    } else {
      panel.classList.remove('open');
      fab.classList.remove('active');
    }
  },

  // Send message from input field
  sendFromInput() {
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    this.sendMessage(text);
  },

  // Process user message and respond
  sendMessage(text) {
    this.addUserMessage(text);

    // Simulate typing delay
    this.showTyping();
    setTimeout(() => {
      this.hideTyping();
      const response = this.generateResponse(text);
      this.addBotMessage(response);
    }, 800 + Math.random() * 700);
  },

  // Generate response based on user input
  generateResponse(input) {
    const q = input.toLowerCase();

    if (q.includes('tip') || q.includes('advice') || q.includes('prepare')) {
      return this.getRandomResponse('tips');
    }
    if (q.includes('mock') || q.includes('question') || q.includes('ask me')) {
      return this.getRandomResponse('mock');
    }
    if (q.includes('motivat') || q.includes('inspire') || q.includes('confidence') || q.includes('believe')) {
      return this.getRandomResponse('motivation');
    }
    if (q.includes('progress') || q.includes('how am i') || q.includes('preparation') || q.includes('status')) {
      return this.generateProgressResponse();
    }
    if (q.includes('salary') || q.includes('negotiat') || q.includes('offer') || q.includes('compensation')) {
      return this.getRandomResponse('salary');
    }
    if (q.includes('nervous') || q.includes('anxious') || q.includes('scared') || q.includes('stress')) {
      return this.getRandomResponse('nervous');
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return this.getRandomResponse('greeting');
    }

    return this.getRandomResponse('default');
  },

  // Generate dynamic progress response from actual data
  generateProgressResponse() {
    const skills = Storage.getSkills();
    const interviews = Storage.getInterviews();
    const offers = Storage.getOffers();

    const totalSkills = skills.length;
    const readySkills = skills.filter(s => s.column === 'interview-ready' || s.column === 'mastered').length;
    const activeInterviews = interviews.filter(i => !['target', 'rejected'].includes(i.column)).length;
    const totalOffers = offers.length;

    const readiness = Analytics.calculateReadiness();

    let message = `Here's your prep snapshot:\n\n`;
    message += `📊 **Overall Readiness:** ${readiness.total}%\n`;
    message += `🚀 **Skills:** ${readySkills}/${totalSkills} interview-ready\n`;
    message += `🎤 **Active Interviews:** ${activeInterviews}\n`;
    message += `💰 **Offers:** ${totalOffers}\n\n`;

    if (readiness.total >= 70) {
      message += "You're in great shape! Keep the momentum going. 🔥";
    } else if (readiness.total >= 40) {
      message += "Good progress! Focus on the skills that need more practice. Keep going! 💪";
    } else {
      message += "You're just getting started — that's okay! Consistency is key. One topic at a time. 🌱";
    }

    return message;
  },

  // Get random response from a category
  getRandomResponse(category) {
    const responses = this.responses[category];
    if (!responses) return this.getRandomResponse('default');
    return responses[Math.floor(Math.random() * responses.length)];
  },

  // Add user message to chat
  addUserMessage(text) {
    this.messages.push({ type: 'user', text });
    this.renderMessages();
  },

  // Add bot message to chat
  addBotMessage(text) {
    this.messages.push({ type: 'bot', text });
    this.renderMessages();
  },

  // Show typing indicator
  showTyping() {
    const container = document.getElementById('chatbot-messages');
    const typing = document.createElement('div');
    typing.id = 'chatbot-typing';
    typing.className = 'chatbot-msg bot';
    typing.innerHTML = `<div class="chatbot-bubble bot"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></div>`;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
  },

  // Hide typing indicator
  hideTyping() {
    const typing = document.getElementById('chatbot-typing');
    if (typing) typing.remove();
  },

  // Render all messages
  renderMessages() {
    const container = document.getElementById('chatbot-messages');
    container.innerHTML = this.messages.map(msg => {
      const formatted = this.formatMessage(msg.text);
      return `
        <div class="chatbot-msg ${msg.type}">
          <div class="chatbot-bubble ${msg.type}">${formatted}</div>
        </div>
      `;
    }).join('');
    container.scrollTop = container.scrollHeight;
  },

  // Format message text (basic markdown)
  formatMessage(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
      .replace(/• /g, '&bull; ');
  }
};
