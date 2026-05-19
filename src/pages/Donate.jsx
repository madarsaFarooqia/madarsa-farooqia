import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Check, User, Mail, Phone, CreditCard, RefreshCw, EyeOff, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { authService, donationService, fundraisingCampaignService } from '../services';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';
import DonationSuccessModal from '../components/shared/DonationSuccessModal';
import { FarooqiaLogo, AuthBackground } from "../assets";

const purposes = [
  { value: 'sadqa', icon: '💝', color: 'bg-secondary border-border' },
  { value: 'zakat', icon: '🌙', color: 'bg-secondary border-border' },
  { value: 'fitra', icon: '🌾', color: 'bg-secondary border-border' },
  { value: 'lillah', icon: '✨', color: 'bg-secondary border-border' },
  { value: 'waqf', icon: '🏛️', color: 'bg-secondary border-border' },
  { value: 'general', icon: '🤲', color: 'bg-secondary border-border' },
  { value: 'building', icon: '🏗️', color: 'bg-secondary border-border' },
  { value: 'education', icon: '📚', color: 'bg-secondary border-border' },
  { value: 'orphan_care', icon: '👶', color: 'bg-secondary border-border' },
  { value: 'food_program', icon: '🍲', color: 'bg-secondary border-border' },
];

const amounts = [10, 25, 50, 100, 250, 500];
const currencies = ['USD', 'INR', 'SAR', 'AED', 'GBP', 'EUR', 'TRY'];

export default function Donate() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get('campaign');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastDonation, setLastDonation] = useState(null);

  const [form, setForm] = useState({
    purpose: 'general',
    amount: 50,
    customAmount: '',
    currency: 'USD',
    isRecurring: false,
    recurringFrequency: 'monthly',
    isAnonymous: false,
    donorName: '',
    donorEmail: '',
    donorPhone: '',
  });

  useEffect(() => {
    authService.me().then(u => {
      setUser(u);
      setForm(f => ({ ...f, donorName: u.full_name || '', donorEmail: u.email || '' }));
    }).catch(() => { });
  }, []);

  const finalAmount = form.customAmount ? parseFloat(form.customAmount) : form.amount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 1) {
      toast.error('Please enter a valid amount');
      return;
    }
    setLoading(true);

    const donation = {
      donor_name: form.isAnonymous ? 'Anonymous' : form.donorName,
      donor_email: form.donorEmail,
      donor_phone: form.donorPhone,
      amount: finalAmount,
      currency: form.currency,
      purpose: form.purpose,
      is_recurring: form.isRecurring,
      recurring_frequency: form.isRecurring ? form.recurringFrequency : null,
      recurring_amount: form.isRecurring ? finalAmount : null,
      is_anonymous: form.isAnonymous,
      campaign_id: campaignId || null,
      status: 'completed',
      payment_method: 'card',
    };

    const created = await donationService.create(donation);

    if (campaignId) {
      const list = await fundraisingCampaignService.list('-created_date', 500);
      const campaign = list.find((x) => String(x.id) === String(campaignId));
      if (campaign) {
        await fundraisingCampaignService.update(campaignId, {
          collected_amount: (campaign.collected_amount || 0) + finalAmount,
          donors_count: (campaign.donors_count || 0) + 1,
        });
      }
    }

    setLastDonation({ ...donation, id: created?.id });
    setLoading(false);
    setSuccess(true);
  };

  if (success && lastDonation) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <DonationSuccessModal
          donation={lastDonation}
          onClose={() => { setSuccess(false); window.location.href = '/'; }}
          onDonateAgain={() => { setSuccess(false); setLastDonation(null); setForm(f => ({ ...f, customAmount: '', amount: 50 })); }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero */}
      <section className="relative hero-gradient geometric-pattern pt-32 pb-20 overflow-hidden">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url(${AuthBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 text-accent text-sm font-bold mb-6 italic backdrop-blur-sm bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <Heart className="w-4 h-4" />
              <span>Make a Difference</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-white mb-6 italic">
              {t('donate:donateTitle')}
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto italic font-medium leading-relaxed">
              {t('donate:donateSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 -mt-10 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl shadow-xl p-6 sm:p-10 border border-border"
          >
            {/* Purpose Selection */}
            <div className="mb-10">
              <Label className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" /> {t('donate:selectPurpose')}
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                {purposes.map(p => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setForm({ ...form, purpose: p.value })}
                    className={`p-4 rounded-2xl border-2 text-center transition-all ${form.purpose === p.value
                        ? 'border-primary bg-primary/5 shadow-md'
                        : `${p.color} hover:shadow-md`
                      }`}
                  >
                    <div className="text-2xl mb-1">{p.icon}</div>
                    <div className="text-xs font-medium text-foreground">{t(`donate:${p.value}`)}</div>
                    {form.purpose === p.value && (
                      <Check className="w-4 h-4 text-primary mx-auto mt-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Selection */}
            <div className="mb-10">
              <Label className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent" /> {t('donate:donationAmount')}
              </Label>
              <div className="flex gap-3 mb-4">
                <Select value={form.currency} onValueChange={v => setForm({ ...form, currency: v })}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                {amounts.map(a => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setForm({ ...form, amount: a, customAmount: '' })}
                    className={`py-3 px-4 rounded-xl border-2 text-center font-semibold transition-all ${form.amount === a && !form.customAmount
                        ? 'border-primary bg-primary text-primary-foreground shadow-md'
                        : 'border-border hover:border-primary/50'
                      }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">{form.currency}</span>
                <Input
                  type="number"
                  placeholder={t('donate:customAmount')}
                  value={form.customAmount}
                  onChange={e => setForm({ ...form, customAmount: e.target.value })}
                  className="pl-14 text-lg h-12"
                />
              </div>
            </div>

            {/* Recurring Option */}
            <div className="mb-10 p-5 bg-secondary/50 rounded-2xl border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <Label className="font-semibold text-foreground cursor-pointer">{t('donate:recurringDonation')}</Label>
                    <p className="text-xs text-muted-foreground">Set up automatic monthly giving</p>
                  </div>
                </div>
                <Switch
                  checked={form.isRecurring}
                  onCheckedChange={v => setForm({ ...form, isRecurring: v })}
                />
              </div>
              {form.isRecurring && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                  <RadioGroup value={form.recurringFrequency} onValueChange={v => setForm({ ...form, recurringFrequency: v })} className="flex gap-4">
                    {['monthly', 'quarterly', 'yearly'].map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <RadioGroupItem value={f} id={f} />
                        <Label htmlFor={f} className="cursor-pointer">{t(`donate:${f}`)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}
            </div>

            {/* Anonymous Option */}
            <div className="mb-10 p-5 bg-secondary/50 rounded-2xl border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <EyeOff className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Label className="font-semibold text-foreground cursor-pointer">{t('donate:anonymous')}</Label>
                    <p className="text-xs text-muted-foreground">Your name won't be displayed publicly</p>
                  </div>
                </div>
                <Switch
                  checked={form.isAnonymous}
                  onCheckedChange={v => setForm({ ...form, isAnonymous: v })}
                />
              </div>
            </div>

            {/* Donor Info */}
            {!form.isAnonymous && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10 space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-muted-foreground" /> {t('donate:donorName')}
                  </Label>
                  <Input
                    value={form.donorName}
                    onChange={e => setForm({ ...form, donorName: e.target.value })}
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-muted-foreground" /> {t('donate:donorEmail')}
                    </Label>
                    <Input
                      type="email"
                      value={form.donorEmail}
                      onChange={e => setForm({ ...form, donorEmail: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-muted-foreground" /> {t('donate:donorPhone')}
                    </Label>
                    <Input
                      type="tel"
                      value={form.donorPhone}
                      onChange={e => setForm({ ...form, donorPhone: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Summary & Submit */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-medium text-muted-foreground">Total</span>
                <span className="text-3xl font-bold text-primary">
                  {form.currency} {finalAmount || 0}
                  {form.isRecurring && <span className="text-sm font-normal text-muted-foreground">/{form.recurringFrequency}</span>}
                </span>
              </div>
              <Button
                type="submit"
                disabled={loading || !finalAmount}
                className="w-full h-14 text-lg gold-gradient text-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    {t('donate:payNow')}
                  </>
                )}
              </Button>
              {!user && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  <button type="button" onClick={() => authService.redirectToLogin('/donate')} className="text-primary hover:underline">Create an account</button> to track your donation history.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}