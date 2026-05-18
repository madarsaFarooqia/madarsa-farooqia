import { useState, useEffect } from 'react';
import { studentService } from '../services';
import StudentCard from '../components/students/StudentCard';
import SectionHeader from '../components/shared/SectionHeader';
import { Loader2 } from 'lucide-react';

const COURSES = ['All', 'Hifz', 'Alim', 'Primary', 'Tajweed', 'Arabic'];

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState('All');

  useEffect(() => {
    studentService.list('-created_date', 100)
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  const featured = students.filter(s => s.is_featured);
  const filtered = activeCourse === 'All' ? students : students.filter(s => s.course === activeCourse);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="pt-28 pb-16 px-4 bg-primary ghost-geometry relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs font-jakarta font-semibold uppercase tracking-[0.2em] mb-4 text-primary-foreground/60">
            <span className="w-6 h-px bg-accent opacity-60"></span>Students<span className="w-6 h-px bg-accent opacity-60"></span>
          </span>
          <h1 className="font-baskerville font-bold text-5xl md:text-6xl text-white mb-4">Wall of Achievement</h1>
          <p className="font-jakarta text-primary-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Every student carries a unique story of dedication, growth, and spiritual development.
          </p>
        </div>
      </div>

      {/* Featured Students */}
      {featured.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Top Performers"
              title="Featured Students"
              description="Celebrating exceptional dedication and achievement."
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
                key={course}
                onClick={() => setActiveCourse(course)}
                className={`px-5 py-2 rounded-full text-sm font-jakarta font-medium transition-all border ${
                  activeCourse === course
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {course}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-baskerville text-3xl text-primary mb-4">No Students Yet</p>
              <p className="font-jakarta text-muted-foreground">Student profiles will appear here once added by the admin.</p>
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