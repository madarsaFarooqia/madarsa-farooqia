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

export function generateTaxReceiptHTML(donation, countryCode = 'IN') {
  const taxInfo = TAX_RULES[countryCode] || TAX_RULES.default;
  const receiptId = generateReceiptId(donation);
  const dateStr = donation.created_date ? format(new Date(donation.created_date), 'PPP') : format(new Date(), 'PPP');
  const timeStr = donation.created_date ? format(new Date(donation.created_date), 'p') : format(new Date(), 'p');
  const verifyUrl = `https://madrasafarooqia.org/verify?receipt=${receiptId}`;
  const qrUrl = buildQRDataURL(verifyUrl);
  const donorName = donation.is_anonymous ? 'Anonymous Donor' : (donation.donor_name || 'Anonymous');
  const amount = Number(donation.amount || 0).toLocaleString();
  const currency = donation.currency || 'USD';
  const purpose = (donation.purpose || 'general').replace(/_/g, ' ').toUpperCase();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tax Receipt ${receiptId} — Madrasa Farooqia</title>
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
    text-align: right;
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
    width: 110px;
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
    text-align: right;
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
    border-left: 3px solid #b8860b;
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
  .footer-right { text-align: right; font-size: 10px; color: rgba(255,255,255,0.5); }
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
        <div class="brand-name">Madrasa Farooqia</div>
        <div class="brand-sub">
          Husianabad, Mau, Uttar Pradesh 275101, India<br>
          info@madrasafarooqia.org &nbsp;|&nbsp; +91-XXXXX-XXXXX
        </div>
        <div class="brand-reg">
          ${taxInfo.regLabel}: ${taxInfo.reg} &nbsp;|&nbsp; ${taxInfo.taxId}: [TAX-ID-HERE]
        </div>
      </div>
      <div class="receipt-badge">
        <div class="receipt-title">Official Tax Receipt</div>
        <div class="receipt-id">${receiptId}</div>
        <div class="receipt-date">${dateStr} · ${timeStr}</div>
      </div>
    </div>
    
    <div class="gold-divider"></div>
    
    <!-- Status -->
    <div class="status-row">
      <div class="status-badge"><div class="status-dot"></div> PAYMENT CONFIRMED</div>
      <div class="tax-eligible">★ TAX DEDUCTIBLE · ${taxInfo.name}</div>
    </div>
    
    <!-- Amount box -->
    <div class="amount-box">
      <div>
        <div class="amount-label">DONATION AMOUNT</div>
        <div class="amount-value">
          <span class="amount-currency">${currency}</span>${amount}
        </div>
        <div class="amount-words">${purpose} Donation</div>
      </div>
      <div class="amount-purpose">
        <div class="purpose-icon">${getPurposeEmoji(donation.purpose)}</div>
        <div class="purpose-label">${purpose}</div>
      </div>
    </div>
    
    <!-- Main grid: info + QR -->
    <div class="main-grid">
      <div>
        <div class="section-label">Donor Information</div>
        <table class="info-table">
          <tr><td>Full Name</td><td>${donorName}</td></tr>
          ${donation.donor_email ? `<tr><td>Email</td><td>${donation.donor_email}</td></tr>` : ''}
          ${donation.donor_phone ? `<tr><td>Phone</td><td>${donation.donor_phone}</td></tr>` : ''}
          <tr><td>Donor ID</td><td>#${(donation.id || 'ANON').toString().slice(-8).toUpperCase()}</td></tr>
        </table>
        
        <div style="margin-top:18px">
          <div class="section-label">Donation Details</div>
          <table class="info-table">
            <tr><td>Receipt ID</td><td>${receiptId}</td></tr>
            <tr><td>Date & Time</td><td>${dateStr}, ${timeStr}</td></tr>
            <tr><td>Purpose</td><td>${purpose}</td></tr>
            <tr><td>Payment</td><td>${(donation.payment_method || 'Card').toUpperCase()}</td></tr>
            <tr><td>Status</td><td>✅ COMPLETED</td></tr>
            ${donation.is_recurring ? `<tr><td>Recurring</td><td>Yes – ${donation.recurring_frequency}</td></tr>` : ''}
            ${donation.campaign_id ? `<tr><td>Campaign</td><td>Linked Campaign</td></tr>` : ''}
          </table>
        </div>
      </div>
      
      <!-- QR Code -->
      <div>
        <div class="qr-block">
          <img src="${qrUrl}" alt="QR Verification Code" />
          <div class="qr-label">Scan to Verify</div>
          <div class="qr-verify">${verifyUrl}</div>
        </div>
      </div>
    </div>
    
    <!-- Tax Disclaimer -->
    <div class="tax-box">
      <div class="tax-header">⚖️ Tax Compliance — ${taxInfo.name}</div>
      <p>${taxInfo.disclaimer}</p>
      <div class="tax-ids">
        <div class="tax-id-item">
          <span>Organization Reg.</span>
          <strong>${taxInfo.reg}</strong>
        </div>
        <div class="tax-id-item">
          <span>${taxInfo.taxId}</span>
          <strong>[DONOR-TAX-ID]</strong>
        </div>
        <div class="tax-id-item">
          <span>Receipt ID</span>
          <strong>${receiptId}</strong>
        </div>
        <div class="tax-id-item">
          <span>Amount</span>
          <strong>${currency} ${amount}</strong>
        </div>
      </div>
    </div>
    
    <!-- Signature row -->
    <div class="sig-row">
      <div class="sig-block">
        <strong>Authorized Signatory</strong>
        <div class="sig-line"></div>
        <p>Director, Madrasa Farooqia</p>
      </div>
      <div class="sig-block">
        <strong>Accounts Department</strong>
        <div class="sig-line"></div>
        <p>Finance & Treasury</p>
      </div>
      <div class="sig-block">
        <strong>Verification Code</strong>
        <div class="sig-line"></div>
        <p style="font-family:monospace;font-size:11px;color:#b8860b">${receiptId}</p>
      </div>
    </div>
    
    <!-- Islamic quote -->
    <div class="quote-box">
      <div class="arabic-quote">الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ</div>
      <div class="quote-text">"Charity extinguishes sin as water extinguishes fire."</div>
      <div class="quote-source">— Al-Tirmidhi | JazakAllah Khair for your generous contribution</div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="footer-left">
        This is an official, computer-generated tax receipt.<br>
        No signature required. Valid without physical seal.<br>
        Verify at: madrasafarooqia.org/verify
      </div>
      <div class="footer-right">
        <div class="footer-brand">Madrasa Farooqia</div>
        Generated: ${format(new Date(), 'PPPp')}<br>
        Receipt: ${receiptId}
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

export function downloadReceipt(donation, countryCode = 'IN') {
  const html = generateTaxReceiptHTML(donation, countryCode);
  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
    setTimeout(() => win.print(), 800);
  }
}