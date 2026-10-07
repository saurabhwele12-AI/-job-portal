import { NextResponse } from 'next/server';
import { getAllJobs, upsertJob, removeJob } from '../../../lib/db';
import { JobNotification } from '../../../types/job';

export async function GET() {
  try {
    const jobs = await getAllJobs();
    return NextResponse.json({ success: true, data: jobs });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body: JobNotification = await req.json();
    if (!body.title || !body.organization?.name) {
      return NextResponse.json({ success: false, error: 'Missing title or organization' }, { status: 400 });
    }
    const updatedList = await upsertJob(body);
    return NextResponse.json({ success: true, data: updatedList });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to create job' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body: JobNotification = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Missing job id' }, { status: 400 });
    }
    const updatedList = await upsertJob(body);
    return NextResponse.json({ success: true, data: updatedList });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id param' }, { status: 400 });
    }
    const updatedList = await removeJob(id);
    return NextResponse.json({ success: true, data: updatedList });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to delete job' }, { status: 500 });
  }
}
