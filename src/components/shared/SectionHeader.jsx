import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`flex flex-col ${alignment} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-jakarta font-semibold uppercase tracking-[0.2em] text-accent mb-4" style={{ color: 'var(--solar-gold)' }}>
          <span className="w-6 h-px bg-accent" style={{ backgroundColor: 'var(--solar-gold)' }}></span>
          {eyebrow}
          <span className="w-6 h-px bg-accent" style={{ backgroundColor: 'var(--solar-gold)' }}></span>
        </span>
      )}
      <h2 className="font-baskerville font-bold text-3xl md:text-4xl lg:text-5xl text-primary mb-4 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="font-jakarta text-muted-foreground text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}