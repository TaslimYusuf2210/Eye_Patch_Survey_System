// import { LucideIcon } from 'lucide-react';
import type { StatsCardProps } from '@/types/dashboard/analytic';

const StatsCard = ({ title, value, change, chartColor = 'bg-accent-600' }: StatsCardProps) => {
    const isPositive = change >= 0;
    const isNeutral = change === 0;
    const arrow = isNeutral ? '→' : isPositive ? '↗' : '↘';
    const changeColor = isNeutral
        ? 'text-gray-400 dark:text-slate-500'
        : isPositive
            ? 'text-emerald-500'
            : 'text-red-500';

    return (
        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-gray-100 dark:border-slate-900 hover:border-accent-200 dark:hover:border-accent-800/30 shadow-sm hover:shadow-md flex flex-col justify-between h-auto transition-all duration-300">
            <div>
                <h3 className="text-gray-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
            </div>

            <div className="mt-4">
                <div className="flex items-end justify-between h-16 gap-1">
                    {[40, 30, 45, 35, 55, 45, 70].map((height, i) => (
                        <div
                            key={i}
                            className={`w-full rounded-t-sm transition-all duration-500 ${
                                i === 6 
                                    ? chartColor 
                                    : 'bg-gray-100 dark:bg-slate-900 hover:bg-accent-100 dark:hover:bg-accent-950/20'
                            }`}
                            style={{ height: `${height}%` }}
                        ></div>
                    ))}
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs font-medium">
                    <span className={`${changeColor} flex items-center gap-0.5`}>
                        {Math.abs(change)}% {arrow}
                    </span>
                    <span className="text-gray-400 dark:text-slate-500">from last week</span>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
