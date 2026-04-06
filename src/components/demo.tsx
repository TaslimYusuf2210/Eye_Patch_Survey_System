function Demo() {
    return ( 
        <div className="px-4 md:px-8 lg:px-16 mt-20 mb-10">
            <div className="bg-black rounded-3xl text-white p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                <div className="flex flex-col gap-4 text-center md:text-left max-w-2xl">
                    <h2 className="text-xl md:text-2xl font-zalando-expanded leading-tight">
                        Turn feedback into growth.
                    </h2>
                    <p className="text-lg font-poppins text-gray-300 font-light">
                        Boost satisfaction, retention, and revenue with smarter surveys
                    </p>
                </div>
                <div className="shrink-0">
                    <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                        <a href="mailto:taslimyusuf777@gmail.com" className="text-xl font-poppins font-medium flex items-center gap-2">
                            <span className="text-base">Get a Demo</span>
                            <span className="bg-white text-black text-sm px-3 py-1 rounded-full">taslimyusuf777@gmail.com</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Demo;