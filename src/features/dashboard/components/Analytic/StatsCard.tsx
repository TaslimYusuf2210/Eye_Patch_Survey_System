import type { StatsCardProps } from '@/types/dashboard/analytic';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function StatsCard({ title, value, change, icon: Icon, weeklyTrend, chartColor = 'accent' }: StatsCardProps) {
    const isPositive = change >= 0;
    const isNeutral = change === 0;
    const arrow = isNeutral ? '→' : isPositive ? '↗' : '↘';
    const changeColor = isNeutral
        ? 'text-gray-400 dark:text-slate-500 bg-gray-100 dark:bg-slate-800'
        : isPositive
            ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/30'
            : 'text-red-700 bg-red-50 dark:text-red-300 dark:bg-red-950/30';

    // Compute bar heights from weeklyTrend (percentage of max)
    const trendMax = weeklyTrend.length > 0 ? Math.max(...weeklyTrend) : 0;
    const barHeights = weeklyTrend.map(v => (trendMax > 0 ? (v / trendMax) * 100 : 0));

    return (
        <div className="bg-white dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-900 hover:border-accent-200 dark:hover:border-accent-800/30 shadow-sm hover:shadow-md flex flex-col justify-between h-auto transition-all duration-300 overflow-hidden relative">
            {/* Accent top border */}
            <div className={`h-1 w-full shrink-0 ${
                chartColor === 'accent'
                    ? 'bg-accent-600'
                    : chartColor
            }`} />

            <div className="p-6 pt-5">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
                    {Icon && (
                        <div className={`p-2 rounded-lg ${
                            chartColor === 'accent'
                                ? 'bg-accent-50 dark:bg-accent-950/20 text-accent-600 dark:text-accent-400'
                                : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400'
                        }`}>
                            <Icon size={16} />
                        </div>
                    )}
                </div>

                <div className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</div>
            </div>

            <div className="px-6 pb-6">
                {/* Mini bar chart */}
                {weeklyTrend.length > 0 ? (
                    <div className="flex items-end gap-[3px] h-12 mb-3">
                        {barHeights.map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div
                                    className={`w-full rounded-t-sm transition-all duration-500 ${
                                        i === 6
                                            ? 'bg-accent-600'
                                            : 'bg-accent-200 dark:bg-accent-950/40'
                                    }`}
                                    style={{ height: `${Math.max(height, 4)}%` }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-end gap-[3px] h-12 mb-3">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full rounded-t-sm bg-gray-100 dark:bg-slate-800 animate-pulse" style={{ height: `${[30, 45, 35, 55, 40, 50, 65][i]}%` }} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Day labels */}
                <div className="flex gap-[3px] mb-2">
                    {DAY_LABELS.map((label, i) => (
                        <div key={i} className="flex-1 text-center">
                            <span className={`text-[10px] font-medium ${
                                i === 6
                                    ? 'text-accent-600'
                                    : 'text-gray-400 dark:text-slate-500'
                            }`}>
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Change badge */}
                <div className="flex items-center gap-1.5 text-xs font-medium">
                    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${changeColor}`}>
                        {Math.abs(change)}% {arrow}
                    </span>
                    <span className="text-gray-400 dark:text-slate-500">from last week</span>
                </div>
            </div>
        </div>
    );
}

export default StatsCard;
