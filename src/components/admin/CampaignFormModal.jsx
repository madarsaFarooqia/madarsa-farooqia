import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCampaignMutations } from "../../hooks/api";

const CATEGORIES = [
  "building",
  "education",
  "infrastructure",
  "equipment",
  "scholarship",
  "food_program",
  "orphan_care",
  "general",
];
const PRIORITIES = ["low", "medium", "high", "urgent"];
const STATUSES = ["active", "paused", "completed", "cancelled"];

export default function CampaignFormModal({ campaign, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: campaign?.title || "",
    description: campaign?.description || "",
    goal_amount: campaign?.goal_amount || "",
    collected_amount: campaign?.collected_amount || 0,
    category: campaign?.category || "general",
    priority: campaign?.priority || "medium",
    status: campaign?.status || "active",
    image_url: campaign?.image_url || "",
    start_date: campaign?.start_date || "",
    end_date: campaign?.end_date || "",
    currency: campaign?.currency || "USD",
  });
  const { create, update } = useCampaignMutations();

  const handleSave = async () => {
    if (!form.title || !form.goal_amount)
      return alert("Title and goal amount are required.");
    const payload = { ...form, goal_amount: Number(form.goal_amount) };
    if (campaign?.id) {
      await update.mutateAsync({ id: campaign.id, payload });
    } else {
      await create.mutateAsync({ ...payload, donors_count: 0 });
    }
    onSaved();
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-playfair font-bold text-xl text-foreground">
            {campaign ? "Edit Campaign" : "New Campaign"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <Label className="mb-1.5 block text-sm font-medium">
              Campaign Title *
            </Label>
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. New Classroom Construction"
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">
              Description
            </Label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full border border-input bg-transparent rounded-md px-3 py-2 text-sm resize-none h-24 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Detailed campaign description..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                Goal Amount *
              </Label>
              <Input
                type="number"
                value={form.goal_amount}
                onChange={(e) => set("goal_amount", e.target.value)}
                placeholder="50000"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                Collected Amount
              </Label>
              <Input
                type="number"
                value={form.collected_amount}
                onChange={(e) =>
                  set("collected_amount", Number(e.target.value))
                }
                placeholder="0"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                Category
              </Label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full border border-input bg-card rounded-md px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                Priority
              </Label>
              <select
                value={form.priority}
                onChange={(e) => set("priority", e.target.value)}
                className="w-full border border-input bg-card rounded-md px-3 py-2 text-sm"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">Status</Label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="w-full border border-input bg-card rounded-md px-3 py-2 text-sm"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                Start Date
              </Label>
              <Input
                type="date"
                value={form.start_date}
                onChange={(e) => set("start_date", e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                End Date
              </Label>
              <Input
                type="date"
                value={form.end_date}
                onChange={(e) => set("end_date", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">
              Image URL
            </Label>
            <Input
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={create.isPending || update.isPending}
            className="flex-1"
          >
            {create.isPending || update.isPending
              ? "Saving..."
              : campaign
                ? "Update Campaign"
                : "Create Campaign"}
          </Button>
        </div>
      </div>
    </div>
  );
}
