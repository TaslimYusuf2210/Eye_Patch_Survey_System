import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

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

    // Track the furthest step the user has reached (prevents skipping ahead)
    const [maxStep, setMaxStep] = useState<number>(() => {
        const saved = sessionStorage.getItem('createSurveyMaxStep');
        const parsed = saved ? parseInt(saved, 10) : currentStep;
        return Math.max(parsed, currentStep);
    });

    useEffect(() => {
        if (currentStep > maxStep) {
            setMaxStep(currentStep);
            sessionStorage.setItem('createSurveyMaxStep', String(currentStep));
        }
    }, [currentStep, maxStep]);

    const isLocked = (index: number) => index > maxStep;

    return (
        <div className="flex items-center gap-0">
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;
                const isLast = index === steps.length - 1;
                const isHovered = hoveredStep === index;
                const locked = isLocked(index);

                return (
                    <div key={step.label} className="flex items-center">
                        {/* Step circle + label */}
                        <div className="flex items-center gap-1.5 sm:gap-2 relative">
                            {/* Circle */}
                            <button
                                type="button"
                                disabled={locked}
                                onClick={() => !locked && navigate(step.path)}
                                onMouseEnter={() => setHoveredStep(index)}
                                onMouseLeave={() => setHoveredStep(null)}
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-all duration-300 shrink-0 cursor-pointer ${
                                    locked
                                        ? 'bg-gray-50 dark:bg-slate-900 text-gray-300 dark:text-slate-700 cursor-not-allowed'
                                        : isCompleted
                                            ? 'bg-accent-600 text-white hover:brightness-110 cursor-pointer'
                                            : isActive
                                                ? 'bg-accent-600 text-white ring-2 ring-accent-600/30 hover:brightness-110 cursor-pointer'
                                                : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer'
                                }`}
                                title={locked ? `Complete step ${index} first` : step.label}
                            >
                                {locked ? (
                                    <Lock size={12} />
                                ) : isCompleted ? (
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
                                    locked
                                        ? 'text-gray-300 dark:text-slate-700'
                                        : isActive
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
                                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 z-50 px-2 py-1 rounded shadow-lg whitespace-nowrap xs:hidden pointer-events-none text-[10px] font-medium ${
                                    locked
                                        ? 'bg-gray-500 text-white'
                                        : 'bg-gray-900 dark:bg-slate-700 text-white'
                                }`}>
                                    {locked ? `Complete step ${index} first` : step.label}
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
