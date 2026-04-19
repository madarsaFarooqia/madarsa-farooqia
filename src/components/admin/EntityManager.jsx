// import { useState, useEffect } from 'react';
// import { getEntityService } from '@/services';
// import { Loader2, Plus, Pencil, Trash2, X, Check, Search } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { useToast } from '@/components/ui/use-toast';
// import { format } from 'date-fns';

// export default function EntityManager({ entityName, title, fields, displayField = 'name', sortField = '-created_date' }) {
//   const { toast } = useToast();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({});
//   const [saving, setSaving] = useState(false);

//   const entity = getEntityService(entityName);

//   const loadItems = () => {
//     setLoading(true);
//     entity.list(sortField, 500).then(setItems).finally(() => setLoading(false));
//   };

//   useEffect(() => { loadItems(); }, [entityName]);

//   const openCreate = () => {
//     setEditing(null);
//     const defaults = {};
//     fields.forEach(f => { if (f.default !== undefined) defaults[f.name] = f.default; });
//     setForm(defaults);
//     setDialogOpen(true);
//   };

//   const openEdit = (item) => {
//     setEditing(item);
//     setForm({ ...item });
//     setDialogOpen(true);
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     if (editing) {
//       await entity.update(editing.id, form);
//       toast({ title: `${title} updated` });
//     } else {
//       await entity.create(form);
//       toast({ title: `${title} created` });
//     }
//     setSaving(false);
//     setDialogOpen(false);
//     loadItems();
//   };

//   const handleDelete = async (item) => {
//     if (!window.confirm(`Delete this ${title.toLowerCase()}?`)) return;
//     await entity.delete(item.id);
//     toast({ title: `${title} deleted` });
//     loadItems();
//   };

//   const filtered = items.filter(item => {
//     const val = item[displayField] || '';
//     return val.toLowerCase().includes(search.toLowerCase());
//   });

//   const renderField = (field) => {
//     const value = form[field.name] ?? '';
//     const onChange = (v) => setForm({ ...form, [field.name]: v });

//     if (field.type === 'select') {
//       return (
//         <Select value={value} onValueChange={onChange}>
//           <SelectTrigger className="font-jakarta"><SelectValue placeholder="Select..." /></SelectTrigger>
//           <SelectContent>
//             {field.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
//           </SelectContent>
//         </Select>
//       );
//     }
//     if (field.type === 'textarea') {
//       return <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={field.placeholder} className="font-jakarta h-24" />;
//     }
//     if (field.type === 'number') {
//       return <Input type="number" value={value} onChange={e => onChange(parseFloat(e.target.value) || 0)} placeholder={field.placeholder} className="font-jakarta" />;
//     }
//     if (field.type === 'boolean') {
//       return <Switch checked={!!value} onCheckedChange={onChange} />;
//     }
//     if (field.type === 'date') {
//       return <Input type="date" value={value} onChange={e => onChange(e.target.value)} className="font-jakarta" />;
//     }
//     return <Input value={value} onChange={e => onChange(e.target.value)} placeholder={field.placeholder} className="font-jakarta" />;
//   };

//   return (
//     <div>
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="font-baskerville font-bold text-3xl text-primary">{title}s</h1>
//           <p className="font-jakarta text-muted-foreground text-sm mt-1">Manage all {title.toLowerCase()} records</p>
//         </div>
//         <Button onClick={openCreate} className="flex items-center gap-2">
//           <Plus size={16} /> Add {title}
//         </Button>
//       </div>

//       <div className="bg-card border border-border rounded-xl overflow-hidden">
//         <div className="p-4 border-b border-border">
//           <div className="relative">
//             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//             <Input
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               placeholder={`Search ${title.toLowerCase()}s...`}
//               className="pl-9 font-jakarta"
//             />
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center py-16">
//             <Loader2 size={24} className="animate-spin text-primary" />
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="text-center py-16">
//             <p className="font-jakarta text-muted-foreground">No {title.toLowerCase()}s found.</p>
//           </div>
//         ) : (
//           <div className="divide-y divide-border">
//             {filtered.map(item => (
//               <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
//                 <div className="flex-1 min-w-0">
//                   <p className="font-jakarta font-medium text-foreground truncate">{item[displayField]}</p>
//                   <p className="text-xs font-jakarta text-muted-foreground">
//                     Created {item.created_date ? format(new Date(item.created_date), 'PPP') : '—'}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Button size="sm" variant="ghost" onClick={() => openEdit(item)}>
//                     <Pencil size={14} />
//                   </Button>
//                   <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item)}>
//                     <Trash2 size={14} />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Dialog */}
//       <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//         <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="font-baskerville">{editing ? `Edit ${title}` : `New ${title}`}</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 mt-4">
//             {fields.map(field => (
//               <div key={field.name}>
//                 <Label className="text-sm font-jakarta font-semibold mb-2 block">{field.label}</Label>
//                 {renderField(field)}
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
//             <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
//             <Button onClick={handleSave} disabled={saving}>
//               {saving ? <Loader2 size={16} className="animate-spin mr-2" /> : <Check size={16} className="mr-2" />}
//               {editing ? 'Update' : 'Create'}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Loader2, Heart, TrendingUp, Users2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../shared/SectionHeader";
import CampaignCard from "../campaigns/CampaignCard";
import { donateService } from "@/mocks/donateService";

const CATEGORIES = [
  "All",
  "Infrastructure",
  "Scholarships",
  "Teacher Salaries",
  "Operations",
  "Ramadan",
  "General",
];

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // useEffect(() => {
  //   Promise.all([
  //     base44.entities.Campaign.list("-created_date", 100),
  //     base44.entities.Donation.filter(
  //       { status: "completed" },
  //       "-created_date",
  //       100
  //     ),
  //   ])
  //     .then(([c, d]) => {
  //       setCampaigns(c);
  //       setDonations(d);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      donateService.Campaign.list(),
      donateService.Donation.filter({ status: "completed" }),
    ])
      .then(([c, d]) => {
        setCampaigns(c);
        setDonations(d);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalRaised = donations.reduce((s, d) => s + (d.amount || 0), 0);
  const totalDonors = new Set(
    donations.map((d) => d.donor_email || d.donor_name),
  ).size;

  const filtered =
    activeCategory === "All"
      ? campaigns
      : campaigns.filter((c) => c.category === activeCategory);

  return (
    <div className="bg-background min-h-screen">
      <div className="pt-28 pb-16 px-4 bg-primary ghost-geometry relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs font-jakarta font-semibold uppercase tracking-[0.2em] mb-4 text-primary-foreground/60">
            <span className="w-6 h-px bg-accent opacity-60"></span>Fundraising
            <span className="w-6 h-px bg-accent opacity-60"></span>
          </span>
          <h1 className="font-baskerville font-bold text-5xl md:text-6xl text-white mb-4">
            Our Campaigns
          </h1>
          <p className="font-jakarta text-primary-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Every contribution fuels the light of education. See our active
            campaigns and track where your support goes.
          </p>
        </div>
      </div>

      {/* Why Donate */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Transparency"
            title="Why Your Donations Matter"
            description="Every dirham and dollar directly supports the growth of our students and institution."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Infrastructure",
                desc: "Building classrooms, libraries, and facilities for a growing student body.",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: Heart,
                title: "Student Support",
                desc: "Food, accommodation, scholarships, and basic needs for underprivileged students.",
                color: "bg-accent/10 text-accent",
              },
              {
                icon: Users2,
                title: "Operations",
                desc: "Teacher salaries, utilities, maintenance, and daily running costs of the madrasa.",
                color: "bg-primary/5 text-primary",
              },
            ].map(({ icon: IconComp, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${color}`}
                >
                  <IconComp size={22} />
                </div>
                <h3 className="font-baskerville font-bold text-xl text-primary mb-2">
                  {title}
                </h3>
                <p className="font-jakarta text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/50 rounded-2xl p-8 text-center">
              <p className="font-baskerville font-bold text-4xl text-primary">
                ${totalRaised.toLocaleString()}
              </p>
              <p className="font-jakarta text-sm text-muted-foreground mt-1">
                Total Funds Raised
              </p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 text-center">
              <p className="font-baskerville font-bold text-4xl text-primary">
                {campaigns.length}
              </p>
              <p className="font-jakarta text-sm text-muted-foreground mt-1">
                Active Campaigns
              </p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 text-center">
              <p className="font-baskerville font-bold text-4xl text-primary">
                {totalDonors}
              </p>
              <p className="font-jakarta text-sm text-muted-foreground mt-1">
                Generous Donors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-jakarta font-medium transition-all border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-baskerville text-3xl text-primary mb-4">
                No Campaigns Found
              </p>
              <p className="font-jakarta text-muted-foreground">
                Campaigns will appear here once created by the admin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((c, i) => (
                <CampaignCard key={c.id} campaign={c} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
