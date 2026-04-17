import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';

export default function EventCard({ event, index = 0 }) {
  const date = event.date ? new Date(event.date) : null;
  const isUpcoming = date && date >= new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-400"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {event.image_url ? (
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 ghost-geometry" />
        )}

        {/* Date Badge */}
        {date && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm">
            <div className="px-3 py-1 text-white text-[10px] font-jakarta font-bold uppercase tracking-wider text-center" style={{ backgroundColor: 'var(--deep-oasis)' }}>
              {format(date, 'MMM')}
            </div>
            <div className="px-3 py-1 text-primary font-baskerville font-bold text-lg text-center">
              {format(date, 'dd')}
            </div>
          </div>
        )}

        {isUpcoming && (
          <div className="absolute top-4 right-4">
            <span className="bg-primary text-primary-foreground text-xs font-jakarta font-semibold px-3 py-1 rounded-full">
              Upcoming
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <span className="inline-block text-xs font-jakarta uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--solar-gold)' }}>
          {event.type || 'Event'}
        </span>
        <h3 className="font-baskerville font-bold text-xl text-primary mb-2 line-clamp-2 leading-snug">
          {event.title}
        </h3>
        <p className="font-jakarta text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {event.description}
        </p>
        <div className="flex items-center gap-4 text-xs font-jakarta text-muted-foreground pt-4 border-t border-border">
          {date && (
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {format(date, 'PPP')}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={12} />
              {event.location}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}