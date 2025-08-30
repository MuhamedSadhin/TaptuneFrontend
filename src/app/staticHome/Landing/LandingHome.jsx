import React from "react";
import "./Landing.css";
import '../../../index.css'
import { HiOutlineArrowSmallDown, HiOutlineWifi } from "react-icons/hi2";
import logo from "../../../assets/Image/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";

function LandingHome() {
  const navigate = useNavigate();
  return (
    <section className="bg-raisin-black-400">
      <div className="w-full h-screen overflow-hidden relative">
        <div className="absolute w-full h-full inset-0 bg-[linear-gradient(to_right,#2d2b45,_1px,transparent_1px),linear-gradient(to_bottom,#2d2b45,_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-raisin-black via-transparent to-raisin-black dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-raisin-black via-transparent to-raisin-black dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
        <div className="land-wrap container mx-auto p-4 md:p-7 relative">
          <div className="">
            <h1 className="font-semibold text-white text-4xl md:text-6xl lg:text-8xl mb-5 w-full max-w-3xl inAn imation delay-500">
              Revolutionize Your Networking
            </h1>
            <p className="text-white text-lg md:text-xl font-light mt-3">
              TAPTUNE revolutionizes networking with seamless NFC sharing,
              customizable profiles, and instant digital connections—making
              every interaction smarter, faster, and more impactful.
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="mt-3 hover:scale-105 transition-all duration-300 py-3 flex items-center justify-center gap-2 px-5 group custom  bg-mindaro-600 hover:bg-mindaro-800 rounded-full text-lg font-medium"
            >
              Get started
              <div className="">
                <HiOutlineArrowSmallRight size={23} />
              </div>
            </button>
          </div>
          <div className="land-card">
            <div className="bg-round bg-round1"></div>
            <div className="bg-round2"></div>

            <div className="card-container">
              <div className="card-wrap">
                <div className="card-layer card-layer-1"></div>
                <div className="card-layer card-layer-2"></div>
                <div className="card-layer card-layer-3"></div>
                <div className="chip rotate-90 ">
                  <HiOutlineWifi size={28} />
                </div>
                <div className="bank">
                  <img src={logo} className="max-w-28 w-full" alt="" />
                </div>
                <div className="number text-xl font-semibold">
                  Smart Business Card
                </div>
                <div className="expiry">NFC Powered</div>
                {/* <div className="name">+01 2345 678 90</div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <a className="absolute left-[50%] bottom-20 -translate-x-[50%] z-50 border border-mindaro p-2 text-mindaro opacity-70 cursor-pointer animate-bounce rounded-full grid place-content-center ">
        <HiOutlineArrowSmallDown size={22} strokeWidth={2} />
        </a> */}
      </div>
    </section>
  );
}

export default LandingHome;
