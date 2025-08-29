import LandingNave from "@/Components/Landing/LandingNave";
import React, { useState } from "react";
import img from "../assets/Image/img.jpg";
import signUp from "../assets/Image/signup.png";
import { Link } from "react-router-dom";
import Footer from "@/Components/Landing/Footer";

function DocPage() {
  const contants = [
    {
      title: "Account Creation",
      image: signUp,
      link: "/signup",
      content:
        "To access the Taptune, users must complete a simple registration process. This involves providing their name, email address, and setting up a secure password. Once registered, users gain access to all features and services offered by the Taptune.",
    },
    {
      title: "Order Placement",
      image: img,
      link: "/user/cardorder",
      content:
        "Users can browse a variety of NFC smart business card designs and customize their selection. Once a design is chosen, users provide the necessary shipping details and complete payment securely through integrated payment gateways. An order confirmation email will be sent to the user, including an estimated delivery timeline",
    },
    {
      title: "Profile Management",
      image: signUp,
      link: "/user/profiles",
      content:
        "Upon successful order completion, users receive a profile interface. Here, they can edit their name, professional title, company details, phone number, email address, website links, and social media profiles. The profile is designed to be dynamic, allowing updates at any time to reflect changes in professional information.",
    },
    {
      title: "Data Sharing",
      image: signUp,
      // link: '',
      content:
        "The NFC card simplifies the sharing of professional information. By tapping the card on any NFC-enabled device, users can instantly share their profile details. This functionality eliminates the need for traditional paper business cards and ensures a seamless digital exchange of contact information.",
    },
    {
      title: "User Connections",
      image: signUp,
      link: "/user/connections",
      content:
        "Users have the ability to gather and manage data from individuals who interact with their NFC card. Each interaction is recorded, and the collected data, such as names and contact details, is accessible through the user dashboard. This feature is particularly valuable for networking and follow-ups.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full min-h-screen bg-raisin_black">
      <LandingNave />
      <div className="py-20 bg-raisin_black">
        <div className="w-full flex container mx-auto mt-10 md:mb-6 p-3">
          <h1 className="text-4xl font-semibold text-mindaro text-center ">
            Documentation
          </h1>
        </div>
        <div className="container mx-auto w-full flex max-md:flex-col p-4 h-full ">
          <div className="h-full min-h- [800px] flex flex-col max-md:items-start md:border-r md:pr-10">
            {contants.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="cursor-pointer"
                >
                  <h1
                    className={`${
                      index === activeIndex
                        ? "bg-mindaro text-raisin_black"
                        : "text-white"
                    } py-1 px-4 rounded-full `}
                  >
                    {item.title}
                  </h1>
                </div>
              );
            })}
          </div>
          <div className="h-full flex flex-col items-start gap-2 md:ml-10 max-md:mt-8">
            <h1 className="text-2xl font-semibold text-mindaro">
              {contants[activeIndex].title}
            </h1>
            <p className="text-white max-w-4xl mt-3 font-light">
              {contants[activeIndex].content}
            </p>
            {contants[activeIndex].link && (
              <Link
                to={contants[activeIndex].link}
                className="bg-mindaro py-2 px-4 mt-3  text-raisin_black rounded-full"
              >
                Go to page
              </Link>
            )}
            <img
              src={contants[activeIndex].image}
              className="w-full max-w-4xl mt-5 rounded-lg shadow-lg border-2 border-raisin_black-700 bg-raisin_black-100"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen bg-raisin_black-400 z-[10000] relative flex flex-col items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default DocPage;
