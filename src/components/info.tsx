import InfoCard from "./infocard";
import realTime from "../assets/realTimeDataCollection.svg"
import responseTracking from "../assets/responseTracking.svg"
import dataAccuracy from "../assets/dataAccuracy.svg"

const info1 =
{
    mainText: "real-time data collection",
    image: realTime,
    note: "Track your survey data in real time as user's reply."
}
const info2 =
{
    mainText: "data accuracy",
    image: dataAccuracy,
    note: "Get nigh accurate data as our tools provide user's with flexible response."
}
const info3 =
{
    mainText: "response tracking",
    image: responseTracking,
    note: "Track users response with our tool and get datas you can work with easily."
}



function Info() {
    return (
        <div className="flex justify-center items-center py-10 md:py-20 px-4 md:px-8">
            <p className="font-poppins text-base md:text-lg lg:text-xl max-w-xl text-left leading-relaxed">
                Our survey management platform provides
                <span className="mx-1"><InfoCard mainText={info1.mainText} image={info1.image} note={info1.note} /></span> and reporting,
                along with tools that ensure <span className="mx-1"><InfoCard mainText={info2.mainText} note={info2.note} image={info2.image} /></span> and respondent reliability.
                We streamline research workflows through automated distribution, <span className="mx-1"><InfoCard mainText={info3.mainText} image={info3.image} note={info3.note} /></span>,
                and analysis, while supporting compliance with data protection and regulatory standards. In addition, the system enables scalable survey deployment, supports multiple question types and integrations, and helps organizations reduce costs through efficient survey administration and actionable insights.
            </p>
        </div>
    );
}

export default Info;