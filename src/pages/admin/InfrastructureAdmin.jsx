import { useState, useEffect } from "react";
import { Building2, Plus, Edit2, Trash2, Search, Download } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { format } from "date-fns";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

const STATUS_OPTS = ["planning", "in_progress", "completed", "on_hold"];

function InfraModal({ project, onClose, onSaved }) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [form, setForm] = useState({
    name: project?.name || "",
    description: project?.description || "",
    budget: project?.budget || "",
    spent: project?.spent || 0,
    progress: project?.progress || 0,
    status: project?.status || "planning",
    start_date: project?.start_date || "",
    expected_end: project?.expected_end || "",
    contractor: project?.contractor || "",
    image_url: project?.image_url || "",
    notes: project?.notes || "",
  });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.name) return alert(t("admin:projectNameRequired", "Project name required."));

    setSaving(true);

    const data = {
      ...form,
      budget: Number(form.budget),
      spent: Number(form.spent),
      progress: Number(form.progress),
    };

    // simulate API delay
    setTimeout(() => {
      setSaving(false);
      onSaved(data, project?.id); // send data to parent
    }, 400);
  };

  const getStatusLabel = (s) => {
    switch (s) {
      case "planning": return t("admin:statusPlanning", "Planning");
      case "in_progress": return t("admin:statusInProgress", "In Progress");
      case "completed": return t("admin:statusCompleted", "Completed");
      case "on_hold": return t("admin:statusOnHold", "On Hold");
      default: return s;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-playfair font-bold text-xl text-foreground">
            {project ? t("admin:editProject", "Edit Project") : t("admin:newInfrastructureProject", "New Infrastructure Project")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg text-muted-foreground"
          >
            <Building2 size={18} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <Label className="mb-1.5 block text-sm font-medium">
              {t("admin:projectName", "Project Name *")}
            </Label>
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder={t("admin:egClassroomBlock", "e.g. New Classroom Block")}
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">
              {t("admin:description", "Description")}
            </Label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full border border-input bg-transparent rounded-md px-3 py-2 text-sm resize-none h-20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                {t("admin:totalBudget", "Total Budget")}
              </Label>
              <Input
                type="number"
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
                placeholder="500000"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                {t("admin:amountSpent", "Amount Spent")}
              </Label>
              <Input
                type="number"
                value={form.spent}
                onChange={(e) => set("spent", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                {t("admin:progressPercent", "Progress (%)")}
              </Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={form.progress}
                onChange={(e) => set("progress", e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">{t("admin:status", "Status")}</Label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="w-full border border-input bg-card rounded-md px-3 py-2 text-sm"
              >
                {STATUS_OPTS.map((s) => (
                  <option key={s} value={s}>
                    {getStatusLabel(s)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                {t("admin:fromDate", "Start Date")}
              </Label>
              <Input
                type="date"
                value={form.start_date}
                onChange={(e) => set("start_date", e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                {t("admin:expectedCompletion", "Expected Completion")}
              </Label>
              <Input
                type="date"
                value={form.expected_end}
                onChange={(e) => set("expected_end", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">
              {t("admin:contractorVendor", "Contractor / Vendor")}
            </Label>
            <Input
              value={form.contractor}
              onChange={(e) => set("contractor", e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">
              {t("admin:imageUrl", "Image URL")}
            </Label>
            <Input
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">{t("admin:notes", "Notes")}</Label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              className="w-full border border-input bg-transparent rounded-md px-3 py-2 text-sm resize-none h-20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            {t("admin:cancel", "Cancel")}
          </Button>
          <Button onClick={handleSave} disabled={saving} className="flex-1">
            {saving ? t("admin:saving", "Saving...") : project ? t("admin:update", "Update") : t("admin:createProject", "Create Project")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function InfrastructureAdmin() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setProjects(fakeProjects);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = projects.filter(
    (p) => !search || p.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    if (!window.confirm(t("admin:deleteProjectConfirm", "Delete this project?"))) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    load();
  };

  const totalBudget = projects.reduce((s, p) => s + (p.budget || 0), 0);
  const totalSpent = projects.reduce((s, p) => s + (p.spent || 0), 0);

  const statusColors = {
    planning: "bg-secondary text-muted-foreground",
    in_progress: "bg-accent/20 text-accent",
    completed: "bg-foreground text-background",
    on_hold: "bg-destructive/10 text-destructive",
  };

  const getStatusLabel = (s) => {
    switch (s) {
      case "planning": return t("admin:statusPlanning", "Planning");
      case "in_progress": return t("admin:statusInProgress", "In Progress");
      case "completed": return t("admin:statusCompleted", "Completed");
      case "on_hold": return t("admin:statusOnHold", "On Hold");
      default: return s;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-playfair font-bold text-3xl text-foreground">
            {t("admin:infrastructureProjects", "Infrastructure Projects")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t("admin:trackBuildingRenovation", "Track building, renovation & development projects")}
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditing(null);
            setShowModal(true);
          }}
        >
          <Plus size={14} className="mr-2" /> {t("admin:newProject", "New Project")}
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: t("admin:totalProjects", "Total Projects"), value: projects.length },
          {
            label: t("admin:statusInProgress", "In Progress"),
            value: projects.filter((p) => p.status === "in_progress").length,
          },
          { label: t("admin:totalBudget", "Total Budget"), value: `$${totalBudget.toLocaleString()}` },
          { label: t("admin:totalSpent", "Total Spent"), value: `$${totalSpent.toLocaleString()}` },
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

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder={t("admin:searchProjects", "Search projects...")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 max-w-sm"
        />
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 skeleton rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status] || statusColors.planning}`}
                    >
                      {getStatusLabel(p.status)}
                    </span>
                  </div>
                  <h3 className="font-playfair font-bold text-foreground">
                    {p.name}
                  </h3>
                  {p.contractor && (
                    <p className="text-xs text-muted-foreground">
                      {t("admin:contractor", "Contractor")}: {p.contractor}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setShowModal(true);
                    }}
                    className="p-1.5 hover:bg-secondary rounded"
                  >
                    <Edit2 size={13} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1.5 hover:bg-destructive/10 rounded"
                  >
                    <Trash2 size={13} className="text-destructive" />
                  </button>
                </div>
              </div>
              {p.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {p.description}
                </p>
              )}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">{t("admin:progress", "Progress")}</span>
                  <span className="font-medium text-foreground">
                    {p.progress || 0}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground rounded-full"
                    style={{ width: `${p.progress || 0}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {t("admin:totalBudget", "Budget")}:{" "}
                  <strong className="text-foreground">
                    ${(p.budget || 0).toLocaleString()}
                  </strong>
                </span>
                <span>
                  {t("admin:totalSpent", "Spent")}:{" "}
                  <strong className="text-foreground">
                    ${(p.spent || 0).toLocaleString()}
                  </strong>
                </span>
              </div>
              {(p.start_date || p.expected_end) && (
                <div className="text-xs text-muted-foreground mt-2">
                  {p.start_date &&
                    `${t("admin:fromDate", "Start")}: ${format(new Date(p.start_date), "MMM d, yyyy")}`}
                  {p.start_date && p.expected_end && " → "}
                  {p.expected_end &&
                    `${t("admin:expectedCompletion", "End")}: ${format(new Date(p.expected_end), "MMM d, yyyy")}`}
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-16 text-muted-foreground bg-card border border-border rounded-xl">
              <Building2 size={40} className="mx-auto mb-3 opacity-20" />
              <p>{t("admin:noProjectsYet", "No projects yet. Add your first project!")}</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <InfraModal
          project={editing}
          onClose={() => {
            setShowModal(false);
            setEditing(null);
          }}
          onSaved={(data, id) => {
            setShowModal(false);
            setEditing(null);

            setProjects((prev) => {
              if (id) {
                return prev.map((p) => (p.id === id ? { ...p, ...data } : p));
              }
              return [{ ...data, id: Date.now() }, ...prev];
            });
          }}
        />
      )}
    </div>
  );
}

const fakeProjects = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: [
    "New Classroom Block",
    "Library Renovation",
    "Mosque Expansion",
    "Computer Lab Setup",
    "Dormitory Upgrade",
    "Water Supply System",
    "Sports Ground",
    "Admin Office Build",
  ][i],
  description: "Sample infrastructure project for testing UI rendering.",
  budget: 50000 + i * 15000,
  spent: Math.floor(Math.random() * 40000),
  progress: Math.floor(Math.random() * 100),
  status: ["planning", "in_progress", "completed", "on_hold"][i % 4],
  start_date: new Date(Date.now() - i * 86400000 * 10).toISOString(),
  expected_end: new Date(Date.now() + i * 86400000 * 15).toISOString(),
  contractor: ["ABC Builders", "XYZ Constructions", "Al Noor Works"][i % 3],
  image_url: "",
  notes: "Auto generated fake project",
}));
