import vCard from "vcards-js";


export const downloadVCard = (contact) => {
  try {
    const myVCard = vCard();

    // Basic fields
    myVCard.firstName = contact.name || "";
    myVCard.email = contact.email || "";
    myVCard.cellPhone = contact.phoneNumber || contact.phoneNo || "";
    myVCard.title = contact.designation || "";

    // Custom note (optional)
    myVCard.note = `Connected via profile: ${contact.profileName || ""}`;

    // Filename
    const fileName = `${(contact.name || "contact").replace(/\s+/g, "_")}.vcf`;

    // Convert to blob & trigger download
    const vCardString = myVCard.getFormattedString();
    const blob = new Blob([vCardString], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
  } catch (err) {
    console.error("Error creating vCard:", err);
  }
};
