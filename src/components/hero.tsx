import survey from "../assets/survey.svg"

function Hero() {
    return ( 
        <div className="flex flex-col justify-center items-center min-h-screen pt-10">
            <div className="text-center max-w-150 space-y-6">
                <h1 className="font-bold text-5xl font-zalando-expanded">Control your insights <br className="hidden lg:block" /> like never before</h1>
                <p className="font-medium text-lg font-poppins">
                    Real-time responses, advanced analytics, and seamless survey management – all in one powerful platform
                </p>
            </div>
            <img className=" h-70 w-100 mt-20" src={survey} alt="hero" />
        </div>
     );
}

export default Hero;