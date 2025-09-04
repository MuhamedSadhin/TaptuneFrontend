export const API_ENDPOINTS = {
  //ADMIN API ENDPOINTS
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
    ISAUTH: "/api/auth/isAuth",
    UPDATESETTINGS: "/api/auth/updateUserSettings",
    LOGOUT: "/api/auth/logout",
  },
  ENQUIRY: {
    GETALLENQUIRY: "/api/enquiry/getAllEnquiry",
    CREATEENQUIRY: "/api/enquiry/createEnquiry",
  },
  CARD: {
    VIEWALLCARDS: "/api/card/viewAllCard",
    VIEWONECARD: "/api/card/viewOneCard",
    CREATECARDANDPROFILE: "/api/card/orderCardAndCreateProfile",
    CREATECARD: "/api/card/createCard",
    EDITCARD: "/api/card/updateCard",
    UPDATEORDERSTATUS: "/api/card/updateOrderStatus",
    EDITISACTIVESTATUS: "/api/card/updateCardStatusIsActive",
  },
  PROFILE: {
    VIEWALLPROFILES: "/api/profile/viewProfilesOfAUser",
    VIEWPROFILEBYTAP: "/api/profile/viewProfileByTap",
    EDITPROFILE: "/api/profile/editProfile",
    UPDATESTATUSOFPROFILE: "/api/profile/updateStatusOfProfile",
    INCREMENTPROFILEVIEWS: "/api/profile/incrementProfileView",
  },
  CONNECTION: {
    VIEWALLCONNECTIONS: "/api/connection/viewAllConnections",
    MAKECONNECTION: "/api/connection/makeConnection",
  },
  ORDER: {
    GETALLORDERS: "/api/order/getAllOrders",
    GETORDERSTATS: "/api/order/getOrderStatistics",
    GETADMINSTATS: "/api/order/adminStats",
    GETORDERANDUSERDATA: "/api/order/getAdminAndUserForAdminHomePage",
    GETCHARTDATA: "/api/order/getChartData",
  },
  USER: {
    GETALLUSERS: "/api/user/getAllUsers",
    GETALLADMINS: "/api/user/getAllAdmins",
    CREATEADMIN: "/api/user/createAdmin",
    UPDATEADMIN: "/api/user/updateAdmin",
    GETHOMEPAGEDATA: "/api/user/homePageData",
  },
  WABTUNE: {
    SENDMESSAGE: "/api/wabtune/sendWabtuneMessage",
  },
  NOTIFICATION: {
    GETALLNOTIFICATIONS: "/api/notification/getAllNotifications",
  },
};
