// import React from 'react';
// import { motion } from 'framer-motion';
// import { BookOpen, Heart, Clock, Users, Star, ChevronRight, Calendar } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import InstitutionTabs from '@/components/institutions/InstitutionTabs';

// const schedule = [
//   { time: 'Fajr – 6:00 AM', activity: 'Morning Hifz Session (2 hrs)' },
//   { time: '8:00 AM – 12:00 PM', activity: 'Academic Classes (Tajweed, Arabic, Islamic Studies)' },
//   { time: '12:00 PM', activity: 'Zuhr Prayer & Lunch Break' },
//   { time: '1:00 PM – 3:00 PM', activity: 'Revision & Individual Practice' },
//   { time: 'Asr – 4:00 PM', activity: 'Afternoon Hifz Revision' },
//   { time: 'Maghrib – Evening', activity: 'Evening Review with Teacher' },
//   { time: 'Isha – Night', activity: 'Final Night Revision & Rest' },
// ];

// const highlights = [
//   { icon: BookOpen, label: 'Complete Hifz', desc: 'Full 30-Juz memorisation with strong retention methodology' },
//   { icon: Star, label: 'Tajweed Certified', desc: 'All students complete Tajweed with Ijazah-chain teachers' },
//   { icon: Users, label: '150+ Huffaz', desc: 'Currently enrolled students in active Hifz program' },
//   { icon: Clock, label: '3–5 Year Program', desc: 'Structured timeline tailored to student capacity' },
// ];

// export default function MasjidHifz() {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero */}
//       <section className="hero-gradient geometric-pattern pt-32 pb-24 relative overflow-hidden">
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
//           <span className="font-amiri text-white/[0.04] text-[28rem] leading-none">ق</span>
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
//             <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
//               <BookOpen className="w-4 h-4" />
//               <span>Quran Memorisation · Madrasa Farooqia</span>
//             </div>
//             <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
//               Masjid & Hifz Program
//             </h1>
//             <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
//               A dedicated Quran memorisation program within our Masjid — where students complete the full Hifz with certified Tajweed in a spiritually enriching environment.
//             </p>
//             <div className="font-amiri text-3xl text-accent mt-6 mb-2">إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ</div>
//             <p className="text-white/40 text-sm italic">"Indeed, it is We who sent down the Quran and indeed, We will be its guardian." — 15:9</p>
//             <div className="flex flex-wrap justify-center gap-4 mt-8">
//               <Link to="/donate?purpose=masjid" className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
//                 <Heart className="w-4 h-4" /> Support Hifz Program
//               </Link>
//               <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
//                 Enrol a Student <ChevronRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Institution Tabs */}
//       <InstitutionTabs active="masjid" />

//       {/* About */}
//       <section className="py-16 bg-card">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-14 items-center">
//             <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
//               <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
//                 <BookOpen className="w-4 h-4" /> About the Program
//               </div>
//               <h2 className="font-playfair text-3xl font-bold text-foreground mb-6">Why a Separate Hifz Program?</h2>
//               <p className="text-muted-foreground leading-relaxed mb-4">
//                 Hifz requires an environment of deep focus, daily discipline, and constant revision. At Madrasa Farooqia, we recognised that Quran memorisation flourishes best in a dedicated setting — separated from general academic pressures.
//               </p>
//               <p className="text-muted-foreground leading-relaxed mb-6">
//                 Our Masjid serves as the spiritual centre. Students begin and end each day in the Masjid, connecting their memorisation with prayer and worship — making the Quran a part of their daily lived experience, not just an academic exercise.
//               </p>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="p-4 bg-secondary/50 rounded-2xl border border-border text-center">
//                   <div className="font-playfair text-2xl font-bold text-foreground">150+</div>
//                   <div className="text-xs text-muted-foreground mt-1">Current Huffaz Students</div>
//                 </div>
//                 <div className="p-4 bg-secondary/50 rounded-2xl border border-border text-center">
//                   <div className="font-playfair text-2xl font-bold text-foreground">500+</div>
//                   <div className="text-xs text-muted-foreground mt-1">Graduated Huffaz</div>
//                 </div>
//               </div>
//             </motion.div>
//             <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
//               <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
//                 <img
//                   src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&h=420&fit=crop"
//                   alt="Quran memorisation"
//                   className="w-full h-80 object-cover"
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Highlights */}
//       <section className="py-16 bg-secondary/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">Program Highlights</h2>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {highlights.map(({ icon: Icon, label, desc }, i) => (
//               <motion.div
//                 key={label}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-card rounded-2xl p-6 border border-border shadow-sm text-center"
//               >
//                 <div className="w-12 h-12 bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-4">
//                   <Icon className="w-6 h-6 text-background" />
//                 </div>
//                 <h3 className="font-playfair font-bold text-foreground mb-2">{label}</h3>
//                 <p className="text-sm text-muted-foreground">{desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Daily Schedule */}
//       <section className="py-16 bg-card">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">Daily Schedule</h2>
//             <p className="text-muted-foreground">A disciplined routine designed for maximum retention and spiritual growth.</p>
//           </div>
//           <div className="space-y-3">
//             {schedule.map(({ time, activity }, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.07 }}
//                 className="flex items-center gap-4 p-4 bg-secondary/30 rounded-2xl border border-border"
//               >
//                 <div className="flex items-center gap-2 min-w-[160px]">
//                   <Clock className="w-4 h-4 text-accent shrink-0" />
//                   <span className="text-sm font-medium text-accent">{time}</span>
//                 </div>
//                 <div className="text-sm text-foreground">{activity}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Donate CTA */}
//       <section className="py-16 hero-gradient geometric-pattern">
//         <div className="max-w-3xl mx-auto px-4 text-center">
//           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
//             <h2 className="font-playfair text-3xl font-bold text-white mb-4">Support a Hafiz's Journey</h2>
//             <p className="text-white/70 mb-8">Sponsor a student's complete Hifz education — an ongoing Sadqa Jariyah for you and your family.</p>
//             <Link to="/donate?purpose=masjid" className="inline-flex items-center gap-2 px-8 py-4 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-xl text-lg">
//               <Heart className="w-5 h-5" /> Sponsor a Hafiz Student
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Heart,
  Clock,
  Users,
  Star,
  ChevronRight,
  Calendar,
  FileText,
  Award,
  Hash,
  CheckCircle2,
  Youtube,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import InstitutionTabs from "@/components/institutions/InstitutionTabs";

const schedule = [
  {
    time: "Fajr – 5:30 AM",
    activity: "Morning Hifz Session (Sabaq & Manzil)",
    icon: "🌅",
  },
  {
    time: "7:30 AM – 8:00 AM",
    activity: "Breakfast & Personal Time",
    icon: "🍽️",
  },
  {
    time: "8:00 AM – 12:00 PM",
    activity: "Academic Classes (Tajweed, Arabic, Islamic Studies)",
    icon: "📚",
  },
  { time: "12:00 PM", activity: "Zuhr Prayer, Lunch & Rest", icon: "🕌" },
  {
    time: "1:30 PM – 3:30 PM",
    activity: "Para Revision & Individual Practice",
    icon: "📖",
  },
  {
    time: "4:00 PM",
    activity: "Asr Prayer — Group Hifz Review with Teacher",
    icon: "🤲",
  },
  {
    time: "6:30 PM",
    activity: "Maghrib Prayer & Quran Recitation Circle",
    icon: "🌙",
  },
  {
    time: "8:00 PM",
    activity: "Isha Prayer — Final Night Revision Session",
    icon: "⭐",
  },
  { time: "9:30 PM", activity: "Lights out — Rest & Recovery", icon: "💤" },
];

const documents = [
  {
    title: "Masjid Registration",
    number: "WAQF/UP/MAU/2001/0892",
    authority: "UP Waqf Board",
    year: 2001,
    status: "Valid",
  },
  {
    title: "Hifz Program Approval",
    number: "UBSM/2002/HFZ/312",
    authority: "UP Madrasa Education Board",
    year: 2002,
    status: "Approved",
  },
  {
    title: "Trust Deed",
    number: "TRUST/MAU/2001/045",
    authority: "Sub-Registrar Office, Mau",
    year: 2001,
    status: "Registered",
  },
  {
    title: "Fire & Safety NOC",
    number: "FIRE/MAU/2022/1183",
    authority: "Fire Safety Dept., Mau Municipality",
    year: 2022,
    status: "Cleared",
  },
  {
    title: "80G Tax Exemption",
    number: "80G/UP/MAU/2005/009",
    authority: "Income Tax Department, India",
    year: 2005,
    status: "Valid",
  },
  {
    title: "FCRA Registration",
    number: "FCRA/2015/0012345",
    authority: "Ministry of Home Affairs",
    year: 2015,
    status: "Valid",
  },
];

const milestones = [
  {
    year: 1999,
    event:
      "Masjid established at Husianabad, Mau — the founding institution of Madrasa Farooqia",
  },
  {
    year: 2001,
    event:
      "Hifz program officially started — first batch of 15 students enrolled",
  },
  {
    year: 2002,
    event:
      "Affiliation obtained from UP Madrasa Education Board for Hifz studies",
  },
  {
    year: 2005,
    event:
      "First graduating class — 6 students completed full 30-Juz Hifz with Ijazah",
  },
  {
    year: 2007,
    event:
      "Masjid building extended — new Hifz hall with capacity for 100 students built",
  },
  {
    year: 2010,
    event:
      "Residential facilities constructed — enabling students from distant areas",
  },
  {
    year: 2014,
    event:
      "Tajweed certification program introduced — linked to Egyptian Ijazah chain",
  },
  {
    year: 2018,
    event: "Audio-visual Tajweed lab established for precision learning",
  },
  {
    year: 2020,
    event:
      "Online Hifz monitoring system launched — parents can track daily progress",
  },
  {
    year: 2022,
    event:
      "500th Hafiz graduated from the program — community celebration event",
  },
  {
    year: 2024,
    event:
      "New wudu area and expanded Masjid hall completed — capacity 800+ worshippers",
  },
];

const teachers = [
  {
    name: "Qari Mohammad Hafiz Sahib",
    qual: "Hafiz with Ijazah from Deoband",
    subjects: "Hifz, Tajweed",
    exp: "22 yrs",
  },
  {
    name: "Maulana Abdul Rahman",
    qual: "Alim, Darul Uloom Deoband",
    subjects: "Tajweed Rules, Quran Sciences",
    exp: "18 yrs",
  },
  {
    name: "Qari Yusuf Khan",
    qual: "Huffaz, Certified Muallim",
    subjects: "Individual Hifz Sessions",
    exp: "15 yrs",
  },
  {
    name: "Maulana Ibrahim Sahib",
    qual: "Arabic & Tajweed Expert",
    subjects: "Makhaarij, Applied Tajweed",
    exp: "12 yrs",
  },
];

const islamicEquations = [
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship comes ease.",
    source: "Quran 94:6",
  },
  {
    arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا",
    translation: "Hold firmly to the rope of Allah, all of you together.",
    source: "Quran 3:103",
  },
  {
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translation: "The best of you are those who learn the Quran and teach it.",
    source: "Sahih Bukhari",
  },
];

const faqs = [
  {
    q: "Who established the Masjid and when?",
    a: "The Masjid was established in 1999 by Hazrat Maulana Mohammad Farooq Sahib as the spiritual and educational heart of what would become Madrasa Farooqia. It serves as the daily prayer centre for all students and teachers.",
  },
  {
    q: "What makes the Hifz program unique?",
    a: "Our program is based on the traditional Dars method with modern tracking. Each student has a personal Hafiz teacher, daily individualised sessions, and weekly assessments. The curriculum is affiliated with UP Madrasa Board and includes Tajweed with an unbroken Ijazah chain.",
  },
  {
    q: "How long does it take to complete Hifz?",
    a: "On average, 3–4 years for dedicated students. Some exceptional students complete it in 2.5 years. The program is flexible based on individual capacity, without rushing quality.",
  },
  {
    q: "Is this open to day students or residential only?",
    a: "Both. Local students may attend as day scholars. Students from other cities/states can avail the residential facilities at minimal cost. Full scholarships are available for deserving students.",
  },
];

export default function MasjidHifz() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="hero-gradient geometric-pattern pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-amiri text-white/[0.04] text-[28rem] leading-none">
            ق
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <BookOpen className="w-4 h-4" />
              <span>Quran Memorisation · Est. 1999 · Madrasa Farooqia</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Masjid & Hifz Program
            </h1>
            <div className="font-amiri text-2xl text-accent mb-2">
              إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ
            </div>
            <p className="text-white/40 text-sm italic mb-6">
              "Indeed, it is We who sent down the Quran and indeed, We will be
              its guardian." — Quran 15:9
            </p>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              A dedicated Quran memorisation program within our Masjid — where
              students complete full Hifz with certified Tajweed since 1999.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { val: "500+", lbl: "Graduated Huffaz" },
                { val: "150+", lbl: "Current Students" },
                { val: "25 yrs", lbl: "Serving Community" },
                { val: "Ijazah", lbl: "Certified Chain" },
              ].map(({ val, lbl }) => (
                <div
                  key={lbl}
                  className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center"
                >
                  <div className="font-playfair font-bold text-white text-xl">
                    {val}
                  </div>
                  <div className="text-white/60 text-xs">{lbl}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/donate?purpose=masjid"
                className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 shadow-lg"
              >
                <Heart className="w-4 h-4" /> Support Hifz Program
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                Enrol a Student <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InstitutionTabs active="masjid" />

      {/* About & Founding */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
                <BookOpen className="w-4 h-4" /> The Founding Story
              </div>
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-6">
                A Masjid First, Then a Madrasa
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Everything began in{" "}
                <strong className="text-foreground">1999</strong> when Hazrat
                Maulana Mohammad Farooq Sahib established a small Masjid in
                Husianabad, Mau — a neighbourhood where children had nowhere to
                learn the Quran properly.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Within two years, the Masjid became an informal Hifz circle.
                Parents from across Mau district brought their sons to memorise
                the Quran. What started as 15 students grew into a structured,
                board-affiliated Hifz program.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Today, the Masjid is the spiritual heart of Madrasa Farooqia —
                all students and teachers begin and end their day here. The Hifz
                program has produced over 500 Huffaz who now lead prayers, teach
                in madrasas, and serve communities across India and the world.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-2xl border border-border text-center">
                  <div className="font-playfair text-2xl font-bold text-foreground">
                    500+
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Huffaz Graduated
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-2xl border border-border text-center">
                  <div className="font-playfair text-2xl font-bold text-foreground">
                    800+
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Masjid Capacity
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
                <img
                  src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&h=420&fit=crop"
                  alt="Quran memorisation"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-2xl flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    Husianabad Main Masjid
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Mau, Uttar Pradesh 275101, India
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Husianabad,Mau,Uttar+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto text-xs text-accent hover:underline flex items-center gap-1"
                >
                  Map <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Islamic Equations / Verses */}
      <section className="py-12 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {islamicEquations.map((eq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="font-amiri text-2xl text-accent mb-3 leading-relaxed">
                  {eq.arabic}
                </div>
                <p className="text-background/70 text-sm italic mb-2">
                  "{eq.translation}"
                </p>
                <p className="text-background/40 text-xs">— {eq.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
              <FileText className="w-4 h-4" /> 100% Transparent
            </div>
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
              Official Documents & Licenses
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              All registrations, approvals and legal documents are publicly
              verifiable.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-background" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-foreground text-background font-medium">
                    {doc.status}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {doc.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-accent font-mono mb-2">
                  <Hash className="w-3 h-3" />
                  {doc.number}
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {doc.authority}
                </p>
                <p className="text-xs text-muted-foreground">
                  Issued: {doc.year}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Grid */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
              25 Years of Hifz Excellence
            </h2>
            <p className="text-muted-foreground">
              From a small Masjid circle to one of India's respected Hifz
              institutions
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-4 p-4 bg-secondary/30 rounded-2xl border border-border hover:shadow-md transition-shadow"
              >
                <div className="shrink-0 w-14 h-14 bg-foreground rounded-xl flex items-center justify-center">
                  <span className="font-playfair font-bold text-background text-sm leading-tight text-center">
                    {m.year}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {m.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
              Hifz Faculty
            </h2>
            <p className="text-muted-foreground">
              Certified Huffaz teachers with unbroken Ijazah chains
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teachers.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-5 border border-border text-center shadow-sm"
              >
                <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-playfair font-bold text-background text-xl">
                    {t.name.split(" ")[1]?.[0] || "Q"}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {t.name}
                </h3>
                <p className="text-xs text-accent mb-1">{t.subjects}</p>
                <p className="text-xs text-muted-foreground mb-2">{t.qual}</p>
                <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                  {t.exp} experience
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
              Daily Schedule
            </h2>
            <p className="text-muted-foreground">
              A disciplined routine designed for maximum retention and spiritual
              growth
            </p>
          </div>
          <div className="space-y-2">
            {schedule.map(({ time, activity, icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 p-4 bg-secondary/30 rounded-2xl border border-border"
              >
                <span className="text-xl shrink-0">{icon}</span>
                <div className="flex items-center gap-2 min-w-[180px]">
                  <span className="text-sm font-medium text-accent">
                    {time}
                  </span>
                </div>
                <div className="text-sm text-foreground">{activity}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-foreground text-sm">
                    {faq.q}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="py-16 hero-gradient geometric-pattern">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl font-bold text-white mb-4">
              Sponsor a Hafiz's Journey
            </h2>
            <p className="text-white/70 mb-8">
              An ongoing Sadqa Jariyah for you and your family — every Juz a
              student memorises, the reward flows to you.
            </p>
            <Link
              to="/donate?purpose=masjid"
              className="inline-flex items-center gap-2 px-8 py-4 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 shadow-xl text-lg"
            >
              <Heart className="w-5 h-5" /> Sponsor a Hafiz Student
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
