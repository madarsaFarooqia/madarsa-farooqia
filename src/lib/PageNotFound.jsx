import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { FarooqiaLogo, AuthBackground } from "../assets";
import { useAuth } from './AuthContext';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-background overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{ 
          backgroundImage: `url(${AuthBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Logo */}
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          src={FarooqiaLogo}
          alt="Madrasa Farooqia"
          className="w-32 h-32 mx-auto mb-6 drop-shadow-xl"
        />

        {/* 404 */}
        <div className="font-playfair text-8xl sm:text-9xl font-bold text-primary/10 mb-2 leading-none">404</div>
        <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-foreground mb-3 italic">Page Not Found</h1>
        <p className="text-muted-foreground mb-4 text-lg">
          The page <span className="font-mono bg-primary/10 px-2 py-1 rounded text-sm text-primary font-bold italic">{pageName || '/'}</span> could not be found.
        </p>
        <p className="font-amiri text-primary text-2xl mb-8 font-bold italic">وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ</p>

        {isAuthenticated && user?.role?.toLowerCase() === 'admin' && (
          <div className="mb-8 p-6 bg-primary/5 rounded-2xl border border-primary/20 text-left backdrop-blur-sm">
            <p className="font-bold text-primary mb-1 uppercase tracking-wider text-xs">Administration Note</p>
            <p className="text-muted-foreground italic text-sm">This page hasn't been implemented yet. Contact Administration for more details.</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <Home className="w-5 h-5" /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary/20 text-primary font-bold rounded-xl hover:bg-primary/5 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}