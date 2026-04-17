import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Shield, BookOpen, Users, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InstitutionTabs from '@/components/institutions/InstitutionTabs';

const courses = [
  { name: 'Hifz al-Quran', desc: 'Complete memorisation of the Holy Quran with Tajweed', duration: '3–4 years' },
  { name: 'Alimah Course', desc: 'Full Dars-e-Nizami curriculum for girls', duration: '7–8 years' },
  { name: 'Tajweed & Quran', desc: 'Correct recitation & pronunciation of the Quran', duration: '1 year' },
  { name: 'Islamic Studies', desc: 'Aqeedah, Fiqh, Seerah & Arabic language basics', duration: '2 years' },
];

const highlights = [
  { icon: Shield, label: 'Safe Environment', desc: 'Fully segregated, secure & female-supervised campus' },
  { icon: Users, label: '300+ Students', desc: 'Active enrollment with qualified female teachers' },
  { icon: Heart, label: 'Nurturing Culture', desc: 'Islamic values, discipline & personal growth' },
  { icon: Star, label: 'Qualified Staff', desc: 'All female teaching staff with Alimah qualifications' },
];

export default function Niswaan() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="hero-gradient geometric-pattern pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-amiri text-white/[0.04] text-[28rem] leading-none">ن</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <GraduationCap className="w-4 h-4" />
              <span>Girls Madrasa · Madrasa Farooqia</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Niswaan Branch
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              A dedicated Islamic education institution for girls — offering a safe, nurturing environment rooted in Quran, Sunnah, and scholarship.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/donate?purpose=niswaan" className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                <Heart className="w-4 h-4" /> Support Niswaan
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                Enquire About Admission <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Institution Tabs */}
      <InstitutionTabs active="niswaan" />

      {/* Introduction */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
                <BookOpen className="w-4 h-4" /> About Niswaan
              </div>
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-6">Empowering Muslim Women Through Knowledge</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Niswaan Branch of Madrasa Farooqia was established to provide high-quality Islamic education exclusively for girls in a safe, fully segregated environment. Our mission is to produce Alimaat, Hafizaat, and knowledgeable Muslim women who can serve their families and communities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                All teaching staff are qualified female scholars. The campus is entirely separate from the boys' section, with strict security and a nurturing Islamic environment.
              </p>
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-2xl border border-border">
                <div className="font-amiri text-4xl text-accent">وَعَلَّمَكَ</div>
                <p className="text-sm text-muted-foreground italic">"And He taught you what you did not know." — Quran 4:113</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
                <img
                  src="https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=600&h=420&fit=crop"
                  alt="Islamic girls education"
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
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">Why Choose Niswaan?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A unique institution built specifically for the Islamic education of Muslim women.</p>
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

      {/* Courses */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">Courses Offered</h2>
            <p className="text-muted-foreground">Structured Islamic academic programs for girls of all ages.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {courses.map(({ name, desc, duration }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-5 bg-secondary/30 rounded-2xl border border-border"
              >
                <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-background" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">{name}</div>
                  <div className="text-sm text-muted-foreground mb-2">{desc}</div>
                  <div className="inline-block text-xs font-medium px-2 py-1 bg-accent/20 text-accent rounded-full">Duration: {duration}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="py-16 hero-gradient geometric-pattern">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-playfair text-3xl font-bold text-white mb-4">Support Girls' Education</h2>
            <p className="text-white/70 mb-8">Your donation directly funds scholarships, teacher salaries, and infrastructure for the Niswaan Branch.</p>
            <Link to="/donate?purpose=niswaan" className="inline-flex items-center gap-2 px-8 py-4 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-xl text-lg">
              <Heart className="w-5 h-5" /> Donate to Niswaan
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}