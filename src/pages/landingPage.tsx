import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Impact from "../components/impact";

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
        </div>
     );
}

export default LandingPage;