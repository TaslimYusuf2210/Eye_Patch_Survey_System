import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import themePictures, { preloadThemeImage } from '@/theme/themePictures';


const DashboardLayout = () => {
    const { picture } = useTheme();

    useEffect(() => {
        if (picture && picture !== 'none') preloadThemeImage(picture as any);
    }, [picture]);

    const selected = picture ? themePictures[picture as keyof typeof themePictures] : themePictures.none;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-poppins transition-colors duration-300">
            <Sidebar />
            <main className="md:ml-64 min-h-screen p-8 relative overflow-hidden">
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

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
