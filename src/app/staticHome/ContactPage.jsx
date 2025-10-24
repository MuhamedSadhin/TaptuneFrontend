
import { useCreateEnquiry } from "@/hooks/tanstackHooks/useEnquiries";
import Footer from "../staticHome/Landing/Footer";
import LandingNave from "../staticHome/Landing/LandingNave";
import { Call02Icon, Location10Icon, MailOpen02Icon } from "hugeicons-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phoneNumber: "",
  });

  const {
    mutate: createEnquiry,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateEnquiry();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phoneNumber) {
      return toast.error("Please fill all the fields");
    }

    createEnquiry(formData, {
      onSuccess: (res) => {
        setFormData({
          name: "",
          email: "",
          message: "",
          phoneNumber: "",
        });
        if (res.success) {
          toast.success("Enquiry submited .");
        } else {
          toast.error("Something went wrong");
        }
      },
      onError: (err) => {
        toast.error("Error occured");
      }
    });
  };

  return (
    <div>
      <LandingNave />
      <div className="w-full min-h-screen bg-raisin-black flex flex-col items-center justify-center relative p-5 max-sm:py-10">
        {/* Grid overlay */}
        <div className="absolute w-full h-full inset-0 bg-[linear-gradient(to_right,#2d2b45,_1px,transparent_1px),linear-gradient(to_bottom,#2d2b45,_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-raisin-black via-transparent to-raisin-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-raisin-black via-transparent to-raisin-black"></div>

        <div className="container mx-auto w-full flex flex-col items-center justify-center relative">
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
              {/* Contact form */}
              <div className="md:order-2 border-b border-neutral-800 pb-10 mb-10 md:border-b-0 md:pb-0 md:mb-0 w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                      className="mt-1 p-3 px-4 rounded-md border-2 border-neutral-300 
                        focus:outline-none focus:ring-2 focus:ring-raisin-black-700 focus:border-transparent
                        hover:border-neutral-400 text-sm bg-transparent text-white"
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
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      id="email"
                      className="mt-1 p-3 px-4 rounded-md border-2 border-neutral-300 
                        focus:outline-none focus:ring-2 focus:ring-raisin-black-700 focus:border-transparent
                        hover:border-neutral-400 text-sm bg-transparent text-white"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="phoneNumber"
                      className="text-gray-400 font-medium text-sm"
                    >
                      Contact No
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      id="phoneNumber"
                      className="mt-1 p-3 px-4 rounded-md border-2 border-neutral-300 
                        focus:outline-none focus:ring-2 focus:ring-raisin-black-700 focus:border-transparent
                        hover:border-neutral-400 text-sm bg-transparent text-white"
                      placeholder="Contact No"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="message"
                      className="text-gray-400 font-medium text-sm"
                    >
                      Subject
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      id="message"
                      className="mt-1 p-3 px-4 rounded-md border-2 border-neutral-300 
                        focus:outline-none focus:ring-2 focus:ring-raisin-black-700 focus:border-transparent
                        hover:border-neutral-400 text-sm bg-transparent text-white"
                      placeholder="Subject"
                    />
                  </div>

                  {isSuccess && (
                    <p className="text-sm mt-2 text-mindaro">
                      Message sent successfully!
                    </p>
                  )}
                  {isError && (
                    <p className="text-sm mt-2 text-red-400">
                      {error?.response?.data?.message ||
                        "Error sending enquiry"}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-block mt-5 px-6 py-3 text-sm font-medium bg-mindaro text-raisin-black rounded-md hover:bg-mindaro-600 disabled:opacity-50"
                  >
                    {isPending ? "Sending..." : "Send enquiry"}
                  </button>
                </form>
              </div>

              {/* Contact info */}
              <div className="space-y-10 col-span-1 md:order-1 w-full">
                <div className="flex gap-x-5">
                  <Location10Icon size={25} className="text-neutral-500" />
                  <div className="grow">
                    <h4 className="text-white font-semibold">Our address:</h4>
                    <address className="mt-1 text-neutral-400 text-sm not-italic">
                      <span className="text-neutral-300 text-base font-medium">
                        Neptune Mark LLP
                      </span>
                      <br />
                      Markaz Knowledge city, Calicut, Kerala, India - pin 673014
                    </address>
                  </div>
                </div>

                <div className="flex gap-x-5">
                  <MailOpen02Icon size={25} className="text-neutral-500" />
                  <div className="grow">
                    <h4 className="text-white font-semibold">Email us:</h4>
                    <a
                      className="mt-1 text-neutral-400 text-sm hover:text-neutral-200"
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
                    <h4 className="text-white font-semibold">Contact us:</h4>
                    <a
                      className="mt-1 text-neutral-400 text-sm hover:text-neutral-200"
                      href="tel:+918089969896"
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
                      className="mt-1 text-neutral-400 text-sm hover:text-neutral-200"
                      href="http://neptunemark.com"
                      target="_blank"
                    >
                      www.neptunemark.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full min-h-screen bg-raisin-black-400 z-[10000] relative flex flex-col items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default ContactPage;
