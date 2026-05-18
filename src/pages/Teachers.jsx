import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Users, Award, GraduationCap, Star, Clock, ChevronRight, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { teacherService } from '../services';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import TeacherCard from '../components/teachers/TeacherCard';
import InstitutionTabs from '../components/institutions/InstitutionTabs';
import FacultyStats from '../components/teachers/FacultyStats';

export default function Teachers() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('all');
  const [activeInstitution, setActiveInstitution] = useState('main');

  useEffect(() => {
    teacherService.filter({ is_active: true }, '-created_date')
      .then(setTeachers)
      .catch(() => setTeachers([]))
      .finally(() => setLoading(false));
  }, []);

  const specializations = useMemo(
    () => [...new Set(teachers.map(t => t.specialization).filter(Boolean))],
    [teachers]
  );

  const filtered = useMemo(() => teachers.filter(t => {
    const matchSearch = !search ||
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.specialization?.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects?.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchSpec = specialization === 'all' || t.specialization === specialization;
    return matchSearch && matchSpec;
  }), [teachers, search, specialization]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="hero-gradient geometric-pattern pt-32 pb-24 relative overflow-hidden">
        {/* Decorative Arabic letter */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-amiri text-white/[0.04] text-[28rem] leading-none">ع</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <BookOpen className="w-4 h-4" />
              <span>Our Scholars & Faculty</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              {t('teachers:teachersTitle')}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              {t('teachers:teachersSubtitle')}
            </p>
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { icon: Users, label: 'Faculty Members', value: '85+' },
                { icon: Award, label: 'Avg. Experience', value: '18 yrs' },
                { icon: GraduationCap, label: 'Graduates Produced', value: '5,000+' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <Icon className="w-5 h-5 text-accent" />
                  <div className="text-left">
                    <div className="text-white font-comic font-bold text-lg leading-none">{value}</div>
                    <div className="text-white/60 text-xs mt-2">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Institution Tabs */}
      <InstitutionTabs active={activeInstitution} onChange={setActiveInstitution} />

      {/* Faculty Stats Strip */}
      <FacultyStats />

      {/* Filters */}
      <section className="bg-card border-b border-border sticky top-16 md:top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, subject, or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <Select value={specialization} onValueChange={setSpecialization}>
              <SelectTrigger className="w-full sm:w-60">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="All Specializations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {specializations.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(search || specialization !== 'all') && (
              <button
                onClick={() => { setSearch(''); setSpecialization('all'); }}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 whitespace-nowrap"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
                  <div className="h-56 skeleton" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 skeleton rounded w-3/4" />
                    <div className="h-3 skeleton rounded w-1/2" />
                    <div className="flex gap-2 mt-2">
                      <div className="h-6 skeleton rounded-full w-16" />
                      <div className="h-6 skeleton rounded-full w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Users className="w-4 h-4" />
                  <span><strong className="text-foreground">{filtered.length}</strong> Scholar{filtered.length !== 1 ? 's' : ''} Found</span>
                </div>
                {search && (
                  <Badge variant="outline" className="text-xs">
                    Results for: "{search}"
                  </Badge>
                )}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filtered.map((teacher, i) => (
                    <motion.div
                      key={teacher.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <TeacherCard teacher={teacher} language={language} t={t} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <BookOpen className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">No Scholars Found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters.</p>
              <button onClick={() => { setSearch(''); setSpecialization('all'); }} className="text-sm font-medium text-foreground underline underline-offset-4">
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Join Faculty CTA */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">Join Our Faculty</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Are you a qualified Islamic scholar interested in teaching? We welcome dedicated educators to join our mission.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Get In Touch <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}