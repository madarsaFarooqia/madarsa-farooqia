import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { AuthProvider, useAuth } from './lib/AuthContext';
import { LanguageProvider } from './lib/LanguageContext';
import { queryClientInstance } from './lib/query-client';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import PageNotFound from '@/lib/PageNotFound';

import Home from '@/pages/Home';
import Teachers from '@/pages/Teachers';
import Donate from '@/pages/Donate';
import Fundraising from '@/pages/Fundraising';
import Contact from '@/pages/Contact';
import MyDonations from '@/pages/MyDonations';
import Payment from '@/pages/Payment';
import ComingSoon from '@/pages/ComingSoon';
import Niswaan from '@/pages/Niswaan';
import MasjidHifz from '@/pages/MasjidHifz';
import Campaigns from '@/pages/Campaigns';
import Events from '@/pages/Events';
import Students from '@/pages/Students';

import AdminLayout from '@/pages/admin/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import TeachersAdmin from '@/pages/admin/TeachersAdmin';
import StudentsAdmin from '@/pages/admin/StudentsAdmin';
import EventsAdmin from '@/pages/admin/EventsAdmin';
import CampaignsAdmin from '@/pages/admin/CampaignsAdmin';
import DonationsAdmin from '@/pages/admin/DonationsAdmin';
import RegistrationsAdmin from '@/pages/admin/RegistrationsAdmin';

function AdminGate() {
  const { user, isLoadingAuth } = useAuth();
  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background flex-col gap-4">
        <LoadingSpinner size="lg" />
        <p className="font-amiri text-xl text-muted-foreground">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/fundraising" element={<Fundraising />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/events" element={<Events />} />
        <Route path="/students" element={<Students />} />
        <Route path="/my-donations" element={<MyDonations />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/niswaan" element={<Niswaan />} />
        <Route path="/masjid-hifz" element={<MasjidHifz />} />
      </Route>

      <Route path="/admin" element={<AdminGate />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="teachers" element={<TeachersAdmin />} />
          <Route path="students" element={<StudentsAdmin />} />
          <Route path="events" element={<EventsAdmin />} />
          <Route path="campaigns" element={<CampaignsAdmin />} />
          <Route path="donations" element={<DonationsAdmin />} />
          <Route path="registrations" element={<RegistrationsAdmin />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <LanguageProvider>
          <Router>
            <AuthenticatedApp />
          </Router>
          <SonnerToaster position="top-center" richColors />
        </LanguageProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
