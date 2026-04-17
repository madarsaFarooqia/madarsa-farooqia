import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, DollarSign, RefreshCw, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { authService, donationService } from '@/services';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const purposeIcons = {
  sadqa: '💝', zakat: '🌙', fitra: '🌾', lillah: '✨', waqf: '🏛️',
  general: '🤲', building: '🏗️', education: '📚', orphan_care: '👶', food_program: '🍲',
};

const COLORS = ['#0a0a0a', '#b8891a', '#374151', '#6b7280', '#111827'];

export default function MyDonations() {
  const { language } = useLanguage();
  const tr = useTranslation(language);
  const [donations, setDonations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.me()
      .then(u => {
        setUser(u);
        return donationService.filter({ donor_email: u.email }, '-created_date');
      })
      .then(setDonations)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalDonated = donations.reduce((s, d) => s + (d.amount || 0), 0);
  const currency = donations[0]?.currency || 'USD';

  // Chart data - donations per purpose
  const purposeData = Object.entries(
    donations.reduce((acc, d) => {
      acc[d.purpose] = (acc[d.purpose] || 0) + d.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Monthly chart
  const monthlyData = donations.reduce((acc, d) => {
    const month = d.created_date ? format(new Date(d.created_date), 'MMM yyyy') : 'Unknown';
    const existing = acc.find(x => x.month === month);
    if (existing) existing.amount += d.amount;
    else acc.push({ month, amount: d.amount });
    return acc;
  }, []).slice(-6).reverse();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 pt-20">
        <div className="text-center p-8">
          <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-2">Please Log In</h2>
          <p className="text-muted-foreground mb-6">Log in to view your donation history.</p>
          <Button onClick={() => authService.redirectToLogin('/my-donations')}>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="hero-gradient geometric-pattern pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-playfair text-4xl font-bold text-white mb-2">{tr.myDonationsTitle}</h1>
            <p className="text-white/70">{user.full_name || user.email}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: DollarSign, label: tr.totalDonated, value: `${currency} ${totalDonated.toLocaleString()}`, color: 'bg-foreground text-background' },
              { icon: Heart, label: 'Total Donations', value: donations.length, color: 'bg-secondary text-foreground' },
              { icon: RefreshCw, label: 'Recurring', value: donations.filter(d => d.is_recurring).length, color: 'bg-secondary text-foreground' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-playfair text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => <div key={i} className="bg-card rounded-2xl h-20 skeleton" />)}
            </div>
          ) : donations.length > 0 ? (
            <>
              {/* Charts */}
              {donations.length > 1 && (
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-accent" /> Monthly Donations
                    </h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={monthlyData}>
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip formatter={v => `${currency} ${v}`} />
                        <Bar dataKey="amount" fill="#0a0a0a" radius={[4,4,0,0]} name="Amount" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-accent" /> By Purpose
                    </h3>
                    <div className="flex items-center gap-4">
                      <ResponsiveContainer width="50%" height={180}>
                        <PieChart>
                          <Pie data={purposeData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                            {purposeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                          </Pie>
                          <Tooltip formatter={v => `${currency} ${v}`} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex-1 space-y-1.5">
                        {purposeData.slice(0, 4).map((d, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            <span>{purposeIcons[d.name] || '🤲'}</span>
                            <span className="text-muted-foreground capitalize">{d.name}</span>
                            <span className="font-semibold ml-auto">{currency} {d.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Donation List */}
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">All Donations</h3>
                </div>
                <div className="divide-y divide-border">
                  {donations.map((d, i) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-6 py-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="text-2xl">{purposeIcons[d.purpose] || '🤲'}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground capitalize">{d.purpose?.replace(/_/g, ' ')}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          {d.created_date ? format(new Date(d.created_date), 'MMM d, yyyy') : 'Unknown date'}
                          {d.is_recurring && (
                            <Badge variant="secondary" className="text-xs ml-1">
                              <RefreshCw className="w-3 h-3 mr-1" /> {d.recurring_frequency}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">{d.currency} {d.amount?.toLocaleString()}</div>
                        <Badge
                          className="text-xs bg-secondary text-foreground border-border"
                          variant="outline"
                        >
                          {d.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">{tr.noDonations}</h3>
              <p className="text-muted-foreground mb-6">Make your first donation and track it here.</p>
              <Button asChild className="gold-gradient text-foreground">
                <Link to="/donate">
                  <Heart className="w-4 h-4 mr-2" /> {tr.donatNow} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}