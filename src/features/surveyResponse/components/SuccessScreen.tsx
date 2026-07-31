export default function SuccessScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-emerald-950/50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Response Submitted!</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400">Thank you for your feedback. It means a lot to us.</p>
      </div>
    </div>
  );
}
