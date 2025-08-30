import React from "react";
import AnimatedCursor from "react-animated-cursor";

import LandingNave from "./Landing/LandingNave";
import LandingHome from "./Landing/LandingHome";
import IconSection from "./Landing/IconSection";
import SecondPage from "./Landing/SecondPage";
import { ArrowRight01Icon } from "hugeicons-react";
import LandingCards from "./Landing/LandingCards";
import Footer from "./Landing/Footer";

function HomePage() {
  return (
    <div className="w-full">
      <AnimatedCursor
        innerSize={0}
        outerSize={25}
        color="216, 242, 117"
        // color='108, 200, 50'
        outerAlpha={1}
        innerScale={0.7}
        outerScale={3}
        trailingSpeed={12}
        showSystemCursor={true}
        clickables={[
          {
            target: ".custom",
            options: {
              innerSize: 12,
              outerSize: 12,
              color: "255, 255, 255",
              outerAlpha: 0.3,
              outerScale: 3,
            },
          },
        ]}
      />

      <LandingNave />

      <LandingHome />
      <div id="botton" className="bg-raisin-black-500  py-16">
        <IconSection />
      </div>
      <SecondPage />
      <div className="w-full min-h-screen flex items-center justify-start p-2 bg-raisin-black ">
        <div className="w-full container mx-auto">
          <div className="mb-20 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold text-mindaro">
                Select your favortive card
              </h1>
              <p className="text-white text-sm font-light max-w-3xl">
                Choose your perfect design from a variety of stunning TAPTUNE
                card templates
              </p>
            </div>
            <button className="text-rai bg-mindaro-500 p-3 rounded-full transition-all duration-300 group hover:bg-mindaro-600 flex items-center gap-1">
              {/* View all */}
              <div className="">
                <ArrowRight01Icon />
              </div>
            </button>
          </div>
          <LandingCards />
          {/* <div>
          <p className="text-center mt-8  text-sm text-white font-light max-w-4xl mx-auto">Amet consectetur adipisicing elit. Deleniti, aspernatur ex ea sit nemo enim commodi esse, veniam, veritatis quidem officia. Dolore voluptates ut quis optio molestiae! Molestiae, quae ex! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, laboriosam? Nesciunt iusto, sapiente in autem consequuntur necessitatibus quaerat voluptates eius architecto ut expedita asperiores distinctio facere quisquam, minus itaque nobis.</p>
          <div className="border-b border-white/50 w-1/4 mx-auto mt-8"></div>
        </div> */}
        </div>
      </div>
      <div className="w-full min-h-screen bg-raisin-black-400 z-[10000] relative flex flex-col items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
