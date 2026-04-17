import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Check, Navigation } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { contactMessageService } from '@/services';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Real coordinates: Husianabad, Mau, UP, India
const MAPS_QUERY = 'Madarsa+Farooqia+Husianabad+Mau+Uttar+Pradesh+India';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const MAPS_EMBED = `https://maps.google.com/maps?q=${MAPS_QUERY}&z=15&output=embed`;

const contactInfo = [
  {
    icon: MapPin,
    titleKey: 'address',
    value: 'Husianabad, Mau, Uttar Pradesh 275101, India',
    link: MAPS_URL,
    color: 'bg-foreground text-background',
  },
  { icon: Phone, titleKey: 'phone', value: '+91 XXXXX-XXXXX', link: 'tel:+91XXXXXXXXXX', color: 'bg-secondary text-foreground' },
  { icon: Mail, titleKey: 'email', value: 'info@madrasafarooqia.org', link: 'mailto:info@madrasafarooqia.org', color: 'bg-secondary text-foreground' },
  { icon: Clock, titleKey: 'hours', value: 'Sat–Thu: 8am–6pm, Fri: Juma Only', link: null, color: 'bg-secondary text-foreground' },
];

export default function Contact() {
  const { language, currentLang } = useLanguage();
  const tr = useTranslation(language);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await contactMessageService.create(form);
    setLoading(false);
    setSent(true);
    toast.success(tr.messageSent);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background" dir={currentLang.dir}>
      {/* Hero */}
      <section className="hero-gradient geometric-pattern pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-4">
              <MessageSquare className="w-4 h-4" />
              <span>تواصل معنا</span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{tr.contactTitle}</h1>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">{tr.contactSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Map Banner — full width, clickable */}
      <motion.a
        href={MAPS_URL}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="block relative group cursor-pointer overflow-hidden"
        title="Click to navigate to Madrasa Farooqia"
      >
        <iframe
          title="Madrasa Farooqia Location"
          src={MAPS_EMBED}
          width="100%"
          height="320"
          style={{ border: 0, pointerEvents: 'none' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        />
        {/* Overlay with CTA */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card text-foreground font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-xl border border-border">
            <Navigation className="w-4 h-4" /> Navigate to Madrasa Farooqia
          </div>
        </div>
        {/* Location Pin overlay */}
        <div className="absolute top-4 left-4 bg-foreground text-background px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          Husianabad, Mau, UP — India
        </div>
      </motion.a>

      <section className="py-12 sm:py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-playfair text-2xl font-bold text-foreground">Get In Touch</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We welcome your questions, feedback, and admissions inquiries. Our team responds within 24 hours.
              </p>

              {contactInfo.map((item, i) => {
                const Inner = (
                  <div className={`flex items-start gap-4 p-4 bg-card rounded-2xl border border-border shadow-sm ${item.link ? 'hover:border-accent/40 hover:shadow-md transition-all cursor-pointer' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{tr[item.titleKey]}</div>
                      <div className="text-muted-foreground text-sm mt-0.5">{item.value}</div>
                      {item.link && <div className="text-accent text-xs mt-1 font-medium">Click to open ↗</div>}
                    </div>
                  </div>
                );
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {item.link ? (
                      <a href={item.link} target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
                        {Inner}
                      </a>
                    ) : Inner}
                  </motion.div>
                );
              })}

              {/* Small map thumbnail */}
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="block mt-4 rounded-2xl overflow-hidden border border-border shadow-sm group relative">
                <iframe
                  title="Mini Map"
                  src={MAPS_EMBED}
                  width="100%"
                  height="180"
                  style={{ border: 0, pointerEvents: 'none' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-card text-foreground text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 border border-border">
                    <Navigation className="w-3.5 h-3.5" /> Open in Maps
                  </span>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-lg"
            >
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-background" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-2">{tr.messageSent}</p>
                  <p className="font-amiri text-accent text-lg mb-6">جزاك الله خيرًا</p>
                  <Button onClick={() => setSent(false)} variant="outline" className="rounded-xl">Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-playfair text-2xl font-bold text-foreground mb-6">{tr.sendMessage}</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block text-sm font-medium">{tr.yourName} *</Label>
                      <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="rounded-xl" />
                    </div>
                    <div>
                      <Label className="mb-2 block text-sm font-medium">{tr.yourEmail} *</Label>
                      <Input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="rounded-xl" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block text-sm font-medium">{tr.yourPhone}</Label>
                      <Input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="rounded-xl" />
                    </div>
                    <div>
                      <Label className="mb-2 block text-sm font-medium">{tr.subject} *</Label>
                      <Input required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 block text-sm font-medium">{tr.message} *</Label>
                    <Textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="resize-none rounded-xl" />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2"><Send className="w-4 h-4" /> {tr.sendMessage}</span>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}