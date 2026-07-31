import { User, Mail } from 'lucide-react';

interface RespondentInfoProps {
  name: string;
  email: string;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
}

export default function RespondentInfo({ name, email, onNameChange, onEmailChange }: RespondentInfoProps) {
  return (
    <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 mb-6">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <User size={18} className="text-accent-600" />
        Your Information
        <span className="text-xs text-red-500 font-normal ml-1">*Required</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
            <User size={14} className="inline mr-1" />
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="John Doe"
            autoComplete="name"
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
            <Mail size={14} className="inline mr-1" />
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="john@example.com"
            autoComplete="email"
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>
    </div>
  );
}
