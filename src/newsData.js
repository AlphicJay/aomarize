/**
 * Aomarize AI News Data Engine
 * Regional feeds aggregator for U.S., UK, Asia, and Africa.
 */

const REGIONAL_FEEDS = {
  us: [
    {
      id: 'us-1',
      region: 'us',
      regionName: 'United States',
      flag: '🇺🇸',
      title: 'OpenAI and Anthropic Sign Landmark Safety Evaluation Agreements with US AI Safety Institute',
      snippet: 'Under the new protocols, the US National Institute of Standards and Technology will receive early access to major new frontier models prior to public release.',
      fullText: `The U.S. Artificial Intelligence Safety Institute (AISI) officially executed agreements with leading frontier AI developers including OpenAI and Anthropic. Under these binding agreements, the government body will gain early evaluation access to upcoming major AI foundation models before they are deployed to commercial APIs or consumer platforms.

The initiative aims to conduct rigorous safety benchmark tests focusing on cyber vulnerability discovery, autonomous replication capabilities, and chemical/biological safeguard protocols. Leaders from Silicon Valley welcomed the framework as a balanced middle ground between rapid technological innovation and national security risk mitigation.

Federal officials emphasized that establishing standardized testing suites in Maryland will provide developers with predictable compliance roadmaps while reassuring enterprise customers of AI system reliability.`,
      keyTakeaways: [
        'Early access model evaluation before commercial deployment.',
        'Focus on cybersecurity, biosecurity, and autonomous risk benchmarks.',
        'Silicon Valley tech leaders endorse federal safety framework.'
      ],
      source: 'TechCrunch AI',
      url: 'https://techcrunch.com/category/artificial-intelligence/',
      category: 'Policy & Ethics',
      date: '2026-08-12T14:30:00Z',
      readTime: '4 min read',
      sentiment: 'Positive Governance'
    },
    {
      id: 'us-2',
      region: 'us',
      regionName: 'United States',
      flag: '🇺🇸',
      title: 'NVIDIA Unveils Next-Gen Blackwell-Ultra Architecture for 10M+ Parameter LLMs',
      snippet: 'The new hardware architecture delivers a 4x reduction in inference energy consumption while pushing FP4 tensor execution speed to unprecedented limits.',
      fullText: `NVIDIA announced its newest Blackwell-Ultra AI compute platform designed specifically for next-generation reasoning models and multimodal intelligence. Operating at sub-millisecond latencies, the new silicon architecture introduces real-time FP4 matrix calculation acceleration and liquid-cooled modular rack configurations.

Datacenter providers in Texas and Virginia are already upgrading backbones to support the high-density power requirements. Early performance benchmarks demonstrate a 70% decrease in inference cost per token compared to previous generation Hopper clusters, significantly lowering operational costs for enterprise generative AI deployments.`,
      keyTakeaways: [
        'FP4 tensor compute precision optimization.',
        '70% reduction in token inference costs for enterprise clusters.',
        'Designed for 10M+ parameter reasoning models.'
      ],
      source: 'VentureBeat AI',
      url: 'https://venturebeat.com/category/ai/',
      category: 'Chips & Hardware',
      date: '2026-08-11T09:15:00Z',
      readTime: '3 min read',
      sentiment: 'High Impact'
    },
    {
      id: 'us-3',
      region: 'us',
      regionName: 'United States',
      flag: '🇺🇸',
      title: 'Google DeepMind US Releases Gemini Math-Reasoning Engine for Scientific Discovery',
      snippet: 'Autonomous lab agents integrated with Gemini compute models successfully synthesize new superconductors and protein structures in record time.',
      fullText: `Google DeepMind's U.S. research team deployed its specialized mathematical and chemical reasoning engine to open-source scientific research institutions. The platform combines symbolic logic engines with neural transformer models, enabling automated hypothesis generation and experimental simulation.

In pilot studies across American university laboratories, the system predicted binding affinities for multi-target oncology drugs with 94% precision, cutting preliminary drug candidate discovery timelines from 18 months down to just 14 days.`,
      keyTakeaways: [
        'Combines symbolic logic engines with deep learning transformers.',
        'Accelerates drug discovery from 18 months down to 14 days.',
        '94% precision in multi-target molecular binding simulations.'
      ],
      source: 'MIT Technology Review',
      url: 'https://technologyreview.com',
      category: 'Research & Science',
      date: '2026-08-10T16:45:00Z',
      readTime: '5 min read',
      sentiment: 'Breakthrough'
    }
  ],

  uk: [
    {
      id: 'uk-1',
      region: 'uk',
      regionName: 'United Kingdom',
      flag: '🇬🇧',
      title: 'UK AI Safety Institute Launches £100M Sovereign Benchmark Suite in London Hub',
      snippet: 'The UK Department for Science, Innovation and Technology expands its London research headquarters to develop universal evaluation tools for sovereign AI governance.',
      fullText: `The United Kingdom government unveiled a £100M expansion of the UK AI Safety Institute based in London. The capital allocation will fund open safety suites, evaluations for agentic decision-making systems, and red-teaming toolkits for financial and healthcare applications.

Technology Secretary announced partnerships with Cambridge and Oxford AI labs to create standardized validation metrics that will be shared across European and G7 regulatory bodies. The move reinforces London’s position as Europe’s premier artificial intelligence capital.`,
      keyTakeaways: [
        '£100M government funding expansion for UK AISI.',
        'Focus on agentic decision-making and red-teaming toolkits.',
        'Partnerships with Oxford and Cambridge research laboratories.'
      ],
      source: 'BBC Tech & Science',
      url: 'https://bbc.com/news/technology',
      category: 'Policy & Ethics',
      date: '2026-08-12T11:20:00Z',
      readTime: '4 min read',
      sentiment: 'Strategic Growth'
    },
    {
      id: 'uk-2',
      region: 'uk',
      regionName: 'United Kingdom',
      flag: '🇬🇧',
      title: 'DeepMind London Lab Reveals Breakthrough in Quantum AI Fluid Dynamics',
      snippet: 'Using neural operator architectures, researchers in King’s Cross simulate aerodynamic drag on hypersonic aircraft wings with sub-atomic resolution.',
      fullText: `Scientists at DeepMind's London research center published groundbreaking findings on quantum fluid mechanics using physics-informed neural networks (PINNs). By encoding conservation of energy and Navier-Stokes equations directly into the transformer loss functions, the model achieves 1,000x faster computational fluid dynamics (CFD) predictions than legacy supercomputers.

Aerospace engineers at Rolls-Royce and BAE Systems have begun integrating the London model into turbine blade design pipelines to reduce fuel burn and carbon emissions.`,
      keyTakeaways: [
        'Physics-informed neural networks (PINNs) applied to aerodynamics.',
        '1,000x computational speedup compared to classical CFD supercomputers.',
        'Industry partnership with UK aerospace leaders.'
      ],
      source: 'The Guardian Tech',
      url: 'https://theguardian.com/technology',
      category: 'Research & Science',
      date: '2026-08-10T08:30:00Z',
      readTime: '5 min read',
      sentiment: 'Breakthrough'
    },
    {
      id: 'uk-3',
      region: 'uk',
      regionName: 'United Kingdom',
      flag: '🇬🇧',
      title: 'London Fintechs Adopt Agentic AI for Real-Time Fraud Detection across European Banking',
      snippet: 'Major UK retail banks report a 60% drop in sophisticated phishing and identity fraud following nationwide deployment of autonomous agent monitoring.',
      fullText: `Financial services in the City of London are rapidly deploying multi-agent reasoning models to track digital transactions in real-time. Unlike traditional rule-based algorithms, agentic AI systems dynamically analyze context, device telemetry, and cross-institutional transaction patterns.

Regulators at the Financial Conduct Authority (FCA) praised the proactive approach while reiterating strict requirements regarding model explainability and algorithmic auditability.`,
      keyTakeaways: [
        '60% drop in financial fraud across major UK banks.',
        'Multi-agent contextual transaction telemetry analysis.',
        'FCA compliance focus on explainable AI (XAI).'
      ],
      source: 'Financial Times AI',
      url: 'https://ft.com',
      category: 'Startups & VC',
      date: '2026-08-09T15:10:00Z',
      readTime: '3 min read',
      sentiment: 'Commercial Success'
    }
  ],

  asia: [
    {
      id: 'asia-1',
      region: 'asia',
      regionName: 'Asia',
      flag: '🌏',
      title: 'TSMC Achieves Commercial Yield on 1.4nm (A14) AI Accelerator Chips in Hsinchu',
      snippet: 'Taiwan Semiconductor Manufacturing Co. confirms mass production readiness for 1.4nm silicon nodes powering next-gen Asian and global AI supercomputers.',
      fullText: `Taiwan Semiconductor Manufacturing Company (TSMC) announced a breakthrough in 1.4-nanometer (A14) process technology at its Hsinchu Science Park facility. Featuring High-NA EUV lithography and backside power delivery network (BSPDN) tech, the node increases logic density by 20% while cutting power consumption by 30%.

Leading hardware designers across Tokyo, Seoul, and Silicon Valley have secured early allocation capacity. Mass production will begin next quarter to meet soaring global demand for generative AI inference accelerators.`,
      keyTakeaways: [
        '1.4nm (A14) process node achieves commercial manufacturing yield.',
        'Incorporates High-NA EUV lithography & Backside Power Delivery.',
        '30% reduction in power consumption for AI inference clusters.'
      ],
      source: 'Nikkei Asia',
      url: 'https://asia.nikkei.com',
      category: 'Chips & Hardware',
      date: '2026-08-12T04:00:00Z',
      readTime: '4 min read',
      sentiment: 'Market Leader'
    },
    {
      id: 'asia-2',
      region: 'asia',
      regionName: 'Asia',
      flag: '🌏',
      title: 'Singapore Launches ASEAN Multi-Language Foundation Model Initiative (SeaLion 3.0)',
      snippet: 'Infocomm Media Development Authority (IMDA) releases SeaLion 3.0, fine-tuned on 11 Southeast Asian languages including Bahasa, Thai, and Tagalog.',
      fullText: `Singapore's IMDA, in collaboration with AI Singapore, officially released SeaLion 3.0, an open-weights multimodal foundation model built explicitly for Southeast Asian linguistic and cultural nuances. 

Unlike Western models that often struggle with regional dialects and code-switching (e.g., Singlish or Bahasa-English mixing), SeaLion 3.0 demonstrates 92% benchmark accuracy on localized legal, healthcare, and e-commerce tasks. Governments across Malaysia, Indonesia, and Vietnam are integrating the model into public service chatbots.`,
      keyTakeaways: [
        'Fine-tuned for 11 Southeast Asian regional languages.',
        'High accuracy in code-switching and cultural context understanding.',
        'Adopted by ASEAN public sector digital transformation programs.'
      ],
      source: 'TechInAsia',
      url: 'https://techinasia.com',
      category: 'LLMs & GenAI',
      date: '2026-08-11T13:40:00Z',
      readTime: '4 min read',
      sentiment: 'Regional Benchmark'
    },
    {
      id: 'asia-3',
      region: 'asia',
      regionName: 'Asia',
      flag: '🌏',
      title: 'Japan Robotics Giants Unveil Humanoid Factory Workers Powered by Visual-Spatial AI',
      snippet: 'Fanuc and Yaskawa Electric demonstrate autonomous bipedal assembly robots operating side-by-side with human engineers in Nagoya auto plants.',
      fullText: `At the Tokyo International Robotics Expo, Japanese automation pioneers introduced visual-spatial transformer architectures integrated into factory humanoids. The robots process real-time 3D point-cloud data to assemble intricate electronic vehicle wiring harnesses with sub-millimeter precision.

The systems self-correct when components are misplaced or damaged, drastically reducing plant downtime and alleviating acute labor shortages in East Asia's manufacturing sectors.`,
      keyTakeaways: [
        'Visual-spatial transformers enable autonomous factory humanoids.',
        'Sub-millimeter assembly precision with self-correcting vision loops.',
        'Addresses industrial labor shortages across East Asia.'
      ],
      source: 'Japan Times Tech',
      url: 'https://japantimes.co.jp',
      category: 'Startups & VC',
      date: '2026-08-09T18:20:00Z',
      readTime: '3 min read',
      sentiment: 'Industrial Breakthrough'
    }
  ],

  africa: [
    {
      id: 'africa-1',
      region: 'africa',
      regionName: 'Africa',
      flag: '🌍',
      title: 'Lelapa AI and Masakhane Open-Source Multilingual Models for 25+ African Indigenous Languages',
      snippet: 'Johannesburg-based Lelapa AI expands the Vulavula platform to enable low-resource speech recognition, translation, and sentiment analysis for African commerce.',
      fullText: `African AI research collective Masakhane and South Africa-based Lelapa AI unveiled major updates to their open-source speech and NLP suite, Vulavula 2.0. The model suite supports over 25 indigenous African languages including isiZulu, Yoruba, Swahili, Amharic, and Hausa.

The initiative addresses severe digital exclusion across the continent, enabling local agricultural cooperatives, mobile money providers, and telehealth providers to deliver voice-activated financial and health services in users' native tongues without internet connectivity requirements.`,
      keyTakeaways: [
        'Supports 25+ indigenous African languages with edge-device capability.',
        'Voice-driven mobile banking and telehealth for rural communities.',
        'Community-driven open research led by Masakhane & Lelapa AI.'
      ],
      source: 'Disrupt Africa',
      url: 'https://disrupt-africa.com',
      category: 'LLMs & GenAI',
      date: '2026-08-12T10:00:00Z',
      readTime: '4 min read',
      sentiment: 'High Impact Innovation'
    },
    {
      id: 'africa-2',
      region: 'africa',
      regionName: 'Africa',
      flag: '🌍',
      title: 'Agri-Tech AI Startup in Kenya Raises $45M to Deploy Satellite Computer Vision for Smallholders',
      snippet: 'Nairobi-headquartered farm assistant uses multi-spectral satellite imagery and smartphone camera diagnostic algorithms to predict crop yield and combat pests.',
      fullText: `Kenyan agricultural AI startup BioCrop closed a $45M Series B funding round to scale its computer-vision agronomy platform across East and West Africa. The mobile app allows farmers to snap photos of crop leaves to instantly diagnose viral blights, armyworm infestations, and micro-nutrient deficiencies.

Integrated satellite radar data offers hyper-local weather predictions and optimized irrigation recommendations, boosting maize and coffee yields by up to 40% for smallholder farmers.`,
      keyTakeaways: [
        '$45M Series B funding for Kenyan Agri-Tech computer vision.',
        '40% crop yield increase for smallholder farmers.',
        'Combines satellite radar with smartphone leaf diagnostics.'
      ],
      source: 'TechCabal',
      url: 'https://techcabal.com',
      category: 'Startups & VC',
      date: '2026-08-11T07:50:00Z',
      readTime: '3 min read',
      sentiment: 'Economic Growth'
    },
    {
      id: 'africa-3',
      region: 'africa',
      regionName: 'Africa',
      flag: '🌍',
      title: 'UNESCO and African Union Partner to Establish Continental AI Ethics & Governance Hub in Kigali',
      snippet: 'Kigali AI Policy Summit adopts unified guidelines for responsible artificial intelligence deployment, data sovereignty, and digital talent development across 54 member states.',
      fullText: `Delegates from 54 African Union nations met in Kigali, Rwanda, alongside UNESCO leadership to sign the Kigali Accord on Artificial Intelligence Governance. The charter establishes a centralized continental hub tasked with creating sovereign data protection standards, ethical framework guidelines, and AI computing hardware access initiatives.

The initiative places special emphasis on nurturing youth developer talent through targeted regional university scholarships and computing access infrastructure.`,
      keyTakeaways: [
        'Kigali Accord establishes continental AI ethics hub in Rwanda.',
        'Focus on data sovereignty, youth talent development, and computing access.',
        'Endorsed by 54 African Union member states.'
      ],
      source: 'AllAfrica Tech',
      url: 'https://allafrica.com/technology',
      category: 'Policy & Ethics',
      date: '2026-08-08T12:00:00Z',
      readTime: '4 min read',
      sentiment: 'Policy Milestone'
    }
  ]
};

// Helper: Get all articles flattened
function getAllArticles() {
  const all = [];
  Object.values(REGIONAL_FEEDS).forEach(list => {
    all.push(...list);
  });
  // Sort descending by date
  return all.sort((a, b) => new Date(b.date) - new Date(a.date));
}

let cachedArticles = {};

// Fetch live articles (attempts live RSS endpoint or fallback)
async function fetchRegionalArticles(regionFilter = 'all') {
  try {
    if (window.electronAPI && window.electronAPI.fetchNews) {
      const liveData = await window.electronAPI.fetchNews(regionFilter);
      if (liveData && liveData.length > 0) {
        if (!cachedArticles[regionFilter]) cachedArticles[regionFilter] = [];
        const existingUrls = new Set(cachedArticles[regionFilter].map(a => a.url));
        const newItems = liveData.filter(a => !existingUrls.has(a.url));
        // Prepend new items
        cachedArticles[regionFilter] = [...newItems, ...cachedArticles[regionFilter]];
        return cachedArticles[regionFilter];
      }
    }
    
    // Fallback to static mock data if live fetch fails or is empty, BUT only if we have no cached data
    if (cachedArticles[regionFilter] && cachedArticles[regionFilter].length > 0) {
      return cachedArticles[regionFilter];
    }

    let dataset = [];
    if (regionFilter === 'all') {
      dataset = getAllArticles();
    } else {
      dataset = REGIONAL_FEEDS[regionFilter] || [];
    }
    return dataset;
  } catch (err) {
    console.warn('Error retrieving feed, utilizing curated dataset:', err);
    if (cachedArticles[regionFilter] && cachedArticles[regionFilter].length > 0) {
      return cachedArticles[regionFilter];
    }
    return getAllArticles();
  }
}

// Calculate regional activity statistics
function getRegionalStats() {
  const stats = {
    us: (cachedArticles.us && cachedArticles.us.length) || REGIONAL_FEEDS.us.length,
    uk: (cachedArticles.uk && cachedArticles.uk.length) || REGIONAL_FEEDS.uk.length,
    asia: (cachedArticles.asia && cachedArticles.asia.length) || REGIONAL_FEEDS.asia.length,
    africa: (cachedArticles.africa && cachedArticles.africa.length) || REGIONAL_FEEDS.africa.length,
    total: 0
  };
  stats.total = (cachedArticles.all && cachedArticles.all.length) || (stats.us + stats.uk + stats.asia + stats.africa);
  return stats;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { REGIONAL_FEEDS, getAllArticles, fetchRegionalArticles, getRegionalStats };
}
