import { Pinwheel } from 'ldrs/react';
import 'ldrs/react/Pinwheel.css';

interface MutationOverlayProps {
  isPending: boolean;
  message: string;
}

export function MutationOverlay({ isPending, message }: MutationOverlayProps) {
  if (!isPending) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-xl bg-white dark:bg-slate-950 px-10 py-8 shadow-2xl border border-gray-200 dark:border-slate-800">
        <Pinwheel size="40" speed="1.5" color="black" />
        <p className="text-sm font-medium text-gray-700 dark:text-slate-300 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
