import { Trash2 } from 'lucide-react';
import type { Profile } from '@/types/common';
import { updateUserName, updateAvatar } from '@/services/dashboard/settings';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';

const usernameSchema = yup.object().shape({
    userName: yup.string().required('Username is required'),
});

const passwordSchema = yup.object().shape({
    newPassword: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your password'),
});

interface ProfileTabProps {
    selectedAvatar: string | null;
    setSelectedAvatar: (avatar: string) => void;
    avatarOptions: string[];
    user: Profile | null;
    isDefaultTheme: boolean;
    textTitle: string;
    textSubtitle: string;
}

const ProfileTab = ({
    selectedAvatar,
    setSelectedAvatar,
    avatarOptions,
    user,
    isDefaultTheme,
    textTitle,
    textSubtitle,
}: ProfileTabProps) => {
    const {
        register: registerUsername,
        handleSubmit: handleSubmitUsername,
        formState: { errors: usernameErrors },
    } = useForm<{ userName: string }>({
        resolver: yupResolver(usernameSchema),
        defaultValues: { userName: user?.userName || '' },
    });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: passwordErrors },
    } = useForm<{ newPassword: string; confirmPassword: string }>({
        resolver: yupResolver(passwordSchema),
    });

    async function handleUsernameChange(data: { userName: string }) {
        try {
            await updateUserName({ userName: data.userName });
            toast.success('Username updated successfully!');
        } catch (error) {
            console.error('Error updating username:', error);
            toast.error('Failed to update username.');
        }
    }

    async function handleAvatarChange(newAvatar: string | null) {
        try {
            await updateAvatar({ avatar: newAvatar });
            toast.success('Avatar updated successfully!');
        } catch (error) {
            console.error('Error updating avatar:', error);
            toast.error('Failed to update Avatar');
        }
    }

    async function handlePasswordChange(data: { newPassword: string; confirmPassword: string }) {
        try {
            // TODO: Call update password endpoint
            console.log('Password data:', data);
            toast.success('Password updated successfully!');
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error('Failed to update password.');
        }
    }

    return (
        <div className="space-y-8">
            {/* ─────── Avatar Selection ─────── */}
            <div className="pb-8 border-b border-gray-100 dark:border-slate-900">
                <div className="mb-5">
                    <h3 className={`text-sm font-semibold ${textTitle}`}>Profile Picture</h3>
                    <p className={`text-xs ${textSubtitle} mt-1`}>Choose an avatar from the options below.</p>
                </div>

                {/* Preview */}
                <div className="flex items-center gap-5 mb-6 p-4 rounded-xl bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 dark:border-slate-700 shrink-0 flex items-center justify-center bg-gray-100 dark:bg-slate-800">
                        {selectedAvatar ? (
                            <img src={selectedAvatar} alt="Selected avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xs text-gray-400 dark:text-slate-500 text-center px-2">No avatar selected</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <p className={`text-sm font-medium ${textTitle}`}>Avatar preview</p>
                        <p className={`text-xs ${textSubtitle} mt-0.5`}>This is how your avatar will appear.</p>
                    </div>
                    <button 
                    onClick={() => handleAvatarChange(selectedAvatar)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer ${
                        isDefaultTheme
                            ? 'bg-black dark:bg-white text-white dark:text-black'
                            : 'bg-accent-600 text-white'
                    }`}>
                        Confirm Change
                    </button>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                    {avatarOptions.map((avatar, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedAvatar(avatar)}
                            className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                                selectedAvatar === avatar
                                    ? isDefaultTheme
                                        ? 'border-black dark:border-white ring-2 ring-black/10 dark:ring-white/20 scale-110'
                                        : 'border-accent-600 ring-2 ring-accent-600/20 scale-110'
                                    : 'border-gray-200 dark:border-slate-800 hover:border-gray-400 dark:hover:border-slate-600'
                            }`}
                        >
                            <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* ─────── Account Information ─────── */}
            <div className="space-y-6">
                <div>
                    <h3 className={`text-sm font-semibold ${textTitle}`}>Account Information</h3>
                    <p className={`text-xs ${textSubtitle} mt-1`}>Update your profile details.</p>
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
                    <form onSubmit={handleSubmitUsername(handleUsernameChange)} className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-700 dark:text-slate-300">Username</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                {...registerUsername('userName')}
                                className={`flex-1 px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 transition-all ${
                                    usernameErrors.userName
                                        ? 'border-red-500 focus:ring-red-500'
                                        : isDefaultTheme
                                            ? 'border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-black dark:focus:ring-white'
                                            : 'border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-accent-600'
                                }`}
                                placeholder="Your username"
                            />
                            <button
                                type="submit"
                                className={`px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer ${
                                    isDefaultTheme
                                        ? 'bg-black dark:bg-white text-white dark:text-black'
                                        : 'bg-accent-600 text-white'
                                }`}
                            >
                                Save
                            </button>
                        </div>
                        {usernameErrors.userName && (
                            <p className="text-red-500 text-xs mt-1">{usernameErrors.userName.message}</p>
                        )}
                    </form>
                </div>
            </div>

            {/* ─────── Change Password ─────── */}
            <div className="space-y-6 pb-8 border-b border-gray-100 dark:border-slate-900">
                <div>
                    <h3 className={`text-sm font-semibold ${textTitle}`}>Change Password</h3>
                    <p className={`text-xs ${textSubtitle} mt-1`}>Ensure your account is secure with a strong password.</p>
                </div>

                <form onSubmit={handleSubmitPassword(handlePasswordChange)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-700 dark:text-slate-300">New Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    {...registerPassword('newPassword')}
                                    className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 transition-all ${
                                        passwordErrors.newPassword
                                            ? 'border-red-500 focus:ring-red-500'
                                            : isDefaultTheme
                                                ? 'border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-black dark:focus:ring-white'
                                                : 'border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-accent-600'
                                    }`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {passwordErrors.newPassword && (
                                <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword.message}</p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-700 dark:text-slate-300">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    {...registerPassword('confirmPassword')}
                                    className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 transition-all ${
                                        passwordErrors.confirmPassword
                                            ? 'border-red-500 focus:ring-red-500'
                                            : isDefaultTheme
                                                ? 'border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-black dark:focus:ring-white'
                                                : 'border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-accent-600'
                                    }`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {passwordErrors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`mt-5 px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer ${
                            isDefaultTheme
                                ? 'bg-black dark:bg-white text-white dark:text-black'
                                : 'bg-accent-600 text-white'
                        }`}
                    >
                        Update Password
                    </button>
                </form>
            </div>

            {/* ─────── Delete Account ─────── */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">Delete Account</h3>
                    <p className={`text-xs ${textSubtitle} mt-1`}>Permanently remove your account and all associated data. This action cannot be undone.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer">
                    <Trash2 size={16} />
                    Delete my account
                </button>
            </div>
        </div>
    );
};

export default ProfileTab;
