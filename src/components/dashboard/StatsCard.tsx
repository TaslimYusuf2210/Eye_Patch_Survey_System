// import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change: number;
    chartColor?: string;
}

const StatsCard = ({ title, value, change, chartColor = 'bg-blue-500' }: StatsCardProps) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-48">
            <div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
                <div className="text-3xl font-bold text-gray-900">{value}</div>
            </div>

            <div className="mt-4">
                <div className="flex items-end justify-between h-16 gap-1">
                    {[40, 30, 45, 35, 55, 45, 70].map((height, i) => (
                        <div
                            key={i}
                            className={`w-full rounded-t-sm ${i === 6 ? chartColor : 'bg-gray-100'}`}
                            style={{ height: `${height}%` }}
                        ></div>
                    ))}
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs font-medium">
                    <span className="text-green-500 flex items-center">
                        {change}% ↗
                    </span>
                    <span className="text-gray-400">from last week</span>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
