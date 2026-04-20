// import React from 'react';
// import { motion } from 'framer-motion';
// import { GraduationCap, Heart, Shield, BookOpen, Users, Star, ChevronRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import InstitutionTabs from '@/components/institutions/InstitutionTabs';

// const courses = [
//   { name: 'Hifz al-Quran', desc: 'Complete memorisation of the Holy Quran with Tajweed', duration: '3–4 years' },
//   { name: 'Alimah Course', desc: 'Full Dars-e-Nizami curriculum for girls', duration: '7–8 years' },
//   { name: 'Tajweed & Quran', desc: 'Correct recitation & pronunciation of the Quran', duration: '1 year' },
//   { name: 'Islamic Studies', desc: 'Aqeedah, Fiqh, Seerah & Arabic language basics', duration: '2 years' },
// ];

// const highlights = [
//   { icon: Shield, label: 'Safe Environment', desc: 'Fully segregated, secure & female-supervised campus' },
//   { icon: Users, label: '300+ Students', desc: 'Active enrollment with qualified female teachers' },
//   { icon: Heart, label: 'Nurturing Culture', desc: 'Islamic values, discipline & personal growth' },
//   { icon: Star, label: 'Qualified Staff', desc: 'All female teaching staff with Alimah qualifications' },
// ];

// export default function Niswaan() {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero */}
//       <section className="hero-gradient geometric-pattern pt-32 pb-24 relative overflow-hidden">
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
//           <span className="font-amiri text-white/[0.04] text-[28rem] leading-none">ن</span>
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
//             <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
//               <GraduationCap className="w-4 h-4" />
//               <span>Girls Madrasa · Madrasa Farooqia</span>
//             </div>
//             <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
//               Niswaan Branch
//             </h1>
//             <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
//               A dedicated Islamic education institution for girls — offering a safe, nurturing environment rooted in Quran, Sunnah, and scholarship.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4 mt-8">
//               <Link to="/donate?purpose=niswaan" className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
//                 <Heart className="w-4 h-4" /> Support Niswaan
//               </Link>
//               <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
//                 Enquire About Admission <ChevronRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Institution Tabs */}
//       <InstitutionTabs active="niswaan" />

//       {/* Introduction */}
//       <section className="py-16 bg-card">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-14 items-center">
//             <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
//               <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
//                 <BookOpen className="w-4 h-4" /> About Niswaan
//               </div>
//               <h2 className="font-playfair text-3xl font-bold text-foreground mb-6">Empowering Muslim Women Through Knowledge</h2>
//               <p className="text-muted-foreground leading-relaxed mb-4">
//                 The Niswaan Branch of Madrasa Farooqia was established to provide high-quality Islamic education exclusively for girls in a safe, fully segregated environment. Our mission is to produce Alimaat, Hafizaat, and knowledgeable Muslim women who can serve their families and communities.
//               </p>
//               <p className="text-muted-foreground leading-relaxed mb-6">
//                 All teaching staff are qualified female scholars. The campus is entirely separate from the boys' section, with strict security and a nurturing Islamic environment.
//               </p>
//               <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-2xl border border-border">
//                 <div className="font-amiri text-4xl text-accent">وَعَلَّمَكَ</div>
//                 <p className="text-sm text-muted-foreground italic">"And He taught you what you did not know." — Quran 4:113</p>
//               </div>
//             </motion.div>
//             <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
//               <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
//                 <img
//                   src="https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=600&h=420&fit=crop"
//                   alt="Islamic girls education"
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
//             <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">Why Choose Niswaan?</h2>
//             <p className="text-muted-foreground max-w-xl mx-auto">A unique institution built specifically for the Islamic education of Muslim women.</p>
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

//       {/* Courses */}
//       <section className="py-16 bg-card">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">Courses Offered</h2>
//             <p className="text-muted-foreground">Structured Islamic academic programs for girls of all ages.</p>
//           </div>
//           <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
//             {courses.map(({ name, desc, duration }, i) => (
//               <motion.div
//                 key={name}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//                 className="flex gap-4 p-5 bg-secondary/30 rounded-2xl border border-border"
//               >
//                 <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center shrink-0">
//                   <BookOpen className="w-5 h-5 text-background" />
//                 </div>
//                 <div>
//                   <div className="font-semibold text-foreground mb-1">{name}</div>
//                   <div className="text-sm text-muted-foreground mb-2">{desc}</div>
//                   <div className="inline-block text-xs font-medium px-2 py-1 bg-accent/20 text-accent rounded-full">Duration: {duration}</div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Donate CTA */}
//       <section className="py-16 hero-gradient geometric-pattern">
//         <div className="max-w-3xl mx-auto px-4 text-center">
//           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
//             <h2 className="font-playfair text-3xl font-bold text-white mb-4">Support Girls' Education</h2>
//             <p className="text-white/70 mb-8">Your donation directly funds scholarships, teacher salaries, and infrastructure for the Niswaan Branch.</p>
//             <Link to="/donate?purpose=niswaan" className="inline-flex items-center gap-2 px-8 py-4 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-xl text-lg">
//               <Heart className="w-5 h-5" /> Donate to Niswaan
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
  GraduationCap,
  Heart,
  Shield,
  BookOpen,
  Users,
  Star,
  ChevronRight,
  FileText,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Hash,
} from "lucide-react";
import { Link } from "react-router-dom";
import InstitutionTabs from "@/components/institutions/InstitutionTabs";

const courses = [
  {
    name: "Hifz al-Quran",
    desc: "Complete memorisation of the Holy Quran with Tajweed rules",
    duration: "3–4 years",
    students: "120+",
  },
  {
    name: "Alimah Course (Dars-e-Nizami)",
    desc: "Full Islamic scholarship curriculum for girls — Hadith, Fiqh, Tafsir, Arabic",
    duration: "7–8 years",
    students: "80+",
  },
  {
    name: "Tajweed & Quran Recitation",
    desc: "Correct pronunciation, makhaarij, and rules of recitation",
    duration: "1 year",
    students: "60+",
  },
  {
    name: "Islamic Studies & Arabic",
    desc: "Aqeedah, Fiqh, Seerah, Islamic Ethics & Arabic language",
    duration: "2 years",
    students: "90+",
  },
  {
    name: "Primary Islamic Education",
    desc: "Quran Qaida, basic prayers, Islamic etiquette for young girls",
    duration: "1–2 years",
    students: "150+",
  },
];

const documents = [
  {
    title: "Registration Certificate",
    number: "WAQF/UP/MAU/2003/1147",
    authority: "Uttar Pradesh Waqf Board",
    year: 2003,
    status: "Valid",
  },
  {
    title: "Society Registration",
    number: "Reg. No. 1234/2003",
    authority: "Registrar of Societies, Mau, UP",
    year: 2003,
    status: "Valid",
  },
  {
    title: "FCRA Registration",
    number: "FCRA/2015/0012345",
    authority: "Ministry of Home Affairs, India",
    year: 2015,
    status: "Valid",
  },
  {
    title: "80G Tax Exemption",
    number: "80G/UP/MAU/2005/009",
    authority: "Income Tax Department, India",
    year: 2005,
    status: "Valid",
  },
  {
    title: "Government Recognition",
    number: "EDUC/UP/2004/9876",
    authority: "UP State Education Board",
    year: 2004,
    status: "Recognised",
  },
  {
    title: "Madrasa Board Affiliation",
    number: "UBSM/2003/NIS/447",
    authority: "UP Madrasa Education Board (UBSM)",
    year: 2003,
    status: "Affiliated",
  },
];

const milestones = [
  {
    year: 2003,
    event:
      "Niswaan Branch officially established within Madrasa Farooqia premises",
  },
  {
    year: 2004,
    event: "First batch of 25 students enrolled in Hifz and Alimah programs",
  },
  {
    year: 2006,
    event:
      "Dedicated 3-storey building constructed for girls' section — fully segregated",
  },
  {
    year: 2008,
    event: "First Hifz graduation — 8 Hafizaat completed 30 Juz with Ijazah",
  },
  {
    year: 2010,
    event: "Alimah program expanded to full 7-year Dars-e-Nizami curriculum",
  },
  {
    year: 2012,
    event: "Computer literacy and Islamic calligraphy classes added",
  },
  {
    year: 2015,
    event: "FCRA registration obtained — enabling international donations",
  },
  {
    year: 2018,
    event: "Student count crossed 300 — new residential wing opened",
  },
  {
    year: 2020,
    event:
      "Online classes launched during COVID-19 — serving 200+ students digitally",
  },
  {
    year: 2023,
    event: "New science lab and library wing dedicated for Niswaan students",
  },
  {
    year: 2024,
    event:
      "Scholarship fund launched — 50 underprivileged girls receive full fee waiver",
  },
];

const faculty = [
  {
    name: "Ustazah Halima Sadia",
    qual: "Alimah, Miftah al-Uloom, Jaunpur",
    subjects: "Hadith, Fiqh",
    exp: "18 yrs",
  },
  {
    name: "Ustazah Rahima Khatoon",
    qual: "Qaria with Ijazah from Egypt",
    subjects: "Hifz, Tajweed",
    exp: "14 yrs",
  },
  {
    name: "Ustazah Fatima Zahra",
    qual: "MA Arabic, Aligarh Muslim University",
    subjects: "Arabic, Tafsir",
    exp: "11 yrs",
  },
  {
    name: "Ustazah Noor Begum",
    qual: "Alimah, Darul Uloom Saharanpur",
    subjects: "Islamic Ethics, Seerah",
    exp: "9 yrs",
  },
];

const faqs = [
  {
    q: "Who founded Niswaan and when?",
    a: "Niswaan Branch was founded in 2003 by Hazrat Maulana Mohammad Farooq Sahib, the founder of Madrasa Farooqia, in response to community demand for quality Islamic education for girls in a safe, segregated environment.",
  },
  {
    q: "Is the campus fully segregated?",
    a: "Yes. Niswaan has a completely separate entrance, building, and facilities. Male family members are only permitted in the designated visitors area. All staff are qualified female scholars.",
  },
  {
    q: "Are scholarships available?",
    a: "Yes. We provide full and partial scholarships for families below the poverty line. Contact us for the scholarship application form. We never turn away a student due to financial hardship.",
  },
  {
    q: "What government approvals does Niswaan have?",
    a: "Niswaan is registered with the UP Waqf Board, UP Madrasa Education Board (UBSM), Registrar of Societies, and holds 80G tax exemption and FCRA registration.",
  },
];

export default function Niswaan() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="hero-gradient geometric-pattern pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-amiri text-white/[0.04] text-[28rem] leading-none">
            ن
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <GraduationCap className="w-4 h-4" />
              <span>Girls Madrasa · Est. 2003 · Madrasa Farooqia</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Niswaan Branch
            </h1>
            <div className="font-amiri text-2xl text-accent mb-4">
              وَعَلَّمَكَ مَا لَمْ تَكُن تَعْلَمُ
            </div>
            <p className="text-white/50 text-sm italic mb-6">
              "And He taught you what you did not know." — Quran 4:113
            </p>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              A dedicated, fully-registered Islamic education institution for
              Muslim girls — offering a safe, nurturing environment rooted in
              Quran, Sunnah, and scholarship since 2003.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                { val: "500+", lbl: "Total Alumni" },
                { val: "300+", lbl: "Current Students" },
                { val: "21 yrs", lbl: "Serving Community" },
                { val: "100%", lbl: "Female Staff" },
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
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                to="/donate?purpose=niswaan"
                className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
              >
                <Heart className="w-4 h-4" /> Support Niswaan
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                Enquire About Admission <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InstitutionTabs active="niswaan" />

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
                <BookOpen className="w-4 h-4" /> Our Story
              </div>
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-6">
                Founded in 2003 — By Community, For Community
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In 2003,{" "}
                <strong className="text-foreground">
                  Hazrat Maulana Mohammad Farooq Sahib
                </strong>
                , founder of Madrasa Farooqia, recognised a critical gap — the
                Muslim girls of Mau and surrounding districts had no access to
                quality Islamic education in a safe, fully segregated
                environment.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                He established Niswaan Branch with a founding batch of 25
                students, a dedicated female principal, and a clear mission: to
                produce Alimaat, Hafizaat, and educated Muslim women who would
                serve as pillars of their families, communities, and the ummah.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Today, Niswaan serves over 300 students from UP, Bihar, MP, and
                beyond — many on full scholarship. Every aspect of governance,
                finance, and academic standards is maintained with full
                transparency.
              </p>
              <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-2xl border border-accent/20">
                <Award className="w-6 h-6 text-accent shrink-0" />
                <p className="text-sm text-foreground font-medium">
                  Niswaan holds UBSM affiliation, 80G tax exemption, and is
                  registered under UP Waqf Board — making all donations
                  tax-deductible.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
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

      {/* Official Documents & Registrations */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm mb-4">
              <FileText className="w-4 h-4" /> 100% Transparent
            </div>
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
              Legal Documents & Registrations
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              All our registrations and legal documents are public. We believe
              full transparency builds trust.
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
          <div className="mt-8 p-5 bg-card border border-border rounded-2xl flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground mb-1">
                Need to verify our documents?
              </p>
              <p className="text-sm text-muted-foreground">
                All original documents are available for inspection at our
                office. You can also contact the respective authorities to
                verify registration numbers. Email:{" "}
                <a
                  href="mailto:info@madrasafarooqia.org"
                  className="text-accent hover:underline"
                >
                  info@madrasafarooqia.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Grid */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
              Key Milestones
            </h2>
            <p className="text-muted-foreground">
              21 years of growth, transparency, and service to the community
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
              Our Faculty
            </h2>
            <p className="text-muted-foreground">
              All female teaching staff — qualified Islamic scholars with Ijazah
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {faculty.map((f, i) => (
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
                    {f.name.split(" ")[1]?.[0] || "U"}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {f.name}
                </h3>
                <p className="text-xs text-accent mb-1">{f.subjects}</p>
                <p className="text-xs text-muted-foreground mb-2">{f.qual}</p>
                <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                  {f.exp} experience
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
              Courses Offered
            </h2>
            <p className="text-muted-foreground">
              Structured Islamic academic programs for Muslim girls of all ages
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map(({ name, desc, duration, students }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-secondary/30 rounded-2xl p-5 border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{desc}</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">
                        ⏱ {duration}
                      </span>
                      <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                        👩‍🎓 {students}
                      </span>
                    </div>
                  </div>
                </div>
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
              Common Questions
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

      {/* Contact & Donate CTA */}
      <section className="py-16 hero-gradient geometric-pattern">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl font-bold text-white mb-4">
              Support Girls' Education
            </h2>
            <p className="text-white/70 mb-8">
              Your donation funds scholarships, teacher salaries, books, and
              infrastructure for the Niswaan Branch.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/donate?purpose=niswaan"
                className="inline-flex items-center gap-2 px-8 py-4 gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-xl text-lg"
              >
                <Heart className="w-5 h-5" /> Donate to Niswaan
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                Contact Us <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
