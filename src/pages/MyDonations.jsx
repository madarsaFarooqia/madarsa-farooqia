import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Calendar,
  DollarSign,
  RefreshCw,
  TrendingUp,
  Award,
  ArrowRight,
  Download,
  FileText,
  QrCode,
  Star,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { downloadReceipt } from "../lib/receiptGenerator";
import { useAuth } from "../lib/AuthContext";
import { useMyDonationsQuery } from "../hooks/api";
import { getStoredToken } from "../services/http";
import Skeleton from '../components/ui/skeleton';

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

const PIE_COLORS = ["#0a0a0a", "#b8860b", "#374151", "#c9a84c", "#6b7280"];

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-foreground text-background px-4 py-2 rounded-xl shadow-xl text-sm">
      <div className="font-semibold">{label}</div>
      <div className="text-accent">
        {currency} {payload[0].value?.toLocaleString()}
      </div>
    </div>
  );
};

export default function MyDonations() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { user, isLoadingAuth } = useAuth();
  const { data: donations = [], isLoading: donationsLoading } = useMyDonationsQuery({
    enabled: !!getStoredToken(),
  });
  const loading = isLoadingAuth || donationsLoading;
  const [activeTab, setActiveTab] = useState("overview");

  const completed = donations.filter((d) => d.status === "completed");
  const totalDonated = completed.reduce((s, d) => s + (d.amount || 0), 0);
  const currency = donations[0]?.currency || "USD";

  const purposeData = Object.entries(
    completed.reduce((acc, d) => {
      acc[d.purpose] = (acc[d.purpose] || 0) + d.amount;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const monthlyData = completed
    .reduce((acc, d) => {
      const month = d.created_date
        ? format(new Date(d.created_date), "MMM yy")
        : "N/A";
      const ex = acc.find((x) => x.month === month);
      if (ex) ex.amount += d.amount;
      else acc.push({ month, amount: d.amount });
      return acc;
    }, [])
    .slice(-8);

  const streak = Math.floor(Math.random() * 12) + 1; // Placeholder

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-10 bg-card rounded-3xl border border-border shadow-2xl max-w-sm"
        >
          <div className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center mx-auto mb-5">
            <Heart className="w-10 h-10 text-background" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-2">
            Please Log In
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Log in to view your donation history and download tax receipts.
          </p>
          <Button
            onClick={() => alert("Redirect to login /my-donations")}
            className="w-full rounded-xl h-11"
          >
            Login to Continue
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="hero-gradient geometric-pattern pt-32 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-amiri text-white/[0.04] text-[22rem] leading-none select-none">
            ص
          </span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Heart className="w-4 h-4" /> My Giving Dashboard
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-2">
              {t('nav:myDonations')}
            </h1>
            <p className="text-white/60">{user.full_name || user.email}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 -mt-16 relative z-10">
            {[
              {
                icon: DollarSign,
                label: "Total Donated",
                value: `${currency} ${totalDonated.toLocaleString()}`,
                dark: true,
              },
              { icon: Heart, label: "Donations Made", value: donations.length },
              {
                icon: RefreshCw,
                label: "Recurring",
                value: donations.filter((d) => d.is_recurring).length,
              },
              { icon: Star, label: "Completed", value: completed.length },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl p-5 border shadow-lg flex items-center gap-4 ${s.dark ? "bg-foreground border-foreground text-background" : "bg-card border-border"}`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${s.dark ? "bg-white/10" : "bg-secondary"}`}
                >
                  <s.icon
                    className={`w-5 h-5 ${s.dark ? "text-accent" : "text-foreground"}`}
                  />
                </div>
                <div>
                  <div
                    className={`text-2xl font-bold font-playfair ${s.dark ? "text-background" : "text-foreground"}`}
                  >
                    {loading ? "—" : s.value}
                  </div>
                  <div
                    className={`text-xs ${s.dark ? "text-background/60" : "text-muted-foreground"}`}
                  >
                    {s.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link to="/receipts">
              <Button variant="outline" className="gap-2 rounded-xl">
                <FileText className="w-4 h-4" /> Tax Receipts
              </Button>
            </Link>
            <Link to="/donate">
              <Button className="gap-2 rounded-xl bg-foreground text-background hover:bg-foreground/90">
                <Heart className="w-4 h-4" /> Donate Again
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 bg-secondary/50 p-1 rounded-2xl w-fit">
            {["overview", "history", "receipts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all capitalize ${activeTab === tab ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl p-4">
                  <Skeleton height={64} borderRadius={8} />
                </div>
              ))}
            </div>
          ) : donations.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-3xl border border-border">
              <Heart className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                {t('donate:noDonations')}
              </h3>
              <p className="text-muted-foreground mb-6">
                Make your first donation and start tracking it here.
              </p>
              <Link to="/donate">
                <Button className="rounded-xl px-8 gold-gradient text-foreground">
                  <Heart className="w-4 h-4 mr-2" />
                  Donate Now
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Charts row */}
                  {donations.length > 1 && (
                    <div className="grid lg:grid-cols-5 gap-6">
                      {/* Area chart */}
                      <div className="lg:col-span-3 bg-card rounded-2xl p-6 border border-border shadow-sm">
                        <h3 className="font-playfair font-semibold text-foreground mb-5 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-accent" /> Giving
                          Journey
                        </h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={monthlyData}>
                            <defs>
                              <linearGradient
                                id="donationGrad"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#0a0a0a"
                                  stopOpacity={0.15}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#0a0a0a"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="hsl(var(--border))"
                            />
                            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip
                              content={<CustomTooltip currency={currency} />}
                            />
                            <Area
                              type="monotone"
                              dataKey="amount"
                              stroke="#0a0a0a"
                              strokeWidth={2.5}
                              fill="url(#donationGrad)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Donut chart */}
                      <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-sm">
                        <h3 className="font-playfair font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Award className="w-4 h-4 text-accent" /> By Purpose
                        </h3>
                        <div className="flex items-center gap-2">
                          <ResponsiveContainer width="55%" height={160}>
                            <PieChart>
                              <Pie
                                data={purposeData}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={68}
                                dataKey="value"
                                strokeWidth={0}
                              >
                                {purposeData.map((_, i) => (
                                  <Cell
                                    key={i}
                                    fill={PIE_COLORS[i % PIE_COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip formatter={(v) => `${currency} ${v}`} />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="flex-1 space-y-2">
                            {purposeData.slice(0, 4).map((d, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-1.5 text-xs"
                              >
                                <div
                                  className="w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{
                                    background:
                                      PIE_COLORS[i % PIE_COLORS.length],
                                  }}
                                />
                                <span className="text-muted-foreground capitalize truncate flex-1">
                                  {d.name}
                                </span>
                                <span className="font-semibold text-foreground">
                                  {currency} {d.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bar chart */}
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <h3 className="font-playfair font-semibold text-foreground mb-5">
                      Monthly Giving Pattern
                    </h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={monthlyData} barSize={32}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          content={<CustomTooltip currency={currency} />}
                        />
                        <Bar
                          dataKey="amount"
                          fill="hsl(var(--foreground))"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* HISTORY TAB */}
              {activeTab === "history" && (
                <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-playfair font-semibold text-foreground">
                      All Donations
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {donations.length} records
                    </span>
                  </div>
                  <div className="divide-y divide-border">
                    {donations.map((d, i) => (
                      <motion.div
                        key={d.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="px-6 py-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors group"
                      >
                        <div className="text-2xl shrink-0">
                          {purposeIcons[d.purpose] || "🤲"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground capitalize">
                            {(d.purpose || "general").replace(/_/g, " ")}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            {d.created_date
                              ? format(
                                new Date(d.created_date),
                                "MMM d, yyyy · h:mm a",
                              )
                              : "Unknown date"}
                            {d.is_recurring && (
                              <Badge
                                variant="secondary"
                                className="text-xs ml-1"
                              >
                                <RefreshCw className="w-2.5 h-2.5 mr-1" />
                                {d.recurring_frequency}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-bold font-playfair text-foreground">
                            {d.currency} {d.amount?.toLocaleString()}
                          </div>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${d.status === "completed" ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"}`}
                          >
                            {d.status}
                          </span>
                        </div>
                        {d.status === "completed" && (
                          <button
                            onClick={() => downloadReceipt(d, "IN", language)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-secondary rounded-lg shrink-0"
                            title="Download Receipt"
                          >
                            <Download className="w-4 h-4 text-muted-foreground" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* RECEIPTS TAB */}
              {activeTab === "receipts" && (
                <div className="text-center py-16 bg-card rounded-3xl border border-border">
                  <QrCode className="w-16 h-16 text-accent/50 mx-auto mb-4" />
                  <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                    Tax-Compliant Receipts
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Download official tax receipts with QR verification codes,
                    country-specific tax formats, and legal compliance for all
                    your completed donations.
                  </p>
                  <Link to="/receipts">
                    <Button className="rounded-xl px-8 gap-2">
                      <FileText className="w-4 h-4" /> Open Receipt Center
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
