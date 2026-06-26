import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const steps = [
    { label: 'Information', path: '/dashboard/create-survey' },
    { label: 'Goal', path: '/dashboard/create-survey/survey-goal' },
    { label: 'Sections', path: '/dashboard/create-survey/sections-and-questions' },
    { label: 'Settings', path: '/dashboard/create-survey/survey-settings' },
    { label: 'Review', path: '/dashboard/create-survey/survey-review' },
];

function getCurrentStep(pathname: string): number {
    if (pathname.includes('/survey-goal')) return 1;
    if (pathname.includes('/sections-and-questions')) return 2;
    if (pathname.includes('/survey-settings')) return 3;
    if (pathname.includes('/survey-review')) return 4;
    return 0;
}

export function SurveyStepper() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentStep = getCurrentStep(location.pathname);
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    return (
        <div className="flex items-center gap-0">
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;
                const isLast = index === steps.length - 1;
                const isHovered = hoveredStep === index;

                return (
                    <div key={step.label} className="flex items-center">
                        {/* Step circle + label */}
                        <div className="flex items-center gap-1.5 sm:gap-2 relative">
                            {/* Circle */}
                            <button
                                type="button"
                                onClick={() => navigate(step.path)}
                                onMouseEnter={() => setHoveredStep(index)}
                                onMouseLeave={() => setHoveredStep(null)}
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-all duration-300 shrink-0 cursor-pointer ${
                                    isCompleted
                                        ? 'bg-accent-600 text-white hover:brightness-110'
                                        : isActive
                                            ? 'bg-accent-600 text-white ring-2 ring-accent-600/30 hover:brightness-110'
                                            : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 hover:bg-gray-200 dark:hover:bg-slate-700'
                                }`}
                                title={step.label}
                            >
                                {isCompleted ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </button>

                            {/* Label */}
                            <span
                                className={`text-[10px] sm:text-xs font-medium hidden xs:block transition-colors truncate max-w-[60px] sm:max-w-none ${
                                    isActive
                                        ? 'text-gray-900 dark:text-white'
                                        : isCompleted
                                            ? 'text-gray-600 dark:text-slate-300'
                                            : 'text-gray-400 dark:text-slate-600'
                                }`}
                            >
                                {step.label}
                            </span>

                            {/* Tooltip for mobile / when label might not be visible */}
                            {isHovered && (
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-50 px-2 py-1 bg-gray-900 dark:bg-slate-700 text-white text-[10px] font-medium rounded shadow-lg whitespace-nowrap xs:hidden pointer-events-none">
                                    {step.label}
                                </div>
                            )}
                        </div>

                        {/* Connecting line */}
                        {!isLast && (
                            <div
                                className={`w-4 sm:w-6 lg:w-8 h-[2px] mx-1 sm:mx-1.5 rounded-full transition-colors duration-300 shrink-0 ${
                                    index < currentStep
                                        ? 'bg-accent-600'
                                        : 'bg-gray-200 dark:bg-slate-800'
                                }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
