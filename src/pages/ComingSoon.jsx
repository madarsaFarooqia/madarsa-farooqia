import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, BookOpen, GraduationCap, Star } from 'lucide-react';

const upcomingFeatures = [
  { icon: BookOpen, title: 'Online Courses', desc: 'Full Quran & Islamic Sciences e-learning platform' },
  { icon: GraduationCap, title: 'Student Portal', desc: 'Personal dashboard for enrolled students' },
  { icon: Star, title: 'Alumni Network', desc: 'Connect with thousands of Madrasa Farooqia alumni worldwide' },
];

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Logo hint */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-primary flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-accent" />
        </div>
        <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4 font-amiri tracking-wider">
          قريبًا • Coming Soon
        </div>
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Exciting Features Ahead
        </h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto">
          We're building something remarkable for the global Madrasa Farooqia community. Stay tuned.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {upcomingFeatures.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-5 text-left shadow-sm"
            >
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}