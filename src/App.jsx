import { Toaster } from "sonner";
import {  Routes, Route, Outlet, useLocation } from "react-router-dom";
import LoginPage from "./app/auth/LoginPage";
import PageForUser from "./app/user/PageForUser";
import ShowCards from "./app/user/card/ShowCards";
import CardBooking from "./app/user/card/CardBooking";
import ProfilesPage from "./app/user/profile/ProfilePage";
import ConnectionsPage from "./app/user/connections/connectionPage";
import AccountSetupForm from "./app/user/settings/AccountSetting";
import EditProfilePage from "./app/user/profile/EditProfileComp";
import PageForAdmin from "./app/admin/PageForAdmin";
import CardOrder from "./app/admin/cardOrder/CardOrder";
import CardDesignTable from "./app/admin/cardList/CardDesignTable";
import AdminListPage from "./app/admin/adminList/AdminListPage";
import Protect from "./contexts/ProtectRoute";
import UserTable from "./components/adminComponents/userListComp/UserTable";
import ProfileWrapper from "./app/user/externalProfileView.jsx/ProfileWrapper";
import ProfilePreviewWrapper from "./components/userComponents/profileComp/ProfilePreviewWrapper";
import HomePageContent from "./app/user/home/HomePageContent";
import AdminHomepage from "./app/admin/home/AdminHomepage";
import EnquiriesPage from "./app/admin/enquiry/enquiryList";
import HomePage from "./app/staticHome/HomePage";
import AboutPage from "./app/staticHome/AboutPage";
import ContactPage from "./app/staticHome/ContactPage";
import DocPage from "./app/staticHome/DocPage";
import useSmoothScroll from "./hooks/tanstackHooks/useSmoothScroll";


function App() {
  const location = useLocation();

  const enableSmoothScroll = ["/", "/profile","/about-us", "/contact", "/docs","/profile/preview"].includes(
    location.pathname
  );

  useSmoothScroll(enableSmoothScroll);
  // useScrollAnimations();
  // useSmoothScrollGsap();

  return (
    <>
      <Toaster position="bottom-right" richColors />

      <Routes>
        <Route
          element={
            <div id="smooth-wrapper">
              <div className="homepage fontSelectorClass">
                <Outlet />
              </div>
            </div>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/docs" element={<DocPage />} />
        </Route>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/profile" element={<ProfileWrapper />} />
        <Route
          path="profile/preview/:name"
          element={<ProfilePreviewWrapper />}
        />

        {/* Protected User Routes */}
        <Route
          path="/user"
          element={
            <Protect requiredRole={["user", "admin"]}>
              <PageForUser />
            </Protect>
          }
        >
          <Route index element={<HomePageContent />} />
          <Route path="cards" element={<ShowCards />} />
          <Route path="booking/:id" element={<CardBooking />} />
          <Route path="profiles" element={<ProfilesPage />} />
          <Route path="connections" element={<ConnectionsPage />} />
          <Route path="settings" element={<AccountSetupForm />} />
          <Route path="profile/edit/:id" element={<EditProfilePage />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <Protect requiredRole={["admin", "Admin"]}>
              <PageForAdmin />
            </Protect>
          }
        >
          <Route index element={<AdminHomepage />} />
          <Route path="card-order" element={<CardOrder />} />
          <Route path="user-list" element={<UserTable />} />
          <Route path="card-list" element={<CardDesignTable />} />
          <Route path="admin-list" element={<AdminListPage />} />
          <Route path="enquiry" element={<EnquiriesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
