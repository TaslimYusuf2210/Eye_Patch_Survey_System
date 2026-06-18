import { useState, useRef } from "react";
import type { InfoCardProps } from "@/types/landingPage";

function InfoCard({ mainText, image, note }: InfoCardProps) {
    const [hover, setHover] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setHover(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setHover(false);
        }, 200);
    };

    return (
        <div
            className="inline-block relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="underline decoration-2 underline-offset-2 hover:bg-black hover:text-white hover:decoration-white transition duration-300 hover:underline-white cursor-pointer px-1 rounded-sm">
                {mainText}
            </span>
            {hover && (
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="flex flex-col gap-2 shadow-xl absolute z-50 p-3 justify-center w-64 rounded-xl bg-white bottom-full left-1/2 -translate-x-1/2 mb-3 border border-gray-100"
                >
                    <img className="border border-gray-100 rounded-lg w-full h-32 object-cover" src={image} alt={mainText} />
                    <div className="flex flex-col gap-2 px-1">
                        <span className="text-sm text-gray-700 leading-snug">{note}</span>
                        <button className="flex justify-start gap-2 items-center text-black hover:text-gray-600 transition-colors mt-1 group">
                            <span className="font-medium text-xs uppercase tracking-wide group-hover:mr-1 transition-all">Show more</span>
                            <svg className="rotate-90 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7 6.987a.75.75 0 1 1-1.06 1.061L12.751 4.81L12.762 21a.75.75 0 0 1-1.5.002l-.01-16.194l-5.722 5.711a.75.75 0 1 1-1.06-1.061z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white drop-shadow-sm"></div>
                </div>
            )}
        </div>
    );
}

export default InfoCard;