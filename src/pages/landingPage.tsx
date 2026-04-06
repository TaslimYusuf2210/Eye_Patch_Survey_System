import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Impact from "../components/impact";
import Info from "../components/info";
import Compatible from "../components/compatible";
import NewsAndUpdate from "../components/newsAndUpdate";
import FrequentlyAskedQuestion from "../components/faq";
import Demo from "../components/demo";
import Footer from "../components/footer";

function LandingPage() {
    return (
        <div className="pb-10">
            <Navbar></Navbar>
            <div>
                <Hero></Hero>
            </div>
            <div className="mt-30">
                <Impact></Impact>
            </div>
            <div>
                <Info></Info>
            </div>
            <div>
                <Compatible></Compatible>
            </div>
            <div className="mt-20">
                <NewsAndUpdate></NewsAndUpdate>
            </div>
            <div>
                <FrequentlyAskedQuestion></FrequentlyAskedQuestion>
            </div>
            <div>
                <Demo></Demo>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default LandingPage;