import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Eye,
  FileText,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import BlogPostModal from "@/components/admin/BlogPostModal";

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  // const load = () => {
  //   setLoading(true);
  //   base44.entities.BlogPost.list('-created_date', 200)
  //     .then(setPosts).catch(() => setPosts([])).finally(() => setLoading(false));
  // };
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

  const handleDelete = async (id) => {
    // if (!confirm("Delete this post?")) return;
    const ok = window.confirm("Delete this post?");
    if (!ok) return;
    // await base44.entities.BlogPost.delete(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    load();
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
            Blog & News
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage madrasa news, updates, and posts
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditing(null);
            setShowModal(true);
          }}
        >
          <Plus size={14} className="mr-2" /> New Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Posts", value: posts.length },
          {
            label: "Published",
            value: posts.filter((p) => p.status === "published").length,
          },
          {
            label: "Drafts",
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
            placeholder="Search posts..."
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
            {s.charAt(0).toUpperCase() + s.slice(1)}
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
            <p>No posts found. Create your first post!</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                {[
                  "Title",
                  "Category",
                  "Author",
                  "Status",
                  "Date",
                  "Actions",
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
                      {p.category || "general"}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground text-xs">
                    {p.author || "—"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${statusBadge(p.status)}`}
                    >
                      {p.status}
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
                        onClick={() => handleDelete(p.id)}
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
            load();
          }}
        />
      )}
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
  }));
