import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Globe,
  Check,
  ArrowLeft,
  QrCode,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  generateReceiptId,
  downloadReceipt,
  TAX_RULES,
} from "../lib/receiptGenerator";
import { format } from "date-fns";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { useAuth } from "../lib/AuthContext";
import { useMyDonationsQuery } from "../hooks/api";
import { getStoredToken } from "../services/http";

const purposeIcons = {
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

function ReceiptCard({ donation, country, onDownload, t }) {
  const receiptId = generateReceiptId(donation);
  const taxInfo = TAX_RULES[country] || TAX_RULES.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      {/* Top gradient bar */}
      <div className="h-2 bg-gradient-to-r from-foreground via-accent to-foreground" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">
                {purposeIcons[donation.purpose] || "🤲"}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 bg-foreground text-background rounded-full uppercase tracking-wider">
                {donation.status}
              </span>
              <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded-full font-medium">
                {t("receipt:tax_deductible", "Tax Deductible")}
              </span>
            </div>
            <h3 className="font-playfair font-bold text-xl text-foreground capitalize">
              {(donation.purpose || "general").replace(/_/g, " ")} {t("receipt:donation_suffix", "Donation")}
            </h3>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              {receiptId}
            </p>
          </div>
          <div className="text-right">
            <div className="font-playfair font-bold text-3xl text-foreground">
              <span className="text-accent text-xl">
                {donation.currency || "$"}
              </span>
              {Number(donation.amount).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {donation.created_date
                ? format(new Date(donation.created_date), "MMM d, yyyy")
                : "N/A"}
            </div>
          </div>
        </div>

        {/* Divider with decorative pattern */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-muted-foreground text-xs font-medium">
              {t("receipt:receipt_details", "RECEIPT DETAILS")}
            </span>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            {
              label: t("receipt:donor", "Donor"),
              value: donation.is_anonymous
                ? t("receipt:anonymous", "Anonymous")
                : donation.donor_name || "—",
            },
            {
              label: t("receipt:payment", "Payment"),
              value: (donation.payment_method || "Card").toUpperCase(),
            },
            { label: t("receipt:country", "Country"), value: taxInfo.name },
            { label: taxInfo.taxId, value: taxInfo.reg },
          ].map(({ label, value }) => (
            <div key={label} className="bg-secondary/40 rounded-xl p-3">
              <div className="text-xs text-muted-foreground mb-0.5">
                {label}
              </div>
              <div className="text-sm font-semibold text-foreground truncate">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* QR verification hint */}
        <div className="flex items-center gap-3 p-3 bg-accent/5 border border-accent/20 rounded-xl mb-5">
          <QrCode className="w-8 h-8 text-accent shrink-0" />
          <div>
            <div className="text-xs font-bold text-foreground">
              {t("receipt:qr_ver_title", "QR Verification Included")}
            </div>
            <div className="text-xs text-muted-foreground">
              {t("receipt:qr_ver_desc", "Scan in PDF to verify authenticity at madrasafarooqia.org/verify")}
            </div>
          </div>
          <div className="ml-auto">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-background" />
            </div>
          </div>
        </div>

        {/* Download button */}
        <Button
          onClick={() => onDownload(donation)}
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-semibold text-sm gap-2"
        >
          <Download className="w-4 h-4" />
          {t("receipt:download_pdf", "Download Tax Receipt PDF")}
        </Button>

        {/* Legal note */}
        <p className="text-center text-xs text-muted-foreground mt-3">
          {taxInfo.disclaimer.slice(0, 80)}…
        </p>
      </div>
    </motion.div>
  );
}

export default function ReceiptViewer() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { user, isLoadingAuth } = useAuth();
  const { data: donations = [], isLoading: donationsLoading } = useMyDonationsQuery({
    enabled: !!getStoredToken(),
  });
  const loading = isLoadingAuth || donationsLoading;
  const [country, setCountry] = useState("IN");
  const navigate = useNavigate();

  const COUNTRIES = [
    { code: "IN", flag: "🇮🇳", name: t("receipt:country_in", "India (Section 80G)") },
    { code: "US", flag: "🇺🇸", name: t("receipt:country_us", "USA (501c3)") },
    { code: "GB", flag: "🇬🇧", name: t("receipt:country_gb", "UK (Gift Aid)") },
    { code: "AE", flag: "🇦🇪", name: t("receipt:country_ae", "UAE") },
    { code: "SA", flag: "🇸🇦", name: t("receipt:country_sa", "Saudi Arabia") },
    { code: "default", flag: "🌍", name: t("receipt:country_int", "International") },
  ];

  const handleDownload = (donation) => downloadReceipt(donation, country);

  if (!user && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="text-center p-8 bg-card rounded-3xl border border-border shadow-xl max-w-sm">
          <FileText className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-2">
            {t("receipt:login_required", "Login Required")}
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            {t("receipt:login_req_desc", "Please login to view and download your tax receipts.")}
          </p>
          <Button
            onClick={() => navigate("/login?redirect=/receipts")}
            className="w-full rounded-xl"
          >
            {t("receipt:login_btn", "Login to Continue")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="hero-gradient geometric-pattern pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-amiri text-white/[0.04] text-[22rem] leading-none select-none">
            و
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-5 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <FileText className="w-4 h-4" /> {t("receipt:hero_badge", "Tax-Compliant Donation Receipts")}
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              {t("receipt:hero_title", "Your Official Receipts")}
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-xl">
              {t("receipt:hero_desc", "Download legally compliant, country-specific tax receipts with QR verification for each of your donations.")}
            </p>

            {/* Country Selector */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                <Globe className="w-4 h-4" /> {t("receipt:select_country", "Select your country for the correct tax format:")}
              </div>
              <div className="flex flex-wrap gap-2">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCountry(c.code)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      country === c.code
                        ? "bg-accent text-accent-foreground shadow-lg scale-105"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    <span>{c.flag}</span> {c.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tax Info Banner */}
      {TAX_RULES[country] && (
        <div className="bg-accent/10 border-b border-accent/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 text-sm">
            <Check className="w-4 h-4 text-accent shrink-0" />
            <span className="text-foreground font-medium">
              {TAX_RULES[country].name} {t("receipt:format", "Format:")}
            </span>
            <span className="text-muted-foreground">
              {TAX_RULES[country].disclaimer}
            </span>
          </div>
        </div>
      )}

      {/* Receipts Grid */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 skeleton rounded-3xl" />
              ))}
            </div>
          ) : donations.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-3xl border border-border">
              <FileText className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                {t("receipt:no_donations", "No Completed Donations")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("receipt:no_donations_desc", "Make your first donation to generate tax receipts.")}
              </p>
              <Link to="/donate">
                <Button className="rounded-xl px-8">{t("receipt:make_donation", "Make a Donation")}</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-foreground">
                    {donations.length}{" "}
                    {donations.length === 1
                      ? t("receipt:tax_receipt", "Tax Receipt")
                      : t("receipt:tax_receipts", "Tax Receipts")}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {t("receipt:receipts_subtitle", "All receipts include QR verification code · Format: ")}{" "}
                    {TAX_RULES[country]?.name}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    donations.forEach((d, i) =>
                      setTimeout(() => downloadReceipt(d, country), i * 500),
                    )
                  }
                  className="gap-2"
                >
                  <Download className="w-4 h-4" /> {t("receipt:download_all", "Download All")}
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map((d, i) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <ReceiptCard
                      donation={d}
                      country={country}
                      onDownload={handleDownload}
                      t={t}
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
