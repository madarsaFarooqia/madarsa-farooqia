import { useState, useEffect } from 'react';
import { eventService } from '../services';
import EventCard from '../components/events/EventCard';
import SectionHeader from '../components/shared/SectionHeader';
import { Loader2 } from 'lucide-react';

const TABS = ['All', 'Upcoming', 'Religious', 'Competition', 'Community', 'Graduation'];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    eventService.list('-date', 100)
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

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
            <span className="w-6 h-px bg-accent opacity-60"></span>Community<span className="w-6 h-px bg-accent opacity-60"></span>
          </span>
          <h1 className="font-baskerville font-bold text-5xl md:text-6xl text-white mb-4">Events & Programs</h1>
          <p className="font-jakarta text-primary-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Religious gatherings, competitions, and community events that unite our families.
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-jakarta font-medium transition-all border ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-baskerville text-3xl text-primary mb-4">No Events Found</p>
              <p className="font-jakarta text-muted-foreground">Events will appear here once added by the admin.</p>
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