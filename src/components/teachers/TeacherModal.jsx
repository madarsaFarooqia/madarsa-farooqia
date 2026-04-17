import React from 'react';
import { X, Mail, Phone, BookOpen, Clock, Award, Star, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { normalizeSubjectList, teacherExperienceYears } from '@/lib/utils';

export default function TeacherModal({ teacher, language, tr, onClose }) {
  const subjects = normalizeSubjectList(teacher.subjects);
  const experienceYears = teacherExperienceYears(teacher);

  const displayName = (language !== 'en' && teacher[`name_${language}`])
    ? teacher[`name_${language}`]
    : teacher.name;

  const displayBio = (language !== 'en' && teacher[`bio_${language}`])
    ? teacher[`bio_${language}`]
    : teacher.bio || teacher.biography;

  const avatarUrl = teacher.photo_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=1a5c3a&color=fff&size=400&font-size=0.35`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-card rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Hero Header */}
          <div className="relative h-56 bg-gradient-to-br from-primary to-primary/60 overflow-hidden">
            <img
              src={avatarUrl}
              alt={teacher.name}
              className="w-full h-full object-cover opacity-30"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 hero-gradient opacity-80" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Badge className="bg-accent text-accent-foreground mb-2">{teacher.title}</Badge>
              <h2 className="font-playfair text-3xl font-bold">{displayName}</h2>
              {teacher.specialization && (
                <p className="text-white/80 mt-1">{teacher.specialization}</p>
              )}
            </div>
          </div>

          {/* Avatar */}
          <div className="px-6 -mt-8 mb-4">
            <img
              src={avatarUrl}
              alt={teacher.name}
              className="w-20 h-20 rounded-2xl border-4 border-card shadow-xl object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=1a5c3a&color=fff&size=80&font-size=0.35`;
              }}
            />
          </div>

          {/* Content */}
          <div className="px-6 pb-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { icon: Clock, label: tr.experience, value: experienceYears ? `${experienceYears}+` : 'N/A' },
                { icon: BookOpen, label: tr.subjects, value: subjects.length || 0 },
                { icon: Award, label: tr.qualification, value: (teacher.qualification || teacher.qualifications) ? '✓' : '—' },
              ].map((item, i) => (
                <div key={i} className="bg-secondary/50 rounded-2xl p-4 text-center">
                  <item.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                  <div className="font-bold text-lg text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Bio */}
            {displayBio && (
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" /> About
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{displayBio}</p>
              </div>
            )}

            {/* Qualification */}
            {(teacher.qualification || teacher.qualifications) && (
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-accent" /> {tr.qualification}
                </h3>
                <p className="text-muted-foreground text-sm">{teacher.qualification || teacher.qualifications}</p>
              </div>
            )}

            {/* Subjects */}
            {subjects.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-accent" /> {tr.subjects}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s, i) => (
                    <Badge key={i} variant="secondary" className="bg-secondary text-foreground border-border">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            {(teacher.email || teacher.phone) && (
              <div className="pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">Contact</h3>
                <div className="flex flex-col gap-2">
                  {teacher.email && (
                    <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 text-sm text-foreground hover:underline">
                      <Mail className="w-4 h-4" /> {teacher.email}
                    </a>
                  )}
                  {teacher.phone && (
                    <a href={`tel:${teacher.phone}`} className="flex items-center gap-2 text-sm text-foreground hover:underline">
                      <Phone className="w-4 h-4" /> {teacher.phone}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}