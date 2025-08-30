import React from "react";
import mobile from "../../../assets/Image/mobaile.png";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

function SecondPage() {
  const navigate = useNavigate()
  return (
    <div className="w-full h-full min-h-screen bg-raisin-black  p-3 md:p-20 ">
      <div className="container mx-auto w-full h-full grid grid-cols-1 place-content-center md:grid-cols-2">
        <div className="w-full h-full relative">
          <div className="absolute w-full h-full inset-0 bg-[linear-gradient(to_right,#2d2b45,_1px,transparent_1px),linear-gradient(to_bottom,#2d2b45,_1px,transparent_1px)] bg-[size:25px_25px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-raisin-black via-transparent to-raisin-black dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-raisin-black via-transparent to-raisin-black dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>

          <img src={mobile} alt="" className="relative w-full max-w-2xl" />
        </div>
        <div className="w-full h-full flex flex-col justify-center">
          <h1 className="text-2xl md:text-7xl font-semibold text-mindaro ">
            Connecting Get Simplified
          </h1>
          <p className="max-w-5xl text-seasalt text-lg font-medium mt-3 ">
            Seamless Networking, Effortless Sharing – Taptune Simplifies
            Connections Like Never Before.
          </p>
          <p className="max-w-2xl text-seasalt text-sm font-light mt-5 ">
            TAPTUNE revolutionizes networking by making connections effortless
            and instant. This NFC-enabled smart card allows professionals to
            share contact details, portfolios, and social links with a single
            tap—no apps required. Fully customizable, TAPTUNE adapts to your
            needs, letting you showcase your brand uniquely. Whether sharing
            business profiles, payment links, or personalized landing pages, it
            simplifies interactions while leaving a lasting impression. Designed
            for efficiency and sophistication, it eliminates outdated paper
            cards and enhances digital engagement. With TAPTUNE, networking is
            seamless, smarter, and more impactful—ensuring every connection
            counts. Upgrade your connections today and experience the future of
            smart networking.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="custom font-medium w-44 py-3 px-6 rounded-full mt-5 text-raisin-black  bg-mindaro-600 hover:bg-mindaro-800 "
          >
            Get started
          </button>

        </div>
      </div>
    </div>
  );
}

export default SecondPage;
