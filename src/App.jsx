


import "./App.css";
import { Toaster } from "sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./app/auth/LoginPage";

// Shared Pages
import ProfileCardView from "./app/user/externalProfileView.jsx/ProfileCardView";

// User Pages
import PageForUser from "./app/user/PageForUser";
import ShowCards from "./app/user/card/ShowCards";
import CardBooking from "./app/user/card/CardBooking";
import ProfilesPage from "./app/user/profile/ProfilePage";
import ConnectionsPage from "./app/user/connections/connectionPage";
import AccountSetupForm from "./app/user/settings/AccountSetting";
import EditProfilePage from "./app/user/profile/EditProfileComp";

// Admin Pages
import PageForAdmin from "./app/admin/PageForAdmin";
import CardOrder from "./app/admin/cardOrder/CardOrder";
import UserList from "./app/admin/userList/UserList";
import CardDesignTable from "./app/admin/cardList/CardDesignTable";
import AdminListPage from "./app/admin/adminList/AdminListPage";
import Protect from "./contexts/ProtectRoute";
import CardOrdersPage from "./app/sampleJsx";
import UserTable from "./components/adminComponents/userListComp/UserTable";
import PremiumProfile from "./app/user/externalProfileView.jsx/profileBlackPremium";
import ProfilePage from "./app/user/externalProfileView.jsx/profileBlackPremium";
import ProfilePremiumBlack from "./app/user/externalProfileView.jsx/profileBlackPremium";
import ProfileElite from "./app/user/externalProfileView.jsx/ProfileElite";
import ProfilePremium from "./app/user/externalProfileView.jsx/ProfileCardView";
import ProfileWrapper from "./app/user/externalProfileView.jsx/ProfileWrapper";
import ProfilePreviewWrapper from "./components/userComponents/profileComp/ProfilePreviewWrapper";
import HomePageContent from "./app/user/home/HomePageContent";
import AdminHomepage from "./app/admin/home/AdminHomepage";
import EnquiriesPage from "./app/admin/enquiry/enquiryList";

// Auth Protection

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" richColors />

      <Routes>
        {/* Public */}
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
            <Protect requiredRole={["admin","Admin"]}>
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
    </Router>
  );
}

export default App;
