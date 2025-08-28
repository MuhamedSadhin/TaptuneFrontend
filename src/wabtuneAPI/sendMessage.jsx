// import axios from "axios";
// import { toast } from "sonner";

// const handleSendMessage = async (phoneNumber, name) => {
//   const apiToken = import.meta.env.VITE_WHATSAPP_API;
//   const baseUrl = "https://app.wabtune.com/api/v1/whatsapp/";
//   const phoneNumberId = import.meta.env.VITE_PHONE_NO_ID;

//   const getSubscriberUrl = `${baseUrl}subscriber/get`;
//   const createSubscriberUrl = `${baseUrl}subscriber/create`;
//   const sendMessageUrl = `${baseUrl}send/template`;
//   const updateSubscriberUrl = `${baseUrl}subscriber/update`;

//   const templateId = "225578";
//   const mediaUrl =
//     "https%3A%2F%2Fbot-data.s3.ap-southeast-1.wasabisys.com%2Fupload%2F2025%2F8%2Fflowbuilder%2Fflowbuilder-108017-1756191660.jpg";
//   const labelIdToUpdate = "169013";

//   try {
//     // 1. Check if subscriber exists
//     const checkResponse = await axios.post(getSubscriberUrl,  {
//         apiToken,
//         phone_number_id: phoneNumberId,
//         phone_number: phoneNumber,
//     });

//     let canSendMessage = false;

//     if (
//       checkResponse.data.status === "1" &&
//       Array.isArray(checkResponse.data.message) &&
//       checkResponse.data.message.length > 0
//     ) {
//       canSendMessage = true;
//     } else {
//       // 2. Create subscriber if not exists
//       const createResponse = await axios.post(createSubscriberUrl, {
//           apiToken,
//           phoneNumberID: phoneNumberId,
//           name,
//           phoneNumber,
//       });

//       if (createResponse.data.status === "1") {
//         canSendMessage = true;
//       } else {
//         toast.error("Subscriber not created");
//         return; // stop further processing
//       }
//     }

//     if (!canSendMessage) return;

//     // 3. Send WhatsApp message
//     const sendResponse = await axios.post(sendMessageUrl, {
//       apiToken,
//       phone_number_id: phoneNumberId,
//       template_id: templateId,
//       template_header_media_url: mediaUrl,
//       phone_number: phoneNumber,
//     });

//     if (sendResponse.data.status) {
//       toast.success("Message sent successfully");

//       // 4. Update subscriber label
//       try {
//         const updateResponse = await axios.post(updateSubscriberUrl, null, {
//           params: {
//             apiToken,
//             phone_number_id: phoneNumberId,
//             phone_number: phoneNumber,
//             first_name: name,
//             label_ids: labelIdToUpdate,
//           },
//         });

//         if (!updateResponse.data.status) {
//           toast.error("Failed to update subscriber label");
//         } 
//       } catch (updateError) {
//         console.error("Update label error:", updateError);
//         toast.error("Error updating subscriber label");
//       }
//     } else {
//       toast.error("Failed to send message");
//     }
//   } catch (error) {
//     console.error("Error in handleSendMessage:", error);
//     toast.error("An error occurred");
//   }
// };



// export { handleSendMessage };
