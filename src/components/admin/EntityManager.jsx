import { useState, useEffect } from 'react';
import { getEntityService } from '@/services';
import { Loader2, Plus, Pencil, Trash2, X, Check, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

export default function EntityManager({ entityName, title, fields, displayField = 'name', sortField = '-created_date' }) {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const entity = getEntityService(entityName);

  const loadItems = () => {
    setLoading(true);
    entity.list(sortField, 500).then(setItems).finally(() => setLoading(false));
  };

  useEffect(() => { loadItems(); }, [entityName]);

  const openCreate = () => {
    setEditing(null);
    const defaults = {};
    fields.forEach(f => { if (f.default !== undefined) defaults[f.name] = f.default; });
    setForm(defaults);
    setDialogOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editing) {
      await entity.update(editing.id, form);
      toast({ title: `${title} updated` });
    } else {
      await entity.create(form);
      toast({ title: `${title} created` });
    }
    setSaving(false);
    setDialogOpen(false);
    loadItems();
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete this ${title.toLowerCase()}?`)) return;
    await entity.delete(item.id);
    toast({ title: `${title} deleted` });
    loadItems();
  };

  const filtered = items.filter(item => {
    const val = item[displayField] || '';
    return val.toLowerCase().includes(search.toLowerCase());
  });

  const renderField = (field) => {
    const value = form[field.name] ?? '';
    const onChange = (v) => setForm({ ...form, [field.name]: v });

    if (field.type === 'select') {
      return (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="font-jakarta"><SelectValue placeholder="Select..." /></SelectTrigger>
          <SelectContent>
            {field.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
          </SelectContent>
        </Select>
      );
    }
    if (field.type === 'textarea') {
      return <Textarea value={value} onChange={e => onChange(e.target.value)} placeholder={field.placeholder} className="font-jakarta h-24" />;
    }
    if (field.type === 'number') {
      return <Input type="number" value={value} onChange={e => onChange(parseFloat(e.target.value) || 0)} placeholder={field.placeholder} className="font-jakarta" />;
    }
    if (field.type === 'boolean') {
      return <Switch checked={!!value} onCheckedChange={onChange} />;
    }
    if (field.type === 'date') {
      return <Input type="date" value={value} onChange={e => onChange(e.target.value)} className="font-jakarta" />;
    }
    return <Input value={value} onChange={e => onChange(e.target.value)} placeholder={field.placeholder} className="font-jakarta" />;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-baskerville font-bold text-3xl text-primary">{title}s</h1>
          <p className="font-jakarta text-muted-foreground text-sm mt-1">Manage all {title.toLowerCase()} records</p>
        </div>
        <Button onClick={openCreate} className="flex items-center gap-2">
          <Plus size={16} /> Add {title}
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}s...`}
              className="pl-9 font-jakarta"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-jakarta text-muted-foreground">No {title.toLowerCase()}s found.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map(item => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-jakarta font-medium text-foreground truncate">{item[displayField]}</p>
                  <p className="text-xs font-jakarta text-muted-foreground">
                    Created {item.created_date ? format(new Date(item.created_date), 'PPP') : '—'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => openEdit(item)}>
                    <Pencil size={14} />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-baskerville">{editing ? `Edit ${title}` : `New ${title}`}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {fields.map(field => (
              <div key={field.name}>
                <Label className="text-sm font-jakarta font-semibold mb-2 block">{field.label}</Label>
                {renderField(field)}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 size={16} className="animate-spin mr-2" /> : <Check size={16} className="mr-2" />}
              {editing ? 'Update' : 'Create'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}