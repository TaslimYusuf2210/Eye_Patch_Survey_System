import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import themePictures, { preloadThemeImage } from '@/theme/themePictures';
import { useProfile } from '@/hooks/useQuery/useProfile';
const DashboardLayout = () => {
    const { picture } = useTheme();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isTabletToggled, setIsTabletToggled] = useState(false);
    const [isTabletHovered, setIsTabletHovered] = useState(false);
    const { isLoading: loading } = useProfile();

    useEffect(() => {
        if (picture && picture !== 'none') preloadThemeImage(picture as any);
    }, [picture]);

    // Viewport Resizing Clean-up
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                // If transitioning to tablet/desktop width, safely close the mobile drawer
                setIsMobileOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Scroll Lock for Mobile Drawer
    useEffect(() => {
        if (isMobileOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Clean up scroll lock on component unmount
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isMobileOpen]);

    const selected = picture ? themePictures[picture as keyof typeof themePictures] : themePictures.none;

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-poppins transition-colors duration-300 animate-pulse">
                {/* Sidebar skeleton */}
                <div className="fixed left-0 top-0 h-screen w-16 lg:w-64 bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-900 hidden md:flex flex-col p-4 gap-6">
                    <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-20 lg:w-28" />
                    <div className="space-y-3 mt-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="h-5 w-5 bg-gray-200 dark:bg-slate-800 rounded shrink-0" />
                                <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-24 hidden lg:block" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main area skeleton */}
                <div className="ml-0 md:ml-16 lg:ml-64 min-h-screen p-3 sm:p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
                        {/* Header skeleton */}
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 bg-gray-200 dark:bg-slate-800 rounded-full" />
                            <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded w-40" />
                        </div>
                        <div className="h-8 w-8 bg-gray-200 dark:bg-slate-800 rounded-full" />
                    </div>

                    {/* Content skeleton */}
                    <div className="space-y-6">
                        <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded w-56" />
                        <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-96" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
                                    <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-3/4 mb-4" />
                                    <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-full mb-3" />
                                    <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-5/6 mb-4" />
                                    <div className="flex items-center gap-4">
                                        <div className="h-8 w-16 bg-gray-200 dark:bg-slate-800 rounded-full" />
                                        <div className="h-8 w-16 bg-gray-200 dark:bg-slate-800 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-poppins transition-colors duration-300">
            <Sidebar 
                isMobileOpen={isMobileOpen}
                onCloseMobile={() => setIsMobileOpen(false)}
                isTabletToggled={isTabletToggled}
                setIsTabletToggled={setIsTabletToggled}
                isTabletHovered={isTabletHovered}
                setIsTabletHovered={setIsTabletHovered}
            />
            
            <main className="ml-0 md:ml-16 lg:ml-64 min-h-screen p-3 sm:p-6 lg:p-8 relative overflow-hidden flex flex-col transition-all duration-300 ease-in-out">
                {picture && picture !== 'none' && selected.url && (
                    <div
                        aria-hidden
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${selected.url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            zIndex: 0,
                        }}
                    />
                )}

                {picture && picture !== 'none' && (
                    <div
                        aria-hidden
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: `rgba(0,0,0,${selected.overlay})`,
                            zIndex: 1,
                        }}
                    />
                )}

                <div style={{ position: 'relative', zIndex: 2 }} className="flex-1 flex flex-col">
                    <Header onOpenMobile={() => setIsMobileOpen(true)} />
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
