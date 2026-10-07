import fs from 'fs/promises';
import path from 'path';
import { JobNotification } from '../types/job';
import { AdmitCardItem, ResultItem, AnswerKeyItem, SyllabusItem } from '../types/portal';
import { INITIAL_JOBS } from '../data/mockJobs';
import { 
  INITIAL_ADMIT_CARDS, 
  INITIAL_RESULTS, 
  INITIAL_ANSWER_KEYS, 
  INITIAL_SYLLABUS 
} from '../data/mockPortalData';

interface PortalDatabase {
  jobs: JobNotification[];
  admitCards: AdmitCardItem[];
  results: ResultItem[];
  answerKeys: AnswerKeyItem[];
  syllabus: SyllabusItem[];
  lastSyncedAt: string;
}

const DB_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'portalDatabase.json');

const INITIAL_DB: PortalDatabase = {
  jobs: INITIAL_JOBS,
  admitCards: INITIAL_ADMIT_CARDS,
  results: INITIAL_RESULTS,
  answerKeys: INITIAL_ANSWER_KEYS,
  syllabus: INITIAL_SYLLABUS,
  lastSyncedAt: new Date().toISOString(),
};

// Thread-safe cached read and write
export async function getDatabase(): Promise<PortalDatabase> {
  try {
    const content = await fs.readFile(DB_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(content);
    if (!parsed.jobs || !Array.isArray(parsed.jobs)) {
      await saveDatabase(INITIAL_DB);
      return INITIAL_DB;
    }
    return parsed;
  } catch {
    // If file doesn't exist, create it with initial data
    await saveDatabase(INITIAL_DB);
    return INITIAL_DB;
  }
}

export async function saveDatabase(data: PortalDatabase): Promise<void> {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write to portalDatabase.json', err);
  }
}

// Jobs helpers
export async function getAllJobs(): Promise<JobNotification[]> {
  const db = await getDatabase();
  return db.jobs;
}

export async function upsertJob(job: JobNotification): Promise<JobNotification[]> {
  const db = await getDatabase();
  const index = db.jobs.findIndex((j) => j.id === job.id);
  if (index >= 0) {
    db.jobs[index] = job;
  } else {
    db.jobs.unshift(job);
  }
  await saveDatabase(db);
  return db.jobs;
}

export async function removeJob(id: string): Promise<JobNotification[]> {
  const db = await getDatabase();
  db.jobs = db.jobs.filter((j) => j.id !== id);
  await saveDatabase(db);
  return db.jobs;
}

// Portal items helpers
export async function getAllPortalData() {
  const db = await getDatabase();
  return {
    admitCards: db.admitCards,
    results: db.results,
    answerKeys: db.answerKeys,
    syllabus: db.syllabus,
    lastSyncedAt: db.lastSyncedAt,
  };
}

// Auto-Sync helper: Merge newly discovered notifications
export async function mergeAutoSyncedJobs(newJobs: JobNotification[]): Promise<{ addedCount: number; totalJobs: number }> {
  const db = await getDatabase();
  let addedCount = 0;

  for (const newJob of newJobs) {
    // Check by slug or similar title
    const exists = db.jobs.some(
      (j) => j.slug === newJob.slug || j.title.toLowerCase().trim() === newJob.title.toLowerCase().trim()
    );
    if (!exists) {
      db.jobs.unshift(newJob);
      addedCount++;
    }
  }

  db.lastSyncedAt = new Date().toISOString();
  await saveDatabase(db);
  return { addedCount, totalJobs: db.jobs.length };
}

export async function resetDatabaseToDefault(): Promise<PortalDatabase> {
  const freshDb: PortalDatabase = {
    jobs: JSON.parse(JSON.stringify(INITIAL_JOBS)),
    admitCards: JSON.parse(JSON.stringify(INITIAL_ADMIT_CARDS)),
    results: JSON.parse(JSON.stringify(INITIAL_RESULTS)),
    answerKeys: JSON.parse(JSON.stringify(INITIAL_ANSWER_KEYS)),
    syllabus: JSON.parse(JSON.stringify(INITIAL_SYLLABUS)),
    lastSyncedAt: new Date().toISOString(),
  };
  await saveDatabase(freshDb);
  return freshDb;
}
