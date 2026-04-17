import { Link, useLocation } from 'react-router-dom';
import { authService } from '@/services';
import { SITE_LOGO_URL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { Home, ArrowLeft } from 'lucide-react';
import {motion} from 'framer-motion';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  const { data: authData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const user = await authService.me();
        return { user, isAuthenticated: true };
      } catch {
        return { user: null, isAuthenticated: false };
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full text-center"
      >
        {/* Logo */}
        <img src={SITE_LOGO_URL} alt="Madrasa Farooqia" className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-border shadow-lg" />

        {/* 404 */}
        <div className="font-playfair text-8xl sm:text-9xl font-bold text-foreground/10 mb-2 leading-none">404</div>
        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-2">
          The page <span className="font-mono bg-secondary px-1.5 py-0.5 rounded text-sm">{pageName || '/'}</span> could not be found.
        </p>
        <p className="font-amiri text-accent text-lg mb-8">وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ</p>

        {authData?.isAuthenticated && authData?.user?.role === 'admin' && (
          <div className="mb-6 p-4 bg-secondary rounded-xl border border-border text-left text-sm">
            <p className="font-semibold text-foreground mb-1">Admin Note</p>
            <p className="text-muted-foreground">This page has not been implemented yet.</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}