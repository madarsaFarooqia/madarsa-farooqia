import { useState, useEffect } from 'react';
import { base44 } from '../../api/base44Client';
import { Loader2, Search, Download, DollarSign } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { format } from 'date-fns';

export default function DonationsAdmin() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    base44.entities.Donation.list('-created_date', 500)
      .then(setDonations)
      .finally(() => setLoading(false));
  }, []);

  const filtered = donations.filter(d =>
    (d.donor_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (d.campaign_name || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalRaised = filtered.filter(d => d.status === 'completed').reduce((s, d) => s + (d.amount || 0), 0);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-baskerville font-bold text-3xl text-primary">Donations</h1>
          <p className="font-jakarta text-muted-foreground text-sm mt-1">View and track all donations</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 bg-accent/10 rounded-xl">
          <DollarSign size={20} className="text-accent" />
          <div>
            <p className="text-xs font-jakarta text-muted-foreground">Total Raised</p>
            <p className="font-baskerville font-bold text-xl text-primary">${totalRaised.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search donations..."
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
            <p className="font-jakarta text-muted-foreground">No donations found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Donor</th>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Amount</th>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Campaign</th>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Type</th>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Status</th>
                  <th className="text-left font-jakarta font-semibold text-muted-foreground p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(d => (
                  <tr key={d.id} className="hover:bg-muted/30">
                    <td className="p-4">
                      <p className="font-jakarta font-medium text-foreground">{d.is_anonymous ? 'Anonymous' : d.donor_name}</p>
                      <p className="text-xs font-jakarta text-muted-foreground">{d.donor_email || '—'}</p>
                    </td>
                    <td className="p-4 font-baskerville font-bold text-primary">${d.amount}</td>
                    <td className="p-4 font-jakarta text-muted-foreground">{d.campaign_name || 'General'}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-jakarta font-medium ${
                        d.type === 'monthly' ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                      }`}>
                        {d.type || 'one-time'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-jakarta font-medium ${
                        d.status === 'completed' ? 'bg-primary/10 text-primary' :
                        d.status === 'failed' ? 'bg-destructive/10 text-destructive' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4 font-jakarta text-muted-foreground">
                      {d.created_date ? format(new Date(d.created_date), 'PPP') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}