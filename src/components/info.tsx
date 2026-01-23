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
        <div className="flex justify-center items-center py-20">
            <p className="font-poppins text-lg max-w-120">
                Our survey management platform provides 
                <InfoCard mainText={info1.mainText} image={info1.image} note={info1.note} /> and reporting, 
                along with tools that ensure <InfoCard mainText={info2.mainText} note={info2.note} image={info2.image}/> and respondent reliability.
                We streamline research workflows through automated distribution, <InfoCard mainText={info3.mainText} image={info3.image} note={info3.note}/>,
                and analysis, while supporting compliance with data protection and regulatory standards. In addition, the system enables scalable survey deployment, supports multiple question types and integrations, and helps organizations reduce costs through efficient survey administration and actionable insights.
            </p>
        </div>
     );
}

export default Info;