-- ==========================================================
-- JOBALERTHUB - SUPABASE / POSTGRESQL PRODUCTION SCHEMA
-- Run this in Supabase SQL Editor (https://supabase.com)
-- ==========================================================

-- 1. JOBS TABLE
CREATE TABLE IF NOT EXISTS public.jobs (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  organization JSONB NOT NULL,
  sector TEXT NOT NULL DEFAULT 'GOVERNMENT', -- 'GOVERNMENT' | 'PRIVATE'
  category TEXT NOT NULL DEFAULT 'General',
  total_vacancies INTEGER NOT NULL DEFAULT 1,
  location TEXT NOT NULL DEFAULT 'All India',
  important_dates JSONB NOT NULL,
  eligibility JSONB NOT NULL,
  compensation JSONB NOT NULL,
  work_mode TEXT DEFAULT 'ON_SITE',
  selection_process JSONB DEFAULT '[]'::jsonb,
  summary TEXT,
  links JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  is_trending BOOLEAN DEFAULT FALSE,
  is_new_today BOOLEAN DEFAULT TRUE,
  views_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ADMIT CARDS TABLE
CREATE TABLE IF NOT EXISTS public.admit_cards (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  organization JSONB NOT NULL,
  sector TEXT NOT NULL DEFAULT 'GOVERNMENT',
  category TEXT NOT NULL DEFAULT 'Central Govt',
  exam_name TEXT NOT NULL,
  exam_date TEXT NOT NULL,
  release_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'RELEASED',
  admit_card_url TEXT NOT NULL,
  official_website_url TEXT NOT NULL,
  instructions TEXT,
  views_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.results (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  organization JSONB NOT NULL,
  sector TEXT NOT NULL DEFAULT 'GOVERNMENT',
  exam_name TEXT NOT NULL,
  declaration_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'DECLARED',
  result_url TEXT NOT NULL,
  cutoff_url TEXT,
  official_website_url TEXT NOT NULL,
  cutoff_preview JSONB,
  qualified_count INTEGER,
  summary TEXT,
  views_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ANSWER KEYS TABLE
CREATE TABLE IF NOT EXISTS public.answer_keys (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  organization JSONB NOT NULL,
  sector TEXT NOT NULL DEFAULT 'GOVERNMENT',
  exam_name TEXT NOT NULL,
  exam_date TEXT NOT NULL,
  release_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'RELEASED',
  objection_start_date TEXT,
  objection_end_date TEXT,
  objection_fee_note TEXT,
  answer_key_url TEXT NOT NULL,
  objection_url TEXT,
  official_website_url TEXT NOT NULL,
  summary TEXT,
  views_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. SYLLABUS TABLE
CREATE TABLE IF NOT EXISTS public.syllabus (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  organization JSONB NOT NULL,
  sector TEXT NOT NULL DEFAULT 'GOVERNMENT',
  exam_name TEXT NOT NULL,
  updated_year TEXT NOT NULL,
  exam_pattern JSONB NOT NULL,
  topics_summary JSONB DEFAULT '[]'::jsonb,
  pdf_url TEXT,
  official_website_url TEXT NOT NULL,
  summary TEXT,
  views_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY (RLS) FOR READ-ONLY PUBLIC ACCESS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admit_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syllabus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read-only policy for jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Public read-only policy for admit_cards" ON public.admit_cards FOR SELECT USING (true);
CREATE POLICY "Public read-only policy for results" ON public.results FOR SELECT USING (true);
CREATE POLICY "Public read-only policy for answer_keys" ON public.answer_keys FOR SELECT USING (true);
CREATE POLICY "Public read-only policy for syllabus" ON public.syllabus FOR SELECT USING (true);
