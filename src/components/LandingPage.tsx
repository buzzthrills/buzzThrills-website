import React from "react";
import HeroSection from "./HeroSection";
import PlansSection from "./PlansSection";
import StepsSection from "./StepsSection";
// import CTASection from "./CTASection";


const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <PlansSection />
      <StepsSection />
      {/* <CTASection /> */}
    </div>
  );
};

export default LandingPage;
