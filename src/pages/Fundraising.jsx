import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, PieChart, BarChart2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { useCampaignsQuery } from '../hooks/api';
import CampaignCard from '../components/fundraising/CampaignCard';
import { Progress } from '../components/ui/progress';
import { RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart as RePieChart, Pie } from 'recharts';

const COLORS = ['#0a0a0a', '#b8891a', '#374151', '#6b7280', '#111827', '#d4a53a', '#1f2937', '#4b5563'];

export default function Fundraising() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { data: campaigns = [], isLoading: loading } = useCampaignsQuery('-created_date', 100);

  const totalGoal = campaigns.reduce((s, c) => s + (c.goal_amount || 0), 0);
  const totalCollected = campaigns.reduce((s, c) => s + (c.collected_amount || 0), 0);
  const totalDonors = campaigns.reduce((s, c) => s + (c.donors_count || 0), 0);
  const overallPercent = totalGoal ? Math.min((totalCollected / totalGoal) * 100, 100) : 0;

  const pieData = campaigns.map((c, i) => ({
    name: c.title,
    value: c.collected_amount || 0,
    fill: COLORS[i % COLORS.length],
  }));

  const barData = campaigns.map((c, i) => ({
    name: c.title.length > 15 ? c.title.slice(0, 15) + '…' : c.title,
    collected: c.collected_amount || 0,
    remaining: Math.max(0, (c.goal_amount || 0) - (c.collected_amount || 0)),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="hero-gradient geometric-pattern pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              <span>Fund Our Future</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">{t('fundraising:fundraisingTitle')}</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">{t('fundraising:fundraisingSubtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Overall Stats */}
      {campaigns.length > 0 && (
        <section className="py-12 bg-card border-b border-border -mt-8 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-3xl shadow-xl border border-border p-8">
              <h2 className="font-playfair text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-accent" /> Overall Progress
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold text-primary">${totalCollected.toLocaleString()}</div>
                  <div className="text-muted-foreground text-sm mt-1">{t('fundraising:raised')}</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold text-accent">${totalGoal.toLocaleString()}</div>
                  <div className="text-muted-foreground text-sm mt-1">{t('fundraising:goal')}</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold text-foreground">{totalDonors.toLocaleString()}</div>
                  <div className="text-muted-foreground text-sm mt-1">{t('fundraising:donors')}</div>
                </div>
              </div>

              <div className="mb-2 flex justify-between text-sm font-medium">
                <span className="text-primary">{overallPercent.toFixed(1)}% Complete</span>
                <span className="text-muted-foreground">${(totalGoal - totalCollected).toLocaleString()} remaining</span>
              </div>
              <Progress value={overallPercent} shape="wavy" className="h-4 rounded-full" />
            </div>
          </div>
        </section>
      )}

      {/* Charts */}
      {campaigns.length > 0 && !loading && (
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-playfair text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-accent" /> Campaign Analytics
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Bar Chart */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Collection vs Remaining</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    <Bar dataKey="collected" fill="#0a0a0a" name={t('fundraising:raised')} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="remaining" fill="#e5e7eb" name="Remaining" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Donations by Campaign</h3>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="50%" height={240}>
                    <RePieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2">
                    {pieData.slice(0, 5).map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="text-muted-foreground truncate">{d.name}</span>
                        <span className="font-semibold ml-auto">${d.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Campaign Progress Bars */}
            <div className="mt-8 bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-accent" /> Campaign Progress Details
              </h3>
              <div className="space-y-5">
                {campaigns.map((c, i) => {
                  const pct = c.goal_amount ? Math.min((c.collected_amount / c.goal_amount) * 100, 100) : 0;
                  return (
                    <div key={c.id}>
                      <div className="flex justify-between items-center mb-1.5 text-sm">
                        <span className="font-medium text-foreground truncate">{c.title}</span>
                        <div className="flex items-center gap-3 ml-4 shrink-0">
                          <span className="text-muted-foreground text-xs">${c.collected_amount?.toLocaleString() || 0} / ${c.goal_amount?.toLocaleString()}</span>
                          <span className="font-bold text-xs" style={{ color: COLORS[i % COLORS.length] }}>{pct.toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{ background: COLORS[i % COLORS.length] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Campaign Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="bg-card rounded-2xl h-80 skeleton" />)}
            </div>
          ) : campaigns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign, i) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CampaignCard campaign={campaign} t={t} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">No Active Campaigns</h3>
              <p className="text-muted-foreground">Check back soon for new fundraising campaigns.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}