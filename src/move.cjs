const fs = require('fs');
const path = require('path');

const moves = [
  ['components/utils/table.tsx', 'components/ui/table.tsx'],
  ['pages/login.tsx', 'features/auth/pages/login.tsx'],
  ['pages/signup.tsx', 'features/auth/pages/signup.tsx'],
  ['pages/landingPage.tsx', 'features/landingPage/pages/landingPage.tsx'],
  ['components/hero.tsx', 'features/landingPage/components/hero.tsx'],
  ['components/faq.tsx', 'features/landingPage/components/faq.tsx'],
  ['components/compatible.tsx', 'features/landingPage/components/compatible.tsx'],
  ['components/impact.tsx', 'features/landingPage/components/impact.tsx'],
  ['components/info.tsx', 'features/landingPage/components/info.tsx'],
  ['components/infocard.tsx', 'features/landingPage/components/infocard.tsx'],
  ['components/navbar.tsx', 'features/landingPage/components/navbar.tsx'],
  ['components/demo.tsx', 'features/landingPage/components/demo.tsx'],
  ['components/newsAndUpdate.tsx', 'features/landingPage/components/newsAndUpdate.tsx'],
  ['components/footer.tsx', 'features/landingPage/components/footer.tsx'],
  ['pages/dashboard.tsx', 'features/dashboard/pages/dashboard.tsx'],
  ['components/dashboard/DashboardLayout.tsx', 'features/dashboard/layout/DashboardLayout.tsx'],
  ['components/dashboard/Sidebar.tsx', 'features/dashboard/layout/Sidebar.tsx'],
  ['components/dashboard/ParticipantTable.tsx', 'features/dashboard/components/ParticipantTable.tsx'],
  ['components/dashboard/RecentSurveyList.tsx', 'features/dashboard/components/RecentSurveyList.tsx'],
  ['components/dashboard/ResponseTable.tsx', 'features/dashboard/components/ResponseTable.tsx'],
  ['components/dashboard/StatsCard.tsx', 'features/dashboard/components/StatsCard.tsx'],
];

// Add dashboard pages
const dashboardPagesDir = 'pages/dashboard';
if (fs.existsSync(dashboardPagesDir)) {
  const files = fs.readdirSync(dashboardPagesDir);
  for (const file of files) {
    moves.push([
      `pages/dashboard/${file}`,
      `features/dashboard/pages/${file}`
    ]);
  }
}

let allSuccess = true;
for (const [src, dest] of moves) {
  if (fs.existsSync(src)) {
    try {
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.renameSync(src, dest);
      console.log(`Moved ${src} -> ${dest}`);
    } catch (err) {
      console.error(`Failed to move ${src} -> ${dest}:`, err.message);
      allSuccess = false;
    }
  } else {
    console.log(`Source does not exist: ${src}`);
  }
}

if (allSuccess) {
  console.log("Cleanup empty directories...");
  try { if (fs.existsSync('components/utils')) fs.rmdirSync('components/utils'); } catch(e){}
  try { if (fs.existsSync('components/dashboard')) fs.rmdirSync('components/dashboard'); } catch(e){}
  try { if (fs.existsSync('pages/dashboard')) fs.rmdirSync('pages/dashboard'); } catch(e){}
}
