import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Lock, Check, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const paymentMethods = [
  { value: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: '🏦' },
  { value: 'upi', label: 'UPI Payment', icon: '📱' },
];

export default function Payment() {
  const { language } = useLanguage();
  const tr = useTranslation(language);
  const [searchParams] = useSearchParams();
  const amount = searchParams.get('amount') || '0';
  const currency = searchParams.get('currency') || 'USD';

  const [method, setMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
      toast.success('Payment processed successfully!');
    }, 2000);
  };

  if (complete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-12 text-center max-w-md mx-4 shadow-xl border border-border"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">Payment Successful!</h2>
          <p className="text-muted-foreground mb-2">
            Your payment of <span className="font-semibold text-primary">{currency} {amount}</span> has been processed.
          </p>
          <p className="text-sm text-muted-foreground mb-6">A receipt has been sent to your email.</p>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild className="flex-1 gold-gradient text-foreground">
              <Link to="/my-donations">My Donations</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <Link to="/donate" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Donate
        </Link>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-playfair text-3xl font-bold text-foreground mb-2">Complete Payment</h1>
          <p className="text-muted-foreground mb-8">Secure payment powered by bank-grade encryption.</p>

          {/* Amount Summary */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 mb-8 flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Amount to Pay</div>
              <div className="font-playfair text-3xl font-bold text-primary">{currency} {amount}</div>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm mb-6">
            <Label className="font-semibold text-foreground mb-4 block">Select Payment Method</Label>
            <RadioGroup value={method} onValueChange={setMethod} className="space-y-3">
              {paymentMethods.map(pm => (
                <label
                  key={pm.value}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    method === pm.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                  }`}
                >
                  <RadioGroupItem value={pm.value} />
                  <span className="text-xl">{pm.icon}</span>
                  <span className="font-medium text-foreground">{pm.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Card Form */}
          {method === 'card' && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handlePayment}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm space-y-5"
            >
              <div>
                <Label className="mb-2 block">Card Number</Label>
                <Input placeholder="1234 5678 9012 3456" maxLength={19} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">Expiry Date</Label>
                  <Input placeholder="MM/YY" maxLength={5} required />
                </div>
                <div>
                  <Label className="mb-2 block">CVV</Label>
                  <Input type="password" placeholder="***" maxLength={4} required />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Cardholder Name</Label>
                <Input placeholder="Full name on card" required />
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full h-14 bg-primary text-primary-foreground font-semibold rounded-xl text-base shadow-lg"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Pay {currency} {amount}
                  </span>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                <span>Your payment information is encrypted and secure.</span>
              </div>
            </motion.form>
          )}

          {method === 'bank_transfer' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-xl mb-4">
                <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Bank Transfer Details</p>
                  <p className="text-muted-foreground">Bank: Al-Noor Trust Bank</p>
                  <p className="text-muted-foreground">Account: 1234567890</p>
                  <p className="text-muted-foreground">IFSC: ALNT0001234</p>
                  <p className="text-muted-foreground">Reference: YOUR_NAME_DONATION</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">After making the transfer, please email the receipt to donations@alnoor-madrasa.org</p>
            </motion.div>
          )}

          {method === 'upi' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 border border-border shadow-sm text-center">
              <div className="w-40 h-40 bg-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <div className="text-6xl">📲</div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Scan the QR code or use UPI ID:</p>
              <div className="bg-secondary rounded-xl p-3 font-mono text-sm font-medium">alnoor-madrasa@upi</div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}