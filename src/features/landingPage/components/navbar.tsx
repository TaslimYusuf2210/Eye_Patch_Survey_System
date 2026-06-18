import { Link } from 'react-router-dom';

function Navbar() {
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 flex justify-between items-center px-0 py-4 w-full max-w-360 mx-auto">
            {/* Logo */}
            <div className="font-gravitas md:text-xl text-base tracking-wide cursor-pointer">Eye_Patch</div>

            {/* Nav Links - Center */}
            <div className="hidden md:flex items-center gap-6 font-poppins text-sm">
                <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} className="text-gray-600 hover:text-black transition-colors">Features</a>
                <a href="#impact" onClick={(e) => handleSmoothScroll(e, 'impact')} className="text-gray-600 hover:text-black transition-colors">Impact</a>
                <a href="#compatible" onClick={(e) => handleSmoothScroll(e, 'compatible')} className="text-gray-600 hover:text-black transition-colors">Compatible</a>
                <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')} className="text-gray-600 hover:text-black transition-colors">FAQ</a>
                <a href="#demo" onClick={(e) => handleSmoothScroll(e, 'demo')} className="text-gray-600 hover:text-black transition-colors">Demo</a>
            </div>

            {/* Auth Buttons - Right */}
            <div className="flex items-center gap-3 md:gap-6 font-poppins">
                <Link to="/signup" className="bg-white cursor-pointer text-black px-4 py-2 rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-500 transition-all duration-400">
                    Sign Up
                </Link>
                <Link to="/login" className="bg-black cursor-pointer text-white px-4 py-2 rounded-full text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-950 hover:border-gray-50 transition-all duration-400">
                    Login
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;