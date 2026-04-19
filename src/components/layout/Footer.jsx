import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/lib/i18n";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const LOGO_URL =
  "https://media.base44.com/images/public/69e13339ea1b0b97c63a7ecc/b4db5ec8f_farooqia_logo_withBg.png";

export default function Footer() {
  const { language, currentLang } = useLanguage();
  const tr = useTranslation(language);

  return (
    <footer className="bg-foreground text-background" dir={currentLang.dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={LOGO_URL}
                alt="Logo"
                className="w-12 h-12 rounded-full border-2 border-accent/40 object-cover"
              />
              <div>
                <div className="font-playfair font-bold text-base text-background">
                  Madrasa Farooqia
                </div>
                <div className="text-background/50 text-xs font-amiri">
                  مدرسة فاروقية
                </div>
              </div>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-2">
              Husianabad, Mau, Uttar Pradesh, India
            </p>
            <p className="text-background/60 text-sm leading-relaxed">
              Spreading authentic Islamic knowledge since 1999.
            </p>
            <div className="flex gap-3 mt-5">
              {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-accent mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: tr.home },
                { to: "/teachers", label: tr.teachers },
                { to: "/donate", label: tr.donate },
                { to: "/fundraising", label: tr.fundraising },
                { to: "/contact", label: tr.contact },
                { to: "/coming-soon", label: "Coming Soon" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-background/60 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-accent mb-4 text-sm uppercase tracking-wider">
              {tr.contact}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/60">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <a
                  href="https://maps.google.com/?q=Husianabad,Mau,Uttar+Pradesh,India"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Husianabad, Mau, UP 275101, India
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/60">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                +91 XXXXX-XXXXX
              </li>
              <li className="flex items-center gap-3 text-sm text-background/60">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                info@madrasafarooqia.org
              </li>
              <li className="flex items-center gap-3 text-sm text-background/60">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                @contactdeveloper
              </li>
            </ul>
          </div>

          {/* Donate CTA */}
          <div>
            <h4 className="font-semibold text-accent mb-4 text-sm uppercase tracking-wider">
              Support Us
            </h4>
            <p className="text-background/60 text-sm mb-4 leading-relaxed">
              Your generous donation sustains our mission of authentic Islamic
              education.
            </p>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 gold-gradient text-foreground font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity shadow-lg"
            >
              <Heart className="w-4 h-4" />
              {tr.donatNow}
            </Link>
          </div>
        </div>

        <div className="py-5 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-background/40">
          <span>© 2025 Madrasa Farooqia. All rights reserved.</span>
          <span className="font-amiri text-base text-background/50">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
        </div>
      </div>
    </footer>
  );
}
