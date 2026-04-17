import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Clock, Users, Star, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import InstitutionTabs from '@/components/institutions/InstitutionTabs';

const schedule = [
  { time: 'Fajr – 6:00 AM', activity: 'Morning Hifz Session (2 hrs)' },
  { time: '8:00 AM – 12:00 PM', activity: 'Academic Classes (Tajweed, Arabic, Islamic Studies)' },
  { time: '12:00 PM', activity: 'Zuhr Prayer & Lunch Break' },
  { time: '1:00 PM – 3:00 PM', activity: 'Revision & Individual Practice' },
  { time: 'Asr – 4:00 PM', activity: 'Afternoon Hifz Revision' },
  { time: 'Maghrib – Evening', activity: 'Evening Review with Teacher' },
  { time: 'Isha – Night', activity: 'Final Night Revision & Rest' },
];

const highlights = [
  { icon: BookOpen, label: 'Complete Hifz', desc: 'Full 30-Juz memorisation with strong retention methodology' },
  { icon: Star, label: 'Tajweed Certified', desc: 'All students complete Tajweed with Ijazah-chain teachers' },
  { icon: Users, label: '150+ Huffaz', desc: 'Currently enrolled students in active Hifz program' },
  { icon: Clock, label: '3–5 Year Program', desc: 'Structured timeline tailored to student capacity' },
];

export default function MasjidHifz() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="hero-gradient geometric-pattern pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-amiri text-white/[0.04] text-[28rem] leading-none">ق</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <BookOpen className="w-4 h-4" />
              <span>Quran Memorisation · Madrasa Farooqia</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Masjid & Hifz Program
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              A dedicated Quran memorisation program within our Masjid — where students complete the full Hifz with certified Tajweed in a spiritually enriching environment.
            </p>
            <div className="font-amiri text-3xl text-accent mt-6 mb-2">إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ</div>
            <p className="text-white/40 text-sm italic">"Indeed, it is We who sent down the Quran and indeed, We will be its guardian." — 15:9</p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/donate?purpose=masjid" className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                <Heart className="w-4 h-4" /> Support Hifz Program
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                Enrol a Student <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Institution Tabs */}
      <InstitutionTabs active="masjid" />

      {/* About */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
                <BookOpen className="w-4 h-4" /> About the Program
              </div>
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-6">Why a Separate Hifz Program?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Hifz requires an environment of deep focus, daily discipline, and constant revision. At Madrasa Farooqia, we recognised that Quran memorisation flourishes best in a dedicated setting — separated from general academic pressures.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our Masjid serves as the spiritual centre. Students begin and end each day in the Masjid, connecting their memorisation with prayer and worship — making the Quran a part of their daily lived experience, not just an academic exercise.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-2xl border border-border text-center">
                  <div className="font-playfair text-2xl font-bold text-foreground">150+</div>
                  <div className="text-xs text-muted-foreground mt-1">Current Huffaz Students</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-2xl border border-border text-center">
                  <div className="font-playfair text-2xl font-bold text-foreground">500+</div>
                  <div className="text-xs text-muted-foreground mt-1">Graduated Huffaz</div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
                <img
                  src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&h=420&fit=crop"
                  alt="Quran memorisation"
                  className="w-full h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">Program Highlights</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-background" />
                </div>
                <h3 className="font-playfair font-bold text-foreground mb-2">{label}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">Daily Schedule</h2>
            <p className="text-muted-foreground">A disciplined routine designed for maximum retention and spiritual growth.</p>
          </div>
          <div className="space-y-3">
            {schedule.map(({ time, activity }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 p-4 bg-secondary/30 rounded-2xl border border-border"
              >
                <div className="flex items-center gap-2 min-w-[160px]">
                  <Clock className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm font-medium text-accent">{time}</span>
                </div>
                <div className="text-sm text-foreground">{activity}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="py-16 hero-gradient geometric-pattern">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-playfair text-3xl font-bold text-white mb-4">Support a Hafiz's Journey</h2>
            <p className="text-white/70 mb-8">Sponsor a student's complete Hifz education — an ongoing Sadqa Jariyah for you and your family.</p>
            <Link to="/donate?purpose=masjid" className="inline-flex items-center gap-2 px-8 py-4 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-xl text-lg">
              <Heart className="w-5 h-5" /> Sponsor a Hafiz Student
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}