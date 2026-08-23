import { Trash2, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import type { UserProfile } from '@/types/common';
import { useUpdateUserName, useUpdateAvatar, useDeleteAccount, useUpdatePassword } from '@/hooks/useMutation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DotSpinner } from 'ldrs/react'
import 'ldrs/react/DotSpinner.css'
import { toast } from 'sonner'
import { MutationOverlay } from '@/components/ui/mutation-overlay'


const usernameSchema = yup.object().shape({
    userName: yup.string().required('Username is required'),
});

const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
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
    user: UserProfile | null;
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
        defaultValues: { userName: user?.user_name || '' },
    });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        reset: resetPassword,
        formState: { errors: passwordErrors },
    } = useForm<{ currentPassword: string; newPassword: string; confirmPassword: string }>({
        resolver: yupResolver(passwordSchema),
    });

    const updateUserNameMutation = useUpdateUserName();
    const updateAvatarMutation = useUpdateAvatar();
    const deleteAccountMutation = useDeleteAccount();
    const updatePasswordMutation = useUpdatePassword();

    const [avatarLoading, setAvatarLoading] = useState(false);
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [showCurrentPwd, setShowCurrentPwd] = useState(false);
    const [showNewPwd, setShowNewPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteCode] = useState(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    });
    const [typedCode, setTypedCode] = useState('');

    async function handleUsernameChange(data: { userName: string }) {
        if (data.userName === user?.user_name) {
            toast.error('New username cannot be the same as the current username.');
            return;
        }
        setUsernameLoading(true);
        updateUserNameMutation.mutate(
            { userName: data.userName },
            { onSettled: () => setUsernameLoading(false) }
        );
    }

    async function handleAvatarChange(newAvatar: string | null) {
        if(!newAvatar) {
            toast.error('Please select an avatar before confirming the change.');
            return;
        }
        setAvatarLoading(true);
        updateAvatarMutation.mutate(
            { avatarUrl: newAvatar },
            { onSettled: () => setAvatarLoading(false) }
        );
    }

    async function handlePasswordChange(data: { currentPassword: string; newPassword: string; confirmPassword: string }) {
        const payload = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        }
        updatePasswordMutation.mutate(payload, {
            onSuccess: () => resetPassword(),
        });
    }

    async function handleAccountDeletion() {
        deleteAccountMutation.mutate(undefined, {
            onSuccess: () => setDeleteDialogOpen(false),
        });
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
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-6 p-4 rounded-xl bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
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
                    disabled={avatarLoading}
                    className={`px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2 ${
                        avatarLoading ? 'opacity-60 cursor-not-allowed' : ''
                    } ${
                        isDefaultTheme
                            ? 'bg-black dark:bg-white text-white dark:text-black'
                            : 'bg-accent-600 text-white'
                    }`}>
                        {avatarLoading ? (
                            <DotSpinner size="18" speed="0.9" color="currentColor" />
                        ) : (
                            'Confirm Change'
                        )}
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
                            {user?.email || "Unable to fetch user email."}
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
                                disabled={usernameLoading}
                                className={`px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2 ${
                                    usernameLoading ? 'opacity-60 cursor-not-allowed' : ''
                                } ${
                                    isDefaultTheme
                                        ? 'bg-black dark:bg-white text-white dark:text-black'
                                        : 'bg-accent-600 text-white'
                                }`}
                            >
                                {usernameLoading ? (
                                    <DotSpinner size="18" speed="0.9" color="currentColor" />
                                ) : (
                                    'Save'
                                )}
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-700 dark:text-slate-300">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showCurrentPwd ? "text" : "password"}
                                    {...registerPassword('currentPassword')}
                                    className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 transition-all ${
                                        passwordErrors.currentPassword
                                            ? 'border-red-500 focus:ring-red-500'
                                            : isDefaultTheme
                                                ? 'border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-black dark:focus:ring-white'
                                                : 'border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-accent-600'
                                    }`}
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowCurrentPwd(!showCurrentPwd)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer">
                                    {showCurrentPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {passwordErrors.currentPassword && (
                                <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword.message}</p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-700 dark:text-slate-300">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNewPwd ? "text" : "password"}
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
                                <button type="button" onClick={() => setShowNewPwd(!showNewPwd)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer">
                                    {showNewPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {passwordErrors.newPassword && (
                                <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword.message}</p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-700 dark:text-slate-300">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPwd ? "text" : "password"}
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
                                <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer">
                                    {showConfirmPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
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
                <button
                    onClick={() => setDeleteDialogOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                >
                    <Trash2 size={16} />
                    Delete my account
                </button>
            </div>

            {/* ─────── Delete Confirmation Dialog ─────── */}
            <Dialog open={deleteDialogOpen} onOpenChange={(open) => { setDeleteDialogOpen(open); if (!open) setTypedCode(''); }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                            <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">Delete Account</DialogTitle>
                        </div>
                        <DialogDescription className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                            This action is <span className="font-semibold text-red-600 dark:text-red-400">permanent and cannot be undone</span>. 
                            All your surveys, responses, and account data will be deleted immediately.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-slate-300">
                            Please type <span className="font-mono font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded">{deleteCode}</span> below to confirm.
                        </p>
                        <input
                            type="text"
                            value={typedCode}
                            onChange={(e) => setTypedCode(e.target.value)}
                            placeholder="Enter the code above"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        />
                        <div className="flex items-center gap-3 justify-end">
                            <button
                                onClick={() => { setDeleteDialogOpen(false); setTypedCode(''); }}
                                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAccountDeletion}
                                disabled={typedCode !== deleteCode}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Trash2 size={16} />
                                Delete my account
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <MutationOverlay
                isPending={updateUserNameMutation.isPending || updateAvatarMutation.isPending || deleteAccountMutation.isPending || updatePasswordMutation.isPending}
                message={
                    updateUserNameMutation.isPending ? 'Updating username...' :
                    updateAvatarMutation.isPending ? 'Updating avatar...' :
                    deleteAccountMutation.isPending ? 'Deleting account...' :
                    'Updating password...'
                }
            />
        </div>
    );
};

export default ProfileTab;
