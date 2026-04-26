import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import type { LandingPageLayoutProps } from "@/types/landingPage";

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children }) => {
  return (
    <div className='px-4 md:px-8 lg:px-12'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
