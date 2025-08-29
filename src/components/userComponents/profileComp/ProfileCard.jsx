

// "use client";

// import { Button } from "@/components/ui/button";
// import {  Loader2 } from "lucide-react";
// import { FaUser } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useMemo, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ArrowLeft, Upload, X, Plus, Save, Camera } from "lucide-react";
// import { iconObj } from "@/assets/Icons/icons.jsx";
// import { LinkInputDialog } from "./InputLinkDialog";
// import { useEditProfile } from "@/hooks/tanstackHooks/useProfile";
// import { toast } from "sonner";
// import { uploadFileToFirebase } from "@/firebase/functions/uploadFileToFirebase";
// import { deleteFileFromFirebase } from "@/firebase/functions/deleteFileFromFirebase";
// import ProfilePreviewWrapper from "./ProfilePreviewWrapper";

// export const ProfileCard = ({ profile }) => {
//   console.log("profile in profile card", profile);
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activePlatform, setActivePlatform] = useState(null);
//   const [platformLinks, setPlatformLinks] = useState({});
//   const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
//   const [uploadedBanner, setUploadedBanner] = useState(null);
//   const [uploadedProfilePic, setUploadedProfilePic] = useState(null);
//   const [selectedLinks, setSelectedLinks] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { mutate, isPending } = useEditProfile();

//   const {
//     _id,
//     viewId,
//     fullName,
//     designation,
//     profilePic,
//     banner,
//     phoneNumber,
//     socialMedia,
//   } = profile;

//   const handleViewProfile = () => {
//     window.open(`/profile?id=${viewId}`, "_blank", "noopener,noreferrer");
//   };

//     const [showPreview, setShowPreview] = useState(false);
//   const [selectedDesign, setSelectedDesign] = useState("");
//     const handlePreviewClick = (type) => {
//       setSelectedDesign(type);
//       setShowPreview(true);
//     };

//   const handlePlatformClick = (platform) => {
//     setActivePlatform(platform);
//     setIsLinkDialogOpen(true);
//   };

//   const handleLinkSubmit = (platform, link) => {
//     if (!link?.trim()) return;

//     setPlatformLinks((prevLinks) => {
//       const updatedLinks = { ...prevLinks, [platform.name]: link };
//       return updatedLinks;
//     });

//     if (!selectedLinks.includes(platform.name)) {
//       setSelectedLinks((prev) => [...prev, platform.name]);
//     }

//     setActivePlatform(null);
//     setIsLinkDialogOpen(false);

//     console.log("platformLinks", platformLinks);
//   };

//   const handleEditProfile = () => {
//     setIsModalOpen(true);
//   };

//   const [formData, setFormData] = useState({
//     name: "",
//     userName: "",
//     designation: "",
//     brandName: "",
//     bio: "",
//     phoneNo: "",
//     email: "",
//     whatsappNo: "",
//     locationLink: "",
//     designType: "",
//   });

//   useEffect(() => {
//     if (isModalOpen && profile) {
//       setFormData({
//         name: profile.fullName || "",
//         userName: profile.userName || "",
//         designation: profile.designation || "",
//         brandName: profile.brandName || "",
//         bio: profile.bio || "",
//         phoneNo: profile.phoneNumber || "",
//         email: profile.email || "",
//         whatsappNo: profile.watsappNumber || "",
//         locationLink: profile.locationLink || "",
//         banner: profile.banner,
//         profilePic: profile.profilePic,
//         designType: profile.designType,
//       });

//       if (profile.socialMedia?.length) {
//         const initialLinks = {};
//         const initialSelected = [];
//         profile.socialMedia.forEach(({ platform, link }) => {
//           if (platform && link) {
//             initialLinks[platform] = link;
//             initialSelected.push(platform);
//           }
//         });
//         setPlatformLinks(initialLinks);
//         setSelectedLinks(initialSelected);
//       }
//     } else {
//       setUploadedBanner();
//       setUploadedProfilePic();
//     }
//   }, [profile, isModalOpen]);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const removeSelectedLink = (platform) => {
//     setSelectedLinks((prev) => prev.filter((link) => link !== platform));
//   };

//   const validateForm = () => {
//     if (!formData.name.trim()) return "Name is required.";
//     if (
//       !formData.email.trim() ||
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
//     )
//       return "A valid email is required.";
//     if (!formData.phoneNo.trim())
//       return "Phone number must include country code and digits.";
//     if (!formData.designation.trim()) return "Designation is required.";
//     return null;
//   };

//   const handleSaveProfile = async () => {
//     const error = validateForm();
//     if (error) {
//       toast(error);
//       return;
//     }

//     setIsSubmitting(true);
//     let bannerLink = null;
//     let profilePicLink = null;

//     try {
//       if (uploadedBanner) {
//         bannerLink = await uploadFileToFirebase(uploadedBanner, "banners");
//         if (formData.banner && bannerLink) {
//           console.log("Deleting old banner");
//           await deleteFileFromFirebase(formData.banner);
//         }
//       }

//       if (uploadedProfilePic) {
//         profilePicLink = await uploadFileToFirebase(
//           uploadedProfilePic,
//           "profilePics"
//         );
//         if (formData.profilePic && profilePicLink) {
//           console.log("Deleting old profile pic");
//           await deleteFileFromFirebase(formData.profilePic);
//         }
//       }

//       const payload = {
//         _id,
//         fullName: formData.name,
//         userName: formData.userName,
//         designation: formData.designation,
//         brandName: formData.brandName,
//         bio: formData.bio,
//         phoneNumber: formData.phoneNo,
//         email: formData.email,
//         watsappNumber: formData.whatsappNo,
//         locationLink: formData.locationLink,
//         designType: formData.designType,
//         socialMedia: selectedLinks.map((platform) => ({
//           platform,
//           link: platformLinks[platform],
//         })),
//       };

//       if (profilePicLink) payload.profilePic = profilePicLink;
//       else if (formData.profilePic) payload.profilePic = formData.profilePic;

//       if (bannerLink) payload.banner = bannerLink;
//       else if (formData.banner) payload.banner = formData.banner;

//       mutate(payload, {
//         onSuccess: () => {
//           toast("Profile updated successfully");
//           setIsModalOpen(false);
//           setIsSubmitting(false);
//         },
//         onError: (error) => {
//           console.error("Error updating profile:", error);
//           toast("Failed to update profile");
//           setIsSubmitting(false);
//         },
//       });
//     } catch (err) {
//       console.error("Error saving profile:", err);
//       toast("An error occurred while saving the profile.");
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl md:max-w-lg">
//         {/* Banner Image */}
//         <div className="relative h-40 sm:h-48">
//           <img
//             className="w-full h-full object-cover"
//             src={
//               banner ||
//               "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=500&q=60"
//             }
//             alt="Banner"
//           />
//         </div>

//         {/* Profile Content */}
//         <div className="relative -mt-16 px-4 sm:px-6 pb-6">
//           {/* Profile Picture */}
//           <div className="flex justify-center">
//             <div className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-white rounded-full overflow-hidden shadow-md">
//               {profilePic ? (
//                 <img
//                   className="w-full h-full object-cover  bg-gray-200"
//                   src={profilePic}
//                   alt="Profile"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-gray-400">
//                   <FaUser className="w-15 h-15 text-gray-900" />{" "}
//                   {/* Profile icon */}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Profile Details */}
//           <div className="mt-4 text-center">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
//               {fullName || "Unknown"}
//             </h2>
//             <p className="text-sm sm:text-md text-gray-500 truncate">
//               {designation || "Professional"}
//             </p>
//             <p className="text-sm sm:text-md text-gray-500 truncate mt-1">
//               {phoneNumber || "Not Provided"}
//             </p>

//             {/* Social Media Icons */}
//             <div className="flex justify-center mt-2">
//               {socialMedia.length === 0 ? (
//                 <p className="text-center text-gray-500 text-sm sm:text-base">
//                   No social media accounts added yet.
//                 </p>
//               ) : (
//                 <div className="flex flex-wrap justify-center gap-2">
//                   {iconObj
//                     .filter((icon) =>
//                       socialMedia.some(
//                         (s) =>
//                           s.platform.toLowerCase() === icon.name.toLowerCase()
//                       )
//                     )
//                     .slice(0, 7)
//                     .map((platform) => (
//                       <button
//                         key={platform.name}
//                         className="relative flex flex-col items-center justify-center  transition-all duration-200 hover:scale-105"
//                       >
//                         <div className="w-6 h-6 flex items-center  justify-center">
//                           <img
//                             src={platform.icon}
//                             alt={platform.name}
//                             className="object-contain rounded-sm w-full h-full"
//                           />
//                         </div>
//                       </button>
//                     ))}

//                   {socialMedia.length > 8 && (
//                     <div className="flex items-center justify-center">
//                       <span className="text-lg font-bold text-gray-600">
//                         ...
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-center gap-3 mt-5">
//               <a
//                 href={`#/profile?id=${viewId}`}
//                 target="_blank"
//                 className="bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
//               >
//                 View Profile
//               </a>
//               <button
//                 onClick={handleEditProfile}
//                 className="border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-200"
//               >
//                 Edit Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-white p-0">
//           <DialogHeader className="px-6 pt-6 pb-2 border-b border-gray-200">
//             <DialogTitle className="text-2xl lg:text-3xl font-bold text-gray-900">
//               Edit Profile
//             </DialogTitle>
//           </DialogHeader>

//           <div className="px-6 py-6 space-y-8 overflow-y-auto">
//             {/* Banner and Profile Pic Section */}
//             <div className="relative">
//               <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg relative overflow-hidden">
//                 <img
//                   className="w-full h-full object-cover"
//                   src={
//                     uploadedBanner
//                       ? URL.createObjectURL(uploadedBanner)
//                       : banner
//                       ? banner
//                       : "https://imgs.search.brave.com/frAubFGQzRQqLSUhbacPfS7Z3za8Fqzdf72doBo_tM0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/ODUxLzA4My9zbWFs/bC9ncmF5LWdyYWRp/ZW50LWJhY2tncm91/bmQtZGVzaWduLWZv/ci1mbHllci1iYW5u/ZXItZmx5ZXItZ3Jl/ZXRpbmctY2FyZC13/YWxscGFwZXItZnJl/ZS1waG90by5qcGc"
//                   }
//                 />

//                 <label
//                   htmlFor="file2"
//                   className="absolute font-medium top-4 right-4 bg-white px-4 py-2 rounded-full cursor-pointer hover:bg-gray-100 transition"
//                 >
//                   Upload Banner
//                 </label>
//                 <input
//                   id="file2"
//                   type="file"
//                   className="sr-only"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) {
//                       setUploadedBanner(file);
//                     }
//                   }}
//                 />
//               </div>
//               <div className="absolute -bottom-12 left-6">
//                 <div className="relative">
//                   <label htmlFor="profilePic">
//                     <Avatar className="h-30 w-30 border-4 border-white">
//                       <AvatarImage
//                         className="bg-white"
//                         src={
//                           uploadedProfilePic
//                             ? URL.createObjectURL(uploadedProfilePic)
//                             : profilePic
//                             ? profilePic
//                             : "https://imgs.search.brave.com/4OxuyB1uojAnfYwCAh7G29FqAnVEYTpXjk6kBrGKuF8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjAv/OTExLzczMi9zbWFs/bC9wcm9maWxlLWlj/b24tYXZhdGFyLWlj/b24tdXNlci1pY29u/LXBlcnNvbi1pY29u/LWZyZWUtcG5nLnBu/Zw"
//                         }
//                       />

//                       <AvatarFallback className="text-2xl">MS</AvatarFallback>
//                     </Avatar>
//                     <Button
//                       size="icon"
//                       variant="secondary"
//                       className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
//                     >
//                       <Camera className="h-4 w-4" />
//                     </Button>
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     id="profilePic"
//                     className="sr-only"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setUploadedProfilePic(file);
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Profile Information */}
//             <div className="pt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[
//                 { id: "name", label: "Name" },
//                 { id: "userName", label: "User Name" },
//                 { id: "designation", label: "Designation" },
//                 {
//                   id: "brandName",
//                   label: "Brand Name",
//                   placeholder: "Brand Name",
//                 },
//               ].map(({ id, label, placeholder }) => (
//                 <div className="space-y-2" key={id}>
//                   <Label htmlFor={id}>{label}</Label>
//                   <Input
//                     id={id}
//                     value={formData[id]}
//                     onChange={(e) => handleInputChange(id, e.target.value)}
//                     placeholder={placeholder || ""}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Design Type as Cards with Previews */}
//             <div className="space-y-4">
//               <Label>Design Type</Label>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 {[
//                   {
//                     type: "black",
//                     label: "Black",
//                     theme: "bg-gray-800 text-white",
//                     bgColor: "bg-gray-700",
//                   },
//                   {
//                     type: "premier",
//                     label: "Premier",
//                     theme: "bg-purple-100 text-gray-800",
//                     bgColor: "bg-purple-200",
//                   },
//                   {
//                     type: "elite",
//                     label: "Elite",
//                     theme: "bg-blue-100 text-gray-800",
//                     bgColor: "bg-blue-200",
//                   },
//                 ].map(({ type, label, theme, bgColor }) => (
//                   <Card
//                     key={type}
//                     onClick={() => handleInputChange("designType", type)}
//                     className={`cursor-pointer ${bgColor} transition-shadow hover:shadow-lg flex p-0 overflow-hidden flex-col ${
//                       formData.designType === type
//                         ? "border-2 border-blue-500"
//                         : "border border-gray-200"
//                     }`}
//                   >
//                     <CardHeader className={`p-4`}>
//                       <CardTitle className="text-lg">{label}</CardTitle>
//                     </CardHeader>

//                     {/* flex-1 makes CardContent fill remaining height, ensuring equal cards */}
//                     <CardContent className={`p-4 ${theme} flex-1 !mb-0`}>
//                       <div className="flex flex-col gap-2 text-sm h-full">
//                         <div className="flex items-center gap-2">
//                           <Avatar className="h-8 w-8">
//                             {formData.profilePic ? (
//                               <AvatarImage
//                                 src={formData.profilePic}
//                                 alt="Profile"
//                               />
//                             ) : (
//                               <AvatarFallback>DD</AvatarFallback>
//                             )}
//                           </Avatar>

//                           <div>
//                             <p className="font-bold">{formData.name}</p>
//                             <p className="text-xs">{formData.designation}</p>
//                           </div>
//                         </div>
//                         <p className="text-xs mt-auto">
//                           Click to{" "}
//                           <a
//                             href={`/profile/preview/${type.toLowerCase()}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-500 underline hover:text-blue-600"
//                           >
//                             view preview
//                           </a>{" "}
//                           of the {label} design.
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="bio">Bio</Label>
//               <Textarea
//                 id="bio"
//                 value={formData.bio}
//                 onChange={(e) => handleInputChange("bio", e.target.value)}
//                 placeholder="Add a cover letter or anything else you want to share."
//                 rows={4}
//               />
//             </div>

//             {/* Contact Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[
//                 { id: "phoneNo", label: "Phone No" },
//                 { id: "email", label: "Email", type: "email" },
//                 { id: "whatsappNo", label: "WhatsApp No" },
//                 { id: "locationLink", label: "Location Link" },
//               ].map(({ id, label, type = "text" }) => (
//                 <div className="space-y-2" key={id}>
//                   <Label htmlFor={id}>{label}</Label>
//                   {id === "phoneNo" || id === "whatsappNo" ? (
//                     <div className="flex">
//                       <Input
//                         id={id}
//                         type={type}
//                         value={formData[id].replace("+", "")}
//                         onChange={(e) =>
//                           handleInputChange(id, "+" + e.target.value)
//                         }
//                         className="rounded-l-none"
//                       />
//                     </div>
//                   ) : (
//                     <Input
//                       id={id}
//                       type={type}
//                       value={formData[id]}
//                       onChange={(e) => handleInputChange(id, e.target.value)}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Social Links */}
//             <div className="space-y-4">
//               <Label>Social Links</Label>
//               <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
//                 {iconObj.map((platform) => (
//                   <button
//                     key={platform.name}
//                     onClick={() => handlePlatformClick(platform)}
//                     className={`relative flex flex-col items-center justify-center rounded-xl transition-all duration-200 hover:scale-105`}
//                   >
//                     <div
//                       className={`w-18 h-18 rounded-xl flex items-center justify-center ${
//                         selectedLinks.includes(platform.name)
//                           ? "border-4 border-blue-500"
//                           : "border border-gray-200"
//                       }`}
//                     >
//                       <img
//                         src={platform.icon}
//                         alt={platform.name}
//                         className="w-18 h-18 object-contain rounded-2xl"
//                       />
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               {selectedLinks.length > 0 && (
//                 <div className="space-y-4 pt-4">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-semibold text-gray-800">
//                       Selected Links
//                     </h3>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedLinks.map((link) => (
//                       <Badge
//                         key={link}
//                         variant="secondary"
//                         className="px-3 py-1 text-sm"
//                       >
//                         {link}
//                         <button
//                           onClick={() => removeSelectedLink(link)}
//                           className="ml-2 hover:text-red-500"
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Actions */}
//             <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setIsModalOpen(false);
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleSaveProfile} disabled={isSubmitting}>
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-4 w-4 mr-2" />
//                     Save Profile
//                   </>
//                 )}
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {activePlatform && (
//         <LinkInputDialog
//           open={isLinkDialogOpen}
//           platform={activePlatform}
//           onClose={() => {
//             setActivePlatform(null);
//             setIsLinkDialogOpen(false);
//           }}
//           onSubmit={handleLinkSubmit}
//         />
//       )}
//     </>
//   );
// };















"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Upload, X, Plus, Save, Camera } from "lucide-react";
import { iconObj } from "@/assets/Icons/icons.jsx";
import { LinkInputDialog } from "./InputLinkDialog";
import { useEditProfile } from "@/hooks/tanstackHooks/useProfile";
import { toast } from "sonner";
import { uploadFileToFirebase } from "@/firebase/functions/uploadFileToFirebase";
import { deleteFileFromFirebase } from "@/firebase/functions/deleteFileFromFirebase";
import ProfilePreviewWrapper from "./ProfilePreviewWrapper";

export const ProfileCard = ({ profile }) => {
  console.log("profile in profile card", profile);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // No longer used for edit modal
  const [activePlatform, setActivePlatform] = useState(null);
  const [platformLinks, setPlatformLinks] = useState({});
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [uploadedBanner, setUploadedBanner] = useState(null);
  const [uploadedProfilePic, setUploadedProfilePic] = useState(null);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate, isPending } = useEditProfile();

  const {
    _id,
    viewId,
    fullName,
    designation,
    profilePic,
    banner,
    phoneNumber,
    socialMedia,
  } = profile;

  const handleViewProfile = () => {
    window.open(`/profile?id=${viewId}`, "_blank", "noopener,noreferrer");
  };

  const [showPreview, setShowPreview] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState("");
  const handlePreviewClick = (type) => {
    setSelectedDesign(type);
    setShowPreview(true);
  };

  const handlePlatformClick = (platform) => {
    setActivePlatform(platform);
    setIsLinkDialogOpen(true);
  };

  const handleLinkSubmit = (platform, link) => {
    if (!link?.trim()) return;

    setPlatformLinks((prevLinks) => {
      const updatedLinks = { ...prevLinks, [platform.name]: link };
      return updatedLinks;
    });

    if (!selectedLinks.includes(platform.name)) {
      setSelectedLinks((prev) => [...prev, platform.name]);
    }

    setActivePlatform(null);
    setIsLinkDialogOpen(false);

    console.log("platformLinks", platformLinks);
  };

  const handleEditProfile = () => {
    // Instead of opening modal, navigate to edit page with profile state
    navigate(`/user/profile/edit/${_id}`, { state: { profile } });
  };

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
  });

  useEffect(() => {
    if (isModalOpen && profile) {
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
      setUploadedBanner();
      setUploadedProfilePic();
    }
  }, [profile, isModalOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const removeSelectedLink = (platform) => {
    setSelectedLinks((prev) => prev.filter((link) => link !== platform));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      return "A valid email is required.";
    if (!formData.phoneNo.trim())
      return "Phone number must include country code and digits.";
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
          console.log("Deleting old banner");
          await deleteFileFromFirebase(formData.banner);
        }
      }

      if (uploadedProfilePic) {
        profilePicLink = await uploadFileToFirebase(
          uploadedProfilePic,
          "profilePics"
        );
        if (formData.profilePic && profilePicLink) {
          console.log("Deleting old profile pic");
          await deleteFileFromFirebase(formData.profilePic);
        }
      }

      const payload = {
        _id,
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
          setIsModalOpen(false);
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

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl md:max-w-lg">
        {/* Banner Image */}
        <div className="relative h-40 sm:h-48">
          <img
            className="w-full h-full object-cover"
            src={
              banner ||
              "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=500&q=60"
            }
            alt="Banner"
          />
        </div>

        {/* Profile Content */}
        <div className="relative -mt-16 px-4 sm:px-6 pb-6">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-white rounded-full overflow-hidden shadow-md">
              {profilePic ? (
                <img
                  className="w-full h-full object-cover  bg-gray-200"
                  src={profilePic}
                  alt="Profile"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-400">
                  <FaUser className="w-15 h-15 text-gray-900" />{" "}
                  {/* Profile icon */}
                </div>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-4 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
              {fullName || "Unknown"}
            </h2>
            <p className="text-sm sm:text-md text-gray-500 truncate">
              {designation || "Professional"}
            </p>
            <p className="text-sm sm:text-md text-gray-500 truncate mt-1">
              {phoneNumber || "Not Provided"}
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center mt-2">
              {socialMedia.length === 0 ? (
                <p className="text-center text-gray-500 text-sm sm:text-base">
                  No social media accounts added yet.
                </p>
              ) : (
                <div className="flex flex-wrap justify-center gap-2">
                  {iconObj
                    .filter((icon) =>
                      socialMedia.some(
                        (s) =>
                          s.platform.toLowerCase() === icon.name.toLowerCase()
                      )
                    )
                    .slice(0, 7)
                    .map((platform) => (
                      <button
                        key={platform.name}
                        className="relative flex flex-col items-center justify-center  transition-all duration-200 hover:scale-105"
                      >
                        <div className="w-6 h-6 flex items-center  justify-center">
                          <img
                            src={platform.icon}
                            alt={platform.name}
                            className="object-contain rounded-sm w-full h-full"
                          />
                        </div>
                      </button>
                    ))}

                  {socialMedia.length > 8 && (
                    <div className="flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-600">
                        ...
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mt-5">
              <a
                href={`#/profile?id=${viewId}`}
                target="_blank"
                className="bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
              >
                View Profile
              </a>
              <button
                onClick={handleEditProfile}
                className="border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Removed the Dialog for edit profile as it's now a page */}

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
    </>
  );
};