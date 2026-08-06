// Skill Templates - Predefined topics and subtopics for automation testing skills
const SkillTemplates = {
  // Match skill names (case-insensitive) to templates
  getTemplate(skillName) {
    const name = skillName.toLowerCase().trim();
    for (const [key, template] of Object.entries(this.templates)) {
      // Match by key or aliases
      if (name === key || (template.aliases && template.aliases.some(a => name.includes(a)))) {
        return template;
      }
    }
    return null;
  },

  // Search templates that match partial input
  getSuggestions(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const results = [];
    for (const [key, template] of Object.entries(this.templates)) {
      if (key.includes(q) || template.label.toLowerCase().includes(q) ||
          (template.aliases && template.aliases.some(a => a.includes(q)))) {
        results.push({ key, label: template.label, topicCount: template.topics.length });
      }
    }
    return results;
  },

  templates: {
    'java': {
      label: 'Java',
      aliases: ['java', 'core java', 'java programming'],
      topics: [
        { name: 'Fundamentals', subtopics: ['Data Types & Variables', 'Operators', 'Control Flow (if/else/switch)', 'Loops (for/while/do-while)', 'Arrays', 'Strings & StringBuilder', 'Type Casting', 'Input/Output'] },
        { name: 'OOP Concepts', subtopics: ['Classes & Objects', 'Constructors', 'Inheritance', 'Polymorphism', 'Abstraction', 'Encapsulation', 'Interfaces', 'Abstract Classes', 'this & super keywords'] },
        { name: 'Collections Framework', subtopics: ['List (ArrayList, LinkedList)', 'Set (HashSet, TreeSet)', 'Map (HashMap, TreeMap, LinkedHashMap)', 'Queue & Deque', 'Iterator & ListIterator', 'Comparable vs Comparator', 'Collections utility class'] },
        { name: 'Exception Handling', subtopics: ['try-catch-finally', 'throw & throws', 'Checked vs Unchecked Exceptions', 'Custom Exceptions', 'try-with-resources'] },
        { name: 'Multithreading', subtopics: ['Thread creation (Thread class & Runnable)', 'Thread Lifecycle', 'Synchronization', 'wait/notify/notifyAll', 'Executor Framework', 'Callable & Future', 'Concurrent Collections', 'ThreadPool'] },
        { name: 'Java 8+ Features', subtopics: ['Lambda Expressions', 'Functional Interfaces', 'Stream API', 'Optional', 'Method References', 'Default & Static methods in interfaces', 'Date/Time API'] },
        { name: 'File I/O & Serialization', subtopics: ['File Reading/Writing', 'BufferedReader/Writer', 'Serialization & Deserialization', 'NIO (Path, Files)'] },
        { name: 'Design Patterns', subtopics: ['Singleton', 'Factory', 'Builder', 'Observer', 'Strategy', 'Page Object Model (for testing)'] },
        { name: 'JVM & Memory', subtopics: ['JVM Architecture', 'Heap vs Stack', 'Garbage Collection', 'ClassLoader', 'Memory Leaks'] }
      ]
    },

    'selenium': {
      label: 'Selenium WebDriver',
      aliases: ['selenium', 'selenium webdriver', 'web automation', 'selenium automation'],
      topics: [
        { name: 'Setup & Basics', subtopics: ['WebDriver Setup (Chrome/Firefox/Edge)', 'Browser Navigation', 'Window & Tab Handling', 'Browser Options & Capabilities', 'WebDriver Manager'] },
        { name: 'Locator Strategies', subtopics: ['ID', 'Name', 'ClassName', 'TagName', 'LinkText & PartialLinkText', 'CSS Selector', 'XPath (absolute & relative)', 'XPath Functions (contains, starts-with, text)'] },
        { name: 'WebElement Interactions', subtopics: ['click(), sendKeys(), clear()', 'getText(), getAttribute()', 'isDisplayed(), isEnabled(), isSelected()', 'Select class (dropdowns)', 'Handling Checkboxes & Radio buttons'] },
        { name: 'Waits', subtopics: ['Implicit Wait', 'Explicit Wait (WebDriverWait)', 'Fluent Wait', 'ExpectedConditions', 'Custom Wait Conditions', 'Thread.sleep (why to avoid)'] },
        { name: 'Advanced Interactions', subtopics: ['Actions Class (hover, drag-drop, right-click)', 'JavaScript Executor', 'Handling Alerts & Popups', 'Handling iFrames', 'Handling Multiple Windows', 'File Upload & Download', 'Shadow DOM'] },
        { name: 'Page Object Model', subtopics: ['POM Design Pattern', 'PageFactory (@FindBy)', 'Base Page Class', 'Page Component Pattern', 'Fluent Page Objects'] },
        { name: 'Framework Design', subtopics: ['TestNG/JUnit Integration', 'Data-Driven Testing', 'Keyword-Driven Testing', 'Hybrid Framework', 'Configuration Management', 'Reporting (Extent/Allure)', 'Logging (Log4j)', 'Screenshots on Failure'] },
        { name: 'Grid & Parallel Execution', subtopics: ['Selenium Grid Setup', 'Hub & Node Architecture', 'Docker with Selenium Grid', 'Parallel Test Execution', 'Cross-Browser Testing'] }
      ]
    },

    'api testing': {
      label: 'API Testing',
      aliases: ['api testing', 'rest api', 'restassured', 'rest assured', 'api automation', 'postman'],
      topics: [
        { name: 'REST Fundamentals', subtopics: ['HTTP Methods (GET/POST/PUT/DELETE/PATCH)', 'Status Codes (2xx/3xx/4xx/5xx)', 'Headers (Content-Type, Authorization)', 'Request/Response Body', 'Query Parameters vs Path Parameters', 'REST vs SOAP', 'Idempotency'] },
        { name: 'Authentication & Security', subtopics: ['Basic Auth', 'Bearer Token / JWT', 'OAuth 2.0', 'API Keys', 'Session-based Auth', 'SSL/TLS Certificates'] },
        { name: 'RestAssured (Java)', subtopics: ['Setup & Dependencies', 'given/when/then Syntax', 'Request Specification', 'Response Validation', 'JSON Path & XML Path', 'Serialization/Deserialization (POJO)', 'Filters & Logging', 'File Upload in API'] },
        { name: 'Postman', subtopics: ['Collections & Folders', 'Environment Variables', 'Pre-request Scripts', 'Test Scripts (assertions)', 'Data-Driven Testing (CSV/JSON)', 'Newman (CLI runner)', 'Monitors & Mock Servers'] },
        { name: 'API Test Design', subtopics: ['Positive & Negative Testing', 'Boundary Value Analysis', 'Schema Validation (JSON Schema)', 'Response Time Validation', 'Chaining API Calls', 'Contract Testing', 'End-to-End API Flows'] },
        { name: 'Advanced Topics', subtopics: ['GraphQL Testing', 'WebSocket Testing', 'gRPC Testing', 'API Versioning', 'Rate Limiting & Throttling', 'Mocking & Stubbing (WireMock)'] }
      ]
    },

    'sql': {
      label: 'SQL',
      aliases: ['sql', 'database', 'mysql', 'postgresql', 'oracle sql', 'db testing'],
      topics: [
        { name: 'Basic Queries', subtopics: ['SELECT', 'WHERE Clause', 'ORDER BY', 'DISTINCT', 'LIMIT/OFFSET', 'LIKE & Wildcards', 'IN, BETWEEN, IS NULL', 'Aliases'] },
        { name: 'Aggregate Functions', subtopics: ['COUNT', 'SUM', 'AVG', 'MIN/MAX', 'GROUP BY', 'HAVING Clause'] },
        { name: 'Joins', subtopics: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'Self Join', 'Multiple Table Joins'] },
        { name: 'Subqueries & CTEs', subtopics: ['Single-row Subqueries', 'Multi-row Subqueries', 'Correlated Subqueries', 'EXISTS & NOT EXISTS', 'Common Table Expressions (WITH)', 'Recursive CTEs'] },
        { name: 'Data Modification', subtopics: ['INSERT', 'UPDATE', 'DELETE', 'MERGE/UPSERT', 'Transactions (BEGIN/COMMIT/ROLLBACK)', 'ACID Properties'] },
        { name: 'Advanced SQL', subtopics: ['Window Functions (ROW_NUMBER, RANK, DENSE_RANK)', 'PARTITION BY', 'LAG/LEAD', 'Indexes (Clustered/Non-Clustered)', 'Views', 'Stored Procedures', 'Triggers', 'Normalization (1NF/2NF/3NF)'] },
        { name: 'DB Testing', subtopics: ['Data Integrity Validation', 'Schema Validation', 'Comparing UI data vs DB', 'Testing Stored Procedures', 'Performance Queries (EXPLAIN)', 'Data Migration Testing'] }
      ]
    },

    'javascript': {
      label: 'JavaScript',
      aliases: ['javascript', 'js', 'es6', 'ecmascript', 'node.js', 'nodejs'],
      topics: [
        { name: 'Core Fundamentals', subtopics: ['Variables (var/let/const)', 'Data Types', 'Operators', 'Control Flow', 'Functions & Hoisting', 'Scope & Closures', 'this keyword', 'Strict Mode'] },
        { name: 'ES6+ Features', subtopics: ['Arrow Functions', 'Template Literals', 'Destructuring', 'Spread/Rest Operators', 'Default Parameters', 'Modules (import/export)', 'Classes', 'Symbols & Iterators'] },
        { name: 'Async Programming', subtopics: ['Callbacks', 'Promises', 'async/await', 'Promise.all / Promise.race', 'Event Loop', 'setTimeout/setInterval', 'Fetch API'] },
        { name: 'DOM Manipulation', subtopics: ['Selectors (getElementById, querySelector)', 'Event Listeners', 'Creating/Removing Elements', 'Traversal (parent/child/sibling)', 'Event Delegation', 'Forms & Validation'] },
        { name: 'Objects & Prototypes', subtopics: ['Object Literals', 'Constructor Functions', 'Prototype Chain', 'Object.create()', 'Class Inheritance', 'Getters & Setters', 'JSON methods'] },
        { name: 'Arrays & Methods', subtopics: ['map, filter, reduce', 'forEach, find, findIndex', 'some, every', 'sort, reverse', 'slice, splice', 'flat, flatMap', 'Array destructuring'] },
        { name: 'Testing with JS', subtopics: ['Jest Basics', 'Mocha & Chai', 'Cypress Fundamentals', 'Playwright Basics', 'Assertions', 'Mocking & Spying'] }
      ]
    },

    'python': {
      label: 'Python',
      aliases: ['python', 'python3', 'pytest', 'python automation'],
      topics: [
        { name: 'Core Python', subtopics: ['Variables & Data Types', 'Operators', 'Control Flow (if/elif/else)', 'Loops (for/while)', 'Functions', 'List Comprehensions', 'String Methods', 'File Handling'] },
        { name: 'Data Structures', subtopics: ['Lists', 'Tuples', 'Dictionaries', 'Sets', 'Stacks & Queues', 'Sorting Algorithms'] },
        { name: 'OOP in Python', subtopics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Magic Methods (__init__, __str__)', 'Decorators', 'Property & Classmethod'] },
        { name: 'Modules & Packages', subtopics: ['import system', 'Creating Modules', 'pip & Virtual Environments', 'os & sys modules', 'datetime module', 'Regular Expressions (re)'] },
        { name: 'Testing with Python', subtopics: ['pytest Basics', 'Fixtures', 'Parametrize', 'Markers', 'conftest.py', 'unittest module', 'Mocking (unittest.mock)', 'pytest-html Reports'] },
        { name: 'Automation Libraries', subtopics: ['requests (API testing)', 'Selenium with Python', 'BeautifulSoup (Web Scraping)', 'Robot Framework', 'Behave (BDD)', 'Allure Reports'] }
      ]
    },

    'ci/cd': {
      label: 'CI/CD & DevOps',
      aliases: ['ci/cd', 'cicd', 'ci cd', 'jenkins', 'github actions', 'devops', 'docker', 'pipeline'],
      topics: [
        { name: 'CI/CD Concepts', subtopics: ['Continuous Integration', 'Continuous Delivery vs Deployment', 'Build Pipeline Stages', 'Artifact Management', 'Environment Strategy (Dev/QA/Staging/Prod)', 'Feature Flags'] },
        { name: 'Jenkins', subtopics: ['Installation & Setup', 'Freestyle Projects', 'Pipeline (Declarative & Scripted)', 'Jenkinsfile', 'Plugins (Git, Maven, Docker)', 'Shared Libraries', 'Triggers & Scheduling', 'Credentials Management'] },
        { name: 'GitHub Actions', subtopics: ['Workflow YAML Syntax', 'Events & Triggers', 'Jobs & Steps', 'Actions Marketplace', 'Secrets & Variables', 'Matrix Strategy', 'Caching Dependencies', 'Artifacts'] },
        { name: 'Docker', subtopics: ['Docker Basics & Architecture', 'Dockerfile', 'Images & Containers', 'Docker Compose', 'Volumes & Networks', 'Docker Hub', 'Multi-stage Builds', 'Container Orchestration Basics'] },
        { name: 'Test in CI/CD', subtopics: ['Running Tests in Pipeline', 'Parallel Test Execution', 'Test Reports in CI', 'Selenium Grid in Docker', 'Flaky Test Management', 'Code Coverage Integration'] },
        { name: 'Version Control (Git)', subtopics: ['Branching Strategies (GitFlow, Trunk-based)', 'Merge vs Rebase', 'Pull Requests & Code Review', 'Git Hooks', 'Tagging & Releases', 'Conflict Resolution'] }
      ]
    },

    'performance testing': {
      label: 'Performance Testing',
      aliases: ['performance testing', 'load testing', 'jmeter', 'gatling', 'stress testing'],
      topics: [
        { name: 'Fundamentals', subtopics: ['Types (Load/Stress/Spike/Soak/Volume)', 'Performance Metrics (Response Time, Throughput, TPS)', 'Think Time & Pacing', 'Ramp-up Strategy', 'Baseline & Benchmarking', 'SLA & NFR Requirements'] },
        { name: 'JMeter', subtopics: ['Installation & Setup', 'Thread Groups', 'Samplers (HTTP, JDBC, FTP)', 'Listeners (View Results, Summary Report)', 'Assertions', 'Timers', 'Config Elements (CSV Data Set)', 'Controllers (Loop, If, Transaction)', 'Correlation & Parameterization', 'Distributed Testing'] },
        { name: 'Gatling', subtopics: ['Scala DSL Basics', 'Simulation Structure', 'Feeders (CSV, JSON)', 'Checks & Assertions', 'Injection Profiles', 'Reports Analysis', 'CI Integration'] },
        { name: 'Analysis & Reporting', subtopics: ['Identifying Bottlenecks', 'Response Time Percentiles (P90/P95/P99)', 'Error Rate Analysis', 'Server Monitoring (CPU/Memory/Disk)', 'APM Tools (New Relic, Dynatrace)', 'Performance Test Reports'] },
        { name: 'Advanced Topics', subtopics: ['API Performance Testing', 'Database Performance Testing', 'Cloud-based Load Testing', 'Capacity Planning', 'Performance Tuning Recommendations', 'Chaos Engineering Basics'] }
      ]
    },

    'testng': {
      label: 'TestNG',
      aliases: ['testng', 'test ng', 'testing framework'],
      topics: [
        { name: 'Basics', subtopics: ['Setup & Configuration', 'Annotations (@Test, @BeforeMethod, etc.)', 'Test Execution Order', 'testng.xml Configuration', 'Suite, Test, Class hierarchy'] },
        { name: 'Features', subtopics: ['Groups', 'Dependencies (dependsOnMethods/Groups)', 'Parameters (XML & DataProvider)', 'DataProvider for Data-Driven Testing', 'Parallel Execution', 'Listeners (ITestListener, IReporter)', 'Retry Logic for Failed Tests'] },
        { name: 'Assertions', subtopics: ['Hard Assertions (assertEquals, assertTrue)', 'Soft Assertions', 'Custom Assertions', 'Assert vs Verify'] },
        { name: 'Reporting & Integration', subtopics: ['Default TestNG Reports', 'Extent Reports Integration', 'Allure Reports', 'Logging with TestNG', 'Maven/Gradle Integration', 'CI/CD Integration'] }
      ]
    },

    'cucumber': {
      label: 'Cucumber / BDD',
      aliases: ['cucumber', 'bdd', 'gherkin', 'behavior driven'],
      topics: [
        { name: 'BDD Concepts', subtopics: ['What is BDD', 'Given-When-Then Pattern', 'Feature Files', 'Scenarios & Scenario Outline', 'Background', 'Tags'] },
        { name: 'Gherkin Syntax', subtopics: ['Feature', 'Scenario', 'Scenario Outline & Examples', 'Data Tables', 'Doc Strings', 'Comments & Tags'] },
        { name: 'Step Definitions', subtopics: ['Mapping Steps to Code', 'Regular Expressions in Steps', 'Cucumber Expressions', 'Hooks (@Before, @After)', 'Shared State (Dependency Injection)', 'PicoContainer / Spring'] },
        { name: 'Framework Integration', subtopics: ['Cucumber with Selenium', 'Cucumber with RestAssured', 'Runner Class Configuration', 'Parallel Execution', 'Reporting (Cucumber Reports, Allure)', 'Maven/Gradle Setup'] }
      ]
    },

    'git': {
      label: 'Git & Version Control',
      aliases: ['git', 'github', 'gitlab', 'version control', 'bitbucket'],
      topics: [
        { name: 'Basics', subtopics: ['init, clone, status', 'add, commit, push, pull', 'Branching & Checkout', 'Merge & Merge Conflicts', 'Remote Repositories', '.gitignore'] },
        { name: 'Advanced Git', subtopics: ['Rebase vs Merge', 'Cherry-pick', 'Stash', 'Reset (soft/mixed/hard)', 'Revert', 'Tagging', 'Bisect', 'Reflog'] },
        { name: 'Collaboration', subtopics: ['Pull Requests', 'Code Reviews', 'Branching Strategies (GitFlow, GitHub Flow)', 'Fork & Upstream', 'Protected Branches', 'CODEOWNERS'] }
      ]
    },

    'playwright': {
      label: 'Playwright',
      aliases: ['playwright', 'playwright automation'],
      topics: [
        { name: 'Setup & Basics', subtopics: ['Installation & Config', 'Browser Contexts', 'Page Navigation', 'Locators (getByRole, getByText, etc.)', 'Auto-waiting', 'Assertions (expect)'] },
        { name: 'Interactions', subtopics: ['Click, Fill, Type', 'Dropdowns & Checkboxes', 'File Upload/Download', 'Dialogs & Popups', 'iFrames', 'Multiple Pages/Tabs'] },
        { name: 'Advanced', subtopics: ['API Testing with Playwright', 'Network Interception (route)', 'Visual Comparisons (screenshots)', 'Video Recording', 'Tracing', 'Authentication State', 'Mobile Emulation'] },
        { name: 'Framework', subtopics: ['Test Fixtures', 'Page Object Model', 'Parallel Execution', 'Reporters', 'CI/CD Integration', 'Parameterized Tests'] }
      ]
    },

    'appium': {
      label: 'Appium (Mobile Testing)',
      aliases: ['appium', 'mobile testing', 'mobile automation', 'android testing', 'ios testing'],
      topics: [
        { name: 'Setup & Architecture', subtopics: ['Appium Server Setup', 'Desired Capabilities', 'Appium Inspector', 'UIAutomator2 (Android)', 'XCUITest (iOS)', 'Real Device vs Emulator/Simulator'] },
        { name: 'Locators & Interactions', subtopics: ['Finding Elements (accessibility id, xpath, class)', 'Tap, Swipe, Scroll', 'Touch Actions', 'Handling Alerts & Permissions', 'Gestures (pinch, zoom, long press)'] },
        { name: 'Advanced Topics', subtopics: ['Hybrid App Testing', 'Mobile Web Testing', 'Deep Links', 'Push Notifications', 'App Install/Uninstall', 'Parallel Execution on Multiple Devices'] },
        { name: 'Framework Design', subtopics: ['Page Object Model for Mobile', 'TestNG/JUnit Integration', 'Appium with Cucumber', 'Cloud Platforms (BrowserStack, Sauce Labs)', 'Reporting', 'CI/CD Integration'] }
      ]
    },

    'manual testing': {
      label: 'Manual Testing / STLC',
      aliases: ['manual testing', 'stlc', 'software testing', 'test cases', 'qa testing', 'quality assurance'],
      topics: [
        { name: 'STLC & SDLC', subtopics: ['SDLC Models (Waterfall, Agile, V-Model)', 'STLC Phases', 'Entry & Exit Criteria', 'Test Planning', 'Test Strategy vs Test Plan', 'Requirement Traceability Matrix (RTM)'] },
        { name: 'Test Case Design', subtopics: ['Test Case Template', 'Writing Effective Test Cases', 'Positive & Negative Testing', 'Boundary Value Analysis', 'Equivalence Partitioning', 'Decision Table Testing', 'State Transition Testing', 'Error Guessing'] },
        { name: 'Test Levels', subtopics: ['Unit Testing', 'Integration Testing', 'System Testing', 'UAT (User Acceptance Testing)', 'Smoke Testing', 'Sanity Testing', 'Regression Testing', 'Retesting'] },
        { name: 'Bug Lifecycle', subtopics: ['Bug Reporting (Severity vs Priority)', 'Bug States (New/Open/Fixed/Retest/Closed)', 'Defect Tracking Tools (Jira, Bugzilla)', 'Root Cause Analysis', 'Bug Triage'] },
        { name: 'Test Types', subtopics: ['Functional Testing', 'Non-Functional Testing', 'Exploratory Testing', 'Ad-hoc Testing', 'Compatibility Testing', 'Usability Testing', 'Accessibility Testing'] },
        { name: 'Test Documentation', subtopics: ['Test Plan Document', 'Test Scenario vs Test Case', 'Test Summary Report', 'Defect Report', 'Release Notes'] }
      ]
    },

    'cypress': {
      label: 'Cypress',
      aliases: ['cypress', 'cypress.io', 'cypress automation'],
      topics: [
        { name: 'Setup & Basics', subtopics: ['Installation & Project Setup', 'Cypress Folder Structure', 'Writing First Test', 'cy commands (visit, get, click, type)', 'Assertions (should, expect)', 'Cypress Test Runner'] },
        { name: 'Selectors & Interactions', subtopics: ['CSS Selectors', 'data-cy Attributes', 'Parent/Child Traversal', 'Handling Dropdowns', 'Checkboxes & Radio Buttons', 'File Upload', 'Drag & Drop'] },
        { name: 'Advanced Features', subtopics: ['Custom Commands', 'Fixtures & Test Data', 'Intercept (Network Stubbing)', 'Aliases & Variables', 'cy.wait & Timeouts', 'Screenshots & Videos', 'Viewport & Responsive Testing'] },
        { name: 'Framework & CI', subtopics: ['Page Object Model in Cypress', 'cypress.config.js', 'Environment Variables', 'Plugins', 'Mochawesome Reports', 'Cypress Dashboard', 'CI/CD Integration (GitHub Actions/Jenkins)', 'Parallel Execution'] }
      ]
    },

    'karate': {
      label: 'Karate Framework',
      aliases: ['karate', 'karate framework', 'karate api', 'karate dsl'],
      topics: [
        { name: 'Basics', subtopics: ['Setup & Dependencies', 'Feature File Syntax', 'Scenario & Scenario Outline', 'Given-When-Then in Karate', 'Running Tests', 'karate-config.js'] },
        { name: 'API Testing', subtopics: ['HTTP Methods (GET/POST/PUT/DELETE)', 'Request Headers & Body', 'Response Assertions (status, match)', 'JSON Path Expressions', 'Schema Validation', 'Data-Driven Testing', 'Chaining API Calls'] },
        { name: 'Advanced', subtopics: ['JavaScript Interop', 'Calling Java Code', 'Parallel Execution', 'Tags & Filtering', 'Environment Switching', 'Retry Mechanism', 'File Upload', 'GraphQL Testing'] },
        { name: 'UI Testing', subtopics: ['Karate UI Automation', 'Locators', 'Browser Actions', 'Screenshots', 'Hybrid API + UI Tests'] }
      ]
    },

    'security testing': {
      label: 'Security Testing',
      aliases: ['security testing', 'owasp', 'penetration testing', 'pen testing', 'security'],
      topics: [
        { name: 'Fundamentals', subtopics: ['CIA Triad (Confidentiality, Integrity, Availability)', 'Authentication vs Authorization', 'OWASP Top 10', 'Types of Security Testing', 'Threat Modeling', 'Security Test Planning'] },
        { name: 'Common Vulnerabilities', subtopics: ['SQL Injection', 'Cross-Site Scripting (XSS)', 'Cross-Site Request Forgery (CSRF)', 'Broken Authentication', 'Insecure Direct Object References', 'Security Misconfiguration', 'Sensitive Data Exposure'] },
        { name: 'Tools & Techniques', subtopics: ['OWASP ZAP', 'Burp Suite Basics', 'Postman Security Tests', 'SSL/TLS Testing', 'Header Security Testing', 'Input Validation Testing', 'Session Management Testing'] },
        { name: 'API Security', subtopics: ['JWT Token Testing', 'OAuth Flow Vulnerabilities', 'Rate Limiting', 'API Key Exposure', 'CORS Misconfiguration', 'Injection in APIs'] }
      ]
    },

    'mobile testing manual': {
      label: 'Mobile Testing (Manual)',
      aliases: ['mobile testing manual', 'mobile qa', 'app testing'],
      topics: [
        { name: 'Fundamentals', subtopics: ['Mobile App Types (Native/Hybrid/Web)', 'Android vs iOS Differences', 'Device Fragmentation', 'Screen Sizes & Resolutions', 'Mobile Test Strategy'] },
        { name: 'Test Types', subtopics: ['Installation & Uninstallation', 'Functional Testing', 'UI/UX Testing', 'Interruption Testing (calls, notifications)', 'Network Condition Testing (WiFi/3G/4G/offline)', 'Battery & Memory Testing', 'Localization Testing'] },
        { name: 'Platform Specific', subtopics: ['Android Permissions', 'iOS Provisioning', 'Push Notifications Testing', 'Deep Linking', 'App Store / Play Store Guidelines', 'Gesture Testing (swipe, pinch, rotate)'] },
        { name: 'Tools & Emulators', subtopics: ['Android Studio Emulator', 'Xcode Simulator', 'Charles Proxy', 'BrowserStack / Sauce Labs', 'Firebase Test Lab', 'ADB Commands'] }
      ]
    },

    'aws': {
      label: 'AWS',
      aliases: ['aws', 'amazon web services', 'cloud computing', 'aws cloud'],
      topics: [
        { name: 'Core Services', subtopics: ['EC2 (Instances, AMI, Security Groups)', 'S3 (Buckets, Policies, Versioning)', 'IAM (Users, Roles, Policies)', 'VPC (Subnets, Route Tables, NAT)', 'RDS (Relational Database Service)', 'Lambda (Serverless Functions)'] },
        { name: 'DevOps & CI/CD', subtopics: ['CodePipeline', 'CodeBuild', 'CodeDeploy', 'ECR (Container Registry)', 'ECS & Fargate', 'CloudFormation / CDK'] },
        { name: 'Monitoring & Logging', subtopics: ['CloudWatch (Metrics, Logs, Alarms)', 'CloudTrail', 'X-Ray (Distributed Tracing)', 'SNS & SQS (Notifications/Queues)', 'EventBridge'] },
        { name: 'Testing in AWS', subtopics: ['Testing Lambda Functions', 'API Gateway Testing', 'Load Testing with AWS', 'Testing S3 Events', 'DynamoDB Testing', 'Mocking AWS Services (LocalStack)'] }
      ]
    },

    'kubernetes': {
      label: 'Kubernetes',
      aliases: ['kubernetes', 'k8s', 'container orchestration', 'kubectl'],
      topics: [
        { name: 'Core Concepts', subtopics: ['Cluster Architecture', 'Nodes (Master/Worker)', 'Pods', 'ReplicaSets', 'Deployments', 'Services (ClusterIP, NodePort, LoadBalancer)', 'Namespaces'] },
        { name: 'Configuration', subtopics: ['YAML Manifests', 'ConfigMaps', 'Secrets', 'Resource Limits (CPU/Memory)', 'Environment Variables', 'Volumes & Persistent Volumes'] },
        { name: 'Operations', subtopics: ['kubectl Commands', 'Scaling (HPA, VPA)', 'Rolling Updates & Rollbacks', 'Health Checks (Liveness/Readiness Probes)', 'Logging & Monitoring', 'Debugging Pods'] },
        { name: 'Testing with K8s', subtopics: ['Running Tests in Pods', 'Selenium Grid on K8s', 'Sidecar Containers for Testing', 'Helm Charts for Test Infrastructure', 'CI/CD with K8s (ArgoCD)'] }
      ]
    },

    'linux': {
      label: 'Linux / Shell Scripting',
      aliases: ['linux', 'shell scripting', 'bash', 'unix', 'shell', 'command line'],
      topics: [
        { name: 'Basic Commands', subtopics: ['File System Navigation (cd, ls, pwd)', 'File Operations (cp, mv, rm, mkdir)', 'File Viewing (cat, head, tail, less)', 'Permissions (chmod, chown)', 'Search (find, grep, locate)', 'Process Management (ps, top, kill)'] },
        { name: 'Shell Scripting', subtopics: ['Shebang & Script Execution', 'Variables & Data Types', 'Conditionals (if/else/elif)', 'Loops (for, while, until)', 'Functions', 'Command Line Arguments', 'Exit Codes', 'Input/Output Redirection'] },
        { name: 'System Administration', subtopics: ['User Management', 'Package Managers (apt, yum)', 'Cron Jobs & Scheduling', 'Disk Usage (df, du)', 'Network Commands (ping, curl, netstat, ssh)', 'Environment Variables', 'systemctl & Services'] },
        { name: 'For Testers', subtopics: ['Parsing Log Files (awk, sed)', 'Automating Test Runs via Scripts', 'SSH into Test Servers', 'Docker Commands from Shell', 'CI/CD Script Writing', 'Monitoring Test Results'] }
      ]
    },

    'dsa': {
      label: 'Data Structures & Algorithms',
      aliases: ['dsa', 'data structures', 'algorithms', 'leetcode', 'coding', 'competitive programming'],
      topics: [
        { name: 'Arrays & Strings', subtopics: ['Two Pointers', 'Sliding Window', 'Prefix Sum', 'Kadane\'s Algorithm', 'String Manipulation', 'Anagram & Palindrome Problems'] },
        { name: 'Linked Lists', subtopics: ['Singly Linked List', 'Doubly Linked List', 'Cycle Detection (Floyd\'s)', 'Reverse a Linked List', 'Merge Two Sorted Lists', 'Fast & Slow Pointers'] },
        { name: 'Stacks & Queues', subtopics: ['Stack Operations', 'Monotonic Stack', 'Queue & Deque', 'Priority Queue / Heap', 'Valid Parentheses', 'Next Greater Element'] },
        { name: 'Trees & Graphs', subtopics: ['Binary Tree Traversals (Inorder/Preorder/Postorder)', 'BST Operations', 'BFS & DFS', 'Graph Representations', 'Shortest Path (Dijkstra)', 'Topological Sort', 'Union-Find'] },
        { name: 'Sorting & Searching', subtopics: ['Binary Search', 'Merge Sort', 'Quick Sort', 'Counting Sort', 'Search in Rotated Array', 'Kth Largest Element'] },
        { name: 'Dynamic Programming', subtopics: ['Memoization vs Tabulation', 'Fibonacci / Climbing Stairs', 'Knapsack Problem', 'Longest Common Subsequence', 'Coin Change', 'Matrix Chain Multiplication'] },
        { name: 'Recursion & Backtracking', subtopics: ['Recursion Basics', 'Subsets & Permutations', 'N-Queens', 'Sudoku Solver', 'Word Search', 'Combination Sum'] }
      ]
    },

    'system design': {
      label: 'System Design',
      aliases: ['system design', 'hld', 'lld', 'high level design', 'low level design', 'architecture'],
      topics: [
        { name: 'Fundamentals', subtopics: ['Scalability (Vertical vs Horizontal)', 'Load Balancers', 'Caching (Redis, Memcached)', 'Database Sharding & Replication', 'CAP Theorem', 'Consistent Hashing', 'CDN'] },
        { name: 'Components', subtopics: ['API Gateway', 'Message Queues (Kafka, RabbitMQ)', 'Microservices vs Monolith', 'Service Discovery', 'Rate Limiting', 'Circuit Breaker Pattern', 'Event-Driven Architecture'] },
        { name: 'Database Design', subtopics: ['SQL vs NoSQL', 'Database Indexing', 'Normalization vs Denormalization', 'ACID vs BASE', 'Data Partitioning', 'Read Replicas', 'Schema Design'] },
        { name: 'Design Problems', subtopics: ['URL Shortener', 'Chat System', 'News Feed', 'Notification Service', 'File Storage (like S3)', 'Search Autocomplete', 'Rate Limiter'] },
        { name: 'Low-Level Design', subtopics: ['SOLID Principles', 'Design Patterns (Factory, Observer, Strategy)', 'Class Diagrams', 'Parking Lot System', 'Elevator System', 'LRU Cache Implementation'] }
      ]
    },

    'typescript': {
      label: 'TypeScript',
      aliases: ['typescript', 'ts', 'typed javascript'],
      topics: [
        { name: 'Basics', subtopics: ['Type Annotations', 'Primitive Types', 'Arrays & Tuples', 'Enums', 'Type Inference', 'Union & Intersection Types', 'Type Aliases', 'Literal Types'] },
        { name: 'Advanced Types', subtopics: ['Interfaces', 'Generics', 'Utility Types (Partial, Pick, Omit, Record)', 'Mapped Types', 'Conditional Types', 'Template Literal Types', 'Type Guards & Narrowing'] },
        { name: 'OOP in TypeScript', subtopics: ['Classes & Constructors', 'Access Modifiers (public/private/protected)', 'Abstract Classes', 'Implements vs Extends', 'Decorators', 'Mixins'] },
        { name: 'Testing with TypeScript', subtopics: ['Playwright with TypeScript', 'Cypress with TypeScript', 'Jest with TypeScript', 'tsconfig.json Configuration', 'Type-safe Page Objects', 'API Testing with Typed Responses'] }
      ]
    },

    'agile': {
      label: 'Agile & Scrum',
      aliases: ['agile', 'scrum', 'kanban methodology', 'sprint', 'agile testing'],
      topics: [
        { name: 'Agile Principles', subtopics: ['Agile Manifesto & Values', '12 Agile Principles', 'Agile vs Waterfall', 'Iterative & Incremental Development', 'Continuous Feedback', 'Embracing Change'] },
        { name: 'Scrum Framework', subtopics: ['Roles (Scrum Master, Product Owner, Dev Team)', 'Sprint Planning', 'Daily Standup', 'Sprint Review', 'Sprint Retrospective', 'Sprint Backlog & Product Backlog', 'Definition of Done'] },
        { name: 'Agile Testing', subtopics: ['Testing in Sprints', 'Shift-Left Testing', 'Test Automation in Agile', 'Acceptance Criteria & User Stories', 'BDD & TDD in Agile', 'Continuous Testing', 'Regression Strategy in Agile'] },
        { name: 'Tools & Metrics', subtopics: ['Jira (Boards, Epics, Stories, Bugs)', 'Velocity & Burndown Charts', 'Story Points & Estimation', 'Kanban Board', 'Confluence for Documentation', 'Sprint Metrics'] }
      ]
    },

    'test strategy': {
      label: 'Test Strategy & Planning',
      aliases: ['test strategy', 'test planning', 'test management', 'qa strategy', 'test estimation'],
      topics: [
        { name: 'Test Strategy', subtopics: ['Test Strategy Document', 'Risk-Based Testing', 'Test Approach (Manual vs Automated)', 'Test Environment Strategy', 'Tool Selection', 'Team Skill Assessment', 'Defect Prevention Strategy'] },
        { name: 'Test Planning', subtopics: ['Test Plan Components', 'Scope & Out of Scope', 'Resource Planning', 'Test Scheduling', 'Entry & Exit Criteria', 'Risk & Mitigation', 'Dependencies & Assumptions'] },
        { name: 'Test Estimation', subtopics: ['Work Breakdown Structure', 'Function Point Analysis', 'Use Case Point Method', 'Three-Point Estimation', 'Wideband Delphi', 'Story Points for Testing'] },
        { name: 'Test Metrics & Reporting', subtopics: ['Test Coverage Metrics', 'Defect Density', 'Test Execution Progress', 'Defect Leakage Rate', 'Test Automation ROI', 'QA Dashboard & Reporting', 'Release Readiness Assessment'] }
      ]
    },

    'kafka': {
      label: 'Kafka / Message Queues',
      aliases: ['kafka', 'message queue', 'rabbitmq', 'event streaming', 'pub sub'],
      topics: [
        { name: 'Core Concepts', subtopics: ['Producers & Consumers', 'Topics & Partitions', 'Consumer Groups', 'Offsets & Commits', 'Brokers & Clusters', 'Replication', 'ZooKeeper / KRaft'] },
        { name: 'Kafka Operations', subtopics: ['Creating Topics', 'Publishing Messages', 'Consuming Messages', 'kafka-console-producer/consumer', 'Retention Policies', 'Compression', 'Monitoring (JMX, Confluent Control Center)'] },
        { name: 'Testing with Kafka', subtopics: ['Testing Event-Driven Systems', 'Embedded Kafka for Tests', 'Verifying Message Production', 'Consumer Lag Monitoring', 'Schema Registry & Avro Validation', 'End-to-End Flow Testing', 'Kafka Testcontainers'] },
        { name: 'Other Message Queues', subtopics: ['RabbitMQ Basics', 'SQS (AWS)', 'Azure Service Bus', 'Pub/Sub Patterns', 'Dead Letter Queues', 'Message Ordering Guarantees'] }
      ]
    },

    'mongodb': {
      label: 'MongoDB / NoSQL',
      aliases: ['mongodb', 'nosql', 'mongo', 'document database', 'mongoose'],
      topics: [
        { name: 'Fundamentals', subtopics: ['Documents & Collections', 'BSON Data Types', 'MongoDB vs SQL', 'MongoDB Atlas', 'mongosh (Shell)', 'Connection Strings'] },
        { name: 'CRUD Operations', subtopics: ['insertOne / insertMany', 'find & Query Operators ($eq, $gt, $in, $regex)', 'updateOne / updateMany', 'deleteOne / deleteMany', 'Upsert', 'Bulk Operations'] },
        { name: 'Advanced Queries', subtopics: ['Aggregation Pipeline ($match, $group, $project, $sort)', 'Indexes (Single, Compound, Text)', 'Text Search', 'Lookup (Joins)', 'Projection', 'Cursor Methods'] },
        { name: 'Testing with MongoDB', subtopics: ['Database Validation in Tests', 'Test Data Setup & Teardown', 'Mongoose Schema Validation', 'MongoDB Testcontainers', 'Comparing API Response vs DB State', 'Performance Queries (explain)'] }
      ]
    }
  }
};
