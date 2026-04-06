import analytics from "../assets/analytics.jpg"
import dataDriven from "../assets/dataDriven.jpg"
import robotHand from "../assets/robothands.jpg"

const data = [
    {
        image: analytics,
        header: "CRM and analytics integrations now live",
        note: "Connect your surveys with CRM, analytics, and reporting tools to centralize responses, automate insights, and improve decision-making across teams.",
        date: "Dec 25"
    },
    {
        image: dataDriven,
        header: "Advanced question logic and automation",
        note: "Build smarter surveys using conditional logic, branching, and automated workflows to collect more accurate and relevant responses.",
        date: "Jan 11"
    },
    {
        image: robotHand,
        header: "Data-driven insights for better decisions",
        note: "Leverage real-time analytics to identify trends, measure engagement, and uncover actionable insights as responses come in.",
        date: "Dec 31"
    },
]

function NewsAndUpdate() {
    return (
        <div className="text-center flex flex-col gap-8 items-center bg-custom-grey px-4 md:px-8 py-10">
            <div className="max-w-2xl mx-auto">
                <h2 className="font-semibold text-2xl md:text-3xl font-zalando-expanded mb-3">News and updates</h2>
                <p className="font-poppins text-base md:text-lg text-gray-600">Stay up-to-date with the latest developments and innovations in the survey world</p>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap justify-evenly gap-6 w-full container">
                {data.map((item, index) => (
                    <div key={index} className="font-poppins flex flex-col gap-3 shadow-md hover:shadow-lg transition-shadow px-3 py-3 w-full md:w-75 justify-start rounded-xl bg-white border border-gray-100 ring-1 ring-gray-200/50">
                        <img className="rounded-lg h-48 w-full object-cover" src={item.image} alt="" />
                        <div className="flex flex-col px-1 items-start text-left gap-2 grow">
                            <p className="text-base font-semibold leading-tight">{item.header}</p>
                            <p className="text-sm text-gray-600">{item.note}</p>
                            <p className="text-xs text-gray-400 mt-auto pt-2">{item.date}</p>
                        </div>
                    </div>

                ))
                }
            </div>
        </div>
    );
}

export default NewsAndUpdate;