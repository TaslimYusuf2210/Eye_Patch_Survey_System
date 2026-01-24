const data = [
    {
        image: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M64 384h384v-42.67H64Zm0-106.67h384v-42.66H64ZM64 128v42.67h384V128Z"/></svg>,
        header: "CRM and analytics integrations now live",
        note: "Connect your surveys with CRM, analytics, and reporting tools to centralize responses, automate insights, and improve decision-making across teams.",
        date: "Dec 25"
    },
    {
        image: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M64 384h384v-42.67H64Zm0-106.67h384v-42.66H64ZM64 128v42.67h384V128Z"/></svg>,
        header: "Advanced question logic and automation",
        note: "Build smarter surveys using conditional logic, branching, and automated workflows to collect more accurate and relevant responses.",
        date: "Jan 11"
    },
    {
        image: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M64 384h384v-42.67H64Zm0-106.67h384v-42.66H64ZM64 128v42.67h384V128Z"/></svg>,
        header: "Data-driven insights for better decisions",
        note: "Leverage real-time analytics to identify trends, measure engagement, and uncover actionable insights as responses come in.",
        date: "Dec 31"
    },
]

function NewsAndUpdate() {
    return ( 
        <div className="text-center flex flex-col items-center py-15">
            <div className="max-w-130">
                <h2 className="font-semibold text-3xl font-zalando-expanded">News and updates</h2>
                <p className="font-poppins text-lg">Stay up-to-date with the latest developments and innovations in the survey world</p>
            </div>
            <div>
                <div className="font-poppins flex flex-col gap-2 shadow-lg px-2 p-1 w-60 justify-center rounded-md bg-white">
                    <img className="border border-black rounded-md"  alt="" />
                    <div className="flex flex-col px-2 items-start text-left gap-3 ">
                        <p className="text-sm font-medium">CRM and analytics integrations now live</p>
                        <p className="text-xs">Connect your surveys with CRM, analytics, and reporting tools to centralize responses, automate insights, and improve decision-making across teams.</p>
                        <p className="text-xs">Dec 24</p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default NewsAndUpdate;