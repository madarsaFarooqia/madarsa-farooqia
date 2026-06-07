import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Heart,
  Target,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Download,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { format } from "date-fns";
import CampaignFormModal from "../../components/admin/CampaignFormModal";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { useCampaignsQuery, useCampaignMutations } from "../../hooks/api";

export default function CampaignsPro() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { data: campaigns = [], isLoading: loading, refetch } = useCampaignsQuery('-created_date', 100);
  const { close } = useCampaignMutations();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = campaigns.filter((c) => {
    const matchSearch =
      !search ||
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.category?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || String(c.status).toLowerCase() === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = async (id) => {
    const ok = window.confirm(t("admin:deleteCampaignConfirm", "Delete this campaign?"));
    if (!ok) return;
    await close.mutateAsync(id);
    refetch();
  };

  const exportCSV = () => {
    const rows = [
      [
        t("admin:title", "Title"),
        t("admin:category", "Category"),
        t("admin:goal", "Goal"),
        t("admin:collected", "Collected"),
        t("admin:status", "Status"),
        t("admin:donorsTitle", "Donors"),
        t("admin:fromDate", "Start"),
        t("admin:toDate", "End"),
      ],
      ...filtered.map((c) => [
        c.title,
        c.category,
        c.goal_amount,
        c.collected_amount || 0,
        c.status,
        c.donors_count || 0,
        c.start_date || "",
        c.end_date || "",
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "campaigns.csv";
    a.click();
  };

  const statusColors = {
    active: "bg-foreground text-background",
    completed: "bg-secondary text-muted-foreground",
    paused: "bg-accent/20 text-accent",
    cancelled: "bg-destructive/10 text-destructive",
  };

  const getStatusLabel = (s) => {
    switch (s) {
      case "active": return t("admin:statusActive", "Active");
      case "paused": return t("admin:statusPaused", "Paused");
      case "cancelled": return t("admin:statusCancelled", "Cancelled");
      case "completed": return t("admin:statusCompleted", "Completed");
      default: return s;
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat?.toLowerCase()) {
      case "education": return t("admin:education", "Islamic Education");
      case "masjid": return t("admin:masjid", "Masjid Project");
      case "orphan": return t("admin:orphan", "Orphan Support");
      case "food": return t("admin:food", "Food Distribution");
      case "general": return t("admin:general", "General");
      default: return cat;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-playfair font-bold text-3xl text-foreground">
            {t("admin:campaigns", "Campaigns")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t("admin:manageCampaigns", "Manage fundraising campaigns")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download size={14} className="mr-2" /> {t("admin:csv", "CSV")}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditing(null);
              setShowModal(true);
            }}
          >
            <Plus size={14} className="mr-2" /> {t("admin:newCampaign", "New Campaign")}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: t("admin:totalCampaigns", "Total Campaigns"), value: campaigns.length },
          {
            label: t("admin:statusActive", "Active"),
            value: campaigns.filter((c) => c.status === "active").length,
          },
          {
            label: t("admin:totalGoal", "Total Goal"),
            value: `$${campaigns.reduce((s, c) => s + (c.goal_amount || 0), 0).toLocaleString()}`,
          },
          {
            label: t("admin:totalRaised", "Total Raised"),
            value: `$${campaigns.reduce((s, c) => s + (c.collected_amount || 0), 0).toLocaleString()}`,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-4"
          >
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="font-playfair font-bold text-xl text-foreground">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder={t("admin:searchCampaigns", "Search campaigns...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "completed", "paused", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:bg-muted"}`}
            >
              {s === "all" ? t("admin:all", "All") : getStatusLabel(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 skeleton rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((c, i) => {
            const pct = c.goal_amount
              ? Math.min(((c.collected_amount || 0) / c.goal_amount) * 100, 100)
              : 0;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[c.status] || statusColors.active}`}
                      >
                        {getStatusLabel(c.status)}
                      </span>
                      {c.priority === "urgent" && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle size={10} />
                          {t("admin:urgent", "Urgent")}
                        </span>
                      )}
                    </div>
                    <h3 className="font-playfair font-bold text-foreground truncate">
                      {c.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {getCategoryLabel(c.category)} · {c.donors_count || 0} {t("admin:donors", "donors")}
                    </p>
                  </div>
                  <div className="flex gap-1 ml-3">
                    <button
                      onClick={() => {
                        setEditing(c);
                        setShowModal(true);
                      }}
                      className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-foreground">
                      ${(c.collected_amount || 0).toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      {t("admin:totalGoal", "Goal")}: ${(c.goal_amount || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {pct.toFixed(1)}% {t("admin:funded", "funded")}
                  </div>
                </div>
                {c.end_date && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} /> {t("admin:ends", "Ends")}:{" "}
                    {format(new Date(c.end_date), "MMM d, yyyy")}
                  </div>
                )}
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-16 text-muted-foreground">
              <Heart size={40} className="mx-auto mb-3 opacity-20" />
              <p>{t("admin:noCampaignsFound", "No campaigns found. Create your first campaign!")}</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <CampaignFormModal
          campaign={editing}
          onClose={() => {
            setShowModal(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowModal(false);
            setEditing(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateCampaigns = (count = 12) =>
  Array.from({ length: count }).map((_, i) => {
    const goal = Math.floor(Math.random() * 8000 + 2000);
    const collected = Math.floor(Math.random() * goal);

    return {
      id: i + 1,
      title: `Campaign ${i + 1}`,
      category: randomFrom([
        "education",
        "masjid",
        "orphan",
        "food",
        "general",
      ]),
      goal_amount: goal,
      collected_amount: collected,
      donors_count: Math.floor(Math.random() * 300),
      status: randomFrom(["active", "completed", "paused", "cancelled"]),
      priority: Math.random() > 0.8 ? "urgent" : "normal",
      start_date: new Date(
        Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 120,
      ),
      end_date: new Date(
        Date.now() + Math.random() * 1000 * 60 * 60 * 24 * 120,
      ),
    };
  });
