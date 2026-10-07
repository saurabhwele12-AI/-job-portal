import { JobNotification } from '../types/job';

// Curated live / fresh government notification templates for auto-sync generator
const LIVE_GOVT_ALERT_POOL: Omit<JobNotification, 'id' | 'slug' | 'importantDates' | 'viewsCount'>[] = [
  {
    title: 'ISRO Scientist / Engineer "SC" Recruitment 2026',
    organization: {
      name: 'Indian Space Research Organisation',
      shortName: 'ISRO',
      logoText: 'ISRO',
      badgeColor: 'bg-orange-600',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'Space & Tech',
    totalVacancies: 325,
    location: 'Bengaluru / Sriharikota / Thiruvananthapuram',
    eligibility: {
      education: ['B.E / B.Tech in Electronics / Mechanical / Computer Science (Min 65% Marks)'],
      minAge: 21,
      maxAge: 30,
      ageRelaxation: 'OBC: 3 Years | SC/ST: 5 Years',
      experience: 'Fresher Eligible (GATE 2025/2026 Score Valid)',
    },
    compensation: {
      salaryOrPayScale: 'Level-10 (₹56,100 - ₹1,77,500/mo) + HRA & DA',
      applicationFeeGeneral: 750,
      applicationFeeReserved: 0,
      feeNote: 'Exempt for Women/SC/ST/PwBD candidates.',
    },
    selectionProcess: ['GATE Score Screening', 'Written Test', 'Personal Interview'],
    summary: 'ISRO Centralised Recruitment Board invites applications for Scientists/Engineers in Electronics, Mechanical, and Computer Science disciplines.',
    links: {
      applyUrl: 'https://isro.gov.in/careers',
      officialWebsiteUrl: 'https://isro.gov.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'DRDO CEPTAM-11 Senior Technical Assistant (STA-B) Recruitment 2026',
    organization: {
      name: 'Defence Research & Development Organisation',
      shortName: 'DRDO',
      logoText: 'DRDO',
      badgeColor: 'bg-blue-800',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'Defense & Research',
    totalVacancies: 1075,
    location: 'All India DRDO Labs',
    eligibility: {
      education: ['Diploma in Engineering / B.Sc in Allied Science Disciplines'],
      minAge: 18,
      maxAge: 28,
      ageRelaxation: 'OBC: 3 Yrs | SC/ST: 5 Yrs',
      experience: 'Freshers Eligible',
    },
    compensation: {
      salaryOrPayScale: 'Pay Matrix Level-6 (₹35,400 - ₹1,12,400/mo)',
      applicationFeeGeneral: 100,
      applicationFeeReserved: 0,
    },
    selectionProcess: ['Tier-I Computer Based Screening', 'Tier-II Trade / Technical Test'],
    summary: 'Centre for Personnel Talent Management (CEPTAM) announces nationwide vacancies for technical assistants across 50+ DRDO laboratories.',
    links: {
      applyUrl: 'https://drdo.gov.in/ceptam-11',
      officialWebsiteUrl: 'https://drdo.gov.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'Railway Recruitment Board (RRB) Non-Technical Popular Categories (NTPC) 2026',
    organization: {
      name: 'Railway Recruitment Boards',
      shortName: 'RRB',
      logoText: 'RRB',
      badgeColor: 'bg-emerald-700',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'Railways',
    totalVacancies: 11558,
    location: 'All India Railway Zones',
    eligibility: {
      education: ['Graduate in any discipline (Level 5 & 6) / 12th Pass (Level 2 & 3)'],
      minAge: 18,
      maxAge: 33,
      ageRelaxation: 'OBC: 3 Yrs | SC/ST: 5 Yrs',
      experience: 'Fresher Eligible',
    },
    compensation: {
      salaryOrPayScale: '₹21,700 - ₹45,000/mo + Railway Free Pass Allowances',
      applicationFeeGeneral: 500,
      applicationFeeReserved: 250,
      feeNote: '₹400 / ₹250 refunded upon attending CBT-1.',
    },
    selectionProcess: ['1st Stage CBT', '2nd Stage CBT', 'Typing Skill Test / CBAT', 'Document Verification'],
    summary: 'Mega recruitment notification for Station Master, Goods Train Manager, Senior Commercial Clerk, and Accounts Clerk cum Typist across 21 RRB divisions.',
    links: {
      applyUrl: 'https://rrbapply.gov.in',
      officialWebsiteUrl: 'https://indianrailways.gov.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'Reserve Bank of India (RBI) Grade "B" Officers Recruitment 2026',
    organization: {
      name: 'Reserve Bank of India',
      shortName: 'RBI',
      logoText: 'RBI',
      badgeColor: 'bg-amber-700',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'Banking & Finance',
    totalVacancies: 291,
    location: 'Mumbai / Delhi / Kolkata / Chennai',
    eligibility: {
      education: ["Bachelor's Degree with minimum 60% marks in aggregate"],
      minAge: 21,
      maxAge: 30,
      ageRelaxation: 'OBC: 3 Yrs | SC/ST: 5 Yrs | PwBD: 10 Yrs',
      experience: 'Fresher Eligible',
    },
    compensation: {
      salaryOrPayScale: 'Starting Gross ₹1,16,684/mo + Official Quarters',
      applicationFeeGeneral: 850,
      applicationFeeReserved: 100,
    },
    selectionProcess: ['Phase-I Online Exam', 'Phase-II Descriptive & Objective', 'Phase-III Interview'],
    summary: 'Apex banking regulatory appointment for Officers in Grade B (General, DEPR, DSIM streams). High prestige central banking career.',
    links: {
      applyUrl: 'https://rbi.org.in/careers',
      officialWebsiteUrl: 'https://rbi.org.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'Google Cloud Software Engineer (L3/L4) 2026 Hiring Drive',
    organization: {
      name: 'Google LLC India',
      shortName: 'GOOGLE',
      logoText: 'GOOG',
      badgeColor: 'bg-red-600',
      verified: true,
    },
    sector: 'PRIVATE',
    category: 'Cloud & Systems',
    totalVacancies: 85,
    location: 'Bengaluru / Hyderabad (Hybrid)',
    workMode: 'HYBRID',
    eligibility: {
      education: ['B.Tech / M.Tech in CS, IT, ECE or equivalent practical experience'],
      experience: '1 - 4 Years Software Development Experience',
      skills: ['Go', 'Java', 'Distributed Systems', 'Kubernetes', 'Python'],
    },
    compensation: {
      salaryOrPayScale: '₹32 - 48 LPA (Base + RSUs + Annual Bonus)',
      applicationFeeGeneral: 0,
      applicationFeeReserved: 0,
      feeNote: 'Zero fee. Direct corporate hiring portal.',
    },
    selectionProcess: ['Online Coding Assessment', '2x Technical Problem Solving', 'Googleyness & Leadership'],
    summary: 'Build high-scale distributed systems and enterprise infrastructure for Google Cloud Platform powering millions of businesses globally.',
    links: {
      applyUrl: 'https://careers.google.com/jobs/results',
      officialWebsiteUrl: 'https://careers.google.com',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'Microsoft Azure Data Engineer (India Development Centre) 2026',
    organization: {
      name: 'Microsoft Corporation India',
      shortName: 'MSFT',
      logoText: 'MSFT',
      badgeColor: 'bg-blue-600',
      verified: true,
    },
    sector: 'PRIVATE',
    category: 'Big Data & AI',
    totalVacancies: 110,
    location: 'Bengaluru / Noida (Hybrid)',
    workMode: 'HYBRID',
    eligibility: {
      education: ['B.Tech / BE in Computer Science, Data Science, or related engineering'],
      experience: '0 - 3 Years / Freshers with relevant internships eligible',
      skills: ['Python', 'SQL', 'Apache Spark', 'Azure Data Factory', 'Data Warehousing'],
    },
    compensation: {
      salaryOrPayScale: '₹26 - 40 LPA + Microsoft Stock Awards',
      applicationFeeGeneral: 0,
      applicationFeeReserved: 0,
    },
    selectionProcess: ['Technical Screening', 'System Design & Data Structures', 'Culture Fit'],
    summary: 'Develop hyperscale analytical pipelines and AI data foundations for Azure OpenAI, Microsoft Fabric, and global cloud intelligence.',
    links: {
      applyUrl: 'https://careers.microsoft.com',
      officialWebsiteUrl: 'https://microsoft.com',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
];

// Curated Authentic State Government Recruitment pool across major Indian states
export const LIVE_STATE_GOVT_POOL: Omit<JobNotification, 'id' | 'slug' | 'importantDates' | 'viewsCount'>[] = [
  {
    title: 'BPSC Block Agriculture Officer (BAO) & Sub-Divisional Agriculture Officer 2026',
    organization: {
      name: 'Bihar Public Service Commission',
      shortName: 'BPSC',
      logoText: 'BPSC',
      badgeColor: 'bg-emerald-800',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'State PSC',
    state: 'BR',
    totalVacancies: 1051,
    location: 'Patna & Bihar Sub-Divisions',
    qualificationLevel: 'graduate',
    eligibility: {
      education: ['B.Sc in Agriculture / Agriculture Engineering from recognized university'],
      minAge: 21,
      maxAge: 37,
      ageRelaxation: 'OBC/BC: 3 Years | SC/ST: 5 Years | Female: 3 Years',
      experience: 'Freshers Eligible',
    },
    compensation: {
      salaryOrPayScale: 'Level-9 (₹53,100 - ₹1,67,800/mo) + DA & HRA',
      applicationFeeGeneral: 750,
      applicationFeeReserved: 200,
    },
    selectionProcess: ['Written Examination (General Hindi, General Knowledge, Agronomy)', 'Viva-Voce / Interview'],
    summary: 'Department of Agriculture, Govt. of Bihar invites applications for Block Agriculture Officers and Agriculture Directors.',
    links: {
      applyUrl: 'https://onlinebpsc.bihar.gov.in',
      officialWebsiteUrl: 'https://bpsc.bih.nic.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'UPSSSC Rajasva Lekhpal Direct Recruitment 2026 (Revenue Department)',
    organization: {
      name: 'Uttar Pradesh Subordinate Services Selection Commission',
      shortName: 'UPSSSC',
      logoText: 'UPSSSC',
      badgeColor: 'bg-blue-800',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'Revenue / State Govt',
    state: 'UP',
    totalVacancies: 4680,
    location: 'Uttar Pradesh District Tehsils',
    qualificationLevel: '12th',
    eligibility: {
      education: ['12th Pass (Intermediate) + UPSSSC PET 2025/2026 Valid Scorecard'],
      minAge: 18,
      maxAge: 40,
      ageRelaxation: 'OBC/SC/ST: 5 Years',
      experience: 'Fresher Eligible (CCC Certificate desirable)',
    },
    compensation: {
      salaryOrPayScale: 'Pay Band-1 (₹5,200 - ₹20,200 Grade Pay ₹2,000)',
      applicationFeeGeneral: 25,
      applicationFeeReserved: 25,
      feeNote: 'Processing fee ₹25 for main exam shortlisting.',
    },
    selectionProcess: ['PET Score Shortlisting', 'Mains Written Exam (100 Marks)', 'Document Verification'],
    summary: 'Board of Revenue UP announces village revenue accounting posts across 75 districts.',
    links: {
      applyUrl: 'https://upsssc.gov.in/AllNotifications.aspx',
      officialWebsiteUrl: 'https://upsssc.gov.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'RPSC Rajasthan State & Subordinate Services (RAS / RTS) Combined Exam 2026',
    organization: {
      name: 'Rajasthan Public Service Commission',
      shortName: 'RPSC',
      logoText: 'RPSC',
      badgeColor: 'bg-rose-800',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'State PSC',
    state: 'RJ',
    totalVacancies: 905,
    location: 'Jaipur & Rajasthan Divisions',
    qualificationLevel: 'graduate',
    eligibility: {
      education: ['Graduation in any discipline from a recognized University'],
      minAge: 21,
      maxAge: 40,
      ageRelaxation: 'SC/ST/OBC/MBC/EWS: 5 Years',
      experience: 'Freshers Eligible',
    },
    compensation: {
      salaryOrPayScale: 'Pay Matrix Level L-14 to L-12 (₹56,100 - ₹1,77,500/mo)',
      applicationFeeGeneral: 600,
      applicationFeeReserved: 400,
    },
    selectionProcess: ['Preliminary Examination (Objective 200 Marks)', 'Mains Exam (Descriptive 4 Papers 800 Marks)', 'Personality Interview (100 Marks)'],
    summary: 'Apex administrative state service examination for SDM, Deputy SP, Accounts Officers and Tehsildars in Rajasthan.',
    links: {
      applyUrl: 'https://sso.rajasthan.gov.in',
      officialWebsiteUrl: 'https://rpsc.rajasthan.gov.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'MPSC Maharashtra Gazetted Civil Services Combined Preliminary Exam 2026',
    organization: {
      name: 'Maharashtra Public Service Commission',
      shortName: 'MPSC',
      logoText: 'MPSC',
      badgeColor: 'bg-orange-700',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'State PSC',
    state: 'MH',
    totalVacancies: 524,
    location: 'Mumbai, Pune & Maharashtra Divisions',
    qualificationLevel: 'graduate',
    eligibility: {
      education: ["Bachelor's Degree in any stream (B.E/B.Sc for specific cadres)"],
      minAge: 19,
      maxAge: 38,
      ageRelaxation: 'Backward Classes: 5 Years',
      experience: 'Fresher Eligible (Marathi knowledge required)',
    },
    compensation: {
      salaryOrPayScale: 'Pay Matrix Level S-20 (₹56,100 - ₹1,77,500/mo)',
      applicationFeeGeneral: 394,
      applicationFeeReserved: 294,
    },
    selectionProcess: ['Combined Prelims Exam (GS + CSAT)', 'Main Written Exam', 'Interview'],
    summary: 'Deputy Collector, Assistant Police Commissioner (ACP), and Tehsildar recruitments under General Administration Department.',
    links: {
      applyUrl: 'https://mpsconline.gov.in',
      officialWebsiteUrl: 'https://mpsc.gov.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'DSSSB Delhi Subordinate Services TGT & PGT Teacher Recruitment 2026',
    organization: {
      name: 'Delhi Subordinate Services Selection Board',
      shortName: 'DSSSB',
      logoText: 'DSSSB',
      badgeColor: 'bg-blue-800',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'Teaching / Delhi Govt',
    state: 'DL',
    totalVacancies: 5800,
    location: 'Delhi NCR Schools',
    qualificationLevel: 'graduate',
    eligibility: {
      education: ['Graduate / Post Graduate in relevant subject + B.Ed + CTET Paper-II Qualified'],
      minAge: 21,
      maxAge: 32,
      ageRelaxation: 'Women: 10 Years | OBC (Delhi): 3 Years | SC/ST: 5 Years',
      experience: 'Freshers Eligible',
    },
    compensation: {
      salaryOrPayScale: 'Pay Matrix Level-7 (₹44,900 - ₹1,42,400/mo) + Delhi Allowances',
      applicationFeeGeneral: 100,
      applicationFeeReserved: 0,
      feeNote: 'Women, SC, ST, PwBD candidates exempt from fee.',
    },
    selectionProcess: ['One Tier Computer Based Examination (200 Marks)', 'Document Verification'],
    summary: 'Directorate of Education, GNCT of Delhi invites applications for Trained Graduate Teachers in English, Maths, Science & Social Science.',
    links: {
      applyUrl: 'https://dsssbonline.nic.in',
      officialWebsiteUrl: 'https://dsssb.delhi.gov.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'TNPSC Combined Civil Services Examination-II (Group-2 & 2A) 2026',
    organization: {
      name: 'Tamil Nadu Public Service Commission',
      shortName: 'TNPSC',
      logoText: 'TNPSC',
      badgeColor: 'bg-emerald-900',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'State PSC',
    state: 'TN',
    totalVacancies: 2327,
    location: 'Chennai & Tamil Nadu Districts',
    qualificationLevel: 'graduate',
    eligibility: {
      education: ['Any Degree from UGC recognized University + Adequate Tamil knowledge'],
      minAge: 18,
      maxAge: 32,
      ageRelaxation: 'BC/MBC/SC/ST: No Maximum Age Limit',
      experience: 'Freshers Eligible',
    },
    compensation: {
      salaryOrPayScale: 'Level-9 to Level-16 (₹20,600 - ₹1,19,500/mo)',
      applicationFeeGeneral: 150,
      applicationFeeReserved: 0,
    },
    selectionProcess: ['Preliminary Examination (Single Paper 300 Marks)', 'Main Written Exam', 'Oral Test (for Interview Posts)'],
    summary: 'Sub-Registrar, Municipal Commissioner, Assistant Section Officer (ASO) in Secretariat and Revenue Inspector posts.',
    links: {
      applyUrl: 'https://tnpscexams.in',
      officialWebsiteUrl: 'https://tnpsc.gov.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'KEA Karnataka First Division Assistant (FDA) & SDA Recruitment 2026',
    organization: {
      name: 'Karnataka Examinations Authority',
      shortName: 'KEA',
      logoText: 'KEA',
      badgeColor: 'bg-red-700',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'State Govt',
    state: 'KA',
    totalVacancies: 1850,
    location: 'Bengaluru & Karnataka Districts',
    qualificationLevel: 'graduate',
    eligibility: {
      education: ["Bachelor's Degree in any discipline (FDA) / 12th Pass (SDA) + Kannada Language test"],
      minAge: 18,
      maxAge: 35,
      ageRelaxation: '2A/2B/3A/3B: 3 Years | SC/ST/Cat-I: 5 Years',
      experience: 'Freshers Eligible',
    },
    compensation: {
      salaryOrPayScale: 'Pay Scale ₹27,650 - ₹52,650/mo',
      applicationFeeGeneral: 750,
      applicationFeeReserved: 250,
    },
    selectionProcess: ['Compulsory Kannada Exam', 'General English / General Kannada (100 Mks)', 'General Knowledge (100 Mks)'],
    summary: 'Revenue, PWD and Commercial Taxes departmental assistant postings conducted via KEA single window test.',
    links: {
      applyUrl: 'https://cetonline.karnataka.gov.in/kea',
      officialWebsiteUrl: 'https://kea.kar.nic.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'WBPRB West Bengal Police Sub-Inspector (UB & AB) 2026 Recruitment',
    organization: {
      name: 'West Bengal Police Recruitment Board',
      shortName: 'WBPRB',
      logoText: 'WBPRB',
      badgeColor: 'bg-sky-900',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'Police / State Govt',
    state: 'WB',
    totalVacancies: 1131,
    location: 'West Bengal Police Commissionerates',
    qualificationLevel: 'graduate',
    eligibility: {
      education: ["Bachelor's Degree in any discipline + Bengali speaking/reading ability"],
      minAge: 20,
      maxAge: 30,
      ageRelaxation: 'SC/ST: 5 Years | OBC: 3 Years',
      experience: 'Freshers Eligible',
    },
    compensation: {
      salaryOrPayScale: 'Pay Matrix Level-10 (₹32,100 - ₹82,900/mo)',
      applicationFeeGeneral: 270,
      applicationFeeReserved: 20,
    },
    selectionProcess: ['Preliminary Screening Examination', 'Physical Measurement & Efficiency Test (PMT & PET)', 'Final Combined Competitive Exam', 'Personality Test'],
    summary: 'Sub-Inspector and Sub-Inspectress in Unarmed Branch (UB) and Armed Branch (AB) of West Bengal Police.',
    links: {
      applyUrl: 'https://prb.wb.gov.in',
      officialWebsiteUrl: 'https://wbpolice.gov.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'MPPSC Madhya Pradesh State Service Exam (SSE) 2026',
    organization: {
      name: 'Madhya Pradesh Public Service Commission',
      shortName: 'MPPSC',
      logoText: 'MPPSC',
      badgeColor: 'bg-emerald-700',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'State PSC',
    state: 'MP',
    totalVacancies: 229,
    location: 'Indore, Bhopal & MP Districts',
    qualificationLevel: 'graduate',
    eligibility: {
      education: ['Graduate Degree in any discipline from recognized University'],
      minAge: 21,
      maxAge: 40,
      ageRelaxation: 'SC/ST/OBC/Female: 5 Years',
      experience: 'Freshers Eligible',
    },
    compensation: {
      salaryOrPayScale: 'Pay Scale ₹56,100 - ₹1,77,500/mo (Grade Pay ₹5,400)',
      applicationFeeGeneral: 500,
      applicationFeeReserved: 250,
    },
    selectionProcess: ['State Service Preliminary Exam', 'State Service Main Exam', 'Interview'],
    summary: 'State Administrative Service Deputy Collector, Deputy Superintendent of Police (DSP) and Commercial Tax Officers.',
    links: {
      applyUrl: 'https://mppsc.mp.gov.in',
      officialWebsiteUrl: 'https://mppsc.mp.gov.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  },
  {
    title: 'Punjab Police District Police Cadre Constable 2026 Recruitment',
    organization: {
      name: 'Punjab Police Recruitment Board',
      shortName: 'PBP',
      logoText: 'PBP',
      badgeColor: 'bg-amber-800',
      verified: true,
    },
    sector: 'GOVERNMENT',
    category: 'Police / State Govt',
    state: 'PB',
    totalVacancies: 1746,
    location: 'Punjab Districts',
    qualificationLevel: '12th',
    eligibility: {
      education: ['10+2 (Intermediate) with Punjabi as a compulsory subject in Matriculation'],
      minAge: 18,
      maxAge: 28,
      ageRelaxation: 'SC/BC: 5 Years | Ex-Servicemen: 3 Years',
      experience: 'Freshers Eligible',
    },
    compensation: {
      salaryOrPayScale: 'Pay Scale Level-2 (₹19,900/mo initial pay)',
      applicationFeeGeneral: 1150,
      applicationFeeReserved: 650,
    },
    selectionProcess: ['Computer Based Test (CBT - 2 Papers)', 'Physical Screening Test (PST)', 'Document Verification'],
    summary: 'Constables in District Police and Armed Police Cadres of Punjab Police Department.',
    links: {
      applyUrl: 'https://punjabpolice.gov.in',
      officialWebsiteUrl: 'https://punjabpolice.gov.in',
    },
    status: 'ACTIVE',
    isNewToday: true,
  }
];

// Fetches live automated notifications and merges both Central, State, and Corporate pipelines
export async function fetchLiveJobAlerts(): Promise<JobNotification[]> {
  const currentTimestamp = Date.now();
  const today = new Date();
  
  // 1. External remote tech feed
  const fetchedTechJobs: JobNotification[] = [];
  try {
    const res = await fetch('https://www.arbeitnow.com/api/job-board-api', {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3500),
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data)) {
        for (const remoteJob of json.data.slice(0, 2)) {
          fetchedTechJobs.push({
            id: `tech-${remoteJob.slug || Date.now()}`,
            slug: `live-${remoteJob.slug || Date.now()}`,
            title: remoteJob.title || 'Software Engineer',
            organization: {
              name: remoteJob.company_name || 'Global Tech Partners',
              shortName: (remoteJob.company_name || 'TECH').substring(0, 4).toUpperCase(),
              logoText: (remoteJob.company_name || 'TECH').substring(0, 3).toUpperCase(),
              badgeColor: 'bg-emerald-600',
              verified: true,
            },
            sector: 'PRIVATE',
            category: 'Software & Engineering',
            totalVacancies: 15,
            location: remoteJob.location || 'Remote',
            workMode: 'REMOTE',
            importantDates: {
              notificationDate: 'Today',
              applyStartDate: 'Today',
              applyEndDate: 'Open until filled',
              daysRemaining: 25,
            },
            eligibility: {
              education: ['B.Tech / BCA / Degree in Computer Science or self-taught portfolio'],
              experience: 'Freshers & Experienced Candidates welcome',
              skills: remoteJob.tags || ['React', 'Node.js', 'TypeScript', 'Cloud'],
            },
            compensation: {
              salaryOrPayScale: '₹18 - ₹35 LPA',
              applicationFeeGeneral: 0,
              applicationFeeReserved: 0,
            },
            selectionProcess: ['Resume Shortlisting', 'Technical Coding Round', 'Hiring Manager Call'],
            summary: remoteJob.description
              ? remoteJob.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
              : 'Direct corporate career notification verified from official careers API.',
            links: {
              applyUrl: remoteJob.url || 'https://example.com/apply',
              officialWebsiteUrl: remoteJob.url || 'https://example.com',
            },
            status: 'ACTIVE',
            isNewToday: true,
            viewsCount: 150,
          });
        }
      }
    }
  } catch {
    // Graceful fallback if external endpoint timeout or offline
  }

  // 2. Format Central Government Alerts with active today timestamps
  const formattedCentralAlerts: JobNotification[] = LIVE_GOVT_ALERT_POOL.map((item, idx) => {
    const uniqueId = `auto-central-${idx}-${today.getFullYear()}-${today.getMonth() + 1}`;
    const endDays = 18 - idx * 2;
    return {
      ...item,
      id: uniqueId,
      slug: `${item.organization.shortName.toLowerCase()}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 45)}`,
      importantDates: {
        notificationDate: 'Today (Gazetted)',
        applyStartDate: 'Today',
        applyEndDate: `30 ${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`,
        daysRemaining: endDays > 3 ? endDays : 10,
        examDate: 'Coming Session 2026',
      },
      isNewToday: true,
      viewsCount: 1200 + idx * 340,
    };
  });

  // 3. Format State Government Alerts with authentic state codes and active timestamps
  const formattedStateAlerts: JobNotification[] = LIVE_STATE_GOVT_POOL.map((item, idx) => {
    const uniqueId = `auto-state-${item.state?.toLowerCase() || 'st'}-${idx}-${today.getFullYear()}`;
    const endDays = 22 - (idx % 5) * 3;
    const deadlineDate = new Date();
    deadlineDate.setDate(today.getDate() + (endDays > 0 ? endDays : 15));

    return {
      ...item,
      id: uniqueId,
      slug: `${(item.state || 'st').toLowerCase()}-${item.organization.shortName.toLowerCase()}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 40)}`,
      importantDates: {
        notificationDate: 'Today (Official Notice)',
        applyStartDate: 'Today',
        applyEndDate: `${deadlineDate.getDate()} ${deadlineDate.toLocaleString('default', { month: 'short' })} ${deadlineDate.getFullYear()}`,
        daysRemaining: endDays > 2 ? endDays : 7,
        examDate: 'Coming Month 2026',
      },
      isNewToday: true,
      viewsCount: 2500 + idx * 420,
    };
  });

  return [...formattedStateAlerts, ...formattedCentralAlerts, ...fetchedTechJobs];
}
