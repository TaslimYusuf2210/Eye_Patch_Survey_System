import { Sun, Moon, Check, Sparkles, RotateCcw, Ban } from 'lucide-react';
import { type Appearance, type AccentColor } from '@/types';

interface AppearanceTabProps {
    appearance: Appearance;
    accent: AccentColor;
    isDefaultTheme: boolean;
    baseModes: { id: Appearance; name: string; icon: typeof Sun; description: string }[];
    colorAccents: { id: AccentColor; name: string; colorClass: string; activeClass: string }[];
    getAccentBgClass: (color: AccentColor) => string;
    getPreviewAccentTextClass: () => string;
    handleSelectDefault: () => void;
    handleSetAppearance: (mode: Appearance) => void;
    setAccent: (color: AccentColor) => void;
    setAppearance: (mode: Appearance) => void;
    textTitle: string;
}

const AppearanceTab = ({
    appearance,
    accent,
    isDefaultTheme,
    baseModes,
    colorAccents,
    getAccentBgClass,
    getPreviewAccentTextClass,
    handleSelectDefault,
    handleSetAppearance,
    setAccent,
    setAppearance,
    textTitle,
}: AppearanceTabProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Settings Form */}
            <div className="lg:col-span-7 space-y-8">
                {/* ─── Default Theme Toggle ─── */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Theme Preset</h3>
                        <p className="text-gray-500 dark:text-slate-400 text-xs">Use the original neutral design or customise with an accent color.</p>
                    </div>

                    <button
                        onClick={handleSelectDefault}
                        className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left cursor-pointer transition-all duration-200 focus:outline-none ${
                            isDefaultTheme
                                ? 'border-black dark:border-white ring-1 ring-black dark:ring-white bg-gray-50/50 dark:bg-slate-900/50'
                                : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 hover:bg-gray-50/20 dark:hover:bg-slate-900/20'
                        }`}
                    >
                        <div className="flex -space-x-1">
                            <div className="w-5 h-5 rounded-full bg-gray-300 border-2 border-white dark:border-slate-950" />
                            <div className="w-5 h-5 rounded-full bg-gray-500 border-2 border-white dark:border-slate-950" />
                            <div className="w-5 h-5 rounded-full bg-gray-700 border-2 border-white dark:border-slate-950" />
                            <div className="w-5 h-5 rounded-full bg-gray-900 border-2 border-white dark:border-slate-950" />
                        </div>
                        <div className="flex-1">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white block">Default (Neutral)</span>
                            <span className="text-xs text-gray-400 dark:text-slate-500 block mt-0.5">Classic gray & black — the original look. No accent color.</span>
                        </div>
                        {isDefaultTheme && (
                            <div className="p-1 rounded-full bg-black dark:bg-white">
                                <Check className="w-3 h-3 text-white dark:text-black" />
                            </div>
                        )}
                    </button>
                </div>

                {/* ─── Base Theme (Light / Dark) ─── */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Base Theme</h3>
                        <p className="text-gray-500 dark:text-slate-400 text-xs">Choose the primary background style for the application.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {baseModes.map((mode) => {
                            const Icon = mode.icon;
                            const isSelected = !isDefaultTheme && appearance === mode.id;
                            return (
                                <button
                                    key={mode.id}
                                    onClick={() => handleSetAppearance(mode.id)}
                                    className={`flex items-start gap-3 rounded-xl border p-4 text-left cursor-pointer transition-all duration-200 focus:outline-none ${
                                        isSelected
                                            ? 'border-black dark:border-white ring-1 ring-black dark:ring-white bg-gray-50/50 dark:bg-slate-900/50'
                                            : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 hover:bg-gray-50/20 dark:hover:bg-slate-900/20'
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-slate-900 text-gray-500 dark:text-slate-400'}`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white block">{mode.name}</span>
                                        <span className="text-xs text-gray-400 dark:text-slate-500 block mt-0.5">{mode.description}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ─── Accent Color Selector ─── */}
                <div className={`space-y-4 transition-opacity duration-300 ${isDefaultTheme ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Accent Color</h3>
                            <p className="text-gray-500 dark:text-slate-400 text-xs">
                                {isDefaultTheme
                                    ? 'Switch away from Default theme to pick an accent color.'
                                    : 'Choose the highlight palette for active actions, tags, and links.'}
                            </p>
                        </div>
                        {isDefaultTheme && (
                            <Ban className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                        )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {colorAccents.map((color) => {
                            const isSelected = accent === color.id;
                            return (
                                <button
                                    key={color.id}
                                    onClick={() => setAccent(color.id)}
                                    disabled={isDefaultTheme}
                                    className={`flex flex-col items-center justify-center rounded-xl border p-3.5 text-center cursor-pointer transition-all duration-200 focus:outline-none ${
                                        isSelected
                                            ? 'border-black dark:border-white ring-1 ring-black dark:ring-white bg-gray-50/50 dark:bg-slate-900/50'
                                            : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 hover:bg-gray-50/20'
                                    } ${isDefaultTheme ? 'cursor-not-allowed' : ''}`}
                                >
                                    <div className={`w-6 h-6 rounded-full ${color.colorClass} mb-2 shadow-inner flex items-center justify-center text-white`}>
                                        {isSelected && <Check className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className="text-xs font-semibold text-gray-900 dark:text-white">{color.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Reset to Default */}
                <div className="mt-4">
                    <button
                        onClick={() => {
                            setAppearance('light');
                            setAccent('default');
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors text-sm text-gray-600 dark:text-slate-400"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset to Default
                    </button>
                </div>
            </div>

            {/* Live Preview Column */}
            <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Live Preview</span>
                </div>

                <div className={`w-full rounded-2xl border p-5 transition-all duration-300 shadow-md ${
                    appearance === 'dark'
                        ? 'bg-slate-950 border-slate-900 text-slate-100'
                        : 'bg-gray-50 border-gray-150 text-gray-800'
                }`}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200/20">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2.5 h-2.5 rounded bg-gray-400/50"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-2 rounded bg-gray-400/30"></div>
                                <div className="w-4 h-4 rounded-full bg-gray-400/30"></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className={`h-3 w-20 rounded ${appearance === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`} />
                                    <div className={`h-2 w-28 rounded ${appearance === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`} />
                                </div>
                                <div className={`h-6 w-16 rounded-md shadow-sm ${getAccentBgClass(accent)} flex items-center justify-center text-[8px] font-bold text-white uppercase tracking-wider`}>
                                    Action
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                                <div className={`p-3 rounded-xl border ${
                                    appearance === 'dark' ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-gray-200/60'
                                } space-y-2`}>
                                    <div className="flex items-center justify-between">
                                        <div className={`h-2.5 w-10 rounded ${appearance === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`} />
                                        <div className={`w-1.5 h-1.5 rounded-full ${getAccentBgClass(accent)}`} />
                                    </div>
                                    <div className={`h-4 w-12 rounded ${appearance === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`} />
                                </div>
                                <div className={`p-3 rounded-xl border ${
                                    appearance === 'dark' ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-gray-200/60'
                                } space-y-2`}>
                                    <div className="flex items-center justify-between">
                                        <div className={`h-2.5 w-8 rounded ${appearance === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`} />
                                        <div className="h-2 w-2 rounded bg-gray-400/30" />
                                    </div>
                                    <div className={`h-4 w-14 rounded ${appearance === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`} />
                                </div>
                            </div>

                            <div className={`p-3 rounded-xl border ${
                                appearance === 'dark' ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-gray-200/60'
                            } space-y-2`}>
                                <div className="flex items-center justify-between">
                                    <div className={`h-2.5 w-16 rounded ${appearance === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`} />
                                    <span className={`text-[8px] font-bold ${getPreviewAccentTextClass()}`}>View details</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-200/40 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full w-3/4 rounded-full ${getAccentBgClass(accent)}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-[10px] text-gray-400">
                        Showing live mock combination: <span className="font-semibold text-gray-600 dark:text-gray-400 capitalize">{appearance}</span> + <span className="font-semibold capitalize text-gray-600 dark:text-gray-400">{accent}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppearanceTab;
