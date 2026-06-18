import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import themePictures, { preloadThemeImage } from '@/theme/themePictures';
import { useAuth } from '@/contexts/AuthContext';
import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";

const DashboardLayout = () => {
    const { picture } = useTheme();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isTabletToggled, setIsTabletToggled] = useState(false);
    const [isTabletHovered, setIsTabletHovered] = useState(false);
    const { loading } = useAuth();

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
            <div className="w-screen h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-poppins transition-colors duration-300">
                <LineSpinner 
                size="40" 
                stroke="3" 
                speed="1" 
                color="black"
                />
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
            
            <main className="ml-0 md:ml-16 lg:ml-64 min-h-screen p-8 relative overflow-hidden flex flex-col transition-all duration-300 ease-in-out">
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
