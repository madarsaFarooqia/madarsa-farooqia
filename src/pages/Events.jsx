import { useState } from 'react';
import { useEventsQuery } from '../hooks/api';
import EventCard from '../components/events/EventCard';
import SectionHeader from '../components/shared/SectionHeader';
import { Loader2 } from 'lucide-react';
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";

export default function Events() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { data: events = [], isLoading: loading } = useEventsQuery('-created_date', 100);
  const [activeTab, setActiveTab] = useState('All');

  const TABS = [
    { key: 'All', label: t('events:tab_all', 'All') },
    { key: 'Upcoming', label: t('events:tab_upcoming', 'Upcoming') },
    { key: 'Religious', label: t('events:tab_religious', 'Religious') },
    { key: 'Competition', label: t('events:tab_competition', 'Competition') },
    { key: 'Community', label: t('events:tab_community', 'Community') },
    { key: 'Graduation', label: t('events:tab_graduation', 'Graduation') }
  ];

  const filtered = events.filter(e => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Upcoming') return new Date(e.date) >= new Date();
    return e.type === activeTab;
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="pt-28 pb-16 px-4 bg-primary ghost-geometry relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs font-jakarta font-semibold uppercase tracking-[0.2em] mb-4 text-primary-foreground/60">
            <span className="w-6 h-px bg-accent opacity-60"></span>{t('events:badge', 'Community')}<span className="w-6 h-px bg-accent opacity-60"></span>
          </span>
          <h1 className="font-baskerville font-bold text-5xl md:text-6xl text-white mb-4">{t('events:title', 'Events & Programs')}</h1>
          <p className="font-jakarta text-primary-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('events:subtitle', 'Religious gatherings, competitions, and community events that unite our families.')}
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-jakarta font-medium transition-all border ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-baskerville text-3xl text-primary mb-4">{t('events:no_events', 'No Events Found')}</p>
              <p className="font-jakarta text-muted-foreground">{t('events:no_events_desc', 'Events will appear here once added by the admin.')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}