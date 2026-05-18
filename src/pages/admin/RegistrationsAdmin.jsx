import { useState, useEffect } from 'react';
import { registrationService } from '../../services';
import { Loader2, Search, Check, X, Eye } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { useToast } from '../../components/ui/use-toast';
import { format } from 'date-fns';

export default function RegistrationsAdmin() {
  const { toast } = useToast();
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const loadData = () => {
    setLoading(true);
    registrationService.list('-created_date', 500)
      .then(setRegs)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const filtered = regs.filter(r =>
    (r.student_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.parent_email || '').toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = async (reg, status) => {
    await registrationService.update(reg.id, { status });
    toast({ title: `Registration ${status}` });
    loadData();
    setSelected(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-baskerville font-bold text-3xl text-primary">Registrations</h1>
          <p className="font-jakarta text-muted-foreground text-sm mt-1">Review and approve student registrations</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-jakarta font-medium bg-muted text-muted-foreground">
            Pending: {regs.filter(r => r.status === 'pending').length}
          </span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search registrations..."
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
            <p className="font-jakarta text-muted-foreground">No registrations found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Student</th>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Course</th>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Guardian</th>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Status</th>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Date</th>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(r => (
                  <tr key={r.id} className="hover:bg-muted/30">
                    <td className="p-4">
                      <p className="font-jakarta font-medium text-foreground">{r.student_name}</p>
                      <p className="text-xs font-jakarta text-muted-foreground">{r.gender} · {r.date_of_birth}</p>
                    </td>
                    <td className="p-4 font-jakarta text-foreground">{r.course}</td>
                    <td className="p-4">
                      <p className="font-jakarta text-foreground">{r.parent_name}</p>
                      <p className="text-xs font-jakarta text-muted-foreground">{r.parent_email}</p>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-jakarta font-medium ${
                        r.status === 'approved' ? 'bg-primary/10 text-primary' :
                        r.status === 'rejected' ? 'bg-destructive/10 text-destructive' :
                        r.status === 'waitlisted' ? 'bg-accent/10 text-accent' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-4 font-jakarta text-muted-foreground">
                      {r.created_date ? format(new Date(r.created_date), 'PPP') : '—'}
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="ghost" onClick={() => setSelected(r)}>
                        <Eye size={14} className="mr-1" /> View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-baskerville">Registration Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Student Name', value: selected.student_name },
                  { label: 'Date of Birth', value: selected.date_of_birth },
                  { label: 'Gender', value: selected.gender },
                  { label: 'Course', value: selected.course },
                  { label: 'Guardian', value: selected.parent_name },
                  { label: 'Email', value: selected.parent_email },
                  { label: 'Phone', value: selected.parent_phone },
                  { label: 'Status', value: selected.status },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-muted/60 rounded-xl p-4">
                    <p className="text-xs font-jakarta text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                    <p className="font-jakarta text-sm text-foreground font-medium">{value || '—'}</p>
                  </div>
                ))}
              </div>
              {selected.address && (
                <div className="bg-muted/60 rounded-xl p-4">
                  <p className="text-xs font-jakarta text-muted-foreground uppercase tracking-wider mb-1">Address</p>
                  <p className="font-jakarta text-sm text-foreground">{selected.address}</p>
                </div>
              )}
              {selected.previous_education && (
                <div className="bg-muted/60 rounded-xl p-4">
                  <p className="text-xs font-jakarta text-muted-foreground uppercase tracking-wider mb-1">Previous Education</p>
                  <p className="font-jakarta text-sm text-foreground">{selected.previous_education}</p>
                </div>
              )}
              {selected.special_needs && (
                <div className="bg-muted/60 rounded-xl p-4">
                  <p className="text-xs font-jakarta text-muted-foreground uppercase tracking-wider mb-1">Special Needs</p>
                  <p className="font-jakarta text-sm text-foreground">{selected.special_needs}</p>
                </div>
              )}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                <Button variant="outline" className="text-destructive" onClick={() => updateStatus(selected, 'rejected')}>
                  <X size={14} className="mr-1" /> Reject
                </Button>
                <Button variant="outline" onClick={() => updateStatus(selected, 'waitlisted')}>
                  Waitlist
                </Button>
                <Button onClick={() => updateStatus(selected, 'approved')}>
                  <Check size={14} className="mr-1" /> Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}