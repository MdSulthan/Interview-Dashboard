// Sample Data for Interview Prep Application

const SampleData = {
  // Motivational quotes for the daily widget
  quotes: [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
    { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
    { text: "Dream bigger. Do bigger.", author: "Anonymous" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Your career is a marathon, not a sprint. Pace yourself and keep growing.", author: "Anonymous" }
  ],

  // Career journey stages (legacy reference)
  careerStages: [
    { id: 'goal-defined', label: 'Goal Defined', icon: '🎯' },
    { id: 'skills-building', label: 'Skills Building', icon: '📚' },
    { id: 'interview-prep', label: 'Interview Preparation', icon: '✍️' },
    { id: 'active-interviews', label: 'Active Interviews', icon: '🎤' },
    { id: 'offer-received', label: 'Offer Received', icon: '📩' },
    { id: 'offer-accepted', label: 'Offer Accepted', icon: '🎉' }
  ],

  // Goal kanban columns
  goalColumns: [
    { id: 'vision', label: 'Vision', icon: '💡' },
    { id: 'planned', label: 'Planned', icon: '📋' },
    { id: 'in-progress', label: 'In Progress', icon: '🔄' },
    { id: 'blocked', label: 'Blocked', icon: '🚫' },
    { id: 'achieved', label: 'Achieved', icon: '✅' }
  ],

  // Skills kanban columns
  skillColumns: [
    { id: 'not-started', label: 'Not Started', icon: '⏳' },
    { id: 'learning', label: 'Learning', icon: '📖' },
    { id: 'practicing', label: 'Practicing', icon: '💪' },
    { id: 'interview-ready', label: 'Interview Ready', icon: '🎯' },
    { id: 'mastered', label: 'Mastered', icon: '🏆' }
  ],

  // Interview pipeline columns
  interviewColumns: [
    { id: 'target', label: 'Target Companies', icon: '🎯' },
    { id: 'applied', label: 'Applied', icon: '📤' },
    { id: 'hr-screening', label: 'HR Screening', icon: '📞' },
    { id: 'technical-1', label: 'Technical Round 1', icon: '💻' },
    { id: 'technical-2', label: 'Technical Round 2', icon: '🖥️' },
    { id: 'manager', label: 'Manager Round', icon: '👔' },
    { id: 'final', label: 'Final Round', icon: '🏁' },
    { id: 'selected', label: 'Selected', icon: '🎉' },
    { id: 'rejected', label: 'Rejected', icon: '❌' }
  ],

  // Offer columns
  offerColumns: [
    { id: 'verbal', label: 'Verbal Offer', icon: '🗣️' },
    { id: 'written', label: 'Written Offer', icon: '📄' },
    { id: 'negotiating', label: 'Negotiating', icon: '🤝' },
    { id: 'accepted', label: 'Accepted', icon: '✅' },
    { id: 'declined', label: 'Declined', icon: '❌' }
  ],

  // Priority levels
  priorities: [
    { id: 'critical', label: 'Critical', color: '#EF4444' },
    { id: 'high', label: 'High', color: '#F59E0B' },
    { id: 'medium', label: 'Medium', color: '#3B82F6' },
    { id: 'low', label: 'Low', color: '#22C55E' }
  ],

  // Sample skills structure
  sampleSkills: [
    {
      name: 'Java',
      topics: [
        { name: 'Fundamentals', subtopics: ['Data Types', 'Variables', 'Operators', 'Control Flow', 'Arrays'] },
        { name: 'OOP', subtopics: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'Interfaces'] },
        { name: 'Collections', subtopics: ['List', 'Set', 'Map', 'Queue', 'Iterators'] },
        { name: 'Multithreading', subtopics: ['Thread Lifecycle', 'Synchronization', 'Executor Framework', 'Concurrent Collections'] }
      ]
    },
    {
      name: 'Selenium',
      topics: [
        { name: 'Basics', subtopics: ['WebDriver Setup', 'Locators', 'Navigation', 'Browser Actions'] },
        { name: 'Waits', subtopics: ['Implicit Wait', 'Explicit Wait', 'Fluent Wait', 'Custom Wait Conditions'] },
        { name: 'Advanced', subtopics: ['Page Object Model', 'Actions Class', 'JavaScript Executor', 'Screenshots'] },
        { name: 'Framework', subtopics: ['TestNG Integration', 'Data Driven', 'Keyword Driven', 'Hybrid Framework'] }
      ]
    },
    {
      name: 'JavaScript',
      topics: [
        { name: 'Core', subtopics: ['Variables', 'Functions', 'Closures', 'Promises', 'Async/Await'] },
        { name: 'DOM', subtopics: ['Selectors', 'Events', 'Manipulation', 'Traversal'] },
        { name: 'ES6+', subtopics: ['Arrow Functions', 'Destructuring', 'Spread/Rest', 'Modules', 'Classes'] }
      ]
    },
    {
      name: 'SQL',
      topics: [
        { name: 'Basics', subtopics: ['SELECT', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING'] },
        { name: 'Joins', subtopics: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'Self Join'] },
        { name: 'Advanced', subtopics: ['Subqueries', 'Window Functions', 'CTEs', 'Indexes', 'Stored Procedures'] }
      ]
    }
  ],

  // Difficulty levels for questions
  difficultyLevels: [
    { id: 'easy', label: 'Easy', color: '#22C55E' },
    { id: 'medium', label: 'Medium', color: '#F59E0B' },
    { id: 'hard', label: 'Hard', color: '#EF4444' }
  ],

  // Default user settings
  defaultSettings: {
    userName: 'User',
    primaryGoal: 'Land a Senior Developer Role',
    targetSalary: '₹150,000',
    targetDate: '',
    currentStage: 'goal-defined'
  }
};

// Seed sample data on first load
function seedSampleData() {
  // Only seed if no data exists yet
  if (Storage.getGoals().length > 0 || Storage.getSkills().length > 0 || Storage.getInterviews().length > 0 || Storage.getOffers().length > 0 || (Storage.get('resumes') || []).length > 0 || Storage.get('settings') !== null) {
    return;
  }

  // Sample Settings
  Storage.saveSettings({
    userName: 'Alex',
    primaryGoal: 'Senior SDET at a Top Tech Company',
    targetSalary: '₹160,000',
    targetDate: '2026-12-31',
    currentStage: 'skills-building'
  });

  // Sample Goals
  Storage.saveGoals([
    {
      id: 'goal-1',
      title: 'Land Senior SDET Role',
      description: 'Get a senior-level test automation position at a FAANG or equivalent company',
      targetRole: 'Senior SDET',
      targetSalary: '₹160,000',
      targetDate: '2026-12-31',
      progress: 35,
      priority: 'critical',
      column: 'in-progress',
      notes: 'Focus on system design and automation frameworks',
      createdAt: '2026-06-01T10:00:00.000Z'
    },
    {
      id: 'goal-2',
      title: 'Master System Design',
      description: 'Complete system design preparation for interview rounds',
      targetRole: '',
      targetSalary: '',
      targetDate: '2026-10-01',
      progress: 20,
      priority: 'high',
      column: 'in-progress',
      notes: 'Practice with real-world scenarios',
      createdAt: '2026-06-15T10:00:00.000Z'
    },
    {
      id: 'goal-3',
      title: 'Build Portfolio Project',
      description: 'Create an end-to-end test automation framework showcasing best practices',
      targetRole: '',
      targetSalary: '',
      targetDate: '2026-09-15',
      progress: 60,
      priority: 'medium',
      column: 'in-progress',
      notes: 'Use Selenium + TestNG + Page Object Model',
      createdAt: '2026-05-20T10:00:00.000Z'
    },
    {
      id: 'goal-4',
      title: 'Get AWS Certified',
      description: 'AWS Cloud Practitioner certification for cloud testing knowledge',
      targetRole: '',
      targetSalary: '',
      targetDate: '2027-01-15',
      progress: 10,
      priority: 'low',
      column: 'planned',
      notes: '',
      createdAt: '2026-07-01T10:00:00.000Z'
    },
    {
      id: 'goal-5',
      title: 'Contribute to Open Source',
      description: 'Contribute to a popular testing framework on GitHub',
      targetRole: '',
      targetSalary: '',
      targetDate: '',
      progress: 0,
      priority: 'low',
      column: 'vision',
      notes: 'Look into Playwright or Cypress repos',
      createdAt: '2026-07-10T10:00:00.000Z'
    },
    {
      id: 'goal-6',
      title: 'Complete DSA Basics',
      description: 'Finish top 100 LeetCode problems for coding rounds',
      targetRole: '',
      targetSalary: '',
      targetDate: '2026-09-30',
      progress: 100,
      priority: 'high',
      column: 'achieved',
      notes: 'Completed 120 problems total',
      createdAt: '2026-04-01T10:00:00.000Z'
    }
  ]);

  // Sample Skills
  Storage.saveSkills([
    {
      id: 'skill-1',
      name: 'Java',
      description: 'Core Java and OOP concepts for automation development',
      progress: 85,
      knowledgeScore: 90,
      practiceScore: 80,
      confidenceScore: 85,
      column: 'interview-ready',
      lastRevised: '2026-08-05',
      notes: 'Strong in collections and multithreading. Need more practice on streams.',
      topics: [
        { name: 'Fundamentals', subtopics: ['Data Types', 'Variables', 'Operators', 'Control Flow', 'Arrays'] },
        { name: 'OOP', subtopics: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'] },
        { name: 'Collections', subtopics: ['List', 'Set', 'Map', 'Queue', 'Iterators'] },
        { name: 'Streams & Lambda', subtopics: ['Stream API', 'Functional Interfaces', 'Method References'] }
      ],
      resources: [
        { type: 'link', title: 'Java Documentation', url: 'https://docs.oracle.com/javase/' },
        { type: 'video', title: 'Java Full Course - Bro Code', url: 'https://youtube.com' },
        { type: 'article', title: 'Effective Java Summary', url: '' }
      ],
      questions: {
        easy: ['What is the difference between == and .equals()?', 'Explain access modifiers in Java', 'What is autoboxing?'],
        medium: ['How does HashMap work internally?', 'Explain the difference between abstract class and interface', 'What is the diamond problem?'],
        hard: ['Explain the Java Memory Model', 'How does ConcurrentHashMap achieve thread safety?', 'Describe garbage collection algorithms']
      },
      createdAt: '2026-05-01T10:00:00.000Z'
    },
    {
      id: 'skill-2',
      name: 'Selenium WebDriver',
      description: 'Browser automation for functional testing',
      progress: 75,
      knowledgeScore: 80,
      practiceScore: 75,
      confidenceScore: 70,
      column: 'practicing',
      lastRevised: '2026-08-04',
      notes: 'Comfortable with basic and advanced concepts. Need more framework experience.',
      topics: [
        { name: 'Basics', subtopics: ['WebDriver Setup', 'Locators', 'Navigation', 'Waits'] },
        { name: 'Advanced', subtopics: ['Page Object Model', 'Actions Class', 'JavaScript Executor'] },
        { name: 'Framework', subtopics: ['TestNG', 'Data Driven', 'Hybrid Framework'] }
      ],
      resources: [
        { type: 'link', title: 'Selenium Documentation', url: 'https://selenium.dev/documentation/' },
        { type: 'video', title: 'Selenium Full Course', url: '' }
      ],
      questions: {
        easy: ['What are the different locator strategies?', 'Difference between implicit and explicit wait?'],
        medium: ['Explain Page Object Model pattern', 'How do you handle dynamic elements?'],
        hard: ['Design a scalable test automation framework from scratch', 'How would you implement parallel test execution?']
      },
      createdAt: '2026-05-10T10:00:00.000Z'
    },
    {
      id: 'skill-3',
      name: 'API Testing',
      description: 'REST API testing with RestAssured and Postman',
      progress: 60,
      knowledgeScore: 65,
      practiceScore: 55,
      confidenceScore: 60,
      column: 'practicing',
      lastRevised: '2026-07-28',
      notes: 'Good with REST. Need to learn GraphQL testing.',
      topics: [
        { name: 'REST Fundamentals', subtopics: ['HTTP Methods', 'Status Codes', 'Headers', 'Authentication'] },
        { name: 'RestAssured', subtopics: ['Request Spec', 'Response Validation', 'Serialization'] },
        { name: 'Postman', subtopics: ['Collections', 'Environments', 'Newman', 'Monitors'] }
      ],
      resources: [
        { type: 'link', title: 'RestAssured Wiki', url: 'https://github.com/rest-assured/rest-assured/wiki' }
      ],
      questions: { easy: [], medium: [], hard: [] },
      createdAt: '2026-06-01T10:00:00.000Z'
    },
    {
      id: 'skill-4',
      name: 'SQL',
      description: 'Database querying for test data and validation',
      progress: 70,
      knowledgeScore: 75,
      practiceScore: 65,
      confidenceScore: 70,
      column: 'interview-ready',
      lastRevised: '2026-07-25',
      notes: '',
      topics: [
        { name: 'Basics', subtopics: ['SELECT', 'WHERE', 'GROUP BY', 'ORDER BY'] },
        { name: 'Joins', subtopics: ['INNER', 'LEFT', 'RIGHT', 'FULL', 'Self Join'] },
        { name: 'Advanced', subtopics: ['Subqueries', 'Window Functions', 'CTEs'] }
      ],
      resources: [],
      questions: { easy: [], medium: [], hard: [] },
      createdAt: '2026-05-15T10:00:00.000Z'
    },
    {
      id: 'skill-5',
      name: 'CI/CD & Docker',
      description: 'Jenkins, GitHub Actions, Docker for test infrastructure',
      progress: 30,
      knowledgeScore: 35,
      practiceScore: 25,
      confidenceScore: 30,
      column: 'learning',
      lastRevised: '2026-07-20',
      notes: 'Started with Jenkins pipelines. Docker basics done.',
      topics: [
        { name: 'Jenkins', subtopics: ['Pipeline', 'Plugins', 'Shared Libraries'] },
        { name: 'Docker', subtopics: ['Containers', 'Docker Compose', 'Selenium Grid'] },
        { name: 'GitHub Actions', subtopics: ['Workflows', 'Runners', 'Artifacts'] }
      ],
      resources: [],
      questions: { easy: [], medium: [], hard: [] },
      createdAt: '2026-07-01T10:00:00.000Z'
    },
    {
      id: 'skill-6',
      name: 'Performance Testing',
      description: 'JMeter and Gatling for load testing',
      progress: 10,
      knowledgeScore: 15,
      practiceScore: 5,
      confidenceScore: 10,
      column: 'not-started',
      lastRevised: '',
      notes: 'Plan to start after automation framework is solid',
      topics: [
        { name: 'JMeter', subtopics: ['Thread Groups', 'Samplers', 'Listeners', 'Assertions'] },
        { name: 'Gatling', subtopics: ['Scala DSL', 'Scenarios', 'Reports'] }
      ],
      resources: [],
      questions: { easy: [], medium: [], hard: [] },
      createdAt: '2026-07-15T10:00:00.000Z'
    },
    {
      id: 'skill-7',
      name: 'Python',
      description: 'Python for scripting and pytest automation',
      progress: 100,
      knowledgeScore: 100,
      practiceScore: 100,
      confidenceScore: 100,
      column: 'mastered',
      lastRevised: '2026-06-15',
      notes: 'Comfortable with pytest, request library, and data manipulation',
      topics: [
        { name: 'Core', subtopics: ['Data Structures', 'Functions', 'OOP', 'File Handling'] },
        { name: 'Testing', subtopics: ['pytest', 'unittest', 'fixtures', 'parametrize'] }
      ],
      resources: [],
      questions: { easy: [], medium: [], hard: [] },
      createdAt: '2026-03-01T10:00:00.000Z'
    }
  ]);

  // Sample Interviews
  Storage.saveInterviews([
    {
      id: 'int-1',
      company: 'Google',
      role: 'Senior SDET',
      description: 'L5 SET role in Cloud Platform team',
      salary: '₹155K - ₹180K',
      location: 'Remote / Mountain View',
      type: 'Full-time',
      nextDate: '2026-08-12T14:00',
      priority: 'critical',
      column: 'technical-1',
      contacts: 'Sarah (Recruiter) - sarah@google.com',
      notes: 'Passed phone screen. Technical round focuses on system design + coding.',
      lastUpdated: '2026-08-02T10:00:00.000Z',
      createdAt: '2026-07-10T10:00:00.000Z'
    },
    {
      id: 'int-2',
      company: 'Microsoft',
      role: 'Senior QA Engineer',
      description: 'Azure DevOps testing team',
      salary: '₹145K - ₹170K',
      location: 'Redmond, WA (Hybrid)',
      type: 'Full-time',
      nextDate: '2026-08-10T10:00',
      priority: 'high',
      column: 'hr-screening',
      contacts: 'Mike (HR)',
      notes: 'Applied via referral. Waiting for HR screen scheduling.',
      lastUpdated: '2026-08-01T10:00:00.000Z',
      createdAt: '2026-07-25T10:00:00.000Z'
    },
    {
      id: 'int-3',
      company: 'Amazon',
      role: 'QAE II',
      description: 'AWS Lambda testing automation',
      salary: '₹140K - ₹165K',
      location: 'Seattle, WA',
      type: 'Full-time',
      nextDate: '',
      priority: 'high',
      column: 'applied',
      contacts: '',
      notes: 'Applied online. Leadership principles prep needed.',
      lastUpdated: '2026-07-30T10:00:00.000Z',
      createdAt: '2026-07-28T10:00:00.000Z'
    },
    {
      id: 'int-4',
      company: 'Stripe',
      role: 'Test Engineer',
      description: 'Payment infrastructure testing',
      salary: '₹150K - ₹175K',
      location: 'Remote',
      type: 'Full-time',
      nextDate: '',
      priority: 'medium',
      column: 'target',
      contacts: '',
      notes: 'Interesting role. Need to find referral.',
      lastUpdated: '2026-07-20T10:00:00.000Z',
      createdAt: '2026-07-20T10:00:00.000Z'
    },
    {
      id: 'int-5',
      company: 'Netflix',
      role: 'Senior SDET',
      description: 'Streaming quality automation',
      salary: '₹170K - ₹200K',
      location: 'Remote / Los Gatos',
      type: 'Full-time',
      nextDate: '',
      priority: 'medium',
      column: 'target',
      contacts: '',
      notes: 'Dream company. Top compensation.',
      lastUpdated: '2026-07-18T10:00:00.000Z',
      createdAt: '2026-07-18T10:00:00.000Z'
    },
    {
      id: 'int-6',
      company: 'Atlassian',
      role: 'SDET',
      description: 'Jira/Confluence platform testing',
      salary: '₹135K - ₹155K',
      location: 'Remote',
      type: 'Full-time',
      nextDate: '2026-08-18T16:00',
      priority: 'medium',
      column: 'technical-2',
      contacts: 'Priya (Engineering Manager)',
      notes: 'First technical round went well. Second round is system design.',
      lastUpdated: '2026-08-03T10:00:00.000Z',
      createdAt: '2026-07-01T10:00:00.000Z'
    },
    {
      id: 'int-7',
      company: 'Spotify',
      role: 'QA Engineer',
      description: 'Mobile app testing automation',
      salary: '₹130K - ₹150K',
      location: 'Remote / NYC',
      type: 'Full-time',
      nextDate: '',
      priority: 'low',
      column: 'rejected',
      contacts: '',
      notes: 'Rejected after HR screening. Feedback: need more mobile testing experience.',
      lastUpdated: '2026-07-15T10:00:00.000Z',
      createdAt: '2026-06-20T10:00:00.000Z'
    }
  ]);

  // Sample Offers
  Storage.saveOffers([
    {
      id: 'offer-1',
      company: 'Salesforce',
      role: 'Senior SDET',
      salary: '₹155,000',
      bonus: '₹25,000',
      equity: '₹40,000 RSUs over 4 years',
      location: 'San Francisco (Hybrid)',
      remote: 'Hybrid - 3 days/week',
      startDate: '2026-09-15',
      deadline: '2026-08-25',
      benefits: 'Health, dental, vision, 401k match 6%, unlimited PTO, ₹5K learning budget',
      priority: 'high',
      column: 'negotiating',
      notes: 'Negotiating for higher base. Counter-offered ₹165K.',
      pros: ['Strong brand name', 'Good 401k match', '₹5K learning budget', 'Unlimited PTO'],
      cons: ['Hybrid 3 days/week', 'San Francisco cost of living', 'Large org bureaucracy'],
      lastUpdated: '2026-08-04T10:00:00.000Z',
      createdAt: '2026-08-01T10:00:00.000Z'
    },
    {
      id: 'offer-2',
      company: 'Shopify',
      role: 'Senior QA Engineer',
      salary: '₹145,000',
      bonus: '₹15,000',
      equity: '₹30,000 RSUs over 4 years',
      location: 'Remote',
      remote: 'Fully Remote',
      startDate: '2026-09-01',
      deadline: '2026-08-20',
      benefits: 'Health, dental, ₹10K home office budget, flexible hours',
      priority: 'medium',
      column: 'written',
      notes: 'Good remote culture. Slightly lower comp but fully remote.',
      pros: ['Fully remote', 'Great work-life balance', '₹10K home office budget', 'Flexible hours'],
      cons: ['Lower base salary', 'Smaller equity package', 'E-commerce domain only'],
      lastUpdated: '2026-08-03T10:00:00.000Z',
      createdAt: '2026-08-02T10:00:00.000Z'
    }
  ]);

  // Sample Resumes (metadata only — no file data to save storage)
  Storage.set('resumes', [
    {
      id: 'resume-1',
      company: 'Google',
      role: 'Senior SDET',
      version: 'v3',
      fileName: 'Alex_Resume_SDET_Google_v3.pdf',
      fileSize: 245000,
      fileType: 'application/pdf',
      fileData: '',
      dateSubmitted: '2026-07-10',
      isMaster: true,
      notes: 'Master resume tailored for FAANG SDET roles. Highlights: automation frameworks, system design, Java/Python.',
      createdAt: '2026-07-01T10:00:00.000Z'
    },
    {
      id: 'resume-2',
      company: 'Microsoft',
      role: 'Senior QA Engineer',
      version: 'v2',
      fileName: 'Alex_Resume_QA_Microsoft_v2.pdf',
      fileSize: 230000,
      fileType: 'application/pdf',
      fileData: '',
      dateSubmitted: '2026-07-25',
      isMaster: false,
      notes: 'Customized for Azure DevOps team. Added CI/CD and cloud testing sections.',
      createdAt: '2026-07-20T10:00:00.000Z'
    },
    {
      id: 'resume-3',
      company: 'Amazon',
      role: 'QAE II',
      version: 'v1',
      fileName: 'Alex_Resume_QAE_Amazon_v1.pdf',
      fileSize: 238000,
      fileType: 'application/pdf',
      fileData: '',
      dateSubmitted: '2026-07-28',
      isMaster: false,
      notes: 'Focused on leadership principles and scalable test infrastructure.',
      createdAt: '2026-07-26T10:00:00.000Z'
    },
    {
      id: 'resume-4',
      company: 'Atlassian',
      role: 'SDET',
      version: 'v1',
      fileName: 'Alex_Resume_SDET_Atlassian_v1.pdf',
      fileSize: 220000,
      fileType: 'application/pdf',
      fileData: '',
      dateSubmitted: '2026-07-01',
      isMaster: false,
      notes: 'Emphasized Selenium framework and API testing experience.',
      createdAt: '2026-06-28T10:00:00.000Z'
    }
  ]);
}


// Migrate existing data: replace $ with ₹ in money fields
function migrateToRupees() {
  const replaceInStr = (str) => str ? str.replace(/\$/g, '₹') : str;

  // Migrate interviews
  const interviews = Storage.getInterviews();
  let changed = false;
  interviews.forEach(i => {
    if (i.salary && i.salary.includes('$')) {
      i.salary = replaceInStr(i.salary);
      changed = true;
    }
  });
  if (changed) Storage.saveInterviews(interviews);

  // Migrate offers
  changed = false;
  const offers = Storage.getOffers();
  offers.forEach(o => {
    ['salary', 'bonus', 'equity', 'benefits', 'notes'].forEach(field => {
      if (o[field] && o[field].includes('$')) {
        o[field] = replaceInStr(o[field]);
        changed = true;
      }
    });
    if (o.pros) o.pros = o.pros.map(p => replaceInStr(p));
    if (o.cons) o.cons = o.cons.map(c => replaceInStr(c));
  });
  if (changed) Storage.saveOffers(offers);

  // Migrate settings
  const settings = Storage.getSettings();
  if (settings.targetSalary && settings.targetSalary.includes('$')) {
    settings.targetSalary = replaceInStr(settings.targetSalary);
    Storage.saveSettings(settings);
  }

  // Migrate goals
  const goals = Storage.getGoals();
  changed = false;
  goals.forEach(g => {
    if (g.targetSalary && g.targetSalary.includes('$')) {
      g.targetSalary = replaceInStr(g.targetSalary);
      changed = true;
    }
  });
  if (changed) Storage.saveGoals(goals);
}
