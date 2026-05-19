import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, FileText, Download } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";
import BlogPostModal from "../../components/admin/BlogPostModal";
import DeleteConfirmModal from "../../components/shared/DeleteConfirmModal";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

export default function BlogAdmin() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);

    const data = generatePosts(30);

    setTimeout(() => {
      setPosts(data);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = posts.filter((p) => {
    const matchSearch =
      !search || p.title?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    setTimeout(() => {
      setPosts((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleting(false);
      setDeleteId(null);
      toast.success(t("admin:postDeletedSuccess", "Post deleted successfully"));
      load();
    }, 300);
  };

  const getCategoryLabel = (c) => {
    switch (c?.toLowerCase()) {
      case "news": return t("admin:news", "News");
      case "update": return t("admin:update", "Update");
      case "event": return t("admin:event", "Event");
      case "announcement": return t("admin:announcement", "Announcement");
      default: return t("admin:general", "General");
    }
  };

  const getStatusLabel = (s) => {
    switch (s) {
      case "published": return t("admin:published", "Published");
      case "draft": return t("admin:statusDraft", "Draft");
      case "scheduled": return t("admin:statusScheduled", "Scheduled");
      default: return s;
    }
  };

  const exportCSV = () => {
    const headers = [
      t("admin:title", "Title"),
      t("admin:category", "Category"),
      t("admin:author", "Author"),
      t("admin:status", "Status"),
      t("admin:date", "Date"),
      t("admin:views", "Views")
    ];
    const rows = filtered.map((p) => [
      `"${(p.title || "").replace(/"/g, '""')}"`,
      getCategoryLabel(p.category),
      p.author || "",
      getStatusLabel(p.status),
      p.published_at
        ? format(new Date(p.published_at), "yyyy-MM-dd")
        : p.created_date
          ? format(new Date(p.created_date), "yyyy-MM-dd")
          : "",
      p.views || 0,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blog-posts-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(t("admin:exportedCsv", "Exported posts to CSV"));
  };

  const exportPDF = () => {
    const html = `<html><head><style>
      body{font-family:sans-serif;padding:24px;color:#111}
      h1{font-size:22px;margin-bottom:4px}p{font-size:12px;color:#666;margin-bottom:16px}
      table{width:100%;border-collapse:collapse}
      th{background:#111;color:#fff;padding:8px 12px;text-align:left;font-size:12px}
      td{padding:8px 12px;font-size:12px;border-bottom:1px solid #eee}
      .badge{display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:600}
      .published{background:#111;color:#fff}.draft{background:#eee;color:#444}
    </style></head><body>
      <h1>${t("admin:blogNewsTitle", "Blog & News Posts")}</h1>
      <p>${t("admin:exportedLabel", "Exported")} ${filtered.length} ${t("admin:postsLabel", "posts")} · ${format(new Date(), "PPP")}</p>
      <table><thead><tr>${[
        t("admin:title", "Title"),
        t("admin:category", "Category"),
        t("admin:author", "Author"),
        t("admin:status", "Status"),
        t("admin:date", "Date"),
        t("admin:views", "Views")
      ].map((h) => `<th>${h}</th>`).join("")}</tr></thead>
      <tbody>${filtered
        .map(
          (p) => `<tr>
        <td><strong>${p.title || ""}</strong>${p.excerpt ? `<br/><small style="color:#999">${p.excerpt.slice(0, 80)}...</small>` : ""}</td>
        <td>${getCategoryLabel(p.category)}</td><td>${p.author || "—"}</td>
        <td><span class="badge ${p.status}">${getStatusLabel(p.status)}</span></td>
        <td>${p.published_at ? format(new Date(p.published_at), "MMM d, yyyy") : p.created_date ? format(new Date(p.created_date), "MMM d, yyyy") : "—"}</td>
        <td>${p.views || 0}</td>
      </tr>`,
        )
        .join("")}</tbody></table>
    </body></html>`;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    setTimeout(() => {
      w.print();
    }, 500);
    toast.success(t("admin:pdfOpened", "PDF print dialog opened"));
  };

  const statusBadge = (s) =>
    ({
      published: "bg-foreground text-background",
      draft: "bg-secondary text-muted-foreground",
      scheduled: "bg-accent/20 text-accent",
    })[s] || "bg-secondary text-muted-foreground";

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-playfair font-bold text-3xl text-foreground">
            {t("admin:blogNewsTitle", "Blog & News")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t("admin:blogNewsSubtitle", "Manage madrasa news, updates, and posts")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={exportCSV}>
            <Download size={14} className="mr-1" /> {t("admin:csv", "CSV")}
          </Button>
          <Button size="sm" variant="outline" onClick={exportPDF}>
            <FileText size={14} className="mr-1" /> {t("admin:pdfReport", "PDF")}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditing(null);
              setShowModal(true);
            }}
          >
            <Plus size={14} className="mr-2" /> {t("admin:newPost", "New Post")}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: t("admin:totalPosts", "Total Posts"), value: posts.length },
          {
            label: t("admin:published", "Published"),
            value: posts.filter((p) => p.status === "published").length,
          },
          {
            label: t("admin:drafts", "Drafts"),
            value: posts.filter((p) => p.status === "draft").length,
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
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder={t("admin:searchPosts", "Search posts...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        {["all", "published", "draft", "scheduled"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:bg-muted"}`}
          >
            {s === "all" ? t("admin:all", "All") : getStatusLabel(s)}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 skeleton rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <FileText size={40} className="mx-auto mb-3 opacity-20" />
            <p>{t("admin:noPostsFound", "No posts found. Create your first post!")}</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                {[
                  t("admin:title", "Title"),
                  t("admin:category", "Category"),
                  t("admin:author", "Author"),
                  t("admin:status", "Status"),
                  t("admin:date", "Date"),
                  t("admin:actions", "Actions"),
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left font-semibold text-muted-foreground p-4 text-xs"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-secondary/20 transition-colors"
                >
                  <td className="p-4">
                    <p className="font-medium text-foreground truncate max-w-[200px]">
                      {p.title}
                    </p>
                    {p.excerpt && (
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {p.excerpt}
                      </p>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full capitalize">
                      {getCategoryLabel(p.category)}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground text-xs">
                    {p.author || "—"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${statusBadge(p.status)}`}
                    >
                      {getStatusLabel(p.status)}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground text-xs">
                    {p.published_at
                      ? format(new Date(p.published_at), "MMM d, yyyy")
                      : p.created_date
                        ? format(new Date(p.created_date), "MMM d")
                        : "—"}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditing(p);
                          setShowModal(true);
                        }}
                        className="p-1.5 hover:bg-secondary rounded text-muted-foreground hover:text-foreground"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <BlogPostModal
          post={editing}
          onClose={() => {
            setShowModal(false);
            setEditing(null);
          }}
          onSaved={() => {
            setShowModal(false);
            setEditing(null);
            toast.success(editing ? t("admin:postUpdated", "Post updated!") : t("admin:postCreated", "Post created!"));
            load();
          }}
        />
      )}
      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title={t("admin:deletePost", "Delete Post")}
        message={t("admin:deletePostConfirm", "Are you sure you want to delete this blog post?")}
      />
    </div>
  );
}

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generatePosts = (count = 25) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    title: `Blog Post ${i + 1}`,
    excerpt: "This is a sample excerpt for blog post content preview.",
    category: randomFrom(["news", "update", "event", "announcement"]),
    author: randomFrom(["Admin", "Editor", "Teacher"]),
    status: randomFrom(["published", "draft", "scheduled"]),
    created_date: new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 90,
    ),
    published_at: Math.random() > 0.3 ? new Date() : null,
    views: Math.floor(Math.random() * 300) + 10,
  }));
