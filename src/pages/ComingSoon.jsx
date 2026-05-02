import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, GraduationCap, Star } from 'lucide-react';
import { FarooqiaLogo, AuthBackground } from "@/assets";

const upcomingFeatures = [
  { icon: BookOpen, title: 'Online Courses', desc: 'Full Quran & Islamic Sciences e-learning platform' },
  { icon: GraduationCap, title: 'Student Portal', desc: 'Personal dashboard for enrolled students' },
  { icon: Star, title: 'Alumni Network', desc: 'Connect with thousands of Madrasa Farooqia alumni worldwide' },
];

export default function ComingSoon() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-20 bg-background overflow-hidden">
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
        className="relative z-10 max-w-2xl w-full text-center"
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

        <div className="inline-block px-6 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6 font-amiri tracking-wider italic backdrop-blur-sm">
          قريبًا • Coming Soon
        </div>
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-foreground mb-4 italic">
          Exciting Features Ahead
        </h1>
        <p className="text-muted-foreground text-xl mb-12 max-w-lg mx-auto italic font-medium">
          We're building something remarkable for the global Madrasa Farooqia community. Stay tuned.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {upcomingFeatures.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-card/50 border-2 border-primary/10 rounded-2xl p-6 text-left shadow-xl backdrop-blur-md hover:border-primary/30 transition-all hover:scale-105"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-lg italic">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-lg font-bold text-primary hover:text-primary/80 transition-all hover:scale-105 active:scale-95 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}