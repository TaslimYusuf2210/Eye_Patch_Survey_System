const data = [
    {
        tag: "Time Saving",
        percent: "40%",
        info: "less manual effort",
        note: "Streamlined surveys free your team from repetitive tasks."
    },
    {
        tag: "Smarter Insights",
        percent: "60%",
        info: "deeper understanding",
        note: "Clear, real-time feedback improves decision quality."
    },
    {
        tag: "Cost Efficiency",
        percent: "35%",
        info: "lower research spend",
        note: "Affordable surveys deliver high-value insights fast."
    },
]

function Impact() {
    return (
        <div id="impact" className="text-center bg-custom-grey pb-10 pt-12 px-4 md:px-8">
            <h2 className="font-semibold text-2xl md:text-3xl font-zalando-expanded mb-4">Drive business success with <br className="hidden md:block" /> smarter data</h2>
            <p className="font-poppins text-sm md:text-base text-gray-600 max-w-2xl mx-auto">Our survey solutions capture valuable insights and fuel better business outcomes.</p>
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 mt-10 container mx-auto">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col justify-between gap-6 items-start rounded-md w-full md:w-87.5 font-poppins bg-white py-6 pl-6 pr-6 shadow-sm hover:shadow-md transition-shadow">
                        <span className="bg-custom-grey py-1 px-3 w-fit rounded-2xl text-xs font-medium">{item.tag}</span>
                        <div className="w-full text-left">
                            <div className="flex flex-col justify-between items-start font-zalando-expanded mb-2">
                                <span className="text-3xl font-semibold mb-1">{item.percent}</span>
                                <span className="text-lg font-medium">{item.info}</span>
                            </div>
                            <div className="text-gray-600 text-sm">
                                <i>{item.note}</i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Impact;