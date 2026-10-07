// Background Auto-Sync Daemon for FreeJobAlert & State Govt Portal
// Automatically pings /api/sync every 60 minutes to fetch live notifications

const http = require('http');

const PORT = process.env.PORT || 3000;
const SYNC_URL = `http://localhost:${PORT}/api/sync`;
const INTERVAL_MINUTES = 60;
const INTERVAL_MS = INTERVAL_MINUTES * 60 * 1000;

console.log('====================================================');
console.log('🤖 JobAlertHub Auto-Pilot Daemon Started');
console.log(`⏱️ Schedule: Every ${INTERVAL_MINUTES} minutes`);
console.log(`🎯 Target API: ${SYNC_URL}`);
console.log('====================================================');

function performSync() {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] [Auto-Pilot] Checking for new recruitment notifications...`);

  const req = http.request(SYNC_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' } }, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.success) {
          console.log(`[${new Date().toLocaleTimeString()}] ✅ Auto-sync success! Ingested: ${json.addedCount || 0} new jobs | Total in database: ${json.totalJobs || 'Live'}`);
        } else {
          console.log(`[${new Date().toLocaleTimeString()}] ⚠️ Auto-sync response:`, json.message || 'No new alerts');
        }
      } catch {
        console.log(`[${new Date().toLocaleTimeString()}] ℹ️ Server responded with status ${res.statusCode}`);
      }
    });
  });

  req.on('error', (err) => {
    console.error(`[${new Date().toLocaleTimeString()}] ❌ Connection error (dev server may be starting up):`, err.message);
  });

  req.write(JSON.stringify({ autoTriggered: true }));
  req.end();
}

// Initial sync after 3 seconds
setTimeout(performSync, 3000);

// Recurring interval
setInterval(performSync, INTERVAL_MS);
