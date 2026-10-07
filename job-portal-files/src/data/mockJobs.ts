import { JobNotification } from '../types/job';

export const INITIAL_JOBS: JobNotification[] = [
  // =========================================================================
  // 1. ALL INDIA CENTRAL GOVERNMENT & PUBLIC SECTORS (FreeJobAlert 2026 Core)
  // =========================================================================
  {
    id: 'ssc-chsl-2026',
    slug: 'ssc-chsl-recruitment-2026-online-form',
    title: 'SSC Combined Higher Secondary (10+2) Level Examination (CHSL) 2026',
    organization: {
      name: 'Staff Selection Commission',
      shortName: 'SSC',
      logoText: 'SSC',
      badgeColor: 'bg-blue-600',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'SSC / Central Govt',
    state: 'All India',
    qualificationLevel: '12TH',
    totalVacancies: 2536,
    location: 'All India (Central Ministries, Departments & Constitutional Offices)',
    importantDates: {
      notificationDate: '01 Oct 2026',
      applyStartDate: '01 Oct 2026',
      applyEndDate: '24 Oct 2026',
      daysRemaining: 1,
      examDate: 'December 2026 (Tier-I CBT)',
      admitCardDate: 'Nov 2026'
    },
    eligibility: {
      education: ['Must have passed 12th Standard (10+2) or equivalent from a recognized Board or University'],
      minAge: 18,
      maxAge: 27,
      ageCutoffDate: '01 Aug 2026',
      ageRelaxation: 'OBC: 3 Years | SC/ST: 5 Years | PwD: 10 Years',
      experience: 'Fresher Eligible'
    },
    compensation: {
      salaryOrPayScale: 'Pay Level 2 & 4 (₹19,900 - ₹81,100/mo + HRA, DA)',
      applicationFeeGeneral: 100,
      applicationFeeReserved: 0,
      feeNote: 'Women, SC, ST, PwD, and ESM candidates are exempted from payment of fee.'
    },
    selectionProcess: [
      'Tier-I Computer Based Examination (Objective Type - 100 Questions / 200 Marks)',
      'Tier-II Objective & Skill Test / Typing Test',
      'Document Verification & Medical Fitness'
    ],
    summary: 'SSC CHSL 2026 recruitment notification for Lower Divisional Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO) in Central Govt ministries.',
    responsibilitiesOrSyllabus: [
      'Tier-I: English Language (25 Qs), General Intelligence (25 Qs), Quantitative Aptitude (25 Qs), General Awareness (25 Qs)',
      'Tier-II: Mathematical Abilities, Reasoning, English Language, General Awareness & Computer Knowledge Module'
    ],
    links: {
      applyUrl: 'https://ssc.gov.in',
      officialPdfUrl: 'https://ssc.gov.in/notice/CHSL-2026-Notification.pdf',
      officialWebsiteUrl: 'https://ssc.gov.in',
      syllabusUrl: 'https://ssc.gov.in/notice/CHSL-Syllabus.pdf'
    },
    status: 'CLOSING_SOON',
    isTrending: true,
    isNewToday: true,
    viewsCount: 48920
  },
  {
    id: 'rrb-ntpc-graduate-2026',
    slug: 'rrb-ntpc-graduate-recruitment-062026-online-form',
    title: 'RRB NTPC (Graduate) Centralized Employment Notice (CEN 06/2026)',
    organization: {
      name: 'Railway Recruitment Boards',
      shortName: 'RRB',
      logoText: 'RRB',
      badgeColor: 'bg-red-600',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Railways',
    state: 'All India',
    qualificationLevel: 'GRADUATE',
    totalVacancies: 3477,
    location: 'All Railway Zones across India',
    importantDates: {
      notificationDate: '14 Sep 2026',
      applyStartDate: '14 Sep 2026',
      applyEndDate: '20 Nov 2026',
      daysRemaining: 14,
      examDate: 'Jan/Feb 2027 (CBT-1)',
      admitCardDate: '4 Days prior to CBT Date'
    },
    eligibility: {
      education: ['University Degree / Bachelor’s Degree in any discipline from a recognized University'],
      minAge: 18,
      maxAge: 36,
      ageCutoffDate: '01 Jan 2026',
      ageRelaxation: 'OBC (NCL): 3 Years | SC/ST: 5 Years | PwD: 10 Years',
      experience: 'Fresher Eligible'
    },
    compensation: {
      salaryOrPayScale: 'Pay Level 5 & 6 (₹29,200 - ₹1,12,400 + Allowances)',
      applicationFeeGeneral: 500,
      applicationFeeReserved: 250,
      feeNote: '₹400 / ₹250 refunded on attending 1st Stage CBT examination.'
    },
    selectionProcess: [
      '1st Stage Computer Based Test (CBT-1 common for all posts)',
      '2nd Stage Computer Based Test (CBT-2 post-level wise)',
      'Computer Based Aptitude Test (CBAT) for Station Master / Typing Skill Test for Clerks',
      'Document Verification and Medical Examination'
    ],
    summary: 'Indian Railways invites applications for Chief Commercial cum Ticket Supervisor, Station Master, Goods Train Manager, and Senior Clerk cum Typist across 21 RRB divisions.',
    responsibilitiesOrSyllabus: [
      'CBT-1: General Awareness (40 Qs), Mathematics (30 Qs), General Intelligence & Reasoning (30 Qs). Total 100 Marks (90 Minutes). Negative marking: 1/3rd.',
      'CBT-2: General Awareness (50 Qs), Mathematics (35 Qs), Reasoning (35 Qs). Total 120 Marks.'
    ],
    links: {
      applyUrl: 'https://rrbapply.gov.in',
      officialPdfUrl: 'https://rrbapply.gov.in/notices/CEN-06-2026-NTPC.pdf',
      officialWebsiteUrl: 'https://indianrailways.gov.in'
    },
    status: 'ACTIVE',
    isTrending: true,
    isNewToday: false,
    viewsCount: 62450
  },
  {
    id: 'canara-bank-apprentice-2026',
    slug: 'canara-bank-apprentice-recruitment-2026',
    title: 'Canara Bank 3,500 Graduate Apprentice Recruitment 2026',
    organization: {
      name: 'Canara Bank',
      shortName: 'Canara',
      logoText: 'CNB',
      badgeColor: 'bg-amber-600',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Banking',
    state: 'All India',
    qualificationLevel: 'GRADUATE',
    totalVacancies: 3500,
    location: 'Pan India Branches (State-wise allotment)',
    importantDates: {
      notificationDate: '21 Sep 2026',
      applyStartDate: '21 Sep 2026',
      applyEndDate: '07 Nov 2026',
      daysRemaining: 6,
      examDate: 'November 2026',
      admitCardDate: '1st Week Nov 2026'
    },
    eligibility: {
      education: ['Graduate in any discipline from a University recognized by the Govt. of India'],
      minAge: 20,
      maxAge: 28,
      ageCutoffDate: '01 Sep 2026',
      ageRelaxation: 'As per Apprenticeship Act 1961 guidelines',
      experience: 'Fresher Eligible'
    },
    compensation: {
      salaryOrPayScale: 'Monthly Stipend: ₹15,000/- per month for 1 Year Training',
      applicationFeeGeneral: 500,
      applicationFeeReserved: 0,
      feeNote: 'SC/ST/PwBD candidates: Exempted. Payment via Net Banking/UPI.'
    },
    selectionProcess: [
      'Merit-based Shortlisting on 10th/12th/Graduation Aggregate Marks',
      'Local Language Proficiency Test',
      'Document Verification & Medical Fitness'
    ],
    summary: 'Engagement of 3,500 Apprentices under Apprentices Act, 1961 across Canara Bank branches in all states with certificate upon completion.',
    links: {
      applyUrl: 'https://canarabank.com/pages/careers',
      officialPdfUrl: 'https://canarabank.com/media/apprentice-notification-2026.pdf',
      officialWebsiteUrl: 'https://canarabank.com'
    },
    status: 'ACTIVE',
    isTrending: true,
    isNewToday: true,
    viewsCount: 31200
  },
  {
    id: 'bank-of-baroda-so-2026',
    slug: 'bank-of-baroda-specialist-officer-recruitment-2026',
    title: 'Bank of Baroda 1,100 Specialist Officer (SO) Online Form 2026',
    organization: {
      name: 'Bank of Baroda',
      shortName: 'BOB',
      logoText: 'BOB',
      badgeColor: 'bg-orange-600',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Banking',
    state: 'All India',
    qualificationLevel: 'GRADUATE',
    totalVacancies: 1100,
    location: 'All India Offices',
    importantDates: {
      notificationDate: '26 Sep 2026',
      applyStartDate: '26 Sep 2026',
      applyEndDate: '12 Nov 2026',
      daysRemaining: 11,
      examDate: 'December 2026',
      admitCardDate: 'Dec 2026'
    },
    eligibility: {
      education: ['Graduation / Post Graduation / MBA / CA / CFA / B.Tech from a recognized University'],
      minAge: 22,
      maxAge: 35,
      experience: '0 to 3 Years depending on specific Grade & Scale'
    },
    compensation: {
      salaryOrPayScale: 'Scale-I & Scale-II: ₹48,170 - ₹89,890 + DA, HRA, Perks',
      applicationFeeGeneral: 600,
      applicationFeeReserved: 100,
      feeNote: 'Pay online via Debit Card or Net Banking.'
    },
    selectionProcess: [
      'Online Written Test (Professional Knowledge & Aptitude)',
      'Psychometric Assessment',
      'Group Discussion & Personal Interview'
    ],
    summary: 'Bank of Baroda invites online applications for regular & contractual appointment of 1,100 Specialist Officers in Wealth Management, Credit, Risk, and IT domains.',
    links: {
      applyUrl: 'https://bankofbaroda.in/careers',
      officialPdfUrl: 'https://bankofbaroda.in/careers/so-notification-2026.pdf',
      officialWebsiteUrl: 'https://bankofbaroda.in'
    },
    status: 'ACTIVE',
    isTrending: false,
    isNewToday: false,
    viewsCount: 19800
  },
  {
    id: 'supreme-court-jca-2026',
    slug: 'supreme-court-junior-court-assistant-2026',
    title: 'Supreme Court 250 Junior Court Assistant (JCA) Online Form 2026',
    organization: {
      name: 'Supreme Court of India',
      shortName: 'SCI',
      logoText: 'SCI',
      badgeColor: 'bg-slate-800',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Judiciary / Central Govt',
    state: 'All India',
    qualificationLevel: 'GRADUATE',
    totalVacancies: 250,
    location: 'New Delhi (Supreme Court of India)',
    importantDates: {
      notificationDate: '28 Sep 2026',
      applyStartDate: '28 Sep 2026',
      applyEndDate: '10 Nov 2026',
      daysRemaining: 9,
      examDate: 'December 2026',
      admitCardDate: 'Dec 2026'
    },
    eligibility: {
      education: ['Bachelor’s Degree of a recognized University + Minimum speed of 35 w.p.m. in English typing on Computer'],
      minAge: 18,
      maxAge: 30,
      ageCutoffDate: '01 July 2026',
      experience: 'Fresher Eligible with knowledge of computer operation'
    },
    compensation: {
      salaryOrPayScale: 'Level 6 of Pay Matrix (Basic Pay ₹35,400, Gross Salary ~₹63,058/mo)',
      applicationFeeGeneral: 500,
      applicationFeeReserved: 250
    },
    selectionProcess: [
      'Objective Written Test (100 Questions) + Computer Knowledge (25 Questions)',
      'Typing Speed Test on Computer (35 w.p.m. with 3% mistake limit)',
      'Descriptive Test in English Language (Comprehension & Essay)',
      'Interview before Board of Registrars'
    ],
    summary: 'Supreme Court of India invites online applications from Indian citizens for filling up 250 vacancies of Junior Court Assistant (Group B Non-Gazetted).',
    links: {
      applyUrl: 'https://main.sci.gov.in/recruitment',
      officialPdfUrl: 'https://main.sci.gov.in/pdf/JCA-Notification-2026.pdf',
      officialWebsiteUrl: 'https://main.sci.gov.in'
    },
    status: 'ACTIVE',
    isTrending: true,
    isNewToday: true,
    viewsCount: 27400
  },
  {
    id: 'army-tes-57-2026',
    slug: 'indian-army-10-plus-2-tes-57-course-2026',
    title: 'Indian Army Commissioned Officer (10+2 TES-57 Course) Online Form 2026',
    organization: {
      name: 'Indian Army',
      shortName: 'Army',
      logoText: 'IA',
      badgeColor: 'bg-emerald-700',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Defence',
    state: 'All India',
    qualificationLevel: '12TH',
    totalVacancies: 90,
    location: 'Indian Army Training Academies across India',
    importantDates: {
      notificationDate: '01 Oct 2026',
      applyStartDate: '01 Oct 2026',
      applyEndDate: '18 Nov 2026',
      daysRemaining: 15,
      examDate: 'SSB Interview: Jan/Feb 2027',
      admitCardDate: 'Dec 2026'
    },
    eligibility: {
      education: ['Passed 10+2 Examination with minimum 60% marks in Physics, Chemistry & Mathematics + Appeared in JEE (Mains) 2026'],
      minAge: 16.5,
      maxAge: 19.5,
      experience: 'Unmarried Male Candidates'
    },
    compensation: {
      salaryOrPayScale: 'Lieutenant Rank (Level 10: ₹56,100 - ₹1,77,500 + MSP ₹15,500/mo)',
      applicationFeeGeneral: 0,
      applicationFeeReserved: 0,
      feeNote: 'Zero Application Fee for all candidates.'
    },
    selectionProcess: [
      'Shortlisting of Applications based on JEE (Mains) NTA Rank',
      'Services Selection Board (SSB) 5-Day Interview at Centre',
      'Medical Examination at Military Hospital'
    ],
    summary: 'Grant of Permanent Commission in the Army for candidates who have passed 10+2 with PCM and appeared in JEE Mains.',
    links: {
      applyUrl: 'https://joinindianarmy.nic.in',
      officialPdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/TES-57.pdf',
      officialWebsiteUrl: 'https://joinindianarmy.nic.in'
    },
    status: 'ACTIVE',
    isTrending: true,
    isNewToday: false,
    viewsCount: 22900
  },
  {
    id: 'icg-cgept-2026',
    slug: 'icg-cgept-recruitment-2026-navik-yantrik',
    title: 'Indian Coast Guard (ICG) CGEPT 365 Navik (GD, DB) & Yantrik Online Form 2026',
    organization: {
      name: 'Indian Coast Guard',
      shortName: 'ICG',
      logoText: 'ICG',
      badgeColor: 'bg-blue-700',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Defence',
    state: 'All India',
    qualificationLevel: '12TH',
    totalVacancies: 365,
    location: 'Coast Guard Stations across coastal India',
    importantDates: {
      notificationDate: '25 Sep 2026',
      applyStartDate: '25 Sep 2026',
      applyEndDate: '05 Nov 2026',
      daysRemaining: 4,
      examDate: 'Late November 2026 (Stage-I CBT)',
      admitCardDate: 'Nov 2026'
    },
    eligibility: {
      education: ['Navik (DB): 10th Pass | Navik (GD): 12th with Maths & Physics | Yantrik: 10th + 3/4 Yr Diploma in Engg'],
      minAge: 18,
      maxAge: 22,
      ageCutoffDate: '01 Mar 2026',
      experience: 'Fresher Eligible'
    },
    compensation: {
      salaryOrPayScale: 'Pay Level 3 & Level 5 (₹21,700 - ₹69,100 + DA + Free Rations)',
      applicationFeeGeneral: 300,
      applicationFeeReserved: 0
    },
    selectionProcess: [
      'Stage-I: Computer Based Written Examination (CBE)',
      'Stage-II: Physical Fitness Test (PFT), Document Verification & Initial Medical',
      'Stage-III & IV: Final Medical Examination at INS Chilka & Induction'
    ],
    summary: 'Join Indian Coast Guard as Navik (General Duty), Navik (Domestic Branch), and Yantrik (Mechanical, Electrical, Electronics).',
    links: {
      applyUrl: 'https://joinindiancoastguard.cdac.in',
      officialPdfUrl: 'https://joinindiancoastguard.cdac.in/cgept-01-2026.pdf',
      officialWebsiteUrl: 'https://indiancoastguard.gov.in'
    },
    status: 'ACTIVE',
    isTrending: false,
    isNewToday: true,
    viewsCount: 18450
  },
  {
    id: 'cdac-844-posts-2026',
    slug: 'c-dac-recruitment-2026-project-engineer',
    title: 'CDAC 844 Project Engineer & Manager Online Form 2026',
    organization: {
      name: 'Centre for Development of Advanced Computing',
      shortName: 'CDAC',
      logoText: 'CDAC',
      badgeColor: 'bg-indigo-600',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Engineering & IT',
    state: 'All India',
    qualificationLevel: 'BTECH',
    totalVacancies: 844,
    location: 'Pune, Bengaluru, Noida, Hyderabad, Thiruvananthapuram, Kolkata',
    importantDates: {
      notificationDate: '29 Sep 2026',
      applyStartDate: '29 Sep 2026',
      applyEndDate: '15 Nov 2026',
      daysRemaining: 13,
      examDate: 'Interview: Dec 2026',
      admitCardDate: 'Dec 2026'
    },
    eligibility: {
      education: ['B.E/B.Tech in Computer Science/IT/ECE/EEE or MCA or M.Sc in CS/IT with minimum 60% marks'],
      minAge: 21,
      maxAge: 35,
      experience: '0 to 4 Years relevant technical experience'
    },
    compensation: {
      salaryOrPayScale: 'CTC ₹4.49 Lakhs - ₹14.0 Lakhs per annum (Grade dependent)',
      applicationFeeGeneral: 200,
      applicationFeeReserved: 0
    },
    selectionProcess: [
      'Screening of online applications on Academic Performance',
      'Technical Screening Assessment / Coding Round',
      'Personal Technical Interview (Online/In-person)'
    ],
    summary: 'C-DAC premier R&D organization of Ministry of Electronics & IT invites applications for HPC, Quantum Computing, AI/ML, and Cyber Security projects.',
    links: {
      applyUrl: 'https://www.cdac.in/index.aspx?id=job_portal',
      officialPdfUrl: 'https://www.cdac.in/careers/advt-844-posts.pdf',
      officialWebsiteUrl: 'https://www.cdac.in'
    },
    status: 'ACTIVE',
    isTrending: true,
    isNewToday: false,
    viewsCount: 25100
  },
  {
    id: 'isro-iprc-2026',
    slug: 'isro-iprc-recruitment-2026-technician-fireman',
    title: 'ISRO IPRC Fireman, Technician & Technical Assistant Online Form 2026',
    organization: {
      name: 'ISRO Propulsion Complex',
      shortName: 'ISRO',
      logoText: 'ISRO',
      badgeColor: 'bg-cyan-600',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Engineering & PSU',
    state: 'All India',
    qualificationLevel: 'ITI',
    totalVacancies: 22,
    location: 'Mahendragiri, Tirunelveli District, Tamil Nadu',
    importantDates: {
      notificationDate: '30 Sep 2026',
      applyStartDate: '30 Sep 2026',
      applyEndDate: '14 Nov 2026',
      daysRemaining: 12,
      examDate: 'Jan 2027',
      admitCardDate: 'Dec 2026'
    },
    eligibility: {
      education: ['SSLC/10th Pass + ITI/NTC/NAC in Fitter/Welder/Electronic OR First Class Diploma in Mechanical/Electronics OR 10th with Fire Training'],
      minAge: 18,
      maxAge: 35,
      experience: 'Fresher Eligible'
    },
    compensation: {
      salaryOrPayScale: 'Pay Level 2 to Level 7 (₹21,700 - ₹44,900 Basic Pay)',
      applicationFeeGeneral: 500,
      applicationFeeReserved: 100,
      feeNote: 'Refundable on attending written test.'
    },
    selectionProcess: [
      'Written Test (Curriculum based objective test)',
      'Skill Test / Physical Endurance Test (Qualifying Nature)',
      'Document Verification'
    ],
    summary: 'Work at ISRO Propulsion Complex (IPRC) testing liquid propulsion rocket engines and cryogenic upper stages for PSLV and LVM3.',
    links: {
      applyUrl: 'https://www.iprc.gov.in',
      officialPdfUrl: 'https://www.iprc.gov.in/iprc_recruitment_2026.pdf',
      officialWebsiteUrl: 'https://www.isro.gov.in'
    },
    status: 'ACTIVE',
    isTrending: false,
    isNewToday: true,
    viewsCount: 16900
  },
  {
    id: 'rrc-nwr-apprentice-2026',
    slug: 'rrc-north-western-railway-apprentice-2026',
    title: 'RRC NWR 2,008 Act Apprentice Recruitment Online Form 2026',
    organization: {
      name: 'Railway Recruitment Cell (NWR)',
      shortName: 'RRC NWR',
      logoText: 'NWR',
      badgeColor: 'bg-emerald-600',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Railways',
    state: 'Rajasthan',
    qualificationLevel: 'ITI',
    totalVacancies: 2008,
    location: 'Jaipur, Ajmer, Bikaner, Jodhpur Workshops',
    importantDates: {
      notificationDate: '27 Sep 2026',
      applyStartDate: '27 Sep 2026',
      applyEndDate: '10 Nov 2026',
      daysRemaining: 8,
      examDate: 'No Exam (Merit List in Dec 2026)',
      admitCardDate: 'N/A'
    },
    eligibility: {
      education: ['10th Class passed with minimum 50% marks in aggregate + ITI Certificate in affiliated NCVT/SCVT Trade'],
      minAge: 15,
      maxAge: 24,
      ageCutoffDate: '10 Nov 2026',
      experience: 'Fresher Eligible'
    },
    compensation: {
      salaryOrPayScale: 'Monthly Stipend: ₹8,050/- as per Apprenticeship rules',
      applicationFeeGeneral: 100,
      applicationFeeReserved: 0
    },
    selectionProcess: [
      'Direct Merit Calculation (50% weightage 10th marks + 50% weightage ITI marks)',
      'No Written Exam or Viva Voce',
      'Medical Verification'
    ],
    summary: 'North Western Railway Apprentice training in Fitter, Welder, Electrician, Machinist, Painter, Carpenter, and Diesel Mechanic trades.',
    links: {
      applyUrl: 'https://www.rrcjaipur.in',
      officialPdfUrl: 'https://www.rrcjaipur.in/Act_Apprentice_Notification_2026.pdf',
      officialWebsiteUrl: 'https://nwr.indianrailways.gov.in'
    },
    status: 'ACTIVE',
    isTrending: false,
    isNewToday: false,
    viewsCount: 21300
  },
  {
    id: 'sbi-po-2026',
    slug: 'sbi-po-recruitment-2026',
    title: 'SBI Probationary Officer (PO) Recruitment 2026 (2,000 Posts)',
    organization: {
      name: 'State Bank of India',
      shortName: 'SBI',
      logoText: 'SBI',
      badgeColor: 'bg-blue-600',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Banking',
    state: 'All India',
    qualificationLevel: 'GRADUATE',
    totalVacancies: 2000,
    location: 'All India',
    importantDates: {
      notificationDate: '01 Oct 2026',
      applyStartDate: '05 Oct 2026',
      applyEndDate: '26 Oct 2026',
      daysRemaining: 2,
      examDate: 'Nov/Dec 2026 (Prelims)',
      admitCardDate: 'Nov 2026'
    },
    eligibility: {
      education: ['Graduation in any discipline from a recognized University or equivalent qualification'],
      minAge: 21,
      maxAge: 30,
      ageCutoffDate: '01 April 2026',
      ageRelaxation: 'OBC: 3 Years | SC/ST: 5 Years | PwD: 10-15 Years',
      experience: 'Fresher Eligible (Final year students eligible)'
    },
    compensation: {
      salaryOrPayScale: 'Basic Pay ₹41,960/- with 4 advance increments (Gross ~₹82,000/mo)',
      applicationFeeGeneral: 750,
      applicationFeeReserved: 0
    },
    selectionProcess: [
      'Phase-I: Preliminary Examination (100 Marks)',
      'Phase-II: Main Examination (Objective + Descriptive Test)',
      'Phase-III: Psychometric Test, Group Discussion & Personal Interview'
    ],
    summary: 'Prestigious banking career with fast promotion tracks, allowances, and nationwide career exposure at India largest commercial lender.',
    links: {
      applyUrl: 'https://sbi.co.in/web/careers/current-openings',
      officialPdfUrl: 'https://bank.sbi/careers/advertisement-crpd-po-2026.pdf',
      officialWebsiteUrl: 'https://sbi.co.in'
    },
    status: 'CLOSING_SOON',
    isTrending: true,
    isNewToday: false,
    viewsCount: 54100
  },

  // =========================================================================
  // 2. STATE GOVERNMENT JOBS (State PSCs, High Courts, Education Boards)
  // =========================================================================
  {
    id: 'bpsc-tre-4-2026',
    slug: 'bpsc-tre-4-school-teacher-recruitment-2026',
    title: 'BPSC TRE-4.0 32,388 School Teacher Recruitment Online Form 2026',
    organization: {
      name: 'Bihar Public Service Commission',
      shortName: 'BPSC',
      logoText: 'BPSC',
      badgeColor: 'bg-emerald-800',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Teaching / State Govt',
    state: 'Bihar',
    qualificationLevel: 'GRADUATE',
    totalVacancies: 32388,
    location: 'All 38 Districts of Bihar',
    importantDates: {
      notificationDate: '18 Sep 2026',
      applyStartDate: '18 Sep 2026',
      applyEndDate: '08 Nov 2026',
      daysRemaining: 7,
      examDate: 'December 2026',
      admitCardDate: 'Dec 2026'
    },
    eligibility: {
      education: ['12th/Graduation + D.El.Ed / B.Ed + CTET Paper 1/2 or Bihar STET Paper 1/2 Qualified'],
      minAge: 18,
      maxAge: 40,
      ageRelaxation: 'Female/BC/EBC: 3 Years | SC/ST: 5 Years'
    },
    compensation: {
      salaryOrPayScale: 'Primary: ₹25,000 | Middle: ₹28,000 | Secondary: ₹31,000 + DA, HRA (~₹45,000/mo)',
      applicationFeeGeneral: 750,
      applicationFeeReserved: 200
    },
    selectionProcess: [
      'Written Examination (Objective MCQs - Language Qualifying + General Studies + Subject)',
      'Document Verification & Merit Ranking',
      'School Allotment Counseling'
    ],
    summary: 'Massive recruitment for Primary (Class 1-5), Middle (Class 6-8), Secondary (Class 9-10), and Higher Secondary (Class 11-12) teachers in Bihar Govt schools.',
    links: {
      applyUrl: 'https://onlinebpsc.bihar.gov.in',
      officialPdfUrl: 'https://bpsc.bih.nic.in/Advt/TRE-4.0-Notification.pdf',
      officialWebsiteUrl: 'https://bpsc.bih.nic.in'
    },
    status: 'ACTIVE',
    isTrending: true,
    isNewToday: false,
    viewsCount: 88400
  },
  {
    id: 'rajasthan-safai-2026',
    slug: 'rajasthan-safai-karmachari-recruitment-2026',
    title: 'Rajasthan 24,752 Safai Karmachari Recruitment Online Form 2026',
    organization: {
      name: 'Rajasthan Local Self Government',
      shortName: 'DLB RJ',
      logoText: 'DLB',
      badgeColor: 'bg-rose-700',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'State Govt',
    state: 'Rajasthan',
    qualificationLevel: '8TH',
    totalVacancies: 24752,
    location: '184 Municipal Bodies across Rajasthan',
    importantDates: {
      notificationDate: '22 Sep 2026',
      applyStartDate: '22 Sep 2026',
      applyEndDate: '15 Nov 2026',
      daysRemaining: 13,
      examDate: 'Lottery / Practical Assessment: Nov/Dec 2026',
      admitCardDate: 'Nov 2026'
    },
    eligibility: {
      education: ['8th Pass or Literate + Minimum 1 Year Sanitation / Safai Experience in Govt or Registered Contractor'],
      minAge: 18,
      maxAge: 40,
      ageCutoffDate: '01 Jan 2026',
      ageRelaxation: 'Male SC/ST/OBC: 5 Yrs | Female SC/ST/OBC: 10 Yrs'
    },
    compensation: {
      salaryOrPayScale: 'Pay Level 1 (Probation Trainee ₹12,400, Post-probation ₹17,700 - ₹56,200)',
      applicationFeeGeneral: 600,
      applicationFeeReserved: 400
    },
    selectionProcess: [
      'Scrutiny of Online Applications & Experience Verification',
      'Lottery System / Practical Sanitation Demonstration',
      'Final Allotment by Municipal Corporation'
    ],
    summary: 'Direct recruitment of 24,752 sanitation personnel in Nagar Nigams, Nagar Parishads, and Nagar Palikas across Rajasthan.',
    links: {
      applyUrl: 'https://sso.rajasthan.gov.in',
      officialPdfUrl: 'https://urban.rajasthan.gov.in/safai-karmachari-advt-2026.pdf',
      officialWebsiteUrl: 'https://urban.rajasthan.gov.in'
    },
    status: 'ACTIVE',
    isTrending: true,
    isNewToday: false,
    viewsCount: 45600
  },
  {
    id: 'jkssb-class-iv-2026',
    slug: 'jkssb-class-iv-mts-recruitment-2026',
    title: 'JKSSB 2,863 Class IV MTS & Sanitation Worker Online Form 2026',
    organization: {
      name: 'J&K Services Selection Board',
      shortName: 'JKSSB',
      logoText: 'JK',
      badgeColor: 'bg-teal-700',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'State Govt',
    state: 'Jammu & Kashmir',
    qualificationLevel: '10TH',
    totalVacancies: 2863,
    location: 'District, Divisional & UT Cadre in Jammu & Kashmir',
    importantDates: {
      notificationDate: '24 Sep 2026',
      applyStartDate: '24 Sep 2026',
      applyEndDate: '14 Nov 2026',
      daysRemaining: 12,
      examDate: 'Dec 2026 (Written OMR)',
      admitCardDate: 'Dec 2026'
    },
    eligibility: {
      education: ['Minimum Matriculation (10th Pass) and Maximum 10+2 (12th Pass) from recognized Board'],
      minAge: 18,
      maxAge: 40,
      ageRelaxation: 'RBA/SC/ST: 43 Yrs | PwD: 42 Yrs | ESM: 48 Yrs'
    },
    compensation: {
      salaryOrPayScale: 'SL1 (₹14,800 - ₹47,100/mo + Dearness Allowance)',
      applicationFeeGeneral: 350,
      applicationFeeReserved: 250
    },
    selectionProcess: [
      'Written Objective Test (85 Marks - Basic Reasoning, English, Maths, General Knowledge)',
      'Weightage for Domicile / Family Without Govt Employee (15 Marks)',
      'Document Verification'
    ],
    summary: 'Recruitment for Multi Tasking Staff (MTS), Attendant, Peon, and Chowkidar in UT Departments of Jammu and Kashmir.',
    links: {
      applyUrl: 'https://jkssb.nic.in',
      officialPdfUrl: 'https://jkssb.nic.in/pdf/Class-IV-Advt-2026.pdf',
      officialWebsiteUrl: 'https://jkssb.nic.in'
    },
    status: 'ACTIVE',
    isTrending: false,
    isNewToday: false,
    viewsCount: 33400
  },
  {
    id: 'mpesb-sub-engineer-2026',
    slug: 'mpesb-group-3-sub-engineer-recruitment-2026',
    title: 'MPESB Group-3 1,700 Sub Engineer Online Form 2026',
    organization: {
      name: 'Madhya Pradesh Employees Selection Board',
      shortName: 'MPESB',
      logoText: 'MP',
      badgeColor: 'bg-amber-700',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Engineering / State Govt',
    state: 'Madhya Pradesh',
    qualificationLevel: 'DIPLOMA',
    totalVacancies: 1700,
    location: 'Madhya Pradesh (PWD, WRD, PHE, Urban Dev)',
    importantDates: {
      notificationDate: '26 Sep 2026',
      applyStartDate: '26 Sep 2026',
      applyEndDate: '16 Nov 2026',
      daysRemaining: 14,
      examDate: 'Jan 2027',
      admitCardDate: 'Jan 2027'
    },
    eligibility: {
      education: ['3-Year Diploma or B.E/B.Tech in Civil, Electrical or Mechanical Engineering from a recognized University'],
      minAge: 18,
      maxAge: 40,
      ageRelaxation: 'MP Domicile SC/ST/OBC/Women: 5 Years'
    },
    compensation: {
      salaryOrPayScale: 'Pay Level 8 (₹32,800 - ₹1,03,600 + DA & Allowances)',
      applicationFeeGeneral: 500,
      applicationFeeReserved: 250
    },
    selectionProcess: [
      'Combined Online Recruitment Examination (200 Marks - General Subjects 100 Marks + Technical Domain 100 Marks)',
      'Document Scrutiny and Department Allotment'
    ],
    summary: 'Recruitment of Sub Engineer (Civil/Electrical/Mechanical) and Draftsman across Water Resources, PWD, and PHED departments.',
    links: {
      applyUrl: 'https://esb.mp.gov.in',
      officialPdfUrl: 'https://esb.mp.gov.in/Rulebooks/RB_2026/SubEngg_2026_Rulebook.pdf',
      officialWebsiteUrl: 'https://esb.mp.gov.in'
    },
    status: 'ACTIVE',
    isTrending: false,
    isNewToday: false,
    viewsCount: 28900
  },
  {
    id: 'phhc-clerk-2026',
    slug: 'punjab-and-haryana-high-court-clerk-2026',
    title: 'Punjab and Haryana High Court 1,270 Clerk Online Form 2026',
    organization: {
      name: 'High Court of Punjab and Haryana',
      shortName: 'PHHC',
      logoText: 'HC',
      badgeColor: 'bg-indigo-900',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Judiciary / State Govt',
    state: 'Punjab',
    qualificationLevel: 'GRADUATE',
    totalVacancies: 1270,
    location: 'Subordinate Courts of Punjab and Haryana',
    importantDates: {
      notificationDate: '28 Sep 2026',
      applyStartDate: '28 Sep 2026',
      applyEndDate: '11 Nov 2026',
      daysRemaining: 10,
      examDate: 'December 2026 (CBT)',
      admitCardDate: 'Nov 2026'
    },
    eligibility: {
      education: ['Bachelor of Arts or Bachelor of Science or equivalent + Matriculation with Hindi/Punjabi as one of the subjects + Computer Proficiency'],
      minAge: 18,
      maxAge: 37,
      experience: 'Fresher Eligible'
    },
    compensation: {
      salaryOrPayScale: 'Pay Level 3 (Basic Pay ₹21,700/mo + Allowances as per Punjab Govt rules)',
      applicationFeeGeneral: 825,
      applicationFeeReserved: 525
    },
    selectionProcess: [
      'Computer Based Test (CBT - General Knowledge 50 Qs + English Comp 50 Qs)',
      'Computer Proficiency Test (CPT - Word Processing & Spreadsheet)',
      'Checking of Original Testimonials'
    ],
    summary: 'Recruitment of 1,270 Clerks in the Subordinate Courts of Punjab & Haryana under the Centralized Recruitment Committee (SSSC).',
    links: {
      applyUrl: 'https://sssc.gov.in',
      officialPdfUrl: 'https://sssc.gov.in/Advt_Clerk_2026.pdf',
      officialWebsiteUrl: 'https://highcourtchd.gov.in'
    },
    status: 'ACTIVE',
    isTrending: true,
    isNewToday: false,
    viewsCount: 35100
  },
  {
    id: 'dsssb-delhi-courts-2026',
    slug: 'dsssb-delhi-district-courts-recruitment-2026',
    title: 'DSSSB Delhi District Courts 641 Peon, Process Server & PA Online Form 2026',
    organization: {
      name: 'Delhi Subordinate Services Selection Board',
      shortName: 'DSSSB',
      logoText: 'DSSSB',
      badgeColor: 'bg-blue-800',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Judiciary / State Govt',
    state: 'Delhi',
    qualificationLevel: '10TH',
    totalVacancies: 641,
    location: 'Delhi District Courts (Tis Hazari, Saket, Dwarka, Karkardooma, Rohini)',
    importantDates: {
      notificationDate: '27 Sep 2026',
      applyStartDate: '27 Sep 2026',
      applyEndDate: '12 Nov 2026',
      daysRemaining: 11,
      examDate: 'December 2026',
      admitCardDate: 'Dec 2026'
    },
    eligibility: {
      education: ['Peon/Orderly: 10th Pass | Process Server: 10th with Driving License | Personal Assistant: Graduate with 100 wpm shorthand'],
      minAge: 18,
      maxAge: 27,
      ageRelaxation: 'Delhi OBC: 3 Yrs | SC/ST: 5 Yrs'
    },
    compensation: {
      salaryOrPayScale: 'Pay Level 2 & 4 & 7 (₹19,900 - ₹1,42,400 + DA & HRA)',
      applicationFeeGeneral: 100,
      applicationFeeReserved: 0
    },
    selectionProcess: [
      'Tier-I Objective MCQ Exam (General English, Hindi, GK & Arithmetic)',
      'Skill Test (Driving Test for Process Server / Shorthand for PA)',
      'Interview (For specific court posts)'
    ],
    summary: 'Recruitment for non-ministerial and ministerial court posts across Delhi District Courts & Family Courts under advertisement 08/2026.',
    links: {
      applyUrl: 'https://dsssbonline.nic.in',
      officialPdfUrl: 'https://dsssb.delhi.gov.in/notice_08_2026.pdf',
      officialWebsiteUrl: 'https://dsssb.delhi.gov.in'
    },
    status: 'ACTIVE',
    isTrending: false,
    isNewToday: false,
    viewsCount: 26800
  },
  {
    id: 'cg-sages-2026',
    slug: 'chhattisgarh-sages-recruitment-2026',
    title: 'Chhattisgarh SAGES 1,812 Lecturer & Assistant Teacher Online Form 2026',
    organization: {
      name: 'Swami Atmanand English Medium Schools',
      shortName: 'CG SAGES',
      logoText: 'SAGES',
      badgeColor: 'bg-emerald-700',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Teaching / State Govt',
    state: 'Chhattisgarh',
    qualificationLevel: 'GRADUATE',
    totalVacancies: 1812,
    location: 'Across all 33 Districts of Chhattisgarh',
    importantDates: {
      notificationDate: '29 Sep 2026',
      applyStartDate: '29 Sep 2026',
      applyEndDate: '18 Nov 2026',
      daysRemaining: 15,
      examDate: 'Dec 2026 / Direct Interview',
      admitCardDate: 'Dec 2026'
    },
    eligibility: {
      education: ['Post Graduation (for Lecturer) / Graduation (for Teacher) in English Medium with B.Ed & TET Qualified'],
      minAge: 21,
      maxAge: 35,
      experience: 'Fresher Eligible'
    },
    compensation: {
      salaryOrPayScale: 'Lecturer: ₹38,100 | Teacher: ₹35,400 | Assistant Teacher: ₹25,300/mo',
      applicationFeeGeneral: 350,
      applicationFeeReserved: 200
    },
    selectionProcess: [
      'Academic Merit Weightage (10th, 12th, Degree, PG, B.Ed)',
      'Demonstration Class / Interview in English Medium',
      'Document Verification'
    ],
    summary: 'Recruitment of English medium school teachers in flagship Swami Atmanand Govt Excellent English Medium Schools (SAGES) in CG.',
    links: {
      applyUrl: 'https://cgschool.in',
      officialPdfUrl: 'https://cgschool.in/SAGES_Recruitment_2026.pdf',
      officialWebsiteUrl: 'https://eduportal.cg.nic.in'
    },
    status: 'ACTIVE',
    isTrending: false,
    isNewToday: true,
    viewsCount: 19400
  },
  {
    id: 'appsc-group-1-2026',
    slug: 'appsc-group-1-recruitment-2026',
    title: 'APPSC 166 Group-I Services (DSP, RDO, CTO) Online Form 2026',
    organization: {
      name: 'Andhra Pradesh Public Service Commission',
      shortName: 'APPSC',
      logoText: 'APPSC',
      badgeColor: 'bg-blue-900',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'State PSC',
    state: 'Andhra Pradesh',
    qualificationLevel: 'GRADUATE',
    totalVacancies: 166,
    location: 'Andhra Pradesh State Administration',
    importantDates: {
      notificationDate: '26 Sep 2026',
      applyStartDate: '26 Sep 2026',
      applyEndDate: '20 Nov 2026',
      daysRemaining: 14,
      examDate: 'Prelims: Jan 2027',
      admitCardDate: 'Jan 2027'
    },
    eligibility: {
      education: ['Bachelor’s Degree of any recognized University in India'],
      minAge: 18,
      maxAge: 42,
      ageRelaxation: 'BC/SC/ST: 5 Years | Ex-Servicemen & PwD: As per rules'
    },
    compensation: {
      salaryOrPayScale: 'Scale of Pay ₹54,060 - ₹1,33,900 (Class-I Gazetted Officer Status)',
      applicationFeeGeneral: 250,
      applicationFeeReserved: 120
    },
    selectionProcess: [
      'Screening Test (Objective Type - General Studies & Mental Ability 240 Marks)',
      'Main Written Examination (Descriptive 5 Conventional Papers)',
      'Oral Test / Personality Assessment (Interview - 75 Marks)'
    ],
    summary: 'Executive Group-I cadre appointments for Deputy Collector, Deputy Superintendent of Police (DSP), Commercial Tax Officer (CTO), and District Registrar.',
    links: {
      applyUrl: 'https://psc.ap.gov.in',
      officialPdfUrl: 'https://psc.ap.gov.in/Documents/Group1_Notification_2026.pdf',
      officialWebsiteUrl: 'https://psc.ap.gov.in'
    },
    status: 'ACTIVE',
    isTrending: true,
    isNewToday: false,
    viewsCount: 42100
  },
  {
    id: 'wbpsc-clerkship-2026',
    slug: 'wbpsc-clerkship-recruitment-2026',
    title: 'WBPSC Clerkship Examination 2026 Online Form (LDA / LDC)',
    organization: {
      name: 'West Bengal Public Service Commission',
      shortName: 'WBPSC',
      logoText: 'WB',
      badgeColor: 'bg-sky-800',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'State Govt',
    state: 'West Bengal',
    qualificationLevel: '10TH',
    totalVacancies: 4500,
    location: 'Secretariat, Directorates & District Offices in West Bengal',
    importantDates: {
      notificationDate: '25 Sep 2026',
      applyStartDate: '25 Sep 2026',
      applyEndDate: '15 Nov 2026',
      daysRemaining: 13,
      examDate: 'Part-I: Dec 2026',
      admitCardDate: 'Dec 2026'
    },
    eligibility: {
      education: ['Passed Madhyamik (10th Standard) Examination of WBBSE or equivalent + Elementary knowledge of Computer operation with typing capability'],
      minAge: 18,
      maxAge: 40,
      ageRelaxation: 'OBC of WB: 3 Yrs | SC/ST of WB: 5 Yrs'
    },
    compensation: {
      salaryOrPayScale: 'Pay Level 6 of ROPA 2019 (₹22,700 - ₹58,500 + Medical & HRA)',
      applicationFeeGeneral: 110,
      applicationFeeReserved: 0
    },
    selectionProcess: [
      'Part-I Examination (Objective MCQs: English 30, General Studies 40, Arithmetic 30)',
      'Part-II Examination (Conventional Written: English & Bengali/Hindi/Urdu/Nepali)',
      'Elementary Computer Operation and Typing Speed Verification (20 wpm in English)'
    ],
    summary: 'WBPSC Clerkship examination for appointment to Lower Division Assistant (LDA) and Lower Division Clerk (LDC) posts in West Bengal Government.',
    links: {
      applyUrl: 'https://psc.wb.gov.in',
      officialPdfUrl: 'https://psc.wb.gov.in/notifications/Clerkship_2026.pdf',
      officialWebsiteUrl: 'https://psc.wb.gov.in'
    },
    status: 'ACTIVE',
    isTrending: true,
    isNewToday: true,
    viewsCount: 39800
  },
  {
    id: 'upessc-assistant-professor-2026',
    slug: 'upessc-1936-assistant-professor-2026',
    title: 'UPESSC 1,936 Assistant Professor Online Form 2026',
    organization: {
      name: 'UP Higher Education Services Commission',
      shortName: 'UPESSC',
      logoText: 'UP',
      badgeColor: 'bg-emerald-900',
      verified: true
    },
    sector: 'GOVERNMENT',
    category: 'Teaching / State Govt',
    state: 'Uttar Pradesh',
    qualificationLevel: 'PG',
    totalVacancies: 1936,
    location: 'Aided Degree Colleges across Uttar Pradesh',
    importantDates: {
      notificationDate: '20 Sep 2026',
      applyStartDate: '20 Sep 2026',
      applyEndDate: '24 Oct 2026',
      daysRemaining: 1,
      examDate: 'December 2026',
      admitCardDate: 'Nov 2026'
    },
    eligibility: {
      education: ['Master’s Degree with minimum 55% marks in relevant subject + UGC NET / CSIR NET / SLET Qualified OR Ph.D degree'],
      minAge: 21,
      maxAge: 62,
      experience: 'Fresher / Experienced Academics'
    },
    compensation: {
      salaryOrPayScale: 'Academic Level 10 (Pay Band ₹15,600 - ₹39,100 + AGP ₹6,000, Gross ~₹85,000/mo)',
      applicationFeeGeneral: 2000,
      applicationFeeReserved: 1000
    },
    selectionProcess: [
      'Written Examination (Objective MCQs - General Knowledge 60 Marks + Optional Subject 140 Marks)',
      'Interview (30 Marks)',
      'Merit Ranking and College Preference Allotment'
    ],
    summary: 'Appointment of 1,936 Assistant Professors in 34 arts, science, and commerce disciplines in non-government aided degree colleges in UP.',
    links: {
      applyUrl: 'https://site.uphesc.org',
      officialPdfUrl: 'https://site.uphesc.org/advt-assistant-prof-2026.pdf',
      officialWebsiteUrl: 'https://site.uphesc.org'
    },
    status: 'CLOSING_SOON',
    isTrending: true,
    isNewToday: false,
    viewsCount: 36700
  },

  // =========================================================================
  // 3. CORPORATE & TECH OPPORTUNITIES (FreeJobAlert IT & Walk-in Section)
  // =========================================================================
  {
    id: 'google-swe-early-2026',
    slug: 'google-software-engineer-early-career-2026',
    title: 'Google Early Career Software Engineer (SWE) 2026',
    organization: {
      name: 'Google India',
      shortName: 'Google',
      logoText: 'GOOG',
      badgeColor: 'bg-blue-600',
      verified: true
    },
    sector: 'PRIVATE',
    category: 'Software & IT',
    state: 'All India',
    qualificationLevel: 'BTECH',
    totalVacancies: 150,
    location: 'Bengaluru / Hyderabad (Hybrid)',
    importantDates: {
      notificationDate: '02 Oct 2026',
      applyStartDate: '02 Oct 2026',
      applyEndDate: '15 Nov 2026',
      daysRemaining: 13,
      examDate: 'Rolling Technical Interviews',
      admitCardDate: 'Direct Calendar Invite'
    },
    eligibility: {
      education: ['Bachelor’s or Master’s degree in Computer Science, Engineering or related technical field'],
      experience: '0 - 2 Years of experience with C++, Java, Python, or Go',
      skills: ['Data Structures', 'Algorithms', 'System Design', 'C++', 'Java', 'Python']
    },
    compensation: {
      salaryOrPayScale: '₹28,00,000 - ₹38,00,000 CTC (Base + Stocks + Annual Bonus)',
      applicationFeeGeneral: 0,
      applicationFeeReserved: 0,
      feeNote: 'Zero application fee. Direct official application.'
    },
    workMode: 'HYBRID',
    selectionProcess: [
      'Online Assessment (Algorithmic problem solving on HackerRank/Google Portal)',
      '1x Technical Screen (Phone/Meet - 45 mins)',
      '3x Virtual Onsite Rounds (Data Structures, Algorithms, Coding, Leadership)'
    ],
    summary: 'Build products that impact billions of global users. Excellent work environment, health benefits, and equity grants.',
    links: {
      applyUrl: 'https://careers.google.com/jobs/results/early-career-swe-2026',
      officialWebsiteUrl: 'https://careers.google.com'
    },
    status: 'ACTIVE',
    isTrending: true,
    isNewToday: true,
    viewsCount: 41200
  },
  {
    id: 'flipkart-sde-2026',
    slug: 'flipkart-software-development-engineer-1',
    title: 'Flipkart Software Development Engineer - 1 (SDE-1)',
    organization: {
      name: 'Flipkart',
      shortName: 'Flipkart',
      logoText: 'FK',
      badgeColor: 'bg-yellow-600',
      verified: true
    },
    sector: 'PRIVATE',
    category: 'Software & IT',
    state: 'Karnataka',
    qualificationLevel: 'BTECH',
    totalVacancies: 40,
    location: 'Bengaluru, Karnataka',
    importantDates: {
      notificationDate: '28 Sep 2026',
      applyStartDate: '28 Sep 2026',
      applyEndDate: '25 Oct 2026',
      daysRemaining: 2,
      examDate: 'Live Coding: Oct 2026'
    },
    eligibility: {
      education: ['B.Tech / B.E / M.Tech in CS, IT, ECE or equivalent'],
      experience: '1 - 3 Years backend / distributed systems engineering',
      skills: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'Microservices', 'MySQL']
    },
    compensation: {
      salaryOrPayScale: '₹18,00,000 - ₹24,00,000 CTC + ESOPs + Insurance',
      applicationFeeGeneral: 0,
      applicationFeeReserved: 0
    },
    workMode: 'ON_SITE',
    selectionProcess: [
      'Machine Coding Round (Low Level Design & Object Oriented Modeling)',
      'Data Structures & Algorithm Interview',
      'System Architecture & Hiring Manager Discussion'
    ],
    summary: 'Join Flipkart core logistics and checkout infrastructure handling peak festive traffic at 100,000+ RPS.',
    links: {
      applyUrl: 'https://flipkartcareers.com/jobs/sde1-supply-chain-2026',
      officialWebsiteUrl: 'https://flipkartcareers.com'
    },
    status: 'CLOSING_SOON',
    isTrending: false,
    isNewToday: false,
    viewsCount: 22400
  }
];
