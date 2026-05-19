import { format } from 'date-fns';

const CATEGORY_CODES = {
  general: 'GN', education: 'ED', sadqa: 'SD', zakat: 'ZK',
  lillah: 'LL', waqf: 'WF', building: 'IN', infrastructure: 'IN',
  scholarship: 'SW', food_program: 'FP', orphan_care: 'OC',
  masjid: 'MH', niswaan: 'NW', campaign: 'CP', salaries: 'SL', fitra: 'FT',
};

export const TAX_RULES = {
  IN: { name: 'India', taxId: 'PAN', regLabel: 'Reg. No.', reg: 'U85300UP2000NPL012345', disclaimer: 'This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.' },
  US: { name: 'United States', taxId: 'EIN', regLabel: 'EIN', reg: '85-1234567', disclaimer: 'This organization is a 501(c)(3) nonprofit. Your donation may be tax-deductible as allowed by law. No goods or services were provided in exchange for this donation.' },
  GB: { name: 'United Kingdom', taxId: 'Charity No.', regLabel: 'Charity No.', reg: '1234567', disclaimer: 'Madrasa Farooqia is a registered charity. Gift Aid may apply — please consult your tax advisor.' },
  AE: { name: 'UAE', taxId: 'TRN', regLabel: 'TRN', reg: '100234567800003', disclaimer: 'This receipt confirms your charitable donation to Madrasa Farooqia, a registered educational institution.' },
  SA: { name: 'Saudi Arabia', taxId: 'CR No.', regLabel: 'CR', reg: '4030123456', disclaimer: 'هذه المساهمة تعتبر تبرعاً خيرياً لصالح المدرسة الفاروقية.' },
  default: { name: 'International', taxId: 'Reg. No.', regLabel: 'Reg. No.', reg: 'U85300UP2000NPL012345', disclaimer: 'This is an official tax receipt from Madrasa Farooqia, a registered educational institution and charitable organization.' },
};

export function generateReceiptId(donation) {
  if (donation.receipt_id) return donation.receipt_id;
  if (!donation.created_date && !donation.id) return `MF-${Date.now().toString().slice(-12)}`;
  const d = new Date(donation.created_date || new Date());
  const date = format(d, 'yyyyMMdd');
  const time = format(d, 'HHmm');
  const cat = CATEGORY_CODES[donation.purpose] || 'GN';
  const seed = (donation.id || donation.amount || '').toString().slice(-4);
  const rand = (seed.padStart(4, '0') + Math.random().toString(36).slice(2, 4)).toUpperCase().slice(0, 4);
  return `MF-${date}-${time}-${cat}-${rand}`;
}

function buildQRDataURL(text) {
  // Generate a simple QR-like SVG data URL (visual placeholder - real QR via API)
  // We embed the verification URL as text in the receipt
  return `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(text)}&color=0a0a0a&bgcolor=ffffff&format=svg`;
}

const LOCALIZED_STRINGS = {
  en: {
    officialTaxReceipt: "Official Tax Receipt",
    paymentConfirmed: "PAYMENT CONFIRMED",
    taxDeductible: "TAX DEDUCTIBLE",
    donationAmount: "DONATION AMOUNT",
    donationSuffix: "Donation",
    donorInformation: "Donor Information",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    donorId: "Donor ID",
    donationDetails: "Donation Details",
    receiptId: "Receipt ID",
    dateTime: "Date & Time",
    purpose: "Purpose",
    payment: "Payment",
    status: "Status",
    completed: "COMPLETED",
    recurring: "Recurring",
    campaign: "Campaign",
    scanToVerify: "Scan to Verify",
    taxCompliance: "Tax Compliance",
    orgReg: "Organization Reg.",
    amount: "Amount",
    authorizedSignatory: "Authorized Signatory",
    directorTitle: "Director, Madrasa Farooqia",
    accountsDept: "Accounts Department",
    financeTreasury: "Finance & Treasury",
    verificationCode: "Verification Code",
    quoteText: '"Charity extinguishes sin as water extinguishes fire."',
    quoteSource: "— Al-Tirmidhi | JazakAllah Khair for your generous contribution",
    officialNote: "This is an official, computer-generated tax receipt. No signature required. Valid without physical seal.",
    verifyAt: "Verify at: madrasafarooqia.org/verify",
    generated: "Generated",
    yes: "Yes",
    no: "No",
    anonymousDonor: "Anonymous Donor",
    anonymous: "Anonymous",
    IN: "India",
    US: "United States",
    GB: "United Kingdom",
    AE: "UAE",
    SA: "Saudi Arabia",
    default: "International"
  },
  ur: {
    officialTaxReceipt: "سرکاری ٹیکس رسید",
    paymentConfirmed: "ادائیگی کی تصدیق ہو گئی",
    taxDeductible: "ٹیکس چھوٹ کے اہل",
    donationAmount: "عطیہ کی رقم",
    donationSuffix: "عطیہ",
    donorInformation: "عطیہ دہندہ کی معلومات",
    fullName: "پورا نام",
    email: "ای میل",
    phone: "فون نمبر",
    donorId: "عطیہ دہندہ شناختی نمبر",
    donationDetails: "عطیہ کی تفصیلات",
    receiptId: "رسید شناختی نمبر",
    dateTime: "تاریخ اور وقت",
    purpose: "مقصد",
    payment: "ادائیگی کا طریقہ",
    status: "حالت",
    completed: "مکمل",
    recurring: "تکرار",
    campaign: "مہم",
    scanToVerify: "تصدیق کے لیے اسکین کریں",
    taxCompliance: "ٹیکس تعمیل",
    orgReg: "ادارے کی رجسٹریشن",
    amount: "رقم",
    authorizedSignatory: "مجاز دستخط کنندہ",
    directorTitle: "ڈائریکٹر، مدرسہ فاروقیہ",
    accountsDept: "محکمہ اکاؤنٹس",
    financeTreasury: "مالیات اور خزانہ",
    verificationCode: "تصدیقی کوڈ",
    quoteText: '"صدقہ گناہ کو اس طرح مٹاتا ہے جیسے پانی آگ کو بجھاتا ہے۔"',
    quoteSource: "— ترمذی | آپ کے فیاضانہ تعاون کے لیے جزاک اللہ خیر",
    officialNote: "یہ ایک سرکاری، کمپیوٹر سے تیار کردہ ٹیکس رسید ہے۔ کسی دستخط کی ضرورت نہیں ہے۔ بغیر مہر کے بھی کارآمد ہے۔",
    verifyAt: "تصدیق کریں: madrasafarooqia.org/verify",
    generated: "تیار کردہ",
    yes: "جی ہاں",
    no: "نہیں",
    anonymousDonor: "نامعلوم عطیہ دہندہ",
    anonymous: "نامعلوم",
    IN: "بھارت",
    US: "امریکہ",
    GB: "برطانیہ",
    AE: "متحدہ عرب امارات",
    SA: "سعودی عرب",
    default: "بین الاقوامی"
  },
  ar: {
    officialTaxReceipt: "إيصال ضريبي رسمي",
    paymentConfirmed: "تم تأكيد الدفع",
    taxDeductible: "مؤهل للاقتطاع الضريبي",
    donationAmount: "مبلغ التبرع",
    donationSuffix: "تبرع",
    donorInformation: "معلومات المتبرع",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    donorId: "رقم المتبرع",
    donationDetails: "تفاصيل التبرع",
    receiptId: "رقم الإيصال",
    dateTime: "التاريخ والوقت",
    purpose: "الغرض",
    payment: "طريقة الدفع",
    status: "الحالة",
    completed: "مكتمل",
    recurring: "دوري",
    campaign: "الحملة",
    scanToVerify: "امسح للتحقق",
    taxCompliance: "الامتثال الضريبي",
    orgReg: "سجل المؤسسة",
    amount: "المبلغ",
    authorizedSignatory: "المفوض بالتوقيع",
    directorTitle: "مدير المدرسة الفاروقية",
    accountsDept: "قسم الحسابات",
    financeTreasury: "المالية والخزينة",
    verificationCode: "رمز التحقق",
    quoteText: '"الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ"',
    quoteSource: "— الترمذي | جزاكم الله خيراً لمساهمتكم السخية",
    officialNote: "هذا إيصال ضريبي رسمي تم إنشاؤه تلقائياً بواسطة الكمبيوتر. لا يتطلب توقيعاً. صالح بدون ختم مادي.",
    verifyAt: "التحقق في: madrasafarooqia.org/verify",
    generated: "تم الإنشاء",
    yes: "نعم",
    no: "لا",
    anonymousDonor: "متبرع فاعل خير",
    anonymous: "فاعل خير",
    IN: "الهند",
    US: "الولايات المتحدة",
    GB: "المملكة المتحدة",
    AE: "الإمارات العربية المتحدة",
    SA: "المملكة العربية السعودية",
    default: "دولي"
  },
  hi: {
    officialTaxReceipt: "आधिकारिक कर रसीद",
    paymentConfirmed: "भुगतान की पुष्टि हो गई",
    taxDeductible: "कर छूट योग्य",
    donationAmount: "दान राशि",
    donationSuffix: "दान",
    donorInformation: "दाता की जानकारी",
    fullName: "पूरा नाम",
    email: "ईमेल",
    phone: "फ़ोन",
    donorId: "दाता आईडी",
    donationDetails: "दान का विवरण",
    receiptId: "रसीद आईडी",
    dateTime: "दिनांक और समय",
    purpose: "उद्देश्य",
    payment: "भुगतान का प्रकार",
    status: "स्थिति",
    completed: "पूर्ण",
    recurring: "आवर्ती",
    campaign: "अभियान",
    scanToVerify: "सत्यापन के लिए स्कैन करें",
    taxCompliance: "कर अनुपालन",
    orgReg: "संस्था पंजीकरण",
    amount: "राशि",
    authorizedSignatory: "अधिकृत हस्ताक्षरकर्ता",
    directorTitle: "निदेशक, मदरसा फारूकिया",
    accountsDept: "खाता विभाग",
    financeTreasury: "वित्त एवं कोष",
    verificationCode: "सत्यापन कोड",
    quoteText: '"दान पाप को उसी प्रकार मिटा देता है जैसे पानी आग को बुझा देता है।"',
    quoteSource: "— अल-तिर्मिज़ी | आपके उदार योगदान के लिए जज़ाकल्लाह ख़ैर",
    officialNote: "यह एक आधिकारिक, कंप्यूटर जनित कर रसीद है। किसी हस्ताक्षर की आवश्यकता नहीं है। बिना भौतिक मुहर के भी मान्य है।",
    verifyAt: "सत्यापित करें: madrasafarooqia.org/verify",
    generated: "उत्पन्न तिथि",
    yes: "हाँ",
    no: "नहीं",
    anonymousDonor: "अनाम दाता",
    anonymous: "अनाम",
    IN: "भारत",
    US: "संयुक्त राज्य अमेरिका",
    GB: "यूनाइटेड किंगडम",
    AE: "संयुक्त अरब अमीरात",
    SA: "सऊदी अरब",
    default: "अंतरराष्ट्रीय"
  },
  tr: {
    officialTaxReceipt: "Resmi Vergi Makbuzu",
    paymentConfirmed: "ÖDEME ONAYLANDI",
    taxDeductible: "VERGİDEN DÜŞÜLEBİLİR",
    donationAmount: "BAĞIŞ TUTARI",
    donationSuffix: "Bağışı",
    donorInformation: "Bağışçı Bilgileri",
    fullName: "Adı Soyadı",
    email: "E-posta",
    phone: "Telefon",
    donorId: "Bağışçı ID",
    donationDetails: "Bağış Detayları",
    receiptId: "Makbuz ID",
    dateTime: "Tarih & Saat",
    purpose: "Bağış Amacı",
    payment: "Ödeme Yöntemi",
    status: "Durum",
    completed: "TAMAMLANDI",
    recurring: "Düzenli",
    campaign: "Kampanya",
    scanToVerify: "Doğrulamak için Tara",
    taxCompliance: "Vergi Uyumluluğu",
    orgReg: "Kurum Sicil No.",
    amount: "Tutar",
    authorizedSignatory: "Yetkili İmza",
    directorTitle: "Müdür, Madrasa Farooqia",
    accountsDept: "Muhasebe Departmanı",
    financeTreasury: "Finans & Hazine",
    verificationCode: "Doğrulama Kodu",
    quoteText: '"Sadaka, suyun ateşi söndürdüğü gibi günahları yok eder."',
    quoteSource: "— Tirmizi | Cömert katkınız için JazakAllah Khair",
    officialNote: "Bu resmi, bilgisayar tarafından oluşturulmuş bir vergi makbuzudur. İmza gerektirmez. Fiziksel mühür olmadan da geçerlidir.",
    verifyAt: "Doğrula: madrasafarooqia.org/verify",
    generated: "Oluşturulma",
    yes: "Evet",
    no: "Hayır",
    anonymousDonor: "Anonim Bağışçı",
    anonymous: "Anonim",
    IN: "Hindistan",
    US: "Amerika Birleşik Devletleri",
    GB: "Birleşik Krallık",
    AE: "Birleşik Arap Emirlikleri",
    SA: "Suudi Arabistan",
    default: "Uluslararası"
  }
};

function getLocalizedPurpose(purpose, lang) {
  const map = {
    en: {
      sadqa: "Sadqa", zakat: "Zakat", fitra: "Fitra", lillah: "Lillah", waqf: "Waqf",
      general: "General", building: "Building", education: "Education", orphan_care: "Orphan Care",
      food_program: "Food Program", masjid: "Masjid", niswaan: "Niswaan", scholarship: "Scholarship", salaries: "Salaries",
    },
    ur: {
      sadqa: "صدقہ", zakat: "زکوٰۃ", fitra: "فطرہ", lillah: "لله", waqf: "وقف",
      general: "عام", building: "تعمیرات", education: "تعليم", orphan_care: "یتیموں کی کفالت",
      food_program: "راشن پروگرام", masjid: "مسجد", niswaan: "نسواں", scholarship: "وظیفہ", salaries: "تنخواہیں",
    },
    ar: {
      sadqa: "صدقة", zakat: "زكاة", fitra: "فطرة", lillah: "لله", waqf: "وقف",
      general: "عام", building: "بناء", education: "تعليم", orphan_care: "رعاية الأيتام",
      food_program: "برنامج الغذاء", masjid: "مسجد", niswaan: "نسوان", scholarship: "منحة دراسية", salaries: "رواتب",
    },
    hi: {
      sadqa: "सदक़ा", zakat: "ज़कात", fitra: "फ़ितरा", lillah: "लिल्लाह", waqf: "वक़्फ़",
      general: "सामान्य", building: "भवन निर्माण", education: "शिक्षा", orphan_care: "अनाथ देखभाल",
      food_program: "खाद्य कार्यक्रम", masjid: "मस्जिद", niswaan: "निस्वान", scholarship: "छात्रवृत्ति", salaries: "वेतन",
    },
    tr: {
      sadqa: "Sadaka", zakat: "Zekat", fitra: "Fitre", lillah: "Lillah", waqf: "Vakıf",
      general: "Genel", building: "İnşaat", education: "Eğitim", orphan_care: "Yetim Bakımı",
      food_program: "Gıda Yardımı", masjid: "Mescid", niswaan: "Nisvan", scholarship: "Burs", salaries: "Maaşlar",
    }
  };
  return map[lang]?.[purpose?.toLowerCase()] || purpose;
}

export function generateTaxReceiptHTML(donation, countryCode = 'IN', lang = 'en') {
  const taxInfo = TAX_RULES[countryCode] || TAX_RULES.default;
  const receiptId = generateReceiptId(donation);
  const dateStr = donation.created_date ? format(new Date(donation.created_date), 'PPP') : format(new Date(), 'PPP');
  const timeStr = donation.created_date ? format(new Date(donation.created_date), 'p') : format(new Date(), 'p');
  const verifyUrl = `https://madrasafarooqia.org/verify?receipt=${receiptId}`;
  const qrUrl = buildQRDataURL(verifyUrl);
  
  const t = LOCALIZED_STRINGS[lang] || LOCALIZED_STRINGS.en;
  const isRtl = lang === 'ar' || lang === 'ur';
  const brandName = lang === 'ur' ? 'مدرسہ فاروقیہ' : lang === 'ar' ? 'المدرسة الفاروقية' : 'Madrasa Farooqia';
  
  const donorName = donation.is_anonymous ? t.anonymousDonor : (donation.donor_name || t.anonymous);
  const amount = Number(donation.amount || 0).toLocaleString();
  const currency = donation.currency || 'USD';
  const purpose = getLocalizedPurpose(donation.purpose || 'general', lang);

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${isRtl ? 'rtl' : 'ltr'}">
<head>
<meta charset="UTF-8">
<title>${t.officialTaxReceipt} ${receiptId} — Madrasa Farooqia</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Amiri:wght@400;700&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'Inter', sans-serif;
    background: #f8f8f6;
    color: #111;
    min-height: 100vh;
    padding: 0;
  }
  
  .page {
    max-width: 780px;
    margin: 0 auto;
    background: #fff;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 60px rgba(0,0,0,0.15);
  }
  
  /* Watermark */
  .watermark {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-35deg);
    font-family: 'Playfair Display', serif;
    font-size: 72px;
    font-weight: 700;
    color: rgba(0,0,0,0.04);
    white-space: nowrap;
    pointer-events: none;
    z-index: 0;
    letter-spacing: 8px;
  }
  
  /* Gold border frame */
  .border-frame {
    position: absolute;
    inset: 12px;
    border: 1.5px solid #b8860b;
    pointer-events: none;
    z-index: 1;
  }
  .border-frame::after {
    content: '';
    position: absolute;
    inset: 4px;
    border: 0.5px solid rgba(184,134,11,0.3);
  }
  
  .content { position: relative; z-index: 2; padding: 40px 50px; }
  
  /* Header */
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 28px;
    border-bottom: 2px solid #111;
    margin-bottom: 28px;
  }
  
  .brand-block {}
  .arabic-name {
    font-family: 'Amiri', serif;
    font-size: 28px;
    color: #b8860b;
    line-height: 1;
    margin-bottom: 4px;
  }
  .brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #111;
    letter-spacing: 0.5px;
  }
  .brand-sub {
    font-size: 11px;
    color: #666;
    margin-top: 4px;
    line-height: 1.5;
  }
  .brand-reg {
    font-size: 10px;
    color: #999;
    margin-top: 6px;
  }
  
  .receipt-badge {
    text-align: end;
  }
  .receipt-title {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #b8860b;
    margin-bottom: 8px;
  }
  .receipt-id {
    font-family: 'Inter', monospace;
    font-size: 13px;
    font-weight: 600;
    background: #111;
    color: #fff;
    padding: 6px 14px;
    border-radius: 6px;
    letter-spacing: 1px;
  }
  .receipt-date {
    font-size: 11px;
    color: #888;
    margin-top: 6px;
  }
  
  /* Gold divider with pattern */
  .gold-divider {
    height: 3px;
    background: linear-gradient(90deg, transparent, #b8860b 20%, #d4a017 50%, #b8860b 80%, transparent);
    margin: 0 0 28px;
    border-radius: 2px;
  }
  
  /* Status badge */
  .status-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #111;
    color: #fff;
    padding: 6px 16px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .status-dot { width: 8px; height: 8px; background: #4ade80; border-radius: 50%; }
  .tax-eligible {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #b8860b10;
    color: #b8860b;
    border: 1px solid #b8860b40;
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
  }
  
  /* Main grid */
  .main-grid {
    display: grid;
    grid-template-columns: 1fr 160px;
    gap: 24px;
    margin-bottom: 28px;
  }
  
  /* Donor section */
  .section-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #b8860b;
    margin-bottom: 10px;
  }
  
  .info-table { width: 100%; border-collapse: collapse; }
  .info-table tr td { padding: 7px 0; vertical-align: top; }
  .info-table tr td:first-child {
    font-size: 11px;
    color: #888;
    font-weight: 500;
    width: 130px;
    border-bottom: 1px solid #f0f0f0;
  }
  .info-table tr td:last-child {
    font-size: 12px;
    font-weight: 600;
    color: #111;
    border-bottom: 1px solid #f0f0f0;
  }
  .info-table tr:last-child td { border-bottom: none; }
  
  /* QR block */
  .qr-block {
    text-align: center;
    background: #fafafa;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 14px;
  }
  .qr-block img {
    width: 120px;
    height: 120px;
    display: block;
    margin: 0 auto 8px;
  }
  .qr-label {
    font-size: 9px;
    color: #999;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .qr-verify {
    font-size: 8px;
    color: #b8860b;
    margin-top: 4px;
    word-break: break-all;
  }
  
  /* Amount box */
  .amount-box {
    background: linear-gradient(135deg, #111 0%, #2a2a2a 100%);
    color: #fff;
    border-radius: 16px;
    padding: 24px 28px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .amount-label { font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 6px; letter-spacing: 1px; }
  .amount-value {
    font-family: 'Playfair Display', serif;
    font-size: 40px;
    font-weight: 700;
    color: #fff;
    line-height: 1;
  }
  .amount-currency { font-size: 18px; color: #b8860b; margin-right: 4px; }
  .amount-words { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 6px; font-style: italic; }
  .amount-purpose {
    text-align: end;
  }
  .purpose-icon { font-size: 36px; line-height: 1; }
  .purpose-label {
    font-size: 11px;
    color: #b8860b;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
    margin-top: 4px;
  }
  
  /* Tax disclaimer */
  .tax-box {
    background: #fffbf0;
    border: 1px solid #b8860b30;
    border-inline-start: 3px solid #b8860b;
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 24px;
  }
  .tax-box .tax-header { font-size: 10px; font-weight: 700; color: #b8860b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; }
  .tax-box p { font-size: 11px; color: #666; line-height: 1.6; }
  .tax-ids {
    display: flex;
    gap: 16px;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .tax-id-item {
    background: #fff;
    border: 1px solid #b8860b30;
    border-radius: 6px;
    padding: 5px 12px;
    font-size: 10px;
  }
  .tax-id-item span { color: #999; display: block; }
  .tax-id-item strong { color: #111; font-size: 11px; }
  
  /* Signature row */
  .sig-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
    padding: 20px 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .sig-block { text-align: center; }
  .sig-line { height: 1px; background: #111; width: 80%; margin: 0 auto 8px; }
  .sig-block p { font-size: 10px; color: #888; }
  .sig-block strong { font-size: 11px; color: #111; display: block; margin-bottom: 20px; }
  
  /* Islamic quote */
  .quote-box {
    text-align: center;
    padding: 18px;
    background: #fafafa;
    border-radius: 12px;
    margin-bottom: 24px;
  }
  .arabic-quote { font-family: 'Amiri', serif; font-size: 18px; color: #b8860b; margin-bottom: 8px; }
  .quote-text { font-size: 12px; color: #555; font-style: italic; margin-bottom: 4px; }
  .quote-source { font-size: 10px; color: #999; }
  
  /* Footer */
  .footer {
    background: #111;
    color: #fff;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0 0 0 0;
    margin: 0 -50px -40px;
  }
  .footer-left { font-size: 10px; color: rgba(255,255,255,0.5); line-height: 1.6; }
  .footer-right { text-align: end; font-size: 10px; color: rgba(255,255,255,0.5); }
  .footer-brand { font-family: 'Playfair Display', serif; color: #b8860b; font-size: 14px; font-weight: 700; margin-bottom: 4px; }
  
  /* Serial stamp */
  .stamp {
    position: absolute;
    top: 55px;
    right: 55px;
    width: 90px;
    height: 90px;
    border: 2px solid rgba(184,134,11,0.4);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgba(184,134,11,0.5);
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    transform: rotate(-15deg);
    pointer-events: none;
  }
  .stamp-inner { font-size: 10px; font-weight: 800; }
  
  @media print {
    .page { box-shadow: none; }
    body { background: white; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="watermark">MADRASA FAROOQIA</div>
  <div class="border-frame"></div>
  
  <div class="content">
    <!-- Header -->
    <div class="header">
      <div class="brand-block">
        <div class="arabic-name">مدرسة فاروقية</div>
        <div class="brand-name">${brandName}</div>
        <div class="brand-sub">
          Husianabad, Mau, Uttar Pradesh 275101, India<br>
          info@madrasafarooqia.org &nbsp;|&nbsp; +91-XXXXX-XXXXX
        </div>
        <div class="brand-reg">
          ${taxInfo.regLabel}: ${taxInfo.reg} &nbsp;|&nbsp; ${taxInfo.taxId}: [TAX-ID-HERE]
        </div>
      </div>
      <div class="receipt-badge">
        <div class="receipt-title">${t.officialTaxReceipt}</div>
        <div class="receipt-id">${receiptId}</div>
        <div class="receipt-date">${dateStr} · ${timeStr}</div>
      </div>
    </div>
    
    <div class="gold-divider"></div>
    
    <!-- Status -->
    <div class="status-row">
      <div class="status-badge"><div class="status-dot"></div> ${t.paymentConfirmed}</div>
      <div class="tax-eligible">★ ${t.taxDeductible} · ${t[countryCode] || taxInfo.name}</div>
    </div>
    
    <!-- Amount box -->
    <div class="amount-box">
      <div>
        <div class="amount-label">${t.donationAmount}</div>
        <div class="amount-value">
          <span class="amount-currency">${currency}</span>${amount}
        </div>
        <div class="amount-words">${purpose} ${t.donationSuffix}</div>
      </div>
      <div class="amount-purpose">
        <div class="purpose-icon">${getPurposeEmoji(donation.purpose)}</div>
        <div class="purpose-label">${purpose}</div>
      </div>
    </div>
    
    <!-- Main grid: info + QR -->
    <div class="main-grid">
      <div>
        <div class="section-label">${t.donorInformation}</div>
        <table class="info-table">
          <tr><td>${t.fullName}</td><td>${donorName}</td></tr>
          ${donation.donor_email ? `<tr><td>${t.email}</td><td>${donation.donor_email}</td></tr>` : ''}
          ${donation.donor_phone ? `<tr><td>${t.phone}</td><td>${donation.donor_phone}</td></tr>` : ''}
          <tr><td>${t.donorId}</td><td>#${(donation.id || 'ANON').toString().slice(-8).toUpperCase()}</td></tr>
        </table>
        
        <div style="margin-top:18px">
          <div class="section-label">${t.donationDetails}</div>
          <table class="info-table">
            <tr><td>${t.receiptId}</td><td>${receiptId}</td></tr>
            <tr><td>${t.dateTime}</td><td>${dateStr}, ${timeStr}</td></tr>
            <tr><td>${t.purpose}</td><td>${purpose}</td></tr>
            <tr><td>${t.payment}</td><td>${(donation.payment_method || 'Card').toUpperCase()}</td></tr>
            <tr><td>${t.status}</td><td>✅ ${t.completed}</td></tr>
            ${donation.is_recurring ? `<tr><td>${t.recurring}</td><td>${t.yes} – ${donation.recurring_frequency}</td></tr>` : ''}
            ${donation.campaign_id ? `<tr><td>${t.campaign}</td><td>Linked Campaign</td></tr>` : ''}
          </table>
        </div>
      </div>
      
      <!-- QR Code -->
      <div>
        <div class="qr-block">
          <img src="${qrUrl}" alt="QR Verification Code" />
          <div class="qr-label">${t.scanToVerify}</div>
          <div class="qr-verify">${verifyUrl}</div>
        </div>
      </div>
    </div>
    
    <!-- Tax Disclaimer -->
    <div class="tax-box">
      <div class="tax-header">⚖️ ${t.taxCompliance} — ${t[countryCode] || taxInfo.name}</div>
      <p>${taxInfo.disclaimer}</p>
      <div class="tax-ids">
        <div class="tax-id-item">
          <span>${t.orgReg}</span>
          <strong>${taxInfo.reg}</strong>
        </div>
        <div class="tax-id-item">
          <span>${taxInfo.taxId}</span>
          <strong>[DONOR-TAX-ID]</strong>
        </div>
        <div class="tax-id-item">
          <span>${t.receiptId}</span>
          <strong>${receiptId}</strong>
        </div>
        <div class="tax-id-item">
          <span>${t.amount}</span>
          <strong>${currency} ${amount}</strong>
        </div>
      </div>
    </div>
    
    <!-- Signature row -->
    <div class="sig-row">
      <div class="sig-block">
        <strong>${t.authorizedSignatory}</strong>
        <div class="sig-line"></div>
        <p>${t.directorTitle}</p>
      </div>
      <div class="sig-block">
        <strong>${t.accountsDept}</strong>
        <div class="sig-line"></div>
        <p>${t.financeTreasury}</p>
      </div>
      <div class="sig-block">
        <strong>${t.verificationCode}</strong>
        <div class="sig-line"></div>
        <p style="font-family:monospace;font-size:11px;color:#b8860b">${receiptId}</p>
      </div>
    </div>
    
    <!-- Islamic quote -->
    <div class="quote-box">
      <div class="arabic-quote">الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ</div>
      <div class="quote-text">${t.quoteText}</div>
      <div class="quote-source">${t.quoteSource}</div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="footer-left">
        ${t.officialNote}<br>
        ${t.verifyAt}
      </div>
      <div class="footer-right">
        <div class="footer-brand">Madrasa Farooqia</div>
        ${t.generated}: ${format(new Date(), 'PPPp')}<br>
        ${t.receiptId}: ${receiptId}
      </div>
    </div>
  </div>
</div>
</body>
</html>`;
}

function getPurposeEmoji(purpose) {
  const map = {
    sadqa: '💝', zakat: '🌙', fitra: '🌾', lillah: '✨', waqf: '🏛️',
    general: '🤲', building: '🏗️', education: '📚', orphan_care: '👶',
    food_program: '🍲', masjid: '🕌', niswaan: '👩‍🎓', scholarship: '🎓', salaries: '👨‍🏫',
  };
  return map[purpose] || '🤲';
}

export function downloadReceipt(donation, countryCode = 'IN', lang = 'en') {
  const html = generateTaxReceiptHTML(donation, countryCode, lang);
  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
    setTimeout(() => win.print(), 800);
  }
}