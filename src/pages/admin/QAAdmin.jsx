import { useState, useEffect } from "react";
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  Search,
  Reply,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function QAAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [saving, setSaving] = useState(false);

  // const load = () => {
  //   setLoading(true);
  //   base44.entities.ContactMessage.list('-created_date', 200)
  //     .then(setMessages).catch(() => setMessages([])).finally(() => setLoading(false));
  // };

  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setMessages(fakeMessages);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = messages.filter((m) => {
    const matchSearch =
      !search ||
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const markStatus = async (id, status) => {
    // await base44.entities.ContactMessage.update(id, { status });
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m)),
    );
    load();
  };

  // const handleReply = async (msg) => {
  //   if (!replyText.trim()) return;
  //   setSaving(true);
  //   await base44.entities.ContactMessage.update(msg.id, {
  //     status: "replied",
  //     admin_reply: replyText,
  //     replied_at: new Date().toISOString(),
  //   });
  //   setSaving(false);
  //   setReplyingTo(null);
  //   setReplyText("");
  //   load();
  // };
  const handleReply = (msg) => {
    if (!replyText.trim()) return;

    setSaving(true);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msg.id
            ? {
                ...m,
                status: "replied",
                admin_reply: replyText,
                replied_at: new Date().toISOString(),
              }
            : m,
        ),
      );

      setSaving(false);
      setReplyingTo(null);
      setReplyText("");
    }, 400);
  };

  // const handleDelete = async (id) => {
  //   if (!confirm("Delete this message?")) return;
  //   await base44.entities.ContactMessage.delete(id);
  //   load();
  // };
  const handleDelete = (id) => {
    if (!window.confirm("Delete this message?")) return;

    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const statusColors = {
    new: "bg-foreground text-background",
    read: "bg-secondary text-muted-foreground",
    replied: "bg-accent/20 text-accent",
    archived: "bg-muted text-muted-foreground",
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-playfair font-bold text-3xl text-foreground">
            Messages & Q&A
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Public enquiries and contact messages
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="px-3 py-1.5 bg-foreground text-background rounded-lg font-medium">
            {messages.filter((m) => m.status === "new").length} New
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        {["all", "new", "read", "replied", "archived"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:bg-muted"}`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Messages */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 skeleton rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground bg-card border border-border rounded-xl">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-20" />
          <p>No messages found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[m.status] || statusColors.new}`}
                    >
                      {m.status}
                    </span>
                    <span className="font-semibold text-foreground">
                      {m.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {m.email}
                    </span>
                    {m.phone && (
                      <span className="text-xs text-muted-foreground">
                        {m.phone}
                      </span>
                    )}
                  </div>
                  {m.subject && (
                    <p className="text-sm font-medium text-foreground">
                      {m.subject}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  {m.status === "new" && (
                    <button
                      onClick={() => markStatus(m.id, "read")}
                      className="p-1.5 hover:bg-secondary rounded text-muted-foreground hover:text-foreground"
                      title="Mark as Read"
                    >
                      <CheckCircle2 size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setReplyingTo(m.id === replyingTo ? null : m.id);
                      setReplyText("");
                    }}
                    className="p-1.5 hover:bg-secondary rounded text-muted-foreground hover:text-foreground"
                    title="Reply"
                  >
                    <Reply size={14} />
                  </button>
                  <button
                    onClick={() => markStatus(m.id, "archived")}
                    className="p-1.5 hover:bg-secondary rounded text-muted-foreground"
                    title="Archive"
                  >
                    <Clock size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-2">{m.message}</p>

              {m.admin_reply && (
                <div className="mt-3 p-3 bg-secondary/50 rounded-lg border-l-2 border-foreground">
                  <p className="text-xs font-semibold text-foreground mb-1">
                    Admin Reply:
                  </p>
                  <p className="text-sm text-foreground">{m.admin_reply}</p>
                  {m.replied_at && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(m.replied_at), "MMM d, yyyy HH:mm")}
                    </p>
                  )}
                </div>
              )}

              {replyingTo === m.id && (
                <div className="mt-3 space-y-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm resize-none h-24 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Type your reply..."
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleReply(m)}
                      disabled={saving}
                    >
                      {saving ? "Sending..." : "Send Reply"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-3">
                {m.created_date ? format(new Date(m.created_date), "PPPp") : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const fakeMessages = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: ["Ahmed Khan", "Ali Raza", "John Doe", "Sara Ahmed"][i % 4],
  email: `user${i + 1}@mail.com`,
  phone: i % 2 === 0 ? "+92 300 1234567" : "",
  subject: ["Admission Query", "Donation", "Course Info", "General Help"][
    i % 4
  ],
  message: "Sample message for UI testing.",
  status: ["new", "read", "replied", "archived"][i % 4],
  admin_reply: "",
  replied_at: new Date().toISOString(),
  created_date: new Date(Date.now() - i * 86400000).toISOString(),
}));
