import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Building2, GraduationCap, BookOpen } from "lucide-react";

const institutions = [
  {
    id: "main",
    label: "Madrasa Farooqia",
    sublabel: "Main Institution",
    icon: Building2,
    href: "/teachers",
    description: "Founded 1999 · Mau, UP · Boys",
  },
  {
    id: "niswaan",
    label: "Niswaan Branch",
    sublabel: "Girls Madrasa",
    icon: GraduationCap,
    href: "/niswaan",
    description: "Girls Education · Separate Campus",
  },
  {
    id: "masjid",
    label: "Masjid & Hifz",
    sublabel: "Quran Program",
    icon: BookOpen,
    href: "/masjid-hifz",
    description: "Full Hifz Curriculum · Tajweed",
  },
];

export default function InstitutionTabs({ active, onChange }) {
  return (
    <section className="bg-foreground text-background py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {institutions.map(
            ({ id, label, sublabel, icon: Icon, href, description }) => {
              const isActive = active === id;
              return (
                <Link
                  key={id}
                  to={href}
                  onClick={() => onChange?.(id)}
                  className={`flex-1 min-w-[180px] flex items-center gap-3 px-6 py-4 border-b-2 transition-all group ${
                    isActive
                      ? "border-accent bg-white/5"
                      : "border-transparent hover:bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "bg-white/10 text-white/60 group-hover:bg-white/20"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left min-w-0">
                    <div
                      className={`text-sm font-semibold truncate ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}`}
                    >
                      {label}
                    </div>
                    <div className="text-xs text-white/40 truncate">
                      {description}
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
