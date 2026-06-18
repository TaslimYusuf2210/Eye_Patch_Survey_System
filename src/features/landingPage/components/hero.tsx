import survey from "../../../assets/survey.svg"

function Hero() {
    return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] pt-0 px-4 md:px-8 pb-10">
            <div className="text-center max-w-4xl space-y-4 mx-auto">
                <h1 className="font-bold text-5xl font-zalando-expanded leading-tight">Control your insights <br className="hidden md:block" /> like never before</h1>
                <p className="font-medium text-base md:text-lg font-poppins text-gray-600 max-w-2xl mx-auto">
                    Real-time responses, advanced analytics, and seamless survey management – all in one powerful platform
                </p>
            </div>
            <img className="w-full max-w-lg h-auto mt-10 md:mt-20 lg:mt-10 object-contain" src={survey} alt="hero" />
        </div>
    );
}

export default Hero;