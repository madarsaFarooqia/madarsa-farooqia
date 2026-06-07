//1
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, Download, Heart, X } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { Button } from '../ui/button';
// import { format } from 'date-fns';

// const islamicQuotes = [
//   { text: "The best of people are those who are most beneficial to others.", source: "Prophet Muhammad ﷺ" },
//   { text: "Charity does not decrease wealth.", source: "Sahih Muslim" },
//   { text: "Give charity without delay, for it stands in the way of calamity.", source: "Al-Tirmidhi" },
//   { text: "Save yourself from Hell-fire even by giving half a date-fruit in charity.", source: "Sahih Bukhari" },
//   { text: "The believer's shade on the Day of Resurrection will be his charity.", source: "Al-Tirmidhi" },
//   { text: "Allah is in the aid of the servant as long as the servant is in the aid of his brother.", source: "Sahih Muslim" },
// ];

// export default function DonationSuccessModal({ donation, onClose, onDonateAgain }) {
//   const quote = islamicQuotes[Math.floor(Math.random() * islamicQuotes.length)];
//   const receiptNo = `MF-${Date.now().toString().slice(-8)}`;
//   const now = format(new Date(), 'PPP');

//   const printReceipt = () => {
//     const receiptHtml = `
//       <html><head><title>Donation Receipt - Madrasa Farooqia</title>
//       <style>
//         body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; color: #111; }
//         .header { text-align: center; border-bottom: 2px solid #111; padding-bottom: 20px; margin-bottom: 20px; }
//         .logo-text { font-size: 22px; font-weight: bold; }
//         .sub { font-size: 13px; color: #555; }
//         .receipt-no { background: #f5f5f5; padding: 8px 16px; border-radius: 8px; display: inline-block; font-size: 13px; margin: 10px 0; }
//         table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//         td { padding: 10px 0; border-bottom: 1px solid #eee; }
//         td:last-child { text-align: right; font-weight: 600; }
//         .total { font-size: 20px; font-weight: bold; }
//         .quote { background: #f9f9f9; border-left: 4px solid #b8860b; padding: 16px; margin: 20px 0; font-style: italic; font-size: 14px; }
//         .footer { text-align: center; font-size: 12px; color: #888; margin-top: 30px; }
//         .arabic { font-family: 'Amiri', serif; font-size: 18px; text-align: center; margin: 10px 0; color: #555; }
//       </style></head>
//       <body>
//         <div class="header">
//           <div class="logo-text">Madrasa Farooqia</div>
//           <div class="sub">Husianabad, Mau, Uttar Pradesh, India</div>
//           <div class="arabic">مدرسة فاروقية</div>
//           <div class="receipt-no">Receipt No: ${receiptNo}</div>
//           <div class="sub">Date: ${now}</div>
//         </div>
//         <table>
//           <tr><td>Donor Name</td><td>${donation.donor_name || 'Anonymous'}</td></tr>
//           <tr><td>Email</td><td>${donation.donor_email || '—'}</td></tr>
//           <tr><td>Purpose</td><td>${donation.purpose?.replace(/_/g, ' ').toUpperCase()}</td></tr>
//           <tr><td>Amount</td><td class="total">${donation.currency} ${donation.amount}</td></tr>
//           <tr><td>Payment Method</td><td>${donation.payment_method || 'Card'}</td></tr>
//           <tr><td>Status</td><td>✅ Completed</td></tr>
//           ${donation.is_recurring ? `<tr><td>Recurring</td><td>${donation.recurring_frequency}</td></tr>` : ''}
//         </table>
//         <div class="quote">"${quote.text}" — ${quote.source}</div>
//         <div class="footer">
//           JazakAllah Khair for your generous contribution.<br/>
//           May Allah accept your donation and reward you abundantly.<br/><br/>
//           info@madrasafarooqia.org | +91-XXXX-XXXXXX<br/>
//           This is an official receipt from Madrasa Farooqia.
//         </div>
//       </body></html>
//     `;
//     const win = window.open('', '_blank');
//     win.document.write(receiptHtml);
//     win.document.close();
//     win.print();
//   };

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.85 }}
//           className="bg-card border border-border rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative"
//         >
//           <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors">
//             <X className="w-4 h-4 text-muted-foreground" />
//           </button>

//           {/* Success icon */}
//           <div className="flex flex-col items-center text-center mb-6">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: 'spring', delay: 0.2 }}
//               className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center mb-4 shadow-lg"
//             >
//               <Check className="w-10 h-10 text-background" />
//             </motion.div>
//             <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-foreground">جزاك الله خيرًا</h2>
//             <p className="text-muted-foreground text-sm mt-1 font-amiri text-lg">JazakAllah Khair</p>
//           </div>

//           {/* Receipt Summary */}
//           <div className="bg-secondary rounded-2xl p-4 mb-5 space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Receipt No.</span>
//               <span className="font-mono font-semibold">{receiptNo}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Amount</span>
//               <span className="font-bold text-foreground text-base">{donation.currency} {donation.amount}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Purpose</span>
//               <span className="capitalize font-medium">{donation.purpose?.replace(/_/g, ' ')}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Date</span>
//               <span>{now}</span>
//             </div>
//           </div>

//           {/* Islamic Quote */}
//           <div className="border-l-4 border-accent pl-4 mb-6 py-1">
//             <p className="text-sm italic text-foreground">"{quote.text}"</p>
//             <p className="text-xs text-muted-foreground mt-1">— {quote.source}</p>
//           </div>

//           {/* Actions */}
//           <div className="grid grid-cols-2 gap-3 mb-3">
//             <Button onClick={printReceipt} variant="outline" className="flex items-center gap-2 rounded-xl">
//               <Download className="w-4 h-4" /> Receipt
//             </Button>
//             <Button asChild className="rounded-xl bg-foreground text-background hover:bg-foreground/90">
//               <Link to="/my-donations"><Heart className="w-4 h-4 mr-1" /> My Donations</Link>
//             </Button>
//           </div>
//           <Button onClick={onDonateAgain} variant="ghost" className="w-full text-sm text-muted-foreground hover:text-foreground">
//             Donate Again
//           </Button>
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// }


//2

// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Check,
//   Download,
//   Heart,
//   X,
//   FileText,
//   QrCode,
//   Star,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "../ui/button";
// import { format } from "date-fns";
// import { useLanguage } from "../../lib/LanguageContext";
// import { useTranslation } from "../../lib/i18n";
// import { generateReceiptId, downloadReceipt } from "../../lib/receiptGenerator";

// const islamicQuotes = [
//   { text: "Charity does not decrease wealth.", source: "Sahih Muslim" },
//   {
//     text: "Give charity without delay, for it stands in the way of calamity.",
//     source: "Al-Tirmidhi",
//   },
//   {
//     text: "The believer's shade on the Day of Resurrection will be his charity.",
//     source: "Al-Tirmidhi",
//   },
//   {
//     text: "Save yourself from Hell-fire even by giving half a date-fruit in charity.",
//     source: "Sahih Bukhari",
//   },
// ];

// const purposeEmoji = {
//   sadqa: "💝",
//   zakat: "🌙",
//   fitra: "🌾",
//   lillah: "✨",
//   waqf: "🏛️",
//   general: "🤲",
//   building: "🏗️",
//   education: "📚",
//   orphan_care: "👶",
//   food_program: "🍲",
//   masjid: "🕌",
//   niswaan: "👩‍🎓",
//   scholarship: "🎓",
// };

// export default function DonationSuccessModal({
//   donation,
//   onClose,
//   onDonateAgain,
// }) {
//   const { language } = useLanguage();
//   const { t } = useTranslation(language);
//   const quote = islamicQuotes[Math.floor(Math.random() * islamicQuotes.length)];
//   const receiptId = generateReceiptId(donation);
//   const now = format(new Date(), "PPP");

//   const handleDownload = () => downloadReceipt(donation, "IN", language);

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85, y: 30 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.85 }}
//           transition={{ type: "spring", damping: 20 }}
//           className="bg-card border border-border rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden"
//         >
//           {/* Top gradient accent */}
//           <div className="h-1.5 bg-gradient-to-r from-foreground via-accent to-foreground" />

//           {/* Background watermark */}
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
//             <span className="font-amiri text-[180px] text-foreground/[0.025] select-none leading-none">
//               م
//             </span>
//           </div>

//           <div className="relative p-6 sm:p-8">
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors z-10"
//             >
//               <X className="w-4 h-4 text-muted-foreground" />
//             </button>

//             {/* Success animation */}
//             <div className="flex flex-col items-center text-center mb-6">
//               <motion.div
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={{ scale: 1, rotate: 0 }}
//                 transition={{ type: "spring", delay: 0.15, damping: 12 }}
//                 className="relative mb-4"
//               >
//                 <div
//                   className="w-22 h-22 rounded-full bg-foreground flex items-center justify-center shadow-2xl"
//                   style={{ width: 88, height: 88 }}
//                 >
//                   <Check className="w-11 h-11 text-background" />
//                 </div>
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.4 }}
//                   className="absolute -top-1 -right-1 w-7 h-7 bg-accent rounded-full flex items-center justify-center shadow-lg"
//                 >
//                   <Star className="w-3.5 h-3.5 text-accent-foreground" />
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <h2 className="font-amiri text-3xl text-accent mb-1">
//                   جزاك الله خيرًا
//                 </h2>
//                 <p className="font-playfair text-xl font-bold text-foreground">
//                   {t("donate:jazakAllah", "JazakAllah Khair")}
//                 </p>
//                 <p className="text-muted-foreground text-sm mt-1">
//                   {t("donate:donationReceived", "Your donation has been received")}
//                 </p>
//               </motion.div>
//             </div>

//             {/* Receipt card */}
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-secondary/50 rounded-2xl p-5 mb-5 border border-border relative overflow-hidden"
//             >
//               {/* Mini decorative border */}
//               <div className="absolute inset-0 rounded-2xl border border-accent/10 pointer-events-none" />

//               <div className="flex items-center justify-between mb-3">
//                 <div className="text-2xl">
//                   {purposeEmoji[donation.purpose] || "🤲"}
//                 </div>
//                 <span className="font-mono text-xs text-muted-foreground bg-background px-2 py-1 rounded-lg border border-border">
//                   {receiptId}
//                 </span>
//               </div>

//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between items-center">
//                   <span className="text-muted-foreground">{t("donate:amountDonated", "Amount Donated")}</span>
//                   <span className="font-playfair font-bold text-xl text-foreground">
//                     {donation.currency}{" "}
//                     {Number(donation.amount).toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">{t("myDonations:donationPurpose", "Purpose")}</span>
//                   <span className="font-medium capitalize text-foreground">
//                     {t(`donate:${donation.purpose}`, donation.purpose?.replace(/_/g, " "))}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">{t("myDonations:donationDate", "Date")}</span>
//                   <span className="text-foreground">{now}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">{t("myDonations:donationStatus", "Status")}</span>
//                   <span className="inline-flex items-center gap-1 bg-foreground text-background px-2.5 py-0.5 rounded-full text-xs font-medium">
//                     <span className="w-1.5 h-1.5 rounded-full bg-green-400" />{" "}
//                     {t("fundraising:completed", "Completed")}
//                   </span>
//                 </div>
//               </div>

//               {/* QR verification note */}
//               <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
//                 <QrCode className="w-4 h-4 text-accent shrink-0" />
//                 <p className="text-xs text-muted-foreground">
//                   {t("donate:successReceiptNote", "PDF receipt includes QR verification code for tax compliance")}
//                 </p>
//               </div>
//             </motion.div>

//             {/* Quote */}
//             <div className="border-l-4 border-accent pl-4 mb-6 py-1">
//               <p className="text-sm italic text-foreground">"{quote.text}"</p>
//               <p className="text-xs text-muted-foreground mt-1">
//                 — {quote.source}
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="space-y-2">
//               <div className="grid grid-cols-2 gap-2">
//                 <Button
//                   onClick={handleDownload}
//                   variant="outline"
//                   className="flex items-center gap-2 rounded-xl h-11"
//                 >
//                   <Download className="w-4 h-4" /> {t("nav:taxReceipts", "Tax Receipt")}
//                 </Button>
//                 <Button
//                   asChild
//                   className="rounded-xl h-11 bg-foreground text-background hover:bg-foreground/90"
//                 >
//                   <Link to="/receipts">
//                     <FileText className="w-4 h-4 mr-1" /> {t("donate:allReceipts", "All Receipts")}
//                   </Link>
//                 </Button>
//               </div>
//               <Button
//                 asChild
//                 variant="secondary"
//                 className="w-full rounded-xl h-11"
//               >
//                 <Link to="/my-donations">
//                   <Heart className="w-4 h-4 mr-1" /> {t("nav:myDonations", "My Donations Dashboard")}
//                 </Link>
//               </Button>
//               <Button
//                 onClick={onDonateAgain}
//                 variant="ghost"
//                 className="w-full text-sm text-muted-foreground hover:text-foreground"
//               >
//                 {t("donate:donateAgain", "Donate Again")}
//               </Button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// }



//3
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Download,
  Heart,
  X,
  FileText,
  QrCode,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { format } from "date-fns";

import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

import {
  generateReceiptId,
  downloadReceipt,
} from "../../lib/receiptGenerator";

const islamicQuotes = [
  {
    text: "Charity does not decrease wealth.",
    source: "Sahih Muslim",
  },
  {
    text: "Give charity without delay, for it stands in the way of calamity.",
    source: "Al-Tirmidhi",
  },
  {
    text: "The believer's shade on the Day of Resurrection will be his charity.",
    source: "Al-Tirmidhi",
  },
  {
    text: "Save yourself from Hell-fire even by giving half a date-fruit in charity.",
    source: "Sahih Bukhari",
  },
];

const purposeEmoji = {
  sadqa: "💝",
  zakat: "🌙",
  fitra: "🌾",
  lillah: "✨",
  waqf: "🏛️",
  general: "🤲",
  building: "🏗️",
  education: "📚",
  orphan_care: "👶",
  food_program: "🍲",
  masjid: "🕌",
  niswaan: "👩‍🎓",
  scholarship: "🎓",
};

export default function DonationSuccessModal({
  donation,
  onClose,
  onDonateAgain,
}) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const quote =
    islamicQuotes[
      Math.floor(Math.random() * islamicQuotes.length)
    ];

  // API integrated receipt handling
  const receiptId =
    donation?.receipt_number ||
    donation?.receipt_id ||
    generateReceiptId(donation);

  const now = format(
    donation?.created_at
      ? new Date(donation.created_at)
      : new Date(),
    "PPP"
  );

  // API integrated download
  const handleDownload = () =>
    downloadReceipt(donation, "IN", language);

  // API integrated status
  const donationStatus =
    donation?.status
      ? donation.status.charAt(0).toUpperCase() +
        donation.status.slice(1)
      : t("fundraising:completed", "Completed");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{
            type: "spring",
            damping: 20,
          }}
          className="bg-card border border-border rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden"
        >
          {/* Top gradient accent */}
          <div className="h-1.5 bg-gradient-to-r from-foreground via-accent to-foreground" />

          {/* Background watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="font-amiri text-[180px] text-foreground/[0.025] select-none leading-none">
              م
            </span>
          </div>

          <div className="relative p-6 sm:p-8">
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors z-10"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* SUCCESS ANIMATION */}
            <div className="flex flex-col items-center text-center mb-6">
              <motion.div
                initial={{
                  scale: 0,
                  rotate: -180,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  delay: 0.15,
                  damping: 12,
                }}
                className="relative mb-4"
              >
                <div
                  className="rounded-full bg-foreground flex items-center justify-center shadow-2xl"
                  style={{
                    width: 88,
                    height: 88,
                  }}
                >
                  <Check className="w-11 h-11 text-background" />
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -top-1 -right-1 w-7 h-7 bg-accent rounded-full flex items-center justify-center shadow-lg"
                >
                  <Star className="w-3.5 h-3.5 text-accent-foreground" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                }}
              >
                <h2 className="font-amiri text-3xl text-accent mb-1">
                  جزاك الله خيرًا
                </h2>

                <p className="font-playfair text-xl font-bold text-foreground">
                  {t(
                    "donate:jazakAllah",
                    "JazakAllah Khair"
                  )}
                </p>

                <p className="text-muted-foreground text-sm mt-1">
                  {t(
                    "donate:donationReceived",
                    "Your donation has been received"
                  )}
                </p>
              </motion.div>
            </div>

            {/* RECEIPT CARD */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              className="bg-secondary/50 rounded-2xl p-5 mb-5 border border-border relative overflow-hidden"
            >
              {/* Decorative Border */}
              <div className="absolute inset-0 rounded-2xl border border-accent/10 pointer-events-none" />

              {/* TOP */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">
                  {purposeEmoji[donation?.purpose] ||
                    "🤲"}
                </div>

                <span className="font-mono text-xs text-muted-foreground bg-background px-2 py-1 rounded-lg border border-border">
                  {receiptId}
                </span>
              </div>

              {/* DETAILS */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {t(
                      "donate:amountDonated",
                      "Amount Donated"
                    )}
                  </span>

                  <span className="font-playfair font-bold text-xl text-foreground">
                    {donation?.currency || "USD"}{" "}
                    {Number(
                      donation?.amount || 0
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t(
                      "myDonations:donationPurpose",
                      "Purpose"
                    )}
                  </span>

                  <span className="font-medium capitalize text-foreground">
                    {t(
                      `donate:${donation?.purpose}`,
                      donation?.purpose?.replace(
                        /_/g,
                        " "
                      )
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t(
                      "myDonations:donationDate",
                      "Date"
                    )}
                  </span>

                  <span className="text-foreground">
                    {now}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t(
                      "myDonations:donationStatus",
                      "Status"
                    )}
                  </span>

                  <span className="inline-flex items-center gap-1 bg-foreground text-background px-2.5 py-0.5 rounded-full text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />

                    {donationStatus}
                  </span>
                </div>
              </div>

              {/* QR NOTE */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                <QrCode className="w-4 h-4 text-accent shrink-0" />

                <p className="text-xs text-muted-foreground">
                  {t(
                    "donate:successReceiptNote",
                    "PDF receipt includes QR verification code for tax compliance"
                  )}
                </p>
              </div>
            </motion.div>

            {/* QUOTE */}
            <div className="border-l-4 border-accent pl-4 mb-6 py-1">
              <p className="text-sm italic text-foreground">
                "{quote.text}"
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                — {quote.source}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex items-center gap-2 rounded-xl h-11"
                >
                  <Download className="w-4 h-4" />

                  {t(
                    "nav:taxReceipts",
                    "Tax Receipt"
                  )}
                </Button>

                <Button
                  asChild
                  className="rounded-xl h-11 bg-foreground text-background hover:bg-foreground/90"
                >
                  <Link to="/receipts">
                    <FileText className="w-4 h-4 mr-1" />

                    {t(
                      "donate:allReceipts",
                      "All Receipts"
                    )}
                  </Link>
                </Button>
              </div>

              <Button
                asChild
                variant="secondary"
                className="w-full rounded-xl h-11"
              >
                <Link to="/my-donations">
                  <Heart className="w-4 h-4 mr-1" />

                  {t(
                    "nav:myDonations",
                    "My Donations Dashboard"
                  )}
                </Link>
              </Button>

              <Button
                onClick={onDonateAgain}
                variant="ghost"
                className="w-full text-sm text-muted-foreground hover:text-foreground"
              >
                {t(
                  "donate:donateAgain",
                  "Donate Again"
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
