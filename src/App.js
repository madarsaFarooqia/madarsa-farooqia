// import { Toaster } from "./components/ui/toaster";
// import { Toaster as SonnerToaster } from "sonner";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClientInstance } from "./lib/query-client";
// // import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";

// import { AuthProvider, useAuth } from "./lib/AuthContext";
// import { LanguageProvider } from "./lib/LanguageContext";

// import PageNotFound from "./lib/PageNotFound";
// import UserNotRegisteredError from "./components/UserNotRegisteredError";
// import LoadingSpinner from "./components/shared/LoadingSpinner";

// import Layout from "./components/layout/Layout";

// // Public pages
// import Home from "./pages/Home";
// import Teachers from "./pages/Teachers";
// import Donate from "./pages/Donate";
// import Fundraising from "./pages/Fundraising";
// import Contact from "./pages/Contact";
// import MyDonations from "./pages/MyDonations";
// import Payment from "./pages/Payment";
// import ComingSoon from "./pages/ComingSoon";
// import Niswaan from "./pages/Niswaan";
// import MasjidHifz from "./pages/MasjidHifz";
// import ReceiptViewer from "./pages/ReceiptViewer";

// // Auth pages
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import ResetPassword from "./pages/auth/ResetPassword";

// // Admin
// import AdminLayout from "./pages/admin/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import TeachersAdmin from "./pages/admin/TeachersAdmin";
// import StudentsAdmin from "./pages/admin/StudentsAdmin";
// import EventsAdmin from "./pages/admin/EventsAdmin";
// import RegistrationsAdmin from "./pages/admin/RegistrationsAdmin";
// import CampaignsPro from "./pages/admin/CampaignsPro";
// import DonationsPro from "./pages/admin/DonationsPro";
// import ReportsAdmin from "./pages/admin/ReportsAdmin";
// import BlogAdmin from "./pages/admin/BlogAdmin";
// import QAAdmin from "./pages/admin/QAAdmin";
// import InfrastructureAdmin from "./pages/admin/InfrastructureAdmin";

// /* ---------------- AUTH LOADING WRAPPER ---------------- */

// const AuthenticatedApp = () => {
//   const { isLoadingAuth, isLoadingPublicSettings, authError, user } = useAuth();

//   if (isLoadingPublicSettings || isLoadingAuth) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-background flex-col gap-4">
//         <LoadingSpinner size="lg" />
//         <p className="font-amiri text-xl text-muted-foreground">
//           بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
//         </p>
//       </div>
//     );
//   }

//   if (authError?.type === "user_not_registered") {
//     return <UserNotRegisteredError />;
//   }

//   /* ---------------- ROUTES ---------------- */

//   return (
//     <Routes>
//       {/* ================= AUTH ROUTES (NO LAYOUT) ================= */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password/:token" element={<ResetPassword />} />

//       {/* ================= PUBLIC APP (WITH LAYOUT) ================= */}
//       <Route element={<Layout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/teachers" element={<Teachers />} />
//         <Route path="/donate" element={<Donate />} />
//         <Route path="/fundraising" element={<Fundraising />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/my-donations" element={<MyDonations />} />
//         <Route path="/payment" element={<Payment />} />
//         <Route path="/coming-soon" element={<ComingSoon />} />
//         <Route path="/niswaan" element={<Niswaan />} />
//         <Route path="/masjid-hifz" element={<MasjidHifz />} />
//         <Route path="/receipts" element={<ReceiptViewer />} />
//       </Route>

//       {/* ================= ADMIN ================= */}
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<AdminDashboard />} />
//         <Route path="teachers" element={<TeachersAdmin />} />
//         <Route path="students" element={<StudentsAdmin />} />
//         <Route path="events" element={<EventsAdmin />} />
//         <Route path="registrations" element={<RegistrationsAdmin />} />
//         <Route path="campaigns-pro" element={<CampaignsPro />} />
//         <Route path="donations-pro" element={<DonationsPro />} />
//         <Route path="reports" element={<ReportsAdmin />} />
//         <Route path="blog" element={<BlogAdmin />} />
//         <Route path="messages" element={<QAAdmin />} />
//         <Route path="infrastructure" element={<InfrastructureAdmin />} />
//       </Route>

//       {/* ================= FALLBACK ================= */}
//       <Route path="*" element={<PageNotFound />} />
//     </Routes>
//   );
// };

// /* ---------------- ROOT APP ---------------- */

// function App() {
//   return (
//     <QueryClientProvider client={queryClientInstance}>
//       <AuthProvider>
//         <LanguageProvider>
//           <Router>
//             <AuthenticatedApp />
//           </Router>

//           <Toaster />
//           <SonnerToaster position="top-center" richColors />
//         </LanguageProvider>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;


import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./lib/AuthContext";
import { LanguageProvider } from "./lib/LanguageContext";

import PageNotFound from "./lib/PageNotFound";
import UserNotRegisteredError from "./components/UserNotRegisteredError";
import LoadingSpinner from "./components/shared/LoadingSpinner";

import Layout from "./components/layout/Layout";

// Public pages
import Home from "./pages/Home";
import Teachers from "./pages/Teachers";
import Donate from "./pages/Donate";
import Fundraising from "./pages/Fundraising";
import Contact from "./pages/Contact";
import MyDonations from "./pages/MyDonations";
import Payment from "./pages/Payment";
import ComingSoon from "./pages/ComingSoon";
import Niswaan from "./pages/Niswaan";
import MasjidHifz from "./pages/MasjidHifz";
import ReceiptViewer from "./pages/ReceiptViewer";

// Auth pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeachersAdmin from "./pages/admin/TeachersAdmin";
import StudentsAdmin from "./pages/admin/StudentsAdmin";
import EventsAdmin from "./pages/admin/EventsAdmin";
import RegistrationsAdmin from "./pages/admin/RegistrationsAdmin";
import CampaignsPro from "./pages/admin/CampaignsPro";
import DonationsPro from "./pages/admin/DonationsPro";
import ReportsAdmin from "./pages/admin/ReportsAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import QAAdmin from "./pages/admin/QAAdmin";
import InfrastructureAdmin from "./pages/admin/InfrastructureAdmin";

/* ---------------- AUTH LOADING WRAPPER ---------------- */

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, user } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background flex-col gap-4">
        <LoadingSpinner size="lg" />
        <p className="font-amiri text-xl text-muted-foreground">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>
    );
  }

  if (authError?.type === "user_not_registered") {
    return <UserNotRegisteredError />;
  }

  return (
    <Routes>
      {/* ================= AUTH ROUTES (NO LAYOUT) ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* ================= PUBLIC APP (WITH LAYOUT) ================= */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/fundraising" element={<Fundraising />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-donations" element={<MyDonations />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/niswaan" element={<Niswaan />} />
        <Route path="/masjid-hifz" element={<MasjidHifz />} />
        <Route path="/receipts" element={<ReceiptViewer />} />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="teachers" element={<TeachersAdmin />} />
        <Route path="students" element={<StudentsAdmin />} />
        <Route path="events" element={<EventsAdmin />} />
        <Route path="registrations" element={<RegistrationsAdmin />} />
        <Route path="campaigns-pro" element={<CampaignsPro />} />
        <Route path="donations-pro" element={<DonationsPro />} />
        <Route path="reports" element={<ReportsAdmin />} />
        <Route path="blog" element={<BlogAdmin />} />
        <Route path="messages" element={<QAAdmin />} />
        <Route path="infrastructure" element={<InfrastructureAdmin />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

/* ---------------- ROOT APP ---------------- */

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <AuthenticatedApp />
          </Router>


          <Toaster />
          <SonnerToaster position="top-center" richColors />
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
