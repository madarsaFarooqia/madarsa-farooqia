// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Globe,
//   ChevronDown,
//   LogOut,
//   User,
//   Heart,
//   Moon,
//   Sun,
//   LayoutDashboard,
// } from "lucide-react";
// import { useLanguage } from "@/lib/LanguageContext";
// import { useTranslation } from "@/lib/i18n";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import { motion, AnimatePresence } from "framer-motion";

// // 🔥 MOCK AUTH (temporary)
// const mockAuth = {
//   me: async () => {
//     return {
//       id: 1,
//       full_name: "Admin User",
//       role: "admin",
//     };
//   },

//   logout: async () => {
//     console.log("Logged out");
//   },

//   redirectToLogin: () => {
//     alert("Redirect to login");
//   },
// };

// const LOGO_URL =
//   "https://media.base44.com/images/public/69e13339ea1b0b97c63a7ecc/b4db5ec8f_farooqia_logo_withBg.png";

// export default function Navbar() {
//   const { language, setLanguage, currentLang, languages } = useLanguage();
//   const tr = useTranslation(language);
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dark, setDark] = useState(() => {
//     if (typeof window !== "undefined") {
//       return (
//         localStorage.getItem("theme") === "dark" ||
//         (!localStorage.getItem("theme") &&
//           window.matchMedia("(prefers-color-scheme: dark)").matches)
//       );
//     }
//     return false;
//   });
//   const location = useLocation();

// useEffect(() => {
//   mockAuth
//     .me()
//     .then(setUser)
//     .catch(() => setUser(null));
// }, []);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", dark);
//     localStorage.setItem("theme", dark ? "dark" : "light");
//   }, [dark]);

//   // Apply system theme on first load
//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-color-scheme: dark)");
//     if (!localStorage.getItem("theme")) {
//       setDark(mq.matches);
//     }
//     const handler = (e) => {
//       if (!localStorage.getItem("theme")) setDark(e.matches);
//     };
//     mq.addEventListener("change", handler);
//     return () => mq.removeEventListener("change", handler);
//   }, []);

//   const navLinks = [
//     { href: "/", label: tr.home },
//     { href: "/teachers", label: tr.teachers },
//     { href: "/donate", label: tr.donate },
//     { href: "/fundraising", label: tr.fundraising },
//     { href: "/contact", label: tr.contact },
//   ];

//   const isAdmin = user?.role === "admin";
//   const isRTL = currentLang.dir === "rtl";

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
//           : "bg-transparent"
//       }`}
//       dir={currentLang.dir}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3 group shrink-0">
//             <img
//               src={LOGO_URL}
//               alt="Madrasa Farooqia"
//               className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-accent/40 shadow-md"
//             />
//             <div className={isRTL ? "text-right" : "text-left"}>
//               <div
//                 className={`font-playfair font-bold text-base sm:text-lg leading-tight ${scrolled ? "text-foreground" : "text-white"}`}
//               >
//                 Madrasa Farooqia
//               </div>
//               <div
//                 className={`text-[10px] sm:text-xs font-amiri ${scrolled ? "text-muted-foreground" : "text-white/70"}`}
//               >
//                 Husianabad, Mau — مدرسة فاروقية
//               </div>
//             </div>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden lg:flex items-center gap-0.5">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 to={link.href}
//                 className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   location.pathname === link.href
//                     ? scrolled
//                       ? "bg-foreground text-background"
//                       : "bg-white/15 text-white"
//                     : scrolled
//                       ? "text-foreground hover:bg-secondary"
//                       : "text-white/85 hover:text-white hover:bg-white/10"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Right Actions */}
//           <div className="hidden md:flex items-center gap-2">
//             {/* Dark Mode Toggle */}
//             <button
//               onClick={() => setDark((d) => !d)}
//               className={`p-2 rounded-lg transition-colors ${scrolled ? "text-foreground hover:bg-secondary" : "text-white/80 hover:bg-white/10"}`}
//               aria-label="Toggle theme"
//             >
//               {dark ? (
//                 <Sun className="w-4 h-4" />
//               ) : (
//                 <Moon className="w-4 h-4" />
//               )}
//             </button>

//             {/* Language Picker */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <button
//                   className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                     scrolled
//                       ? "text-foreground hover:bg-secondary"
//                       : "text-white/85 hover:bg-white/10"
//                   }`}
//                 >
//                   <Globe className="w-4 h-4" />
//                   <span className="hidden lg:inline">
//                     {currentLang.flag} {currentLang.label}
//                   </span>
//                   <span className="lg:hidden">{currentLang.flag}</span>
//                   <ChevronDown className="w-3 h-3" />
//                 </button>
//               </DropdownMenuTrigger >
//               <DropdownMenuContent align="end" className="w-44">
//                 {languages.map((lang) => (
//                   <DropdownMenuItem
//                     key={lang.code}
//                     onClick={() => setLanguage(lang.code)}
//                     className={
//                       language === lang.code ? "bg-secondary font-medium" : ""
//                     }
//                   >
//                     <span className="mr-2">{lang.flag}</span>
//                     {lang.label}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <button
//                     className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                       scrolled
//                         ? "text-foreground hover:bg-secondary"
//                         : "text-white/85 hover:bg-white/10"
//                     }`}
//                   >
//                     <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-xs font-bold text-foreground">
//                       {user.full_name?.charAt(0)?.toUpperCase() || "U"}
//                     </div>
//                     <span className="max-w-[80px] truncate hidden lg:block">
//                       {user.full_name?.split(" ")[0] || "User"}
//                     </span>
//                     {user.role && (
//                       <span className="hidden lg:block text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent-foreground font-semibold uppercase">
//                         {user.role}
//                       </span>
//                     )}
//                   </button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-48">
//                   <DropdownMenuItem asChild>
//                     <Link
//                       to="/my-donations"
//                       className="flex items-center gap-2"
//                     >
//                       <Heart className="w-4 h-4" /> {t('nav:myDonations')}
//                     </Link>
//                   </DropdownMenuItem>
//                   {isAdmin && (
//                     <DropdownMenuItem asChild>
//                       <Link to="/admin" className="flex items-center gap-2">
//                         <LayoutDashboard className="w-4 h-4" /> Admin Panel
//                       </Link>
//                     </DropdownMenuItem>
//                   )}
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem
//                     onClick={async () => {
//                       await mockAuth.logout();
//                       setUser(null);
//                     }}
//                     className="text-destructive"
//                   >
//                     <LogOut className="w-4 h-4 mr-2" /> {t('nav:logout')}
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => mockAuth.redirectToLogin()}
//                   className={scrolled ? "" : "text-white hover:bg-white/10"}
//                 >
//                   {tr.login}
//                 </Button>
//                 <Button
//                   size="sm"
//                   onClick={() => mockAuth.redirectToLogin()}
//                   className="gold-gradient text-foreground font-semibold border-0 shadow-sm"
//                 >
//                   {tr.register}
//                 </Button>
//               </div>
//             )}
//           </div>

//           {/* Mobile: dark toggle + hamburger */}
//           <div className="md:hidden flex items-center gap-2">
//             <button
//               onClick={() => setDark((d) => !d)}
//               className={`p-2 rounded-lg ${scrolled ? "text-foreground" : "text-white"}`}
//             >
//               {dark ? (
//                 <Sun className="w-4 h-4" />
//               ) : (
//                 <Moon className="w-4 h-4" />
//               )}
//             </button>
//             <button
//               className={`p-2 rounded-lg ${scrolled ? "text-foreground" : "text-white"}`}
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? (
//                 <X className="w-5 h-5" />
//               ) : (
//                 <Menu className="w-5 h-5" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-background border-t border-border shadow-xl overflow-hidden"
//           >
//             <div className="px-4 py-4 space-y-1">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   to={link.href}
//                   onClick={() => setIsOpen(false)}
//                   className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
//                     location.pathname === link.href
//                       ? "bg-foreground text-background"
//                       : "text-foreground hover:bg-secondary"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//               {/* Language row */}
//               <div className="pt-2 pb-1 flex flex-wrap gap-2 border-t border-border mt-2">
//                 {languages.map((lang) => (
//                   <button
//                     key={lang.code}
//                     onClick={() => {
//                       setLanguage(lang.code);
//                       setIsOpen(false);
//                     }}
//                     className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
//                       language === lang.code
//                         ? "bg-foreground text-background"
//                         : "bg-secondary text-muted-foreground"
//                     }`}
//                   >
//                     {lang.flag} {lang.label}
//                   </button>
//                 ))}
//               </div>

//               <div className="pt-2 flex gap-2 border-t border-border">
//                 {user ? (
//                   <>
//                     <Link
//                       to="/my-donations"
//                       onClick={() => setIsOpen(false)}
//                       className="flex-1 text-center py-2.5 px-4 bg-secondary text-foreground rounded-xl text-sm font-medium"
//                     >
//                       {tr.myDonations}
//                     </Link>
//                     {isAdmin && (
//                       <Link
//                         to="/admin"
//                         onClick={() => setIsOpen(false)}
//                         className="flex-1 text-center py-2.5 px-4 bg-foreground text-background rounded-xl text-sm font-medium"
//                       >
//                         Admin
//                       </Link>
//                     )}
//                     <button
//                       onClick={async () => {
//                         await mockAuth.logout();
//                         setUser(null);
//                       }}
//                       className="flex-1 text-center py-2.5 px-4 border border-border text-muted-foreground rounded-xl text-sm font-medium"
//                     >
//                       {tr.logout}
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => mockAuth.redirectToLogin()}
//                       className="flex-1 text-center py-2.5 px-4 border border-border rounded-xl text-sm font-medium"
//                     >
//                       {tr.login}
//                     </button>
//                     <button
//                       onClick={() => mockAuth.redirectToLogin()}
//                       className="flex-1 text-center py-2.5 px-4 gold-gradient rounded-xl text-sm font-semibold"
//                     >
//                       {tr.register}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  LogOut,
  User,
  Heart,
  Moon,
  Sun,
  LayoutDashboard,
  FileText,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL =
  "https://media.base44.com/images/public/69e13339ea1b0b97c63a7ecc/b4db5ec8f_farooqia_logo_withBg.png";

export default function Navbar() {
  const { language, setLanguage, currentLang, languages } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation(language);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });
  const location = useLocation();



  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Apply system theme on first load
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (!localStorage.getItem("theme")) {
      setDark(mq.matches);
    }
    const handler = (e) => {
      if (!localStorage.getItem("theme")) setDark(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const navLinks = [
    { href: "/", label: t('nav:home') },
    { href: "/teachers", label: t('nav:teachers') },
    { href: "/donate", label: t('nav:donate') },
    { href: "/fundraising", label: t('nav:fundraising') },
    { href: "/contact", label: t('nav:contact') },
  ];

  const institutionLinks = [
    {
      href: "/niswaan",
      label: "Niswaan Branch",
      sub: "Girls Madrasa · Est. 2003",
    },
    {
      href: "/masjid-hifz",
      label: "Masjid & Hifz",
      sub: "Quran Memorisation · Est. 1999",
    },
  ];

  const isAdmin = user?.role === "admin";
  const isTeacher = user?.role === "teacher";
  const canAccessAdmin = isAdmin || isTeacher;
  const isRTL = currentLang.dir === "rtl";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
        : "bg-transparent"
        }`}
      dir={currentLang.dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={LOGO_URL}
              alt="Madrasa Farooqia"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-accent/40 shadow-md"
            />
            <div className={isRTL ? "text-right" : "text-left"}>
              <div
                className={`font-playfair font-bold text-base sm:text-lg leading-tight ${scrolled ? "text-foreground" : "text-white"}`}
              >
                Madrasa Farooqia
              </div>
              <div
                className={`text-[10px] sm:text-xs font-amiri ${scrolled ? "text-muted-foreground" : "text-white/70"}`}
              >
                Husianabad, Mau — مدرسة فاروقية
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === link.href
                  ? scrolled
                    ? "bg-foreground text-background"
                    : "bg-white/15 text-white"
                  : scrolled
                    ? "text-foreground hover:bg-secondary"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Institutions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${["/niswaan", "/masjid-hifz"].includes(location.pathname)
                    ? scrolled
                      ? "bg-foreground text-background"
                      : "bg-white/15 text-white"
                    : scrolled
                      ? "text-foreground hover:bg-secondary"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                    }`}
                >
                  Institutions <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {institutionLinks.map(({ href, label, sub }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link
                      to={href}
                      className="flex flex-col items-start gap-0.5 py-2"
                    >
                      <span className="font-medium text-foreground">
                        {label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {sub}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDark((d) => !d)}
              className={`p-2 rounded-lg transition-colors ${scrolled ? "text-foreground hover:bg-secondary" : "text-white/80 hover:bg-white/10"}`}
              aria-label="Toggle theme"
            >
              {dark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Language Picker */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${scrolled
                    ? "text-foreground hover:bg-secondary"
                    : "text-white/85 hover:bg-white/10"
                    }`}
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden lg:inline">
                    {currentLang.flag} {currentLang.label}
                  </span>
                  <span className="lg:hidden">{currentLang.flag}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={
                      language === lang.code ? "bg-secondary font-medium" : ""
                    }
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${scrolled
                      ? "text-foreground hover:bg-secondary"
                      : "text-white/85 hover:bg-white/10"
                      }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-xs font-bold text-foreground">
                      {user.full_name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="max-w-[80px] truncate hidden lg:block">
                      {user.full_name?.split(" ")[0] || "User"}
                    </span>
                    {user.role && (
                      <span className="hidden lg:block text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent-foreground font-semibold uppercase">
                        {user.role}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/my-donations"
                      className="flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4" /> {t('nav:myDonations')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/receipts" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Tax Receipts
                    </Link>
                  </DropdownMenuItem>
                  {canAccessAdmin && (
                    <DropdownMenuItem asChild>
                      <Link
                        to={isTeacher ? "/admin/students" : "/admin"}
                        className="flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        {isTeacher ? "Student Panel" : "Admin Panel"}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await logout("/");
                    }}
                    className="text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> {t('nav:logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className={scrolled ? "" : "text-white hover:bg-white/10"}
                >
                  {t('nav:login')}
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/signup")}
                  className="gold-gradient text-foreground font-semibold border-0 shadow-sm"
                >
                  {t('nav:register')}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile: dark toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              className={`p-2 rounded-lg ${scrolled ? "text-foreground" : "text-white"}`}
            >
              {dark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              className={`p-2 rounded-lg ${scrolled ? "text-foreground" : "text-white"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.href
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-secondary"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Institutions
              </div>
              {institutionLinks.map(({ href, label, sub }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex flex-col px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === href ? "bg-foreground text-background" : "text-foreground hover:bg-secondary"}`}
                >
                  <span>{label}</span>
                  <span
                    className={`text-xs mt-0.5 ${location.pathname === href ? "text-background/60" : "text-muted-foreground"}`}
                  >
                    {sub}
                  </span>
                </Link>
              ))}

              {/* Language row */}
              <div className="pt-2 pb-1 flex flex-wrap gap-2 border-t border-border mt-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${language === lang.code
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground"
                      }`}
                  >
                    {lang.flag} {lang.label}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex gap-2 border-t border-border">
                {user ? (
                  <>
                    <Link
                      to="/my-donations"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 text-center py-2.5 px-4 bg-secondary text-foreground rounded-xl text-sm font-medium"
                    >
                      {t('nav:myDonations')}
                    </Link>
                    {canAccessAdmin && (
                      <Link
                        to={isTeacher ? "/admin/students" : "/admin"}
                        onClick={() => setIsOpen(false)}
                        className="flex-1 text-center py-2.5 px-4 bg-foreground text-background rounded-xl text-sm font-medium"
                      >
                        {isTeacher ? "Students" : "Admin"}
                      </Link>
                    )}
                    <button
                      onClick={async () => {
                        await logout("/");
                      }}
                      className="flex-1 text-center py-2.5 px-4 border border-border text-muted-foreground rounded-xl text-sm font-medium"
                    >
                      {t('nav:logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/login");
                      }}
                      className="flex-1 text-center py-2.5 px-4 border border-border rounded-xl text-sm font-medium"
                    >
                      {t('nav:login')}
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/signup");
                      }}
                      className="flex-1 text-center py-2.5 px-4 gold-gradient rounded-xl text-sm font-semibold"
                    >
                      {t('nav:register')}
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
