import { Link } from "react-router-dom";

interface BreadCrumbsData {
    label: string,
    path: string,
}

function BreadCrumbs({ data }: { data: BreadCrumbsData[] }) {
    const lastItem = data[data.length - 1];
    return ( 
        <div className="flex items-center gap-2 mb-4">
            {data.map((item: BreadCrumbsData, index:number) => (
                <div key={index} className="flex items-center gap-2">
                    <Link
                        to={item.path}
                        className={`text-[#7E90B2] ${lastItem.path === item.path ? 'text-[#001F5B] font-semibold' : 'hover:text-[#001F5B]'}`}
                    >
                        {item.label}
                    </Link>

                    {index !== data.length - 1 && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24">
                            <path fill="#000" fill-rule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414" />
                        </svg>
                    )}
                </div>
            ))}
        </div>
     );
}

export default BreadCrumbs;