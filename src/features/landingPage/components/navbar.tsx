import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="flex justify-between items-center px-0 py-4 w-full max-w-360 mx-auto">
            <div className="">
                <div className="font-gravitas md:text-xl text-base tracking-wide cursor-pointer">Eye_Patch</div>
            </div>

            <div className="flex-1 md:flex justify-end items-center gap-6 font-poppins hidden ">
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