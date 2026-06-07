import { useState } from 'react';
import { useStudentsQuery } from '../hooks/api';
import StudentCard from '../components/students/StudentCard';
import SectionHeader from '../components/shared/SectionHeader';
import { Loader2 } from 'lucide-react';
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";

export default function Students() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { data: students = [], isLoading: loading } = useStudentsQuery('-created_date', 100);
  const [activeCourse, setActiveCourse] = useState('All');

  const COURSES = [
    { key: 'All', label: t('students:course_all', 'All') },
    { key: 'Hifz', label: t('students:course_hifz', 'Hifz') },
    { key: 'Alim', label: t('students:course_alim', 'Alim') },
    { key: 'Primary', label: t('students:course_primary', 'Primary') },
    { key: 'Tajweed', label: t('students:course_tajweed', 'Tajweed') },
    { key: 'Arabic', label: t('students:course_arabic', 'Arabic') }
  ];

  const featured = students.filter(s => s.is_featured);
  const filtered = activeCourse === 'All' ? students : students.filter(s => s.course === activeCourse);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="pt-28 pb-16 px-4 bg-primary ghost-geometry relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs font-jakarta font-semibold uppercase tracking-[0.2em] mb-4 text-primary-foreground/60">
            <span className="w-6 h-px bg-accent opacity-60"></span>{t('students:badge', 'Students')}<span className="w-6 h-px bg-accent opacity-60"></span>
          </span>
          <h1 className="font-baskerville font-bold text-5xl md:text-6xl text-white mb-4">{t('students:title', 'Wall of Achievement')}</h1>
          <p className="font-jakarta text-primary-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('students:subtitle', 'Every student carries a unique story of dedication, growth, and spiritual development.')}
          </p>
        </div>
      </div>

      {/* Featured Students */}
      {featured.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow={t('students:featured_eyebrow', 'Top Performers')}
              title={t('students:featured_title', 'Featured Students')}
              description={t('students:featured_desc', 'Celebrating exceptional dedication and achievement.')}
            />
            <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
              {featured.map((student, i) => (
                <StudentCard key={student.id} student={student} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {COURSES.map(course => (
              <button
                key={course.key}
                onClick={() => setActiveCourse(course.key)}
                className={`px-5 py-2 rounded-full text-sm font-jakarta font-medium transition-all border ${
                  activeCourse === course.key
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {course.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-baskerville text-3xl text-primary mb-4">{t('students:no_students', 'No Students Yet')}</p>
              <p className="font-jakarta text-muted-foreground">{t('students:no_students_desc', 'Student profiles will appear here once added by the admin.')}</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
              {filtered.map((student, i) => (
                <StudentCard key={student.id} student={student} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}