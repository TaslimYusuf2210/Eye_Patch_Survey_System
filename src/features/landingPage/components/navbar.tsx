import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isBelowMd, setIsBelowMd] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        setIsBelowMd(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsBelowMd(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'Impact', href: '#impact' },
        { label: 'Compatible', href: '#compatible' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Demo', href: '#demo' },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 flex justify-between items-center px-0 py-4 w-full max-w-360 mx-auto relative">
                {/* Logo */}
                <div className="font-gravitas md:text-xl text-base tracking-wide cursor-pointer">Eye_Patch</div>

                {/* Desktop Nav Links - Perfectly centered (lg screens only) */}
                <div className="hidden lg:flex items-center gap-6 font-poppins text-sm absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} onClick={(e) => handleSmoothScroll(e, link.href.slice(1))} className="text-gray-600 hover:text-black transition-colors">{link.label}</a>
                    ))}
                </div>

                {/* Right side: Auth buttons + Menu */}
                <div className="flex items-center gap-6 ml-auto">
                    {/* Auth Buttons (md screens and above) */}
                    <div className="hidden md:flex items-center gap-6 font-poppins">
                        <Link to="/signup" className="bg-white cursor-pointer text-black px-4 py-2 rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-500 transition-all duration-400">
                            Sign Up
                        </Link>
                        <Link to="/login" className="bg-black cursor-pointer text-white px-4 py-2 rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-950 hover:border-gray-50 transition-all duration-400">
                            Login
                        </Link>
                    </div>

                    {/* Hamburger Menu Button (below lg screens) */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="lg:hidden flex items-center cursor-pointer text-gray-700 hover:text-black transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay (below lg screens) */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-50 lg:hidden"
                    onClick={() => setMenuOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Slide-in Panel */}
                    <div
                        className="absolute top-0 right-0 h-full w-[80vw] bg-white shadow-xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Panel Header */}
                        <div className="flex items-center justify-end px-6 py-4 border-b border-gray-200">
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="cursor-pointer text-gray-700 hover:text-black transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <div className="flex flex-col gap-1 px-6 pt-6 font-poppins">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleSmoothScroll(e, link.href.slice(1))}
                                    className="text-gray-700 hover:text-black text-lg py-3 border-b border-gray-100 transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Auth Buttons in slide panel (only below md screens) */}
                        {isBelowMd && (
                            <div className="flex flex-col gap-3 px-6 mt-auto pb-10">
                                <Link
                                    to="/signup"
                                    onClick={() => setMenuOpen(false)}
                                    className="w-full text-center bg-white cursor-pointer text-black px-4 py-3 rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-500 transition-all duration-400"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="w-full text-center bg-black cursor-pointer text-white px-4 py-3 rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-950 transition-all duration-400"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;