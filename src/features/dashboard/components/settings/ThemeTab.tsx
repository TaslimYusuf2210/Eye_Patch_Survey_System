import { Check, Sparkles, Save } from 'lucide-react';
import themePictures, { type ThemePictureKey } from '@/theme/themePictures';
import { useTheme } from '@/contexts/ThemeContext';
import {toast} from 'sonner';
import {updateThemePicture} from '@/services/dashboard/settings'

const ThemeTab = () => {
    const { picture, setPicture, accent } = useTheme();
    const isDefaultTheme = accent === 'default';

    async function handleSaveChanges () {
        const payload = { theme_picture: picture };
        console.log('Theme payload:', { theme_picture: picture });
        try {
            // Call API to update theme picture
            await updateThemePicture(payload);
            toast.success("Theme picture updated successfully.");
        } catch (error: any) {
            toast.error(error?.userMessage || "Failed to update theme picture.");
            console.log(error);
        }
    };
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Theme Picture</h3>
                    <p className="text-gray-500 dark:text-slate-400 text-xs">Select an atmospheric background for the main content area. Use "None" to disable.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(['city', 'nature', 'marble', 'none'] as ThemePictureKey[]).map((key) => {
                        const entry = themePictures[key];
                        const isSelected = picture === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setPicture(key)}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left focus:outline-none ${isSelected ? 'border-black dark:border-white ring-1 ring-black dark:ring-white bg-gray-50/50 dark:bg-slate-900/50' : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 hover:bg-gray-50/20'}`}>
                                <div className={`w-20 h-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center`}>
                                    {key === 'none' ? (
                                        <div className="text-xs text-gray-500">No Image</div>
                                    ) : (
                                        <img src={entry.url} alt={key} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{key === 'none' ? 'None' : key}</span>
                                        {isSelected && (
                                            <div className="p-1 rounded-full bg-black dark:bg-white">
                                                <Check className="w-3 h-3 text-white dark:text-black" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{key === 'city' ? 'Urban skyline' : key === 'nature' ? 'Nature landscape' : key === 'marble' ? 'Subtle marble pattern' : 'No background image'}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4">
                    <button
                        onClick={() => setPicture('none')}
                        className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors text-sm text-gray-600 dark:text-slate-400"
                    >
                        Disable Theme Picture
                    </button>
                </div>

                {/* Save Button */}
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
                    <button
                        onClick={handleSaveChanges}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer ${
                            isDefaultTheme
                                ? 'bg-black dark:bg-white text-white dark:text-black'
                                : 'bg-accent-600 text-white'
                        }`}
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Preview</span>
                </div>

                <div className="w-full rounded-2xl border p-3 transition-all duration-300 shadow-md overflow-hidden" style={{ background: 'var(--preview-bg, transparent)' }}>
                    {picture && picture !== 'none' ? (
                        <div className="relative rounded-lg overflow-hidden h-48">
                            <img src={themePictures[picture].url} alt={picture} className="w-full h-full object-cover" />
                            <div style={{ position: 'absolute', inset: 0, backgroundColor: `rgba(0,0,0,${themePictures[picture].overlay})` }} />
                            <div style={{ position: 'absolute', inset: 0, zIndex: 2 }} className="flex items-end p-4">
                                <div className="text-white font-semibold text-sm">{picture}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-48 rounded-lg bg-gray-100 dark:bg-slate-900 flex items-center justify-center text-gray-500">No theme picture selected</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThemeTab;
