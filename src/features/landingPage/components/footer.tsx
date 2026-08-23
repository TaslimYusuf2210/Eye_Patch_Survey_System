function Footer() {
    return (
        <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start gap-10">

                {/* Logo Section */}
                <div className="flex flex-col gap-4">
                    <div className="font-gravitas text-xl">Eye_Patch</div>
                    <div className="flex gap-4 mt-2">
                        {/* Social Placeholders if needed */}
                        <a href="#" className="font-poppins text-sm text-gray-500 hover:text-black">x.com</a>
                        <a href="#" className="font-poppins text-sm text-gray-500 hover:text-black">facebook.com</a>
                    </div>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 w-full font-poppins lg:grid-cols-4 lg:w-auto lg:gap-x-20">

                    {/* Column 1 */}
                    <div className="flex flex-col gap-3">
                        {/* Placeholder links provided in architecture or standard ones */}
                        <span className="font-medium mb-1">Solutions</span>
                        <a href="#" className="text-gray-500 hover:text-black">Services</a>
                        <a href="#" className="text-gray-500 hover:text-black">Products</a>
                        <a href="#" className="text-gray-500 hover:text-black">Case Studies</a>
                        <a href="#" className="text-gray-500 hover:text-black">Pricing</a>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-3">
                        <span className="font-medium mb-1">About Us</span>
                        <a href="#" className="text-gray-500 hover:text-black">Blog</a>
                        <a href="#" className="text-gray-500 hover:text-black">News</a>
                        <a href="#" className="text-gray-500 hover:text-black">FAQ</a>
                        <a href="#" className="text-gray-500 hover:text-black">Support</a>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-3">
                        <span className="font-medium mb-1">Contact Us</span>
                        <a href="#" className="text-gray-500 hover:text-black">Locations</a>
                    </div>

                    {/* Column 4 - Legal */}
                    <div className="flex flex-col gap-3">
                        <span className="font-medium mb-1">Terms of Service</span>
                        <a href="#" className="text-gray-500 hover:text-black">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-black">Cookies Policy</a>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
