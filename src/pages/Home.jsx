// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowRight, BookOpen, Users, Award, Star, ChevronDown, Globe2, Sparkles } from 'lucide-react';
// import { useLanguage } from '../lib/LanguageContext';
// import { useTranslation } from '../lib/i18n';
// import { teacherService, fundraisingCampaignService } from '../services';
// import { SITE_LOGO_URL } from '../lib/constants';
// import TeacherCard from '../components/teachers/TeacherCard';
// import CampaignCard from '../components/fundraising/CampaignCard';

// const stats = [
//   { key: 'stats_students', value: '2,400+', icon: Users },
//   { key: 'stats_teachers', value: '85+', icon: BookOpen },
//   { key: 'stats_years', value: '25+', icon: Award },
//   { key: 'stats_graduates', value: '5,000+', icon: Star },
// ];

// export default function Home() {
//   const { language } = useLanguage();
//   const tr = useTranslation(language);
//   const [teachers, setTeachers] = useState([]);
//   const [campaigns, setCampaigns] = useState([]);

// useEffect(() => {
//   teacherService.list('-created_date', 3).then(setTeachers).catch(() => {});
//   fundraisingCampaignService
//     .filter({ status: 'active' }, '-created_date', 3)
//     .then(setCampaigns)
//     .catch(() => {});
// }, []);

//   return (
//     <div className="min-h-screen">
//       {/* Hero */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient geometric-pattern">
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

//         {/* Decorative Arabic Calligraphy */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-amiri text-white/5 text-[20rem] leading-none select-none pointer-events-none">
//           ن
//         </div>

//         <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             {/* Logo */}
//             <motion.img
//               src={SITE_LOGO_URL}
//               alt="Madrasa Farooqia"
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ type: 'spring', delay: 0.2 }}
//               className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 border-4 border-accent/40 shadow-2xl object-cover"
//             />
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
//               <Sparkles className="w-4 h-4 text-accent" />
//               <span className="font-amiri text-lg">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
//             </div>

//             <h1 className="font-playfair text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//               {tr.heroTitle}
//             </h1>
//             <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
//               {tr.heroSubtitle}
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Link
//                 to="/teachers"
//                 className="group flex items-center gap-3 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
//               >
//                 {tr.exploreTeachers}
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </Link>
//               <Link
//                 to="/donate"
//                 className="flex items-center gap-3 px-8 py-4 gold-gradient text-foreground font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 shadow-lg"
//               >
//                 {tr.donatNow}
//               </Link>
//             </div>
//           </motion.div>

//           <motion.a
//             href="#about"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//             className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors"
//           >
//             <ChevronDown className="w-8 h-8 animate-bounce" />
//           </motion.a>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="py-14 bg-card border-b border-border">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//             {stats.map((stat, i) => (
//               <motion.div
//                 key={stat.key}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//                 className="text-center group"
//               >
//                 <div className="inline-flex w-14 h-14 items-center justify-center bg-secondary rounded-2xl mb-4 group-hover:bg-foreground transition-colors">
//                   <stat.icon className="w-7 h-7 text-foreground group-hover:text-background transition-colors" />
//                 </div>
//                 <div className="font-playfair text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</div>
//                 <div className="text-muted-foreground text-sm mt-1">{tr[stat.key]}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About */}
//       <section id="about" className="py-16 sm:py-24 bg-secondary/30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
//                 <Globe2 className="w-4 h-4" />
//                 <span>Since 1999</span>
//               </div>
//               <h2 className="font-playfair text-4xl font-bold text-foreground mb-6">{tr.aboutTitle}</h2>
//               <p className="text-muted-foreground text-lg leading-relaxed mb-8">{tr.aboutDesc}</p>
//               <Link
//                 to="/teachers"
//                 className="inline-flex items-center gap-2 text-foreground font-semibold underline underline-offset-4 hover:gap-3 transition-all"
//               >
//                 {tr.exploreTeachers} <ArrowRight className="w-4 h-4" />
//               </Link>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: 40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="relative"
//             >
//               <div className="rounded-3xl overflow-hidden shadow-2xl">
//                 <img
//                   src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop"
//                   alt="Madrasa"
//                   className="w-full h-80 object-cover"
//                 />
//               </div>
//               <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-6 border border-border">
//                 <div className="font-playfair text-2xl font-bold text-primary">25+</div>
//                 <div className="text-sm text-muted-foreground">{tr.stats_years}</div>
//               </div>
//               <div className="absolute -top-6 -right-6 bg-accent rounded-2xl shadow-xl p-6">
//                 <div className="font-playfair text-2xl font-bold text-accent-foreground">5K+</div>
//                 <div className="text-sm text-accent-foreground/80">{tr.stats_graduates}</div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Teachers */}
//       {teachers.length > 0 && (
//         <section className="py-16 sm:py-24 bg-card">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-14">
//               <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
//                 <BookOpen className="w-4 h-4" />
//                 <span>Our Faculty</span>
//               </div>
//               <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">{tr.ourTeachers}</h2>
//             </div>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {teachers.map((teacher, i) => (
//                 <motion.div
//                   key={teacher.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                 >
//                   <TeacherCard teacher={teacher} language={language} tr={tr} />
//                 </motion.div>
//               ))}
//             </div>
//             <div className="text-center mt-12">
//               <Link
//                 to="/teachers"
//                 className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-foreground font-semibold rounded-xl hover:bg-foreground hover:text-background transition-all"
//               >
//                 {tr.ourTeachers} <ArrowRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Active Campaigns */}
//       {campaigns.length > 0 && (
//         <section className="py-16 sm:py-24 bg-secondary/30">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-14">
//               <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">{tr.ourCampaigns}</h2>
//             </div>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {campaigns.map((campaign, i) => (
//                 <motion.div
//                   key={campaign.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                 >
//                   <CampaignCard campaign={campaign} tr={tr} />
//                 </motion.div>
//               ))}
//             </div>
//             <div className="text-center mt-12">
//               <Link
//                 to="/fundraising"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity"
//               >
//                 {tr.fundraisingTitle} <ArrowRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* CTA Banner */}
//       <section className="py-20 hero-gradient geometric-pattern">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="font-playfair text-4xl font-bold text-white mb-6">Support Our Mission</h2>
//             <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
//               Every donation, big or small, helps us provide quality Islamic education to students in need.
//             </p>
//             <Link
//               to="/donate"
//               className="inline-flex items-center gap-3 px-10 py-4 gold-gradient text-foreground font-semibold rounded-xl hover:shadow-2xl transition-all text-lg hover:-translate-y-1 shadow-xl"
//             >
//               {tr.donatNow}
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Star,
  ChevronDown,
  Globe2,
  Sparkles,
  GraduationCap,
  Building2,
} from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import TeacherCard from "../components/teachers/TeacherCard";
import CampaignCard from "../components/fundraising/CampaignCard";
import { useTeachersQuery, useCampaignsQuery } from "../hooks/api";
import { AuthBackground } from "../assets";
import { FcDonate } from "react-icons/fc";



const stats = [
  { key: "stats_students", value: "2,400+", icon: Users },
  { key: "stats_teachers", value: "85+", icon: BookOpen },
  { key: "stats_years", value: "25+", icon: Award },
  { key: "stats_graduates", value: "5,000+", icon: Star },
];

export default function Home() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { data: teachers = [] } = useTeachersQuery("-created_date", 3);
  const { data: allCampaigns = [] } = useCampaignsQuery("-created_date", 50);
  const campaigns = allCampaigns
    .filter((c) => String(c.status || "").toLowerCase() === "active")
    .slice(0, 3);

  const islamicVerses = [
    {
      arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
      trans: t("home:verse1_trans", "Read in the name of your Lord who created."),
      src: t("home:verse1_src", "Quran 96:1 — First Revelation"),
    },
    {
      arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
      trans: t("home:verse2_trans", "Whoever fears Allah — He will make for him a way out."),
      src: t("home:verse2_src", "Quran 65:2"),
    },
    {
      arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
      trans: t("home:verse3_trans", "Seeking knowledge is an obligation upon every Muslim."),
      src: t("home:verse3_src", "Ibn Majah"),
    },
  ];

  const branches = [
    {
      title: t("home:branch1_title", "Madrasa Farooqia"),
      sub: t("home:branch1_sub", "Main Institution"),
      desc: t("home:branch1_desc", "Full Islamic curriculum — Alim course, Arabic, Tajweed, and primary education for boys. Est. 1999."),
      href: "/teachers",
      emoji: "📚",
    },
    {
      title: t("home:branch2_title", "Niswaan Branch"),
      sub: t("home:branch2_sub", "Girls Madrasa"),
      desc: t("home:branch2_desc", "Dedicated Islamic education for girls — Hifz, Alimah course, Tajweed in a fully segregated environment. Est. 2003."),
      href: "/niswaan",
      emoji: "👩‍🎓",
    },
    {
      title: t("home:branch3_title", "Masjid & Hifz"),
      sub: t("home:branch3_sub", "Quran Memorisation"),
      desc: t("home:branch3_desc", "The spiritual heart — daily prayers, dedicated Hifz program with Ijazah-chain teachers. Est. 1999."),
      href: "/masjid-hifz",
      emoji: "🕌",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient geometric-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

        {/* Decorative Arabic Calligraphy */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-amiri text-white/5 text-[20rem] leading-none select-none pointer-events-none">
          ن
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <motion.img
              src="https://media.base44.com/images/public/69e13339ea1b0b97c63a7ecc/b4db5ec8f_farooqia_logo_withBg.png"
              alt="Madrasa Farooqia"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 border-4 border-accent/40 shadow-2xl object-cover"
            />
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="font-amiri text-lg">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
            </div>

            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t("home:heroTitle")}
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t("home:heroSubtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/teachers"
                className="group flex items-center gap-3 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {t("home:exploreTeachers")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/donate"
                className="flex items-center gap-3 px-8 py-4 gold-gradient text-foreground font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {t("home:donatNow")}
              </Link>
            </div>
          </motion.div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors"
          >
            <ChevronDown className="w-8 h-8 animate-bounce" />
          </motion.a>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex w-14 h-14 items-center justify-center bg-secondary rounded-2xl mb-4 group-hover:bg-foreground transition-colors">
                  <stat.icon className="w-7 h-7 text-foreground group-hover:text-background transition-colors" />
                </div>
                <div className="font-playfair text-3xl sm:text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm mt-1">
                  {t(`home:${stat.key}`)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 sm:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
                <Globe2 className="w-4 h-4" />
                <span>{t("home:since1999", "Since 1999")}</span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-foreground mb-6">
                {t("home:aboutTitle")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {t("home:aboutDesc")}
              </p>
              <Link
                to="/teachers"
                className="inline-flex items-center gap-2 text-foreground font-semibold underline underline-offset-4 hover:gap-3 transition-all"
              >
                {t("home:exploreTeachers")} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop"
                  alt="Madrasa"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-6 border border-border">
                <div className="font-playfair text-2xl font-bold text-primary">
                  25+
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("home:stats_years")}
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-accent rounded-2xl shadow-xl p-6">
                <div className="font-playfair text-2xl font-bold text-accent-foreground">
                  5K+
                </div>
                <div className="text-sm text-accent-foreground/80">
                  {t("home:stats_graduates")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      {teachers.length > 0 && (
        <section className="py-16 sm:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
                <BookOpen className="w-4 h-4" />
                <span>{t("home:ourFaculty", "Our Faculty")}</span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">
                {t("home:ourTeachers")}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher, i) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TeacherCard teacher={teacher} language={language} t={t} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/teachers"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-foreground font-semibold rounded-xl hover:bg-foreground hover:text-background transition-all"
              >
                {t("home:ourTeachers")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Active Campaigns */}
      {campaigns.length > 0 && (
        <section className="py-16 sm:py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">
                {t("home:ourCampaigns")}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign, i) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CampaignCard campaign={campaign} t={t} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/fundraising"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                {t("fundraising:fundraisingTitle")}{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Islamic Equations / Verses Section */}
      <section className="py-16 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-background/40 text-xs uppercase tracking-widest mb-2">
              {t("home:guidedByQuran", "Guided by Quran & Sunnah")}
            </p>
            <h2 className="font-playfair text-3xl font-bold text-background">
              {t("home:wordsThatGuideUs", "Words That Guide Us")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {islamicVerses.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 border border-background/10 rounded-2xl hover:bg-background/5 transition-colors"
              >
                <div className="font-amiri text-2xl text-accent mb-3 leading-relaxed">
                  {v.arabic}
                </div>
                <p className="text-background/70 text-sm italic mb-2">
                  "{v.trans}"
                </p>
                <p className="text-background/40 text-xs">— {v.src}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
              <Building2 className="w-4 h-4" /> {t("home:ourInstitutions", "Our Institutions")}
            </div>
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
              {t("home:threeInstitutionsOneMission", "Three Institutions, One Mission")}
            </h2>
            <p className="text-muted-foreground">
              {t("home:branchesDesc", "Madrasa Farooqia operates three distinct institutions — each serving a unique need of the Muslim community.")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {branches.map(({ title, sub, desc, href, emoji }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-secondary/30 rounded-2xl p-6 border border-border hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-4">{emoji}</div>
                <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
                  {sub}
                </div>
                <h3 className="font-playfair font-bold text-xl text-foreground mb-3">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {desc}
                </p>
                <Link
                  to={href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:gap-3 transition-all"
                >
                  {t("common:learnMore", "Learn More")} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden hero-gradient geometric-pattern">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url(${AuthBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1px)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-comic text-4xl sm:text-5xl font-bold text-white mb-6">
              {t("home:supportOurMission", "Support Our Mission")}
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto italic font-medium leading-relaxed">
              {t("home:ctaDescription", "Every donation, big or small, helps us provide quality Islamic education to students in need.")}
            </p>
            <Link
              to="/donate"
              className="inline-flex items-center gap-3 px-6 py-3 orange-gradient text-foreground font-bold rounded-xl hover:shadow-2xl transition-all text-xl hover:-translate-y-1 shadow-2xl active:scale-95"
            >
              <FcDonate size={24} />
              {t("home:donatNow")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
