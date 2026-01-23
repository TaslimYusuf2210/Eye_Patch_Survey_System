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
        <div className="text-center bg-custom-grey pb-15 pt-12">
            <h2 className="font-semibold text-3xl font-zalando-expanded">Drive business success with <br className="hidden lg:block"/> smarter data</h2>
            <p className="font-poppins">Our survey solutions capture valuable insights and fuel better business outcomes.</p>
            <div className="flex justify-center gap-10 mt-10">
                {data.map((item, index) => (
                <div key={index} className="flex flex-col justify-between gap-10 items-start rounded-md w-fit font-poppins bg-white py-6 pl-4 pr-8">
                    <span className="bg-custom-grey py-1 px-2 w-fit rounded-2xl text-xs">{item.tag}</span>
                    <div className="">
                        <div className="flex flex-col justify-between items-start font-zalando-expanded">
                            <span className="text-2xl font-semibold">{item.percent}</span>
                            <span className="text-lg font-medium">{item.info}</span>
                        </div>
                        <div className="text-gray-600 text-sm w-60 text-left">
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