import { Link } from "react-router-dom";
import Footer from "../staticHome/Landing/Footer";
import LandingNave from "../staticHome/Landing/LandingNave";
import SecondPage from "../staticHome/Landing/SecondPage";
import React from "react";

function AboutPage() {
  return (
    <div>
      <LandingNave />
      <div className="w-full min-h-screen bg-raisin-black flex flex-col items-center justify-center relative">
        <div className="absolute w-full h-full inset-0 bg-[linear-gradient(to_right,#2d2b45,_1px,transparent_1px),linear-gradient(to_bottom,#2d2b45,_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-raisin-black via-transparent to-raisin-black dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-raisin-black via-transparent to-raisin-black dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
        <div className="container mx-auto flex flex-col items-center justify-center relative">
          <h1 className="text-6xl font-semibold text-mindaro">About taptune</h1>
          <p className="max-w-4xl text-white mt-2 text-center">
            Taptune is a smart digital networking solution designed to help you
            connect instantly, share seamlessly, and leave a lasting impression.
            With just a tap, you can share your digital business card,
            portfolio, or contact information without the need for paper cards
            or outdated methods.
          </p>
          <Link to={"/contact"}>
            <button className="bg-mindaro text-raisin-black px-5 py-4 mt-8 rounded-full hover:bg-white hover:text-raisin-black transition-all duration-300">
              Contact Now
            </button>
          </Link>
        </div>
        <div className=" w-full h-full inset-0 bg-raisin-black-400 z-[10000] relative flex flex-col items-center justify-center"></div>
      </div>
      <SecondPage />
      <div className="w-full min-h-screen bg-raisin-black-400 z-[10000] relative flex flex-col items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default AboutPage;
