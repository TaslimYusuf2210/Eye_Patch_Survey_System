import { useState } from 'react';
import { useTheme, type Appearance } from '../../../contexts/ThemeContext';
import { type AccentColor } from '../../../types';
import { Sun, Moon, Check, Sparkles, RotateCcw, Ban, Camera, Upload, Trash2, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import themePictures, { type ThemePictureKey } from '@/theme/themePictures';

const baseModes = [
    { id: 'light' as Appearance, name: 'Light Mode', icon: Sun, description: 'Crisp and easy on the eyes' },
    { id: 'dark' as Appearance, name: 'Dark Mode', icon: Moon, description: 'Easy for low-light environments' }
];

const colorAccents = [
    { id: 'blue' as AccentColor, name: 'Ocean Blue', colorClass: 'bg-blue-600', activeClass: 'text-blue-600' },
    { id: 'green' as AccentColor, name: 'Forest Green', colorClass: 'bg-emerald-600', activeClass: 'text-emerald-600' },
    { id: 'red' as AccentColor, name: 'Crimson Red', colorClass: 'bg-rose-600', activeClass: 'text-rose-600' },
    { id: 'purple' as AccentColor, name: 'Royal Purple', colorClass: 'bg-purple-600', activeClass: 'text-purple-600' }
];

const SettingsView = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { appearance, accent, setAppearance, setAccent, picture, setPicture, textTitle, textSubtitle } = useTheme();
    const { user, signOut } = useAuth();

    const isDefaultTheme = accent === 'default';

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'billing', label: 'Account & Billing' },
        { id: 'appearance', label: 'Global Appearance' },
        { id: 'theme', label: 'Theme Picture' },
    ];

    // Dynamic classes based on accent colors (for preview)
    const getAccentBgClass = (color: AccentColor) => {
        switch (color) {
            case 'green': return 'bg-emerald-600';
            case 'red': return 'bg-rose-600';
            case 'purple': return 'bg-purple-600';
            case 'blue': return 'bg-blue-600';
            default: return 'bg-gray-600';
        }
    };

    const getPreviewAccentTextClass = () => {
        if (isDefaultTheme) return 'text-gray-600';
        const found = colorAccents.find(a => a.id === accent);
        return found?.activeClass ?? 'text-gray-600';
    };

    const handleSelectDefault = () => {
        setAccent('default');
    };

    const handleSetAppearance = (mode: Appearance) => {
        if (isDefaultTheme) {
            setAccent('blue');
        }
        setAppearance(mode);
    };

    return (
        <div className="">
            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>Settings </h1>
                <p className={`${textSubtitle} text-sm mt-1`}>Manage your account settings and preferences.</p>
            </div>

            {/* Horizontal Tabs */}
            <div className="border-b border-gray-200 dark:border-slate-800 mb-6">
                <div className="flex items-center gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-sm font-medium transition-all relative ${
                                activeTab === tab.id
                                    ? `${textTitle} font-semibold`
                                    : 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200'
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${textTitle.includes('text-white') ? 'bg-white' : 'bg-slate-900 dark:bg-white'}`}></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-900 shadow-sm min-h-[400px] p-8 transition-colors duration-300">
                <div className="mb-6 pb-6 border-b border-gray-100 dark:border-slate-900">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {tabs.find(t => t.id === activeTab)?.label}
                    </h2>
                </div>

                {activeTab === 'appearance' ? (
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
                                    {/* Neutral swatch strip */}
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
                            
                            {/* Live Dynamic Preview Mockup Container */}
                            <div className={`w-full rounded-2xl border p-5 transition-all duration-300 shadow-md ${
                                appearance === 'dark' 
                                    ? 'bg-slate-950 border-slate-900 text-slate-100' 
                                    : 'bg-gray-50 border-gray-150 text-gray-800'
                            }`}>
                                <div className="space-y-4">
                                    {/* Mockup Header */}
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

                                    {/* Mockup Content Panel */}
                                    <div className="space-y-3">
                                        {/* Greeting & Active Action Button */}
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <div className={`h-3 w-20 rounded ${appearance === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`} />
                                                <div className={`h-2 w-28 rounded ${appearance === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`} />
                                            </div>
                                            {/* Accent colored active button */}
                                            <div className={`h-6 w-16 rounded-md shadow-sm ${getAccentBgClass(accent)} flex items-center justify-center text-[8px] font-bold text-white uppercase tracking-wider`}>
                                                Action
                                            </div>
                                        </div>

                                        {/* Mock Grid */}
                                        <div className="grid grid-cols-2 gap-2.5">
                                            {/* Card 1 */}
                                            <div className={`p-3 rounded-xl border ${
                                                appearance === 'dark' ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-gray-200/60'
                                            } space-y-2`}>
                                                <div className="flex items-center justify-between">
                                                    <div className={`h-2.5 w-10 rounded ${appearance === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`} />
                                                    {/* Accent highlighted indicator */}
                                                    <div className={`w-1.5 h-1.5 rounded-full ${getAccentBgClass(accent)}`} />
                                                </div>
                                                <div className={`h-4 w-12 rounded ${appearance === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`} />
                                            </div>

                                            {/* Card 2 */}
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

                                        {/* Mock chart/data list */}
                                        <div className={`p-3 rounded-xl border ${
                                            appearance === 'dark' ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-gray-200/60'
                                        } space-y-2`}>
                                            <div className="flex items-center justify-between">
                                                <div className={`h-2.5 w-16 rounded ${appearance === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`} />
                                                <span className={`text-[8px] font-bold ${getPreviewAccentTextClass()}`}>View details</span>
                                            </div>
                                            {/* Visual Progress Bar filled with active accent */}
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
                ) : activeTab === 'theme' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-7 space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Theme Picture</h3>
                                <p className="text-gray-500 dark:text-slate-400 text-xs">Select an atmospheric background for the main content area. Use "None" to disable.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {(['city','nature','marble','none'] as ThemePictureKey[]).map((key) => {
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
                        </div>

                        <div className="lg:col-span-5 space-y-3">
                            <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-xs font-semibold uppercase tracking-wider">Preview</span>
                            </div>

                            <div className="w-full rounded-2xl border p-3 transition-all duration-300 shadow-md overflow-hidden" style={{background: 'var(--preview-bg, transparent)'}}>
                                {picture && picture !== 'none' ? (
                                    <div className="relative rounded-lg overflow-hidden h-48">
                                        <img src={themePictures[picture].url} alt={picture} className="w-full h-full object-cover" />
                                        <div style={{position: 'absolute', inset: 0, backgroundColor: `rgba(0,0,0,${themePictures[picture].overlay})`}} />
                                        <div style={{position: 'absolute', inset: 0, zIndex: 2}} className="flex items-end p-4">
                                            <div className="text-white font-semibold text-sm">{picture}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-48 rounded-lg bg-gray-100 dark:bg-slate-900 flex items-center justify-center text-gray-500">No theme picture selected</div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'profile' ? (
                    <div className="space-y-8">
                        {/* ─────── Avatar Section ─────── */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-gray-100 dark:border-slate-900">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
                                    <img
                                        src="https://ui-avatars.com/api/?name=Indra+Lesmana&background=random"
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera size={22} className="text-white" />
                                    <input type="file" accept="image/*" className="hidden" />
                                </label>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Profile Picture</h3>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Click the camera icon to upload a new avatar. Square images work best.</p>
                            </div>
                        </div>

                        {/* ─────── Account Information ─────── */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Account Information</h3>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Update your profile details and email address.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-700 dark:text-slate-300">Email</label>
                                    <div className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 text-sm text-gray-500 dark:text-slate-400 cursor-not-allowed">
                                        {user?.email || "user@example.com"}
                                    </div>
                                    <p className="text-[10px] text-gray-400">Email cannot be changed.</p>
                                </div>

                                {/* Username */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-700 dark:text-slate-300">Username</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            defaultValue={user?.userName || ""}
                                            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                                            placeholder="Your username"
                                        />
                                        <button className="px-4 py-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ─────── Change Password ─────── */}
                        <div className="space-y-6 pb-8 border-b border-gray-100 dark:border-slate-900">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Change Password</h3>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Ensure your account is secure with a strong password.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {['New Password', 'Confirm Password'].map((field) => (
                                    <div key={field} className="space-y-1.5">
                                        <label className="text-xs font-medium text-gray-700 dark:text-slate-300">{field}</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="px-5 py-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer">
                                Update Password
                            </button>
                        </div>

                        {/* ─────── Delete Account ─────── */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">Delete Account</h3>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Permanently remove your account and all associated data. This action cannot be undone.</p>
                            </div>
                            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer">
                                <Trash2 size={16} />
                                Delete my account
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-full mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-gray-900 dark:text-white font-medium mb-1">Feature coming soon</h3>
                        <p className="text-gray-500 text-sm max-w-sm">
                            We are currently working on this feature. Check back later for updates.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsView;
