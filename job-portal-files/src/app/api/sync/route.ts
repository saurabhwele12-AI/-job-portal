import { NextResponse } from 'next/server';
import { fetchLiveJobAlerts } from '../../../lib/feedFetcher';
import { mergeAutoSyncedJobs, getAllJobs, resetDatabaseToDefault } from '../../../lib/db';

export async function POST(req: Request) {
  try {
    let reset = false;
    try {
      const url = new URL(req.url);
      if (url.searchParams.get('reset') === 'true') {
        reset = true;
      } else {
        const body = await req.json();
        if (body?.reset) reset = true;
      }
    } catch {
      // no body or query
    }

    if (reset) {
      await resetDatabaseToDefault();
      const updatedJobs = await getAllJobs();
      return NextResponse.json({
        success: true,
        message: 'Database successfully synced with FreeJobAlert 2026 authentic notifications!',
        data: updatedJobs,
        syncedAt: new Date().toISOString(),
      });
    }

    const liveAlerts = await fetchLiveJobAlerts();
    const result = await mergeAutoSyncedJobs(liveAlerts);
    const updatedJobs = await getAllJobs();

    return NextResponse.json({
      success: true,
      message: `Auto-sync completed successfully! Imported ${result.addedCount} new alerts.`,
      addedCount: result.addedCount,
      totalJobs: result.totalJobs,
      data: updatedJobs,
      syncedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error during auto-sync:', err);
    return NextResponse.json({ success: false, error: 'Auto-sync failed' }, { status: 500 });
  }
}

// Support GET for scheduled cron triggers or reset via query param ?reset=true
export async function GET(req: Request) {
  return POST(req);
}
