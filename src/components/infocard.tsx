import { useState } from "react";

interface InfoCardProps {
    mainText: string;
    image: string;
    note: string;
}

function InfoCard({mainText, image, note}:InfoCardProps) {
    const [hover, setHover] = useState(false)
    return ( 
        <div className="inline-block">
            <span onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} className="underline decoration-2 underline-offset-2 hover:bg-black hover:text-white hover:decoration-white transition duration-300 hover:underline-white cursor-pointer">{mainText}</span>
            {hover === true &&
                <div className="flex flex-col gap-2 shadow-lg absolute p-1 justify-center w-50 rounded-md bg-white">
                    <img className="border border-black rounded-md" src={image} alt="" />
                    <div className="flex flex-col gap-3 pl-3 pr-6">
                        <span className="text-sm">{note}</span>
                        <button className="flex justify-start gap-2 items-center"> 
                            <span className="font-medium text-sm">Show more</span>
                            <svg className="rotate-90" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7 6.987a.75.75 0 1 1-1.06 1.061L12.751 4.81L12.762 21a.75.75 0 0 1-1.5.002l-.01-16.194l-5.722 5.711a.75.75 0 1 1-1.06-1.061z" clip-rule="evenodd"/></svg>
                        </button>
                    </div>
                </div>
            }
        </div>
     );
}

export default InfoCard;