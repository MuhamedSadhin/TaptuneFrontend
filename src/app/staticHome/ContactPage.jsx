import Footer from "@/Components/Landing/Footer";
import LandingNave from "@/Components/Landing/LandingNave";
import { createCollection } from "@/Utils/Firebase/Function";
import { Call02Icon, Location10Icon, MailOpen02Icon } from "hugeicons-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function ContactPage() {
  const [sendMsg, setSendMsg] = useState("");
  const [formData, setformData] = useState({
    name: "",
    email: "",
    massage: "",
    contact: "",
    date: new Date(),
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.contact) {
      setSendMsg("Please fill all the fields");
      return;
    }
    setSendMsg("");
    try {
      await createCollection("contacts", formData);
      setSendMsg("Message sent successfully");
    } catch (error) {
      console.log(error);
      setSendMsg("Error to send enquirey");
    } finally {
      setformData({
        name: "",
        email: "",
        massage: "",
        contact: "",
        date: new Date(),
      });
    }
  };

  return (
    <div>
      <div>
        <LandingNave />
        <div className="w-full min-h-screen bg-raisin_black flex flex-col items-center justify-center relative p-5 max-sm:py-10">
          <div className="absolute w-full h-full inset-0 bg-[linear-gradient(to_right,#2d2b45,_1px,transparent_1px),linear-gradient(to_bottom,#2d2b45,_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-raisin_black via-transparent to-raisin_black dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-raisin_black via-transparent to-raisin_black dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>

          <div className="container mx-auto w-full flex flex-col items-center justify-center relative">
            {/* <h1 className='text-3xl md:text-6xl xl:text-7xl font-semibold text-mindaro'>404</h1> */}
            <div className="w-full">
              <div className="w-full">
                <div className="max-w-5xl w-full px-4 xl:px-0 py-10 lg:py-20 mx-auto">
                  <div className="max-w-3xl mb-10 lg:mb-14">
                    <h2 className="text-mindaro font-semibold text-2xl md:text-4xl md:leading-tight">
                      Contact us
                    </h2>
                    <p className="mt-1 text-neutral-400">
                      Whatever your goal - we will get you there.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 w-full ">
                    <div className="md:order-2 border-b border-neutral-800 pb-10 mb-10 md:border-b-0 md:pb-0 md:mb-0 w-full">
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="text-gray-400 font-medium text-sm"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            id="name"
                            className="mt-1 p-3 px-4 rounded-md focus:outline-raisin_black-700 focus:border-none border-neutral-800 text-sm "
                            placeholder="Full Name"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="email"
                            className="text-gray-400 font-medium text-sm"
                          >
                            Email Id
                          </label>
                          <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            id="email"
                            className="mt-1 p-3 px-4 rounded-md focus:outline-raisin_black-700 focus:border-none border-neutral-800 text-sm "
                            placeholder="example@gmail.com"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="contact"
                            className="text-gray-400 font-medium text-sm"
                          >
                            Contact No
                          </label>
                          <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            id="contact"
                            className="mt-1 p-3 px-4 rounded-md focus:outline-raisin_black-700 focus:border-none border-neutral-800 text-sm "
                            placeholder="Contact NO"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="subject"
                            className="text-gray-400 font-medium text-sm"
                          >
                            Subject
                          </label>
                          <textarea
                            type="text"
                            name="massage"
                            value={formData.massage}
                            onChange={handleChange}
                            rows={3}
                            id="subject"
                            className="mt-1 p-3 px-4 rounded-md focus:outline-raisin_black-700 focus:border-none border-neutral-800 text-sm "
                            placeholder="Subject"
                          />
                        </div>
                      </div>
                      {sendMsg === "Message sent successfully" ? (
                        <p className="text-sm mt-2 text-mindaro">{sendMsg}</p>
                      ) : (
                        <p className="text-sm mt-2 text-red-400">{sendMsg}</p>
                      )}
                      <div>
                        <button
                          onClick={handleSubmit}
                          className="inline-block mt-5 px-6 py-3 text-sm font-medium bg-mindaro text-raisin_black rounded-md hover:bg-mindaro-600"
                        >
                          Send enquirie
                        </button>
                      </div>
                    </div>

                    <div className="space-y-10 col-span-1 md:order-1 w-full">
                      <div className="flex gap-x-5">
                        <Location10Icon
                          size={25}
                          className="text-neutral-500"
                        />
                        <div className="grow">
                          <h4 className="text-white font-semibold">
                            Our address:
                          </h4>

                          <address className="mt-1 text-neutral-400 text-sm not-italic">
                            <span className="text-neutral-300 text-base font-medium">
                              Neptune Mark LLP{" "}
                            </span>
                            <br />
                            Markaz Knowledge city, calicut kerela india - pin
                            673014
                          </address>
                        </div>
                      </div>

                      <div className="flex gap-x-5">
                        <MailOpen02Icon
                          size={25}
                          className="text-neutral-500"
                        />
                        <div className="grow">
                          <h4 className="text-white font-semibold">
                            Email us:
                          </h4>

                          <a
                            className="mt-1 text-neutral-400 text-sm hover:text-neutral-200 focus:outline-none focus:text-neutral-200"
                            href="mailto:info@taptune.com"
                            target="_blank"
                          >
                            info@taptune.com
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-x-5">
                        <Call02Icon size={25} className="text-neutral-500" />
                        <div className="grow">
                          <h4 className="text-white font-semibold">
                            Contact us:
                          </h4>

                          <a
                            className="mt-1 text-neutral-400 text-sm hover:text-neutral-200 focus:outline-none focus:text-neutral-200"
                            href="coll:"
                            target="_blank"
                          >
                            +91 8089969896
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-x-5">
                        <Call02Icon size={25} className="text-neutral-500" />
                        <div className="grow">
                          <h4 className="text-white font-semibold">Website:</h4>

                          <a
                            className="mt-1 text-neutral-400 text-sm hover:text-neutral-200 focus:outline-none focus:text-neutral-200"
                            href="http://neptunemark.com"
                            target="_blank"
                          >
                            www.neptunemark.com
                          </a>
                        </div>
                      </div>

                      {/* <div className="flex gap-x-5">
          <svg className="shrink-0 size-6 text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
          <div className="grow">
            <h4 className="text-white font-semibold">We're hiring</h4>
            <p className="mt-1 text-neutral-400">We're thrilled to announce that we're expanding our team and looking for talented individuals like you to join us.</p>
            <p className="mt-2">
              <a className="group inline-flex items-center gap-x-2 font-medium text-sm text-[#ff0] decoration-2 hover:underline focus:outline-none focus:underline" href="#">
                Job openings
              </a>
            </p>
          </div>
        </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <h1 className='text-3xl mt-10 font-semibold text-mindaro'>We can’t find that page</h1>
                <p className='max-w-4xl text-white mt-2 text-center'>Sorry, the page you are looking for doesn't exist or has been moved.</p>
                <Link to={'/'} className='bg-mindaro text-raisin_black px-5 py-4 mt-8 rounded-full hover:bg-white hover:text-raisin_black transition-all duration-300'>Go to home</Link> */}
          </div>
        </div>
        <div className="w-full min-h-screen bg-raisin_black-400 z-[10000] relative flex flex-col items-center justify-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
