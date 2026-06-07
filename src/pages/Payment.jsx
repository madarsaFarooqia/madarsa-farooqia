import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Check,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

import { toast } from 'sonner';

import { useQueryClient } from '@tanstack/react-query';
import {
  usePaymentMutations,
  useDonationStatusQuery,
  queryKeys,
} from '../hooks/api';

const paymentMethods = [
  { value: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: '🏦' },
  { value: 'upi', label: 'UPI Payment', icon: '📱' },
];

export default function Payment() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const [searchParams] = useSearchParams();

  const amount = searchParams.get('amount') || '0';
  const currency = searchParams.get('currency') || 'USD';
  const donationId = searchParams.get('donationId');
  const paymentId = searchParams.get('paymentId');

  const queryClient = useQueryClient();

  const { mockSuccess } = usePaymentMutations();

  const {
    data: confirmedDonation,
    refetch: refetchDonation,
  } = useDonationStatusQuery(donationId, {
    enabled: false,
  });

  const [method, setMethod] = useState('card');
  const [complete, setComplete] = useState(false);

  const handleCompletePayment = async (e) => {
    e.preventDefault();

    if (!paymentId) {
      toast.error('Missing payment reference');
      return;
    }

    try {
      await mockSuccess.mutateAsync(paymentId);

      if (donationId) {
        await refetchDonation();

        queryClient.invalidateQueries({
          queryKey: queryKeys.donations.my,
        });

        queryClient.invalidateQueries({
          queryKey: ['donations'],
        });
      }

      setComplete(true);

      toast.success(
        t('payment:successTitle', 'Payment successful')
      );
    } catch (err) {
      toast.error(err?.message || 'Payment failed');
    }
  };

  const receiptNumber =
    confirmedDonation?.receipt_number ||
    confirmedDonation?.receipt_id;

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

          <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
            {t('payment:successTitle')}
          </h2>

          <p className="text-muted-foreground mb-2">
            {t('payment:successDesc')}{' '}
            <span className="font-semibold text-primary">
              {currency} {amount}
            </span>
          </p>

          <p className="text-sm text-muted-foreground mb-6">
            {t('payment:receiptSent')}
          </p>

          {receiptNumber && (
            <p className="text-sm font-mono text-primary mb-4">
              {receiptNumber}
            </p>
          )}

          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/">
                {t('payment:goHome')}
              </Link>
            </Button>

            {donationId ? (
              <Button
                asChild
                className="flex-1 gold-gradient text-foreground"
              >
                <Link to={`/receipt/${donationId}`}>
                  {t('payment:viewReceipt', 'View Receipt')}
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="flex-1 gold-gradient text-foreground"
              >
                <Link to="/my-donations">
                  {t('payment:myDonations')}
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <Link
          to="/donate"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Donate
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-playfair text-3xl font-bold text-foreground mb-2">
            {t('payment:completePayment')}
          </h1>

          <p className="text-muted-foreground mb-8">
            {t('payment:securePaymentDesc')}
          </p>

          {/* Amount Summary */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 mb-8 flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">
                {t('payment:amountToPay')}
              </div>

              <div className="font-playfair text-3xl font-bold text-primary">
                {currency} {amount}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm mb-6">
            <Label className="font-semibold text-foreground mb-4 block">
              {t('payment:selectMethod')}
            </Label>

            <RadioGroup
              value={method}
              onValueChange={setMethod}
              className="space-y-3"
            >
              {paymentMethods.map((pm) => (
                <label
                  key={pm.value}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    method === pm.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <RadioGroupItem value={pm.value} />

                  <span className="text-xl">{pm.icon}</span>

                  <span className="font-medium text-foreground">
                    {pm.label}
                  </span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* CARD */}
          {method === 'card' && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleCompletePayment}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm space-y-5"
            >
              <div>
                <Label className="mb-2 block">
                  Card Number
                </Label>

                <Input
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">
                    Expiry Date
                  </Label>

                  <Input
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>

                <div>
                  <Label className="mb-2 block">
                    CVV
                  </Label>

                  <Input
                    type="password"
                    placeholder="***"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block">
                  Cardholder Name
                </Label>

                <Input
                  placeholder="Full name on card"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={mockSuccess.isPending || !paymentId}
                className="w-full h-14 bg-primary text-primary-foreground font-semibold rounded-xl text-base shadow-lg"
              >
                {mockSuccess.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('payment:processing')}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    {t('payment:pay')} {currency} {amount}
                  </span>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />

                <span>
                  {t('payment:secureInfo')}
                </span>
              </div>
            </motion.form>
          )}

          {/* BANK */}
          {method === 'bank_transfer' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm"
            >
              <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-xl mb-4">
                <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />

                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">
                    Bank Transfer Details
                  </p>

                  <p className="text-muted-foreground">
                    Bank: Al-Noor Trust Bank
                  </p>

                  <p className="text-muted-foreground">
                    Account: 1234567890
                  </p>

                  <p className="text-muted-foreground">
                    IFSC: ALNT0001234
                  </p>

                  <p className="text-muted-foreground">
                    Reference: YOUR_NAME_DONATION
                  </p>
                </div>
              </div>

              <Button
                onClick={handleCompletePayment}
                disabled={mockSuccess.isPending || !paymentId}
                className="w-full mt-4"
              >
                Confirm Transfer
              </Button>
            </motion.div>
          )}

          {/* UPI */}
          {method === 'upi' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm text-center"
            >
              <div className="w-40 h-40 bg-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <div className="text-6xl">📲</div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Scan the QR code or use UPI ID:
              </p>

              <div className="bg-secondary rounded-xl p-3 font-mono text-sm font-medium mb-4">
                alnoor-madrasa@upi
              </div>

              <Button
                onClick={handleCompletePayment}
                disabled={mockSuccess.isPending || !paymentId}
                className="w-full"
              >
                Confirm UPI Payment
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}


// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Shield, Lock, Check, AlertCircle, ArrowLeft } from 'lucide-react';
// import { Link, useSearchParams } from 'react-router-dom';
// import { useLanguage } from '../lib/LanguageContext';
// import { useTranslation } from '../lib/i18n';
// import { Button } from '../components/ui/button';
// import { toast } from 'sonner';
// import { useQueryClient } from '@tanstack/react-query';
// import { usePaymentMutations, useDonationStatusQuery, queryKeys } from '../hooks/api';

// export default function Payment() {
//   const { language } = useLanguage();
//   const { t } = useTranslation(language);
//   const [searchParams] = useSearchParams();
//   const amount = searchParams.get('amount') || '0';
//   const currency = searchParams.get('currency') || 'USD';
//   const donationId = searchParams.get('donationId');
//   const paymentId = searchParams.get('paymentId');

//   const queryClient = useQueryClient();
//   const { mockSuccess } = usePaymentMutations();
//   const [complete, setComplete] = useState(false);
//   const { data: confirmedDonation, refetch: refetchDonation } = useDonationStatusQuery(donationId, {
//     enabled: false,
//   });

//   const handleCompletePayment = async () => {
//     if (!paymentId) {
//       toast.error('Missing payment reference');
//       return;
//     }
//     try {
//       await mockSuccess.mutateAsync(paymentId);
//       if (donationId) {
//         await refetchDonation();
//         queryClient.invalidateQueries({ queryKey: queryKeys.donations.my });
//         queryClient.invalidateQueries({ queryKey: ['donations'] });
//       }
//       setComplete(true);
//       toast.success(t('payment:successTitle', 'Payment successful'));
//     } catch (err) {
//       toast.error(err.message || 'Payment failed');
//     }
//   };

//   const receiptNumber = confirmedDonation?.receipt_number || confirmedDonation?.receipt_id;

//   if (complete) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-secondary/30 pt-20">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white rounded-3xl p-12 text-center max-w-md mx-4 shadow-xl border border-border"
//         >
//           <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Check className="w-10 h-10 text-emerald-600" />
//           </div>
//           <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">{t('payment:successTitle')}</h2>
//           <p className="text-muted-foreground mb-2">
//             {t('payment:successDesc')} <span className="font-semibold text-primary">{currency} {amount}</span>
//           </p>
//           <p className="text-sm text-muted-foreground mb-6">{t('payment:receiptSent')}</p>
//           {receiptNumber && (
//             <p className="text-sm font-mono text-primary mb-4">{receiptNumber}</p>
//           )}
//           <div className="flex gap-3">
//             <Button asChild variant="outline" className="flex-1">
//               <Link to="/">{t('payment:goHome')}</Link>
//             </Button>
//             {donationId && (
//               <Button asChild className="flex-1 gold-gradient text-foreground">
//                 <Link to={`/receipt/${donationId}`}>{t('payment:viewReceipt', 'View Receipt')}</Link>
//               </Button>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background pt-28 pb-16">
//       <div className="max-w-2xl mx-auto px-4">
//         <Link to="/donate" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
//           <ArrowLeft className="w-4 h-4" /> Back to Donate
//         </Link>

//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
//           <h1 className="font-playfair text-3xl font-bold text-foreground mb-2">{t('payment:completePayment')}</h1>
//           <p className="text-muted-foreground mb-8">{t('payment:securePaymentDesc')}</p>

//           <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 mb-8 flex items-center justify-between">
//             <div>
//               <div className="text-sm text-muted-foreground">{t('payment:amountToPay')}</div>
//               <div className="font-playfair text-3xl font-bold text-primary">{currency} {amount}</div>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-emerald-600">
//               <Shield className="w-4 h-4" />
//               <span>Secure</span>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-6 border border-border shadow-sm space-y-4">
//             <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-xl">
//               <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
//               <p className="text-sm text-muted-foreground">
//                 Payments are processed by the isolated Farooqia Payments service. Use the button below to simulate a successful checkout in development.
//               </p>
//             </div>

//             {donationId && (
//               <p className="text-xs text-muted-foreground font-mono">Donation: {donationId}</p>
//             )}

//             <Button
//               type="button"
//               disabled={mockSuccess.isPending || !paymentId}
//               onClick={handleCompletePayment}
//               className="w-full h-14 bg-primary text-primary-foreground font-semibold rounded-xl text-base shadow-lg"
//             >
//               {mockSuccess.isPending ? (
//                 <span className="flex items-center gap-2">
//                   <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   {t('payment:processing')}
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-2">
//                   <Lock className="w-5 h-5" />
//                   {t('payment:pay')} {currency} {amount}
//                 </span>
//               )}
//             </Button>

//             <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
//               <Lock className="w-3 h-3" />
//               <span>{t('payment:secureInfo')}</span>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
