import { useState, useEffect } from 'react';
import { campaignService, donationService } from '../services';
import CampaignCard from '../components/campaigns/CampaignCard';
import SectionHeader from '../components/shared/SectionHeader';
import GeometricProgress from '../components/campaigns/GeometricProgress';
import { Loader2, Heart, TrendingUp, Users2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";

export default function Campaigns() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const CATEGORIES = [
    { key: 'All', label: t('campaigns:cat_all', 'All') },
    { key: 'Infrastructure', label: t('campaigns:cat_infrastructure', 'Infrastructure') },
    { key: 'Scholarships', label: t('campaigns:cat_scholarships', 'Scholarships') },
    { key: 'Teacher Salaries', label: t('campaigns:cat_salaries', 'Teacher Salaries') },
    { key: 'Operations', label: t('campaigns:cat_operations', 'Operations') },
    { key: 'Ramadan', label: t('campaigns:cat_ramadan', 'Ramadan') },
    { key: 'General', label: t('campaigns:cat_general', 'General') }
  ];

  useEffect(() => {
    Promise.all([
      campaignService.list('-created_date', 100),
      donationService.filter({ status: 'completed' }, '-created_date', 100),
    ]).then(([c, d]) => {
      setCampaigns(c);
      setDonations(d);
    }).finally(() => setLoading(false));
  }, []);

  const totalRaised = donations.reduce((s, d) => s + (d.amount || 0), 0);
  const totalDonors = new Set(donations.map(d => d.donor_email || d.donor_name)).size;

  const filtered = activeCategory === 'All' ? campaigns : campaigns.filter(c => c.category === activeCategory);

  return (
    <div className="bg-background min-h-screen">
      <div className="pt-28 pb-16 px-4 bg-primary ghost-geometry relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs font-jakarta font-semibold uppercase tracking-[0.2em] mb-4 text-primary-foreground/60">
            <span className="w-6 h-px bg-accent opacity-60"></span>{t('campaigns:badge', 'Fundraising')}<span className="w-6 h-px bg-accent opacity-60"></span>
          </span>
          <h1 className="font-baskerville font-bold text-5xl md:text-6xl text-white mb-4">{t('campaigns:title', 'Our Campaigns')}</h1>
          <p className="font-jakarta text-primary-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('campaigns:subtitle', 'Every contribution fuels the light of education. See our active campaigns and track where your support goes.')}
          </p>
        </div>
      </div>

      {/* Why Donate */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow={t('campaigns:why_eyebrow', 'Transparency')}
            title={t('campaigns:why_title', 'Why Your Donations Matter')}
            description={t('campaigns:why_desc', 'Every dirham and dollar directly supports the growth of our students and institution.')}
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: t('campaigns:why_inf', 'Infrastructure'), desc: t('campaigns:why_inf_desc', 'Building classrooms, libraries, and facilities for a growing student body.'), color: 'bg-primary/10 text-primary' },
              { icon: Heart, title: t('campaigns:why_sup', 'Student Support'), desc: t('campaigns:why_sup_desc', 'Food, accommodation, scholarships, and basic needs for underprivileged students.'), color: 'bg-accent/10 text-accent' },
              { icon: Users2, title: t('campaigns:why_ops', 'Operations'), desc: t('campaigns:why_ops_desc', 'Teacher salaries, utilities, maintenance, and daily running costs of the madrasa.'), color: 'bg-primary/5 text-primary' },
            ].map(({ icon: IconComp, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${color}`}>
                  <IconComp size={22} />
                </div>
                <h3 className="font-baskerville font-bold text-xl text-primary mb-2">{title}</h3>
                <p className="font-jakarta text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/50 rounded-2xl p-8 text-center">
              <p className="font-baskerville font-bold text-4xl text-primary">${totalRaised.toLocaleString()}</p>
              <p className="font-jakarta text-sm text-muted-foreground mt-1">{t('campaigns:stat_funds', 'Total Funds Raised')}</p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 text-center">
              <p className="font-baskerville font-bold text-4xl text-primary">{campaigns.length}</p>
              <p className="font-jakarta text-sm text-muted-foreground mt-1">{t('campaigns:stat_active', 'Active Campaigns')}</p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 text-center">
              <p className="font-baskerville font-bold text-4xl text-primary">{totalDonors}</p>
              <p className="font-jakarta text-sm text-muted-foreground mt-1">{t('campaigns:stat_donors', 'Generous Donors')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-jakarta font-medium transition-all border ${
                  activeCategory === cat.key
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-baskerville text-3xl text-primary mb-4">{t('campaigns:no_campaigns', 'No Campaigns Found')}</p>
              <p className="font-jakarta text-muted-foreground">{t('campaigns:no_campaigns_desc', 'Campaigns will appear here once created by the admin.')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((c, i) => <CampaignCard key={c.id} campaign={c} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}