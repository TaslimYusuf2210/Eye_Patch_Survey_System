const fs = require('fs');

const replaceInFile = (file, replacements) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [from, to] of Object.entries(replacements)) {
    if (content.includes(from)) {
      content = content.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated imports in ${file}`);
  }
};

replaceInFile('features/auth/pages/signup.tsx', {
  "'../contexts/AuthContext'": "'../../../contexts/AuthContext'",
  '"../contexts/AuthContext"': '"../../../contexts/AuthContext"'
});

replaceInFile('features/dashboard/pages/Analytic.tsx', {
  "'../../components/dashboard/StatsCard'": "'../components/StatsCard'",
  "'../../components/dashboard/RecentSurveyList'": "'../components/RecentSurveyList'",
  '"../../components/dashboard/StatsCard"': '"../components/StatsCard"',
  '"../../components/dashboard/RecentSurveyList"': '"../components/RecentSurveyList"'
});

replaceInFile('features/dashboard/pages/dashboard.tsx', {
  "'../components/dashboard/DashboardLayout'": "'../layout/DashboardLayout'",
  '"../components/dashboard/DashboardLayout"': '"../layout/DashboardLayout"',
  "'./dashboard/Analytic'": "'./Analytic'",
  '"./dashboard/Analytic"': '"./Analytic"',
  "'./dashboard/SurveyList'": "'./SurveyList'",
  '"./dashboard/SurveyList"': '"./SurveyList"',
  "'./dashboard/SurveyDetail'": "'./SurveyDetail'",
  '"./dashboard/SurveyDetail"': '"./SurveyDetail"',
  "'./dashboard/GlobalResponses'": "'./GlobalResponses'",
  '"./dashboard/GlobalResponses"': '"./GlobalResponses"',
  "'./dashboard/SurveyResponses'": "'./SurveyResponses'",
  '"./dashboard/SurveyResponses"': '"./SurveyResponses"',
  "'./dashboard/ParticipantList'": "'./ParticipantList'",
  '"./dashboard/ParticipantList"': '"./ParticipantList"',
  "'./dashboard/ParticipantDetail'": "'./ParticipantDetail'",
  '"./dashboard/ParticipantDetail"': '"./ParticipantDetail"',
  "'./dashboard/SettingsView'": "'./SettingsView'",
  '"./dashboard/SettingsView"': '"./SettingsView"'
});

replaceInFile('features/dashboard/pages/GlobalResponses.tsx', {
  "'../../components/dashboard/ResponseTable'": "'../components/ResponseTable'",
  '"../../components/dashboard/ResponseTable"': '"../components/ResponseTable"',
  "'../../components/utils/table'": "'../../../components/ui/table'",
  '"../../components/utils/table"': '"../../../components/ui/table"'
});

replaceInFile('features/dashboard/pages/ParticipantList.tsx', {
  "'../../components/dashboard/ParticipantTable'": "'../components/ParticipantTable'",
  '"../../components/dashboard/ParticipantTable"': '"../components/ParticipantTable"'
});

replaceInFile('features/dashboard/pages/SurveyResponses.tsx', {
  "'../../components/dashboard/ResponseTable'": "'../components/ResponseTable'",
  '"../../components/dashboard/ResponseTable"': '"../components/ResponseTable"',
  "'../../components/utils/table'": "'../../../components/ui/table'",
  '"../../components/utils/table"': '"../../../components/ui/table"'
});

// Fix DashboardLayout Sidebar import
replaceInFile('features/dashboard/layout/DashboardLayout.tsx', {
  "'./Sidebar'": "'./Sidebar'", // Probably fine, but just in case
  "'../Sidebar'": "'./Sidebar'", // If it was imported with ../ Sidebar before
});

console.log("Imports fixed.");
