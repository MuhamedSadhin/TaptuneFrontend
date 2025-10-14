import React from "react";
import { AlertDiamondIcon } from "hugeicons-react";
import Footer from "./Landing/Footer";
import LandingNave from "./Landing/LandingNave";

function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-raisin-black">
      <LandingNave />
      <div className="py-20 bg-raisin-black">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-start gap-2 p-4 h-full ">
          <h1 className="text-4xl font-semibold text-mindaro text-center ">
            Privacy policy
          </h1>
          <div className="mb-10">
            <p className="text-gray-200 text-sm max-w-4xl">
              We value your privacy and are committed to protecting your
              personal information. This Privacy Policy outlines how we collect,
              use, and secure your data.
            </p>
            <p className="text-gray-200 text-sm max-w-4xl">
              By using our website or services, you agree to the terms of this
              Privacy Policy. If you do not agree with any part of this policy,
              please refrain from using our website or services.
            </p>
          </div>

          <div className="w-full my-5">
            <div className="w-full divide-y divide-gray-400">
              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex gap-x-5">
                  <AlertDiamondIcon size={25} className="text-mindaro" />
                  <div className="grow">
                    <h3 className="md:text-xl font-semibold text-gray-100">
                      Data Collection
                    </h3>
                    <div className="flex flex-col mt-2">
                      <p className="mt-1 text-gray-300 text-sm">
                        <span className="font-medium text-base mr-3">
                          Personal Information:{" "}
                        </span>
                        Name, email, phone number, and shipping address.
                      </p>
                      <p className="mt-1 text-gray-300 text-sm">
                        <span className="font-medium text-base mr-3">
                          Profile Data:{" "}
                        </span>
                        Information added to your business card profile (e.g.,
                        social media links, contact details).
                      </p>
                      <p className="mt-1 text-gray-300 text-sm">
                        <span className="font-medium text-base mr-3">
                          Usage Data:{" "}
                        </span>
                        Interaction logs and analytics to improve user
                        experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex gap-x-5">
                  <AlertDiamondIcon size={25} className="text-mindaro" />
                  <div className="grow">
                    <h3 className="md:text-xl font-semibold text-gray-100">
                      Data Usage
                    </h3>
                    <div className="flex flex-col mt-2">
                      <p className="mt-1 text-gray-300 text-sm">
                        To process and deliver orders.
                      </p>
                      <p className="mt-1 text-gray-300 text-sm">
                        To enable profile customization and sharing.
                      </p>
                      <p className="mt-1 text-gray-300 text-sm">
                        To provide support and updates about the service.
                      </p>
                      <p className="mt-1 text-gray-300 text-sm">
                        To analyze usage trends and improve the platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex gap-x-5">
                  <AlertDiamondIcon size={25} className="text-mindaro" />
                  <div className="grow">
                    <h3 className="md:text-xl font-semibold text-gray-100">
                      Data Sharing
                    </h3>
                    <p className="mt-1 text-gray-300 text-sm">
                      Your data will not be sold or shared with third parties
                      except for:
                    </p>
                    <div className="flex flex-col mt-2">
                      <p className="mt-1 text-gray-300 text-sm">
                        Payment processing partners.
                      </p>
                      <p className="mt-1 text-gray-300 text-sm">
                        Shipping and delivery services.
                      </p>
                      <p className="mt-1 text-gray-300 text-sm">
                        Legal compliance purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex gap-x-5">
                  <AlertDiamondIcon size={25} className="text-mindaro" />
                  <div className="grow">
                    <h3 className="md:text-xl font-semibold text-gray-100">
                      Data Security Measures
                    </h3>
                    <p className="mt-1 text-gray-300 text-sm">
                      Your data is encrypted using industry-standard protocols.
                      We regularly update our security systems to prevent
                      unauthorized access and ensure data integrity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex gap-x-5">
                  <AlertDiamondIcon size={25} className="text-mindaro" />
                  <div className="grow">
                    <h3 className="md:text-xl font-semibold text-gray-100">
                      Your Rights
                    </h3>
                    <p className="mt-1 text-gray-300 text-sm">
                      You have the following rights regarding your personal
                      information:
                    </p>
                    <div className="flex flex-col mt-2">
                      <p className="mt-1 text-gray-300 text-sm">
                        Request correction or deletion of your information.
                      </p>
                      <p className="mt-1 text-gray-300 text-sm">
                        Opt-out of marketing communications.
                      </p>
                      <p className="mt-1 text-gray-300 text-sm">
                        Request data portability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen bg-raisin-black-400 z-[10000] relative flex flex-col items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default PrivacyPage;
