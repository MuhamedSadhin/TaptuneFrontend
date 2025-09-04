

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Upload, X, Plus, Save, Camera } from "lucide-react";
import { iconObj } from "@/assets/Icons/icons.jsx";
import { useEditProfile } from "@/hooks/tanstackHooks/useProfile";
import { toast } from "sonner";
import { uploadFileToFirebase } from "@/firebase/functions/uploadFileToFirebase";
import { deleteFileFromFirebase } from "@/firebase/functions/deleteFileFromFirebase";
import PhoneInput from "react-phone-input-2";
import { LinkInputDialog } from "@/components/userComponents/profileComp/InputLinkDialog";
import { FaUser } from "react-icons/fa6";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Get _id from URL
  const profile = location.state?.profile; // Get profile from navigation state

  const [activePlatform, setActivePlatform] = useState(null);
  const [platformLinks, setPlatformLinks] = useState({});
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [uploadedBanner, setUploadedBanner] = useState(null);
  const [uploadedProfilePic, setUploadedProfilePic] = useState(null);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate, isPending } = useEditProfile();

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    designation: "",
    brandName: "",
    bio: "",
    phoneNo: "",
    email: "",
    whatsappNo: "",
    locationLink: "",
    designType: "",
    banner: "",
    profilePic: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.fullName || "",
        userName: profile.userName || "",
        designation: profile.designation || "",
        brandName: profile.brandName || "",
        bio: profile.bio || "",
        phoneNo: profile.phoneNumber || "",
        email: profile.email || "",
        whatsappNo: profile.watsappNumber || "",
        locationLink: profile.locationLink || "",
        banner: profile.banner,
        profilePic: profile.profilePic,
        designType: profile.designType,
      });

      if (profile.socialMedia?.length) {
        const initialLinks = {};
        const initialSelected = [];
        profile.socialMedia.forEach(({ platform, link }) => {
          if (platform && link) {
            initialLinks[platform] = link;
            initialSelected.push(platform);
          }
        });
        setPlatformLinks(initialLinks);
        setSelectedLinks(initialSelected);
      }
    } else {
      // If no profile, perhaps redirect or fetch
      toast("Profile data not found");
      navigate(-1);
    }
  }, [profile, navigate]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlatformClick = (platform) => {
    setActivePlatform(platform);
    setIsLinkDialogOpen(true);
  };

  const handleLinkSubmit = (platform, link) => {
    if (!link?.trim()) return;

    setPlatformLinks((prevLinks) => ({
      ...prevLinks,
      [platform.name]: link,
    }));

    if (!selectedLinks.includes(platform.name)) {
      setSelectedLinks((prev) => [...prev, platform.name]);
    }

    setActivePlatform(null);
    setIsLinkDialogOpen(false);
  };

  const removeSelectedLink = (platform) => {
    setSelectedLinks((prev) => prev.filter((link) => link !== platform));
    setPlatformLinks((prev) => {
      const { [platform]: _, ...rest } = prev;
      return rest;
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "A valid email is required.";
    }
    if (!formData.phoneNo.trim()) return "Phone number must include country code and digits.";
    if (!formData.designation.trim()) return "Designation is required.";
    return null;
  };

  const handleSaveProfile = async () => {
    const error = validateForm();
    if (error) {
      toast(error);
      return;
    }

    setIsSubmitting(true);
    let bannerLink = null;
    let profilePicLink = null;

    try {
      if (uploadedBanner) {
        bannerLink = await uploadFileToFirebase(uploadedBanner, "banners");
        if (formData.banner && bannerLink) {
          await deleteFileFromFirebase(formData.banner);
        }
      }

      if (uploadedProfilePic) {
        profilePicLink = await uploadFileToFirebase(uploadedProfilePic, "profilePics");
        if (formData.profilePic && profilePicLink) {
          await deleteFileFromFirebase(formData.profilePic);
        }
      }

      const payload = {
        _id: id || profile._id,
        fullName: formData.name,
        userName: formData.userName,
        designation: formData.designation,
        brandName: formData.brandName,
        bio: formData.bio,
        phoneNumber: formData.phoneNo,
        email: formData.email,
        watsappNumber: formData.whatsappNo,
        locationLink: formData.locationLink,
        designType: formData.designType,
        socialMedia: selectedLinks.map((platform) => ({
          platform,
          link: platformLinks[platform],
        })),
      };

      if (profilePicLink) payload.profilePic = profilePicLink;
      else if (formData.profilePic) payload.profilePic = formData.profilePic;

      if (bannerLink) payload.banner = bannerLink;
      else if (formData.banner) payload.banner = formData.banner;

      mutate(payload, {
        onSuccess: () => {
          toast("Profile updated successfully");
          navigate(-1); // Go back to previous page
          setIsSubmitting(false);
        },
        onError: (error) => {
          console.error("Error updating profile:", error);
          toast("Failed to update profile");
          setIsSubmitting(false);
        },
      });
    } catch (err) {
      console.error("Error saving profile:", err);
      toast("An error occurred while saving the profile.");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b py-4 md:py-6 sticky top-0 z-10">
        <div className="max-w-7xl  flex flex--col flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Edit Profile
            </h1>
            <p className="text-sm text-gray-500">
              Update your personal details and preferences
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 sm:gap-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className=" max-sm:hidden flex  items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <Button
              onClick={handleSaveProfile}
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full py-4 md:py-6 lg:py-8  overflow-y-auto">
        {/* Banner and Profile Pic Section */}
        <section className="relative bg-white rounded-2xl shadow-lg">
          <div className="h-48 md:h-64 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 relative overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                uploadedBanner
                  ? URL.createObjectURL(uploadedBanner)
                  : formData.banner ||
                    "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=500&q=60"
              }
              alt="Banner"
            />
            <label
              htmlFor="file2"
              className="absolute top-4 right-4 bg-gray-800 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-900 transition shadow-md font-medium text-white"
            >
              Upload Banner
            </label>
            <input
              id="file2"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setUploadedBanner(file);
              }}
            />
          </div>
          <div className="absolute top-18 md:top-30 left-6 md:left-10 transform translate-y-1/2">
            <div className="relative">
              <label htmlFor="profilePic">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-xl rounded-full">

                  <AvatarImage
                    className="bg-white"
                    src={
                      uploadedProfilePic
                        ? URL.createObjectURL(uploadedProfilePic)
                        : formData.profilePic || ""
                    }
                    alt="Profile Picture"
                  />
                  <AvatarFallback className={"bg-gray-900"}>
                    <FaUser className="w-16 h-16 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full shadow-md"
                >
                  <Camera className="h-5 w-5" />
                </Button>
              </label>
              <input
                type="file"
                accept="image/*"
                id="profilePic"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setUploadedProfilePic(file);
                }}
              />
            </div>
          </div>
        </section>

        {/* Profile Information */}
        <section className="bg-white rounded-2xl p-6 pt-12 md:p-8 md:pt-22 space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: "name", label: "Name" },
              { id: "userName", label: "User Name" },
              { id: "designation", label: "Designation" },
              {
                id: "brandName",
                label: "Brand Name",
                placeholder: "Brand Name",
              },
            ].map(({ id, label, placeholder }) => (
              <div className="space-y-2" key={id}>
                <Label htmlFor={id} className="text-gray-700 font-medium">
                  {label}
                </Label>
                <Input
                  id={id}
                  value={formData[id]}
                  onChange={(e) => handleInputChange(id, e.target.value)}
                  placeholder={placeholder || ""}
                  className="border-gray-300 focus:border-blue-500 transition"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Design Type */}
        <section className=" rounded-2xl   px-6 py-4 md:px-8   space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Design Type
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  type: "black",
                  label: "Black",
                  theme: "bg-gray-800 text-white",
                  bgColor: "bg-gray-700",
                },
                {
                  type: "premier",
                  label: "Premier",
                  theme: "bg-purple-100 text-gray-800",
                  bgColor: "bg-purple-200",
                },
                {
                  type: "elite",
                  label: "Elite",
                  theme: "bg-blue-100 text-gray-800",
                  bgColor: "bg-blue-200",
                },
              ].map(({ type, label, theme, bgColor }) => (
                <Card
                  key={type}
                  onClick={() => handleInputChange("designType", type)}
                  className={`cursor-pointer ${bgColor} transition-shadow hover:shadow-lg flex p-0 overflow-hidden flex-col
          ${
            formData.designType === type
              ? "border-2 border-blue-500"
              : "border border-gray-200"
          }`}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{label}</CardTitle>
                  </CardHeader>

                  {/* flex-1 ensures equal height cards */}
                  <CardContent className={`p-4 ${theme} flex-1 !mb-0`}>
                    <div className="flex flex-col gap-2 text-sm h-full">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          {formData.profilePic ? (
                            <AvatarImage
                              src={formData.profilePic}
                              alt="Profile"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <AvatarFallback>DD</AvatarFallback>
                          )}
                        </Avatar>

                        <div>
                          <p className="font-bold">
                            {formData.name || "Your Name"}
                          </p>
                          <p className="text-xs">
                            {formData.designation || "Designation"}
                          </p>
                        </div>
                      </div>

                      {/* Preview link */}
                      <p className="text-xs mt-auto">
                        Click to{" "}
                        <a
                          href={`#/profile/preview/${type.toLowerCase()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline hover:text-blue-600"
                        >
                          view preview
                        </a>{" "}
                        of the {label} design.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="bg-white rounded-2xl  p-6 md:p-8 space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Bio
          </h2>
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-700 font-medium">
              Your Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Write a short bio about yourself — your background, skills, or interests."
              className="border-gray-300 focus:border-blue-500 transition text-base p-4 rounded-lg"
              rows={4}
            />
          </div>
        </section>

        {/* Contact Details */}
        <section className="bg-white rounded-2xl  p-6 md:p-8 space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Contact Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: "phoneNo", label: "Phone No" },
              { id: "email", label: "Email", type: "email" },
              { id: "whatsappNo", label: "WhatsApp No" },
              { id: "locationLink", label: "Location Link" },
            ].map(({ id, label, type = "text" }) => (
              <div className="space-y-2" key={id}>
                <Label htmlFor={id} className="text-gray-700 font-medium">
                  {label}
                </Label>

                {id === "phoneNo" || id === "whatsappNo" ? (
                  <PhoneInput
                    country={"in"} // default India, change as needed
                    value={formData[id]}
                    onChange={(value) => handleInputChange(id, `+${value}`)}
                    inputClass="!w-full !h-10 !text-sm !border-gray-300 !rounded-md focus:!border-blue-500"
                    buttonClass="!border-gray-300 !rounded-l-md"
                    containerClass="w-full"
                  />
                ) : (
                  <Input
                    id={id}
                    type={type}
                    value={formData[id]}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    className="border-gray-300 focus:border-blue-500 transition"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="bg-white rounded-2xl shadow p-6 md:p-8 space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Social Links
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
            {iconObj.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handlePlatformClick(platform)}
                className="relative flex flex-col items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center overflow-hidden shadow hover:shadow-2xl ${
                    selectedLinks.includes(platform.name)
                      ? "border-4 border-blue-500 shadow-md"
                      : ""
                  }`}
                >
                  <img
                    src={platform.icon}
                    alt={platform.name}
                    className="w-full h-full object-cover scale-105"
                  />
                </div>
              </button>
            ))}
          </div>

          {selectedLinks.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800">
                Selected Links
              </h3>
              <div className="flex flex-wrap gap-3">
                {selectedLinks.map((link) => (
                  <Badge
                    key={link}
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {link}
                    <button
                      onClick={() => removeSelectedLink(link)}
                      className="ml-2 hover:text-red-600 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Link Input Dialog (kept as modal) */}
      {activePlatform && (
        <LinkInputDialog
          open={isLinkDialogOpen}
          platform={activePlatform}
          onClose={() => {
            setActivePlatform(null);
            setIsLinkDialogOpen(false);
          }}
          onSubmit={handleLinkSubmit}
        />
      )}
    </div>
  );
};

export default EditProfilePage;