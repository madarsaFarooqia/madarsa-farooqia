import React, { useState } from 'react';
import { BookOpen, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TeacherModal from './TeacherModal';
import { normalizeSubjectList, teacherExperienceYears } from '@/lib/utils';

export default function TeacherCard({ teacher, language, tr }) {
  const [showModal, setShowModal] = useState(false);
  const subjects = normalizeSubjectList(teacher.subjects);
  const experienceYears = teacherExperienceYears(teacher);

  const displayName = (language !== 'en' && teacher[`name_${language}`]) 
    ? teacher[`name_${language}`] 
    : teacher.name;

  const avatarUrl = teacher.photo_url || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=1a5c3a&color=fff&size=200&font-size=0.4`;

  return (
    <>
      <div
        className="bg-card rounded-2xl overflow-hidden border border-border card-hover cursor-pointer group shadow-sm"
        onClick={() => setShowModal(true)}
      >
        {/* Photo */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
          <img
            src={avatarUrl}
            alt={teacher.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=1a5c3a&color=fff&size=200&font-size=0.4`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {teacher.title && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-accent text-accent-foreground font-medium text-xs">
                {teacher.title}
              </Badge>
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <h3 className="font-playfair font-bold text-white text-xl">{displayName}</h3>
            {teacher.specialization && (
              <p className="text-white/80 text-sm">{teacher.specialization}</p>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            {experienceYears != null && experienceYears > 0 && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" />
                <span>{experienceYears} {tr.experience}</span>
              </div>
            )}
            {subjects.length > 0 && (
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-accent" />
                <span>{subjects.length} {tr.subjects}</span>
              </div>
            )}
          </div>

          {subjects.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {subjects.slice(0, 3).map((s, i) => (
                <span key={i} className="px-2 py-0.5 bg-secondary text-foreground text-xs rounded-full border border-border">
                  {s}
                </span>
              ))}
              {subjects.length > 3 && (
                <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                  +{subjects.length - 3}
                </span>
              )}
            </div>
          )}

          <button className="w-full py-2.5 text-sm font-semibold text-foreground border-2 border-border rounded-xl hover:bg-foreground hover:text-background transition-all group-hover:border-foreground">
            {tr.viewProfile}
          </button>
        </div>
      </div>

      {showModal && (
        <TeacherModal teacher={teacher} language={language} tr={tr} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}