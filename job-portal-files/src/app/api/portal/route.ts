import { NextResponse } from 'next/server';
import { getAllPortalData, getDatabase, saveDatabase } from '../../../lib/db';

export async function GET() {
  try {
    const portalData = await getAllPortalData();
    return NextResponse.json({ success: true, data: portalData });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch portal items' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { section, item } = await req.json();
    const db = await getDatabase();

    if (section === 'ADMIT_CARD') {
      const idx = db.admitCards.findIndex((i) => i.id === item.id);
      if (idx >= 0) db.admitCards[idx] = item;
      else db.admitCards.unshift(item);
    } else if (section === 'RESULT') {
      const idx = db.results.findIndex((i) => i.id === item.id);
      if (idx >= 0) db.results[idx] = item;
      else db.results.unshift(item);
    } else if (section === 'ANSWER_KEY') {
      const idx = db.answerKeys.findIndex((i) => i.id === item.id);
      if (idx >= 0) db.answerKeys[idx] = item;
      else db.answerKeys.unshift(item);
    } else if (section === 'SYLLABUS') {
      const idx = db.syllabus.findIndex((i) => i.id === item.id);
      if (idx >= 0) db.syllabus[idx] = item;
      else db.syllabus.unshift(item);
    }

    await saveDatabase(db);
    return NextResponse.json({ success: true, data: db });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to update portal section' }, { status: 500 });
  }
}
