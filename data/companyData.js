// Company Names Database - Auto-suggest for Interview Pipeline & Offers
const CompanyData = {
  // Get suggestions matching partial input
  getSuggestions(query) {
    const q = query.toLowerCase().trim();
    if (!q || q.length < 2) return [];
    return this.companies.filter(c => c.name.toLowerCase().includes(q)).slice(0, 8);
  },

  companies: [
    // FAANG / Big Tech
    { name: 'Google', sector: 'Big Tech' },
    { name: 'Amazon', sector: 'Big Tech' },
    { name: 'Apple', sector: 'Big Tech' },
    { name: 'Meta (Facebook)', sector: 'Big Tech' },
    { name: 'Microsoft', sector: 'Big Tech' },
    { name: 'Netflix', sector: 'Big Tech' },

    // Cloud & Enterprise
    { name: 'Salesforce', sector: 'Cloud' },
    { name: 'Oracle', sector: 'Enterprise' },
    { name: 'SAP', sector: 'Enterprise' },
    { name: 'IBM', sector: 'Enterprise' },
    { name: 'ServiceNow', sector: 'Cloud' },
    { name: 'Snowflake', sector: 'Cloud' },
    { name: 'Databricks', sector: 'Cloud' },
    { name: 'VMware', sector: 'Cloud' },
    { name: 'Confluent', sector: 'Cloud' },

    // Fintech & Payments
    { name: 'Stripe', sector: 'Fintech' },
    { name: 'PayPal', sector: 'Fintech' },
    { name: 'Square (Block)', sector: 'Fintech' },
    { name: 'Razorpay', sector: 'Fintech' },
    { name: 'PhonePe', sector: 'Fintech' },
    { name: 'Paytm', sector: 'Fintech' },
    { name: 'CRED', sector: 'Fintech' },
    { name: 'Visa', sector: 'Fintech' },
    { name: 'Mastercard', sector: 'Fintech' },
    { name: 'Goldman Sachs', sector: 'Finance' },
    { name: 'JP Morgan Chase', sector: 'Finance' },
    { name: 'Morgan Stanley', sector: 'Finance' },
    { name: 'Barclays', sector: 'Finance' },
    { name: 'Deutsche Bank', sector: 'Finance' },
    { name: 'HSBC', sector: 'Finance' },

    // E-commerce & Retail
    { name: 'Flipkart', sector: 'E-commerce' },
    { name: 'Shopify', sector: 'E-commerce' },
    { name: 'Myntra', sector: 'E-commerce' },
    { name: 'Walmart', sector: 'Retail' },
    { name: 'Target', sector: 'Retail' },
    { name: 'eBay', sector: 'E-commerce' },
    { name: 'Etsy', sector: 'E-commerce' },
    { name: 'Meesho', sector: 'E-commerce' },
    { name: 'Nykaa', sector: 'E-commerce' },

    // Ride-sharing & Delivery
    { name: 'Uber', sector: 'Mobility' },
    { name: 'Ola', sector: 'Mobility' },
    { name: 'Lyft', sector: 'Mobility' },
    { name: 'Swiggy', sector: 'Delivery' },
    { name: 'Zomato', sector: 'Delivery' },
    { name: 'DoorDash', sector: 'Delivery' },
    { name: 'Dunzo', sector: 'Delivery' },
    { name: 'Blinkit', sector: 'Delivery' },

    // Indian IT Services
    { name: 'TCS', sector: 'IT Services' },
    { name: 'Infosys', sector: 'IT Services' },
    { name: 'Wipro', sector: 'IT Services' },
    { name: 'HCL Technologies', sector: 'IT Services' },
    { name: 'Tech Mahindra', sector: 'IT Services' },
    { name: 'Cognizant', sector: 'IT Services' },
    { name: 'Capgemini', sector: 'IT Services' },
    { name: 'Accenture', sector: 'IT Services' },
    { name: 'LTIMindtree', sector: 'IT Services' },
    { name: 'Mphasis', sector: 'IT Services' },

    // Product Companies (India)
    { name: 'Zoho', sector: 'Product' },
    { name: 'Freshworks', sector: 'Product' },
    { name: 'Postman', sector: 'Product' },
    { name: 'BrowserStack', sector: 'Product' },
    { name: 'Hasura', sector: 'Product' },
    { name: 'Chargebee', sector: 'Product' },
    { name: 'Clevertap', sector: 'Product' },
    { name: 'Druva', sector: 'Product' },
    { name: 'Icertis', sector: 'Product' },

    // Startups (India)
    { name: 'Zerodha', sector: 'Startup' },
    { name: 'Groww', sector: 'Startup' },
    { name: 'Upstox', sector: 'Startup' },
    { name: 'Jupiter', sector: 'Startup' },
    { name: 'Slice', sector: 'Startup' },
    { name: 'Urban Company', sector: 'Startup' },
    { name: 'ShareChat', sector: 'Startup' },
    { name: 'Unacademy', sector: 'Startup' },
    { name: 'Byju\'s', sector: 'Startup' },
    { name: 'Lenskart', sector: 'Startup' },
    { name: 'Ather Energy', sector: 'Startup' },
    { name: 'Rapido', sector: 'Startup' },

    // Social & Media
    { name: 'Twitter (X)', sector: 'Social' },
    { name: 'LinkedIn', sector: 'Social' },
    { name: 'Snap Inc', sector: 'Social' },
    { name: 'Pinterest', sector: 'Social' },
    { name: 'Reddit', sector: 'Social' },
    { name: 'Spotify', sector: 'Media' },
    { name: 'Disney+ Hotstar', sector: 'Media' },

    // Gaming & Entertainment
    { name: 'Dream11', sector: 'Gaming' },
    { name: 'MPL', sector: 'Gaming' },
    { name: 'Zynga', sector: 'Gaming' },
    { name: 'Epic Games', sector: 'Gaming' },

    // DevTools & SaaS
    { name: 'Atlassian', sector: 'DevTools' },
    { name: 'GitHub', sector: 'DevTools' },
    { name: 'GitLab', sector: 'DevTools' },
    { name: 'JetBrains', sector: 'DevTools' },
    { name: 'HashiCorp', sector: 'DevTools' },
    { name: 'Elastic', sector: 'DevTools' },
    { name: 'Datadog', sector: 'DevTools' },
    { name: 'PagerDuty', sector: 'DevTools' },
    { name: 'Twilio', sector: 'SaaS' },
    { name: 'Notion', sector: 'SaaS' },
    { name: 'Slack', sector: 'SaaS' },
    { name: 'Zoom', sector: 'SaaS' },
    { name: 'HubSpot', sector: 'SaaS' },
    { name: 'Monday.com', sector: 'SaaS' },

    // Hardware & Semiconductors
    { name: 'Intel', sector: 'Hardware' },
    { name: 'AMD', sector: 'Hardware' },
    { name: 'NVIDIA', sector: 'Hardware' },
    { name: 'Qualcomm', sector: 'Hardware' },
    { name: 'Samsung', sector: 'Hardware' },
    { name: 'Dell', sector: 'Hardware' },
    { name: 'HP', sector: 'Hardware' },

    // Cybersecurity
    { name: 'CrowdStrike', sector: 'Security' },
    { name: 'Palo Alto Networks', sector: 'Security' },
    { name: 'Fortinet', sector: 'Security' },
    { name: 'Zscaler', sector: 'Security' },
    { name: 'Okta', sector: 'Security' },

    // Consulting
    { name: 'McKinsey & Company', sector: 'Consulting' },
    { name: 'Deloitte', sector: 'Consulting' },
    { name: 'PwC', sector: 'Consulting' },
    { name: 'EY (Ernst & Young)', sector: 'Consulting' },
    { name: 'KPMG', sector: 'Consulting' },
    { name: 'Boston Consulting Group', sector: 'Consulting' },

    // Telecom
    { name: 'Jio', sector: 'Telecom' },
    { name: 'Airtel', sector: 'Telecom' },
    { name: 'Vodafone Idea', sector: 'Telecom' },
    { name: 'BT Group', sector: 'Telecom' },
    { name: 'Verizon', sector: 'Telecom' },
    { name: 'AT&T', sector: 'Telecom' },

    // AI & ML
    { name: 'OpenAI', sector: 'AI' },
    { name: 'Anthropic', sector: 'AI' },
    { name: 'DeepMind', sector: 'AI' },
    { name: 'Hugging Face', sector: 'AI' },
    { name: 'Scale AI', sector: 'AI' },
    { name: 'Cohere', sector: 'AI' },

    // Travel & Hospitality
    { name: 'MakeMyTrip', sector: 'Travel' },
    { name: 'Booking.com', sector: 'Travel' },
    { name: 'Airbnb', sector: 'Travel' },
    { name: 'OYO', sector: 'Travel' },
    { name: 'Cleartrip', sector: 'Travel' },

    // Health & Pharma
    { name: 'Practo', sector: 'Health' },
    { name: '1mg (Tata Health)', sector: 'Health' },
    { name: 'PharmEasy', sector: 'Health' },
    { name: 'Cure.fit (Cult)', sector: 'Health' },

    // Others
    { name: 'Adobe', sector: 'Software' },
    { name: 'Intuit', sector: 'Software' },
    { name: 'Cisco', sector: 'Networking' },
    { name: 'Red Hat', sector: 'Open Source' },
    { name: 'ThoughtWorks', sector: 'Consulting' },
    { name: 'Palantir', sector: 'Data' },
    { name: 'Coinbase', sector: 'Crypto' },
    { name: 'Ripple', sector: 'Crypto' }
  ]
};
