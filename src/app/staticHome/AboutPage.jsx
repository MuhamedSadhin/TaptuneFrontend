import Footer from "@/Components/Landing/Footer";
import LandingNave from "@/Components/Landing/LandingNave";
import SecondPage from "@/Components/Landing/SecondPage";
import React from "react";

function AboutPage() {
  return (
    <div>
      <LandingNave />
      <div className="w-full min-h-screen bg-raisin_black flex flex-col items-center justify-center relative">
        <div className="absolute w-full h-full inset-0 bg-[linear-gradient(to_right,#2d2b45,_1px,transparent_1px),linear-gradient(to_bottom,#2d2b45,_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-raisin_black via-transparent to-raisin_black dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-raisin_black via-transparent to-raisin_black dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
        <div className="container mx-auto flex flex-col items-center justify-center relative">
          <h1 className="text-6xl font-semibold text-mindaro">About taptune</h1>
          <p className="max-w-4xl text-white mt-2 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            voluptas unde rerum dolores enim iure illo maxime iusto accusantium?
            Earum, qui? Aspernatur ipsam, reiciendis quibusdam molestiae
            blanditiis ex consectetur consequuntur.
          </p>
          <button className="bg-mindaro text-raisin_black px-5 py-4 mt-8 rounded-full hover:bg-white hover:text-raisin_black transition-all duration-300">
            Contact Now
          </button>
        </div>
        <div className=" w-full h-full inset-0 bg-raisin_black-400 z-[10000] relative flex flex-col items-center justify-center"></div>
      </div>
      <SecondPage />
      <div className="w-full min-h-screen bg-raisin_black-400 z-[10000] relative flex flex-col items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default AboutPage;
