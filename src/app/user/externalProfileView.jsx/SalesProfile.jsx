"use client";

import { useEffect, useState } from "react";
import {
  Globe,
  Instagram,
  Phone,
  FileDown,
  Share2,
  Mail,
  MessageCircle,
  Star,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { iconObj } from "@/assets/Icons/icons";
import { toast } from "sonner";
import { useConnectProfile } from "@/hooks/tanstackHooks/useConnections";
import { useNavigate } from "react-router-dom";

export default function SalesProfilePremium({ profile }) {
  /* ---------------- STATES ---------------- */
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [isAutoModalOpen, setIsAutoModalOpen] = useState(false);
  const [autoModalShown, setAutoModalShown] = useState(false);

  const [exchangeForm, setExchangeForm] = useState({
    fullName: "",
    designation: "",
    email: "",
    phone: "",
  });

  const [autoForm, setAutoForm] = useState({
    fullName: "",
    phone: "",
  });

  /* ---------------- CONNECTION HOOK ---------------- */
  const { mutate: connectProfile, isPending } = useConnectProfile();

  /* ---------------- AUTO MODAL TIMER ---------------- */
  useEffect(() => {
    if (autoModalShown) return;

    const timer = setTimeout(() => {
      setIsAutoModalOpen(true);
      setAutoModalShown(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [autoModalShown]);

  /* ---------------- SHARED SEND FUNCTION ---------------- */
  const sendConnection = (payload, onClose) => {
    if (!payload.fullName || !payload.phoneNumber) {
      toast.error("Name and phone number are required");
      return;
    }

    if (!profile?.viewId) {
      toast.error("Profile information missing");
      return;
    }

    connectProfile(
      {
        viewId: profile.viewId,
        ...payload,
      },
      {
        onSuccess: (res) => {
          if (res?.success) {
            toast.success("Connection sent successfully");
            onClose();
          } else {
            toast.error("Failed to send connection");
          }
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Something went wrong. Try again."
          );
        },
      }
    );
  };

  /* ---------------- AUTO MODAL SUBMIT ---------------- */
  const handleAutoSubmit = (e) => {
    e.preventDefault();

    sendConnection(
      {
        fullName: autoForm.fullName,
        phoneNumber: autoForm.phone,
      },
      () => {
        setIsAutoModalOpen(false);
        setAutoForm({ fullName: "", phone: "" });
      }
    );
  };

  /* ---------------- EXCHANGE MODAL SUBMIT ---------------- */
  const handleExchangeSubmit = (e) => {
    e.preventDefault();

    sendConnection(
      {
        fullName: exchangeForm.fullName,
        phoneNumber: exchangeForm.phone,
        email: exchangeForm.email,
        designation: exchangeForm.designation,
      },
      () => {
        setIsExchangeOpen(false);
        setExchangeForm({
          fullName: "",
          company: "",
          email: "",
          phone: "",
        });
      }
    );
  };

  /* ---------------- SHARE ---------------- */
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: profile.fullName,
        url: window.location.href,
      });
    }
  };
  const navigate = useNavigate();

  /* ---------------- ACTIONS ---------------- */
  const actions = [
    { icon: Star, label: "Google Review", href: profile.googleReview },
    { icon: Instagram, label: "Instagram", href: profile.instagram },
    { icon: Phone, label: "Call", href: `tel:${profile.phoneNumber}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${profile.whatsapp}`,
    },
    { icon: Mail, label: "Email", href: `mailto:${profile.email}` },
    { icon: FileDown, label: "Download PDF", href: profile.pdf },
    { icon: Globe, label: "Website", href: profile.website },
    { icon: Share2, label: "Share", onClick: handleShare },
  ].filter((a) => a.href || a.onClick);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex justify-center p-4 lg:p-10">
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />

      <div className="relative z-10 w-full max-w-6xl">
        {/* ================= MOBILE ================= */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Banner */}
            <div className="aspect-[16/10] rounded-xl overflow-hidden">
              <img
                src={profile.banner || "/placeholder.svg"}
                className="w-full h-full object-cover"
                alt="Banner"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 rounded-xl" />
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 z-20">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-1 shadow-xl">
                <img
                  src={profile.profilePic || "/placeholder.svg"}
                  alt={profile.fullName}
                  className="w-full h-full rounded-full object-cover bg-neutral-900"
                />
              </div>
            </div>
          </div>

          {/* Profile Content - added proper margin-top to account for overlapping profile pic */}
          <div className="relative bg-neutral-900 rounded-2xl px-6 pt-20 pb-8 mt-20">
            <h1 className="text-center text-2xl font-bold">
              {profile.fullName}
            </h1>
            <p className="text-center text-amber-400 text-sm">
              {profile.designation}
            </p>
            <p className="text-center text-neutral-400 text-sm mt-3">
              {profile.bio}
            </p>

            <div className="flex justify-center mt-6 gap-3">
              <button
                onClick={() => setIsExchangeOpen(true)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 font-medium"
              >
                Exchange Contact
              </button>
              <button
                onClick={() => navigate(`/auth?ref=${profile?.referalCode}`)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 font-medium"
              >
                Let’s get started
              </button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="grid grid-cols-4 gap-3 mt-8">
            {actions.map((a, i) => (
              <ActionItemMobile key={i} {...a} />
            ))}
          </div>

          {/* Mobile Social Media */}
          {profile?.socialMedia?.length > 0 && (
            <div className="mt-10">
              <h3 className="text-center text-sm uppercase tracking-widest text-neutral-400 mb-4">
                Connect & Follow
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {profile.socialMedia.map((social, i) => {
                  const iconData = iconObj.find(
                    (item) =>
                      item.name.toLowerCase() === social.platform?.toLowerCase()
                  );
                  if (!iconData) return null;

                  return (
                    <a
                      key={i}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-xl bg-neutral-800  border-neutral-700 flex items-center justify-center"
                    >
                      <img
                        src={iconData.icon || "/placeholder.svg"}
                        alt={social.platform}
                        className="w-14 h-14 hover:scale-105 transition"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:block">
          <div className="bg-neutral-900 rounded-3xl overflow-hidden">
            <div className="relative">
              {/* Banner */}
              <div className="h-56 xl:h-64 overflow-hidden">
                <img
                  src={profile.banner || "/placeholder.svg"}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-neutral-900/95" />
              </div>

              <div className="absolute -bottom-20 left-8 xl:left-12 z-20">
                <div className="w-40 h-40 xl:w-44 xl:h-44 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-1 shadow-2xl">
                  <img
                    src={profile.profilePic || "/placeholder.svg"}
                    alt={profile.fullName}
                    className="w-full h-full rounded-full object-cover bg-neutral-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-10 xl:gap-14 px-8 xl:px-12 pb-12 pt-24">
              {/* LEFT - Profile Info */}
              <div className="w-full xl:w-72 shrink-0 text-center xl:text-left">
                <h1 className="text-2xl xl:text-3xl font-bold">
                  {profile.fullName}
                </h1>

                <p className="text-amber-400 text-base xl:text-lg mt-1">
                  {profile.designation}
                </p>

                <p className="text-neutral-400 mt-4 text-sm xl:text-base">
                  {profile.bio}
                </p>

                {/* CTA BUTTONS */}
                <div className="mt-6 xl:mt-8 flex flex-col gap-3 justify-center xl:justify-start">
                  {/* Primary CTA */}

                  {/* Secondary CTA */}
                  <button
                    onClick={() => setIsExchangeOpen(true)}
                    className="px-8 xl:px-10 py-3 xl:py-4 rounded-full
                 bg-gradient-to-r from-amber-500 to-orange-500
                 font-medium hover:from-amber-600 hover:to-orange-600
                 transition"
                  >
                    Exchange Contact
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/auth?ref=${profile?.referalCode || ""}`)
                    }
                    className="px-8 xl:px-10 py-3 xl:py-4 rounded-full
                 border border-amber-500/40 text-amber-400
                 hover:bg-amber-500/10 transition"
                  >
                    Let’s get started
                  </button>
                </div>
              </div>

              {/* RIGHT - Actions & Social */}
              <div className="flex-1 space-y-10 xl:space-y-12">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-4 xl:mb-6 text-center xl:text-left">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-4">
                    {actions.map((a, i) => (
                      <ActionItemDesktop key={i} {...a} />
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                {profile?.socialMedia?.length > 0 && (
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-4 xl:mb-6 text-center xl:text-left">
                      Connect & Follow
                    </h3>
                    <div className="flex flex-wrap justify-center xl:justify-start gap-4">
                      {profile.socialMedia.map((social, i) => {
                        const iconData = iconObj.find(
                          (item) =>
                            item.name.toLowerCase() ===
                            social.platform?.toLowerCase()
                        );
                        if (!iconData) return null;

                        return (
                          <a
                            key={i}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14  rounded-xl flex items-center justify-center hover:scale-105 hover:border-amber-400/60 transition bg-neutral-800/50"
                          >
                            <img
                              src={iconData.icon || "/placeholder.svg"}
                              alt={social.platform}
                              className="w-12 h-12"
                            />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isExchangeOpen} onOpenChange={setIsExchangeOpen}>
        <DialogContent className="bg-neutral-900 text-white border-neutral-800 max-w-sm md:max-w-[420px]">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg">
              Exchange Contact Information
            </DialogTitle>
            <p className="text-sm text-neutral-400">
              Share your details to connect and stay in touch.
            </p>
          </DialogHeader>

          <form onSubmit={handleExchangeSubmit} className="space-y-4 mt-4">
            <Input
              placeholder="Full Name"
              value={exchangeForm.fullName}
              onChange={(e) =>
                setExchangeForm({ ...exchangeForm, fullName: e.target.value })
              }
              className="bg-neutral-800 border-neutral-700"
            />

            <Input
              placeholder="Designation / Role"
              value={exchangeForm.designation}
              onChange={(e) =>
                setExchangeForm({
                  ...exchangeForm,
                  designation: e.target.value,
                })
              }
              className="bg-neutral-800 border-neutral-700"
            />

            <Input
              type="email"
              placeholder="Email Address (optional)"
              value={exchangeForm.email}
              onChange={(e) =>
                setExchangeForm({ ...exchangeForm, email: e.target.value })
              }
              className="bg-neutral-800 border-neutral-700"
            />

            <Input
              type="tel"
              placeholder="Phone Number"
              value={exchangeForm.phone}
              onChange={(e) =>
                setExchangeForm({ ...exchangeForm, phone: e.target.value })
              }
              className="bg-neutral-800 border-neutral-700"
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              {isPending ? (
                <div>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" />
                </div>
              ) : (
                "Send Contact"
              )}
            </Button>

            <p className="text-xs text-neutral-500 text-center">
              Your contact details will be shared securely.
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* ----------- AUTO MODAL ----------- */}
      <Dialog open={isAutoModalOpen} onOpenChange={setIsAutoModalOpen}>
        <DialogContent className="bg-neutral-900 text-white border-neutral-800 max-w-sm md:max-w-[400px]">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-center">Welcome</DialogTitle>
            <p className="text-center text-sm text-neutral-400">
              If you wish, you may share your name and number.
              <br />
              This is optional and up to you.
            </p>
          </DialogHeader>

          <form onSubmit={handleAutoSubmit} className="space-y-4 mt-4">
            <Input
              placeholder="Your name "
              value={autoForm.fullName}
              onChange={(e) =>
                setAutoForm({ ...autoForm, fullName: e.target.value })
              }
              className="bg-neutral-800 border-neutral-700"
            />

            <Input
              placeholder="Phone number "
              value={autoForm.phone}
              onChange={(e) =>
                setAutoForm({ ...autoForm, phone: e.target.value })
              }
              className="bg-neutral-800 border-neutral-700"
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 hover:text-white"
                onClick={() => setIsAutoModalOpen(false)}
              >
                Skip
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Send
              </Button>
            </div>

            <p className="text-xs text-neutral-500 text-center">
              We respect your privacy. You are free to continue without sharing.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ================= ACTION COMPONENTS ================= */

function ActionItemMobile({ icon: Icon, label, href, onClick }) {
  const Wrapper = href ? "a" : "button";
  return (
    <Wrapper
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className="flex flex-col items-center gap-2"
    >
      <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center text-amber-400">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs text-neutral-400">{label.split(" ")[0]}</span>
    </Wrapper>
  );
}

function ActionItemDesktop({ icon: Icon, label, href, onClick }) {
  const Wrapper = href ? "a" : "button";
  return (
    <Wrapper
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className="flex flex-col items-center justify-center p-4 xl:p-5 rounded-2xl bg-neutral-800/60 hover:bg-neutral-800 transition"
    >
      <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-neutral-700 flex items-center justify-center text-amber-400">
        <Icon className="w-5 h-5 xl:w-6 xl:h-6" />
      </div>
      <span className="text-xs xl:text-sm text-neutral-300 mt-2">{label}</span>
    </Wrapper>
  );
}
