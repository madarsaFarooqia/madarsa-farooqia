import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  Heart,
  DollarSign,
  FileText,
  TrendingUp,
  ArrowUpRight,
  BookOpen,
  MessageSquare,
  Building2,
  PenSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Target,
} from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { format, subDays, startOfMonth } from "date-fns";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const purposes = ["zakat", "sadqa", "education", "masjid", "general"];

const generateDonations = (count = 50) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    donor_name: `User ${i + 1}`,
    amount: Math.floor(Math.random() * 900 + 50),
    currency: "$",
    purpose: randomFrom(purposes),
    status: Math.random() > 0.2 ? "completed" : "pending",
    created_date: new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 180,
    ),
    is_anonymous: Math.random() > 0.7,
    receipt_id: `REC-${1000 + i}`,
  }));

const generateRegs = (count = 10) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    student_name: `Student ${i + 1}`,
    parent_name: `Parent ${i + 1}`,
    course: randomFrom(["Hifz", "Nazra", "Fiqh", "Arabic"]),
    status: randomFrom(["approved", "pending", "rejected"]),
  }));

const generateCampaigns = () =>
  Array.from({ length: 4 }).map((_, i) => ({
    id: i + 1,
    title: `Campaign ${i + 1}`,
    goal_amount: 5000 + i * 2000,
    collected_amount: Math.floor(Math.random() * 5000),
    status: "active",
  }));

export default function AdminDashboard() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [stats, setStats] = useState({
    teachers: 0,
    students: 0,
    campaigns: 0,
    donations: 0,
    raised: 0,
    registrations: 0,
    messages: 0,
    blogs: 0,
  });
  const [recentDonations, setRecentDonations] = useState([]);
  const [recentRegs, setRecentRegs] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [donationsByCategory, setDonationsByCategory] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   Promise.all([
  //     base44.entities.Teacher.list('-created_date', 500),
  //     base44.entities.Student.list('-created_date', 500),
  //     base44.entities.FundraisingCampaign.list('-created_date', 50),
  //     base44.entities.Donation.list('-created_date', 500),
  //     base44.entities.Registration.list('-created_date', 10),
  //     base44.entities.ContactMessage.filter({ status: 'new' }, '-created_date', 100),
  //   ]).then(([t, s, c, d, r, msgs]) => {
  //     const completed = d.filter(x => x.status === 'completed');
  //     const totalRaised = completed.reduce((sum, x) => sum + (x.amount || 0), 0);

  //     setStats({
  //       teachers: t.length, students: s.length, campaigns: c.length,
  //       donations: d.length, raised: totalRaised,
  //       registrations: r.length, messages: msgs.length,
  //     });
  //     setRecentDonations(d.slice(0, 6));
  //     setRecentRegs(r.slice(0, 5));
  //     setCampaigns(c.slice(0, 4));

  //     // Category breakdown
  //     const catMap = {};
  //     completed.forEach(don => {
  //       const cat = don.purpose || 'general';
  //       catMap[cat] = (catMap[cat] || 0) + (don.amount || 0);
  //     });
  //     setDonationsByCategory(Object.entries(catMap).map(([name, value]) => ({ name, value })));

  //     // Monthly trend (last 6 months)
  //     const now = new Date();
  //     const trend = Array.from({ length: 6 }, (_, i) => {
  //       const month = subDays(now, (5 - i) * 30);
  //       const label = format(month, 'MMM');
  //       const total = completed
  //         .filter(don => {
  //           if (!don.created_date) return false;
  //           const d = new Date(don.created_date);
  //           return d.getMonth() === month.getMonth() && d.getFullYear() === month.getFullYear();
  //         })
  //         .reduce((sum, don) => sum + (don.amount || 0), 0);
  //       return { month: label, amount: total };
  //     });
  //     setMonthlyTrend(trend);
  //   }).finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    const donations = generateDonations(120);
    const regs = generateRegs(8);
    const camps = generateCampaigns();

    const completed = donations.filter((x) => x.status === "completed");
    const totalRaised = completed.reduce((sum, x) => sum + x.amount, 0);

    setStats({
      teachers: 12,
      students: 340,
      campaigns: camps.length,
      donations: donations.length,
      raised: totalRaised,
      registrations: regs.length,
      messages: 5,
    });

    setRecentDonations(donations.slice(0, 6));
    setRecentRegs(regs.slice(0, 5));
    setCampaigns(camps.slice(0, 4));

    const catMap = {};
    completed.forEach((don) => {
      const cat = don.purpose || "general";
      catMap[cat] = (catMap[cat] || 0) + don.amount;
    });

    setDonationsByCategory(
      Object.entries(catMap).map(([name, value]) => ({ name, value })),
    );

    const now = new Date();
    const trend = Array.from({ length: 6 }, (_, i) => {
      const month = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const label = month.toLocaleString("default", { month: "short" });

      const total = completed
        .filter((don) => {
          const d = new Date(don.created_date);
          return d.getMonth() === month.getMonth();
        })
        .reduce((sum, don) => sum + don.amount, 0);

      return { month: label, amount: total };
    });

    setMonthlyTrend(trend);
    setLoading(false);
  }, []);

  const getPurposeLabel = (p) => {
    switch (p?.toLowerCase()) {
      case "education": return t("admin:education", "Islamic Education");
      case "mosque":
      case "masjid": return t("admin:masjid", "Masjid Project");
      case "zakat": return t("admin:zakat", "Zakat");
      case "general": return t("admin:general", "General");
      default: return p;
    }
  };

  const getStatusLabel = (s) => {
    switch (s) {
      case "completed": return t("admin:completed", "Completed");
      case "pending": return t("admin:pending", "Pending");
      case "failed": return t("admin:failed", "Failed");
      case "refunded": return t("admin:refunded", "Refunded");
      case "active": return t("admin:statusActive", "Active");
      case "paused": return t("admin:statusPaused", "Paused");
      case "cancelled": return t("admin:statusCancelled", "Cancelled");
      case "approved": return t("admin:approved", "Approved");
      case "rejected": return t("admin:rejected", "Rejected");
      default: return s;
    }
  };

  const PIE_COLORS = [
    "#1a1a1a",
    "#b8860b",
    "#6b6b6b",
    "#3a3a3a",
    "#c9a84c",
    "#888",
  ];

  const statCards = [
    {
      label: t("admin:totalRaised", "Total Raised"),
      value: `$${stats.raised.toLocaleString()}`,
      icon: DollarSign,
      href: "/admin/donations-pro",
      highlight: true,
    },
    {
      label: t("admin:activeCampaigns", "Active Campaigns"),
      value: stats.campaigns,
      icon: Heart,
      href: "/admin/campaigns-pro",
    },
    {
      label: t("admin:teachers", "Teachers"),
      value: stats.teachers,
      icon: Users,
      href: "/admin/teachers",
    },
    {
      label: t("admin:students", "Students"),
      value: stats.students,
      icon: GraduationCap,
      href: "/admin/students",
    },
    {
      label: t("admin:donationsTitle", "Donations"),
      value: stats.donations,
      icon: TrendingUp,
      href: "/admin/donations-pro",
    },
    {
      label: t("admin:registrations", "Registrations"),
      value: stats.registrations,
      icon: FileText,
      href: "/admin/registrations",
    },
    {
      label: t("admin:unreadMessages", "Unread Messages"),
      value: stats.messages,
      icon: MessageSquare,
      href: "/admin/messages",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair font-bold text-3xl text-foreground">
            {t("admin:adminDashboard", "Admin Dashboard")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t("admin:controlPanelSubtitle", "Madrasa Farooqia — Enterprise Control Panel")}
          </p>
        </div>
        <Link
          to="/"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          {t("admin:viewWebsite", "View Website")} <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, href, highlight }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={href}
              className={`block rounded-xl p-4 border border-border hover:shadow-md transition-all ${highlight ? "bg-foreground text-background" : "bg-card"}`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${highlight ? "bg-white/10" : "bg-secondary"}`}
              >
                <Icon
                  size={16}
                  className={highlight ? "text-background" : "text-foreground"}
                />
              </div>
              <p
                className={`font-playfair font-bold text-xl ${highlight ? "text-background" : "text-foreground"}`}
              >
                {loading ? "..." : value}
              </p>
              <p
                className={`text-xs mt-1 ${highlight ? "text-background/60" : "text-muted-foreground"}`}
              >
                {label}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Monthly Trend */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h2 className="font-playfair font-bold text-lg text-foreground mb-5">
            {t("admin:monthlyDonationTrend", "Monthly Donation Trend")}
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyTrend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`$${v}`, t("admin:amountLabel", "Amount")]} />
              <Bar
                dataKey="amount"
                fill="hsl(var(--foreground))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-playfair font-bold text-lg text-foreground mb-5">
            {t("admin:byCategory", "By Category")}
          </h2>
          {donationsByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={donationsByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {donationsByCategory.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`$${v}`, ""]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
              {t("admin:noDataYet", "No data yet")}
            </div>
          )}
        </div>
      </div>

      {/* Active Campaigns Progress */}
      {campaigns.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-playfair font-bold text-lg text-foreground">
              {t("admin:campaignProgress", "Campaign Progress")}
            </h2>
            <Link
              to="/admin/campaigns-pro"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {t("admin:manageAll", "Manage All →")}
            </Link>
          </div>
          <div className="space-y-4">
            {campaigns.map((c) => {
              const pct = c.goal_amount
                ? Math.min(
                    ((c.collected_amount || 0) / c.goal_amount) * 100,
                    100,
                  )
                : 0;
              return (
                <div key={c.id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-foreground truncate max-w-[60%]">
                      {c.title}
                    </span>
                    <span className="text-muted-foreground">
                      ${(c.collected_amount || 0).toLocaleString()} / $
                      {(c.goal_amount || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {pct.toFixed(1)}% {t("admin:funded", "funded")} · {getStatusLabel(c.status)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-playfair font-bold text-lg text-foreground">
              {t("admin:recentDonations", "Recent Donations")}
            </h2>
            <Link
              to="/admin/donations-pro"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {t("admin:manageAll", "Manage All →")}
            </Link>
          </div>
          <div className="space-y-3">
            {recentDonations.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("admin:noDonationsYet", "No donations yet.")}</p>
            ) : (
              recentDonations.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {d.is_anonymous ? t("admin:anonymous", "Anonymous") : d.donor_name || t("admin:unknown", "Unknown")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getPurposeLabel(d.purpose)} · {d.receipt_id || "—"}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-sm font-playfair font-bold text-foreground">
                      {d.currency || "$"}
                      {d.amount}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${d.status === "completed" ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"}`}
                    >
                      {getStatusLabel(d.status)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-playfair font-bold text-lg text-foreground">
              {t("admin:recentRegistrations", "Recent Registrations")}
            </h2>
            <Link
              to="/admin/registrations"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {t("admin:manageAll", "Manage All →")}
            </Link>
          </div>
          <div className="space-y-3">
            {recentRegs.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {t("admin:noRegistrationsYet", "No registrations yet.")}
              </p>
            ) : (
              recentRegs.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {r.student_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.course} · {r.parent_name}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      r.status === "approved"
                        ? "bg-foreground text-background"
                        : r.status === "rejected"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {getStatusLabel(r.status)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
