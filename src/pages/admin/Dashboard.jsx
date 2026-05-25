import {
  useTeachersQuery,
  useStudentsQuery,
  useEventsQuery,
  useCampaignsQuery,
  useAdminDonationsQuery,
  useRegistrationsQuery,
} from '../../hooks/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Calendar, Heart, DollarSign, FileText, TrendingUp, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { data: teachers = [], isLoading: tLoading } = useTeachersQuery('-created_date', 500);
  const { data: students = [], isLoading: sLoading } = useStudentsQuery('-created_date', 500);
  const { data: events = [], isLoading: eLoading } = useEventsQuery('-created_date', 500);
  const { data: campaigns = [], isLoading: cLoading } = useCampaignsQuery('-created_date', 500);
  const { data: donations = [], isLoading: dLoading } = useAdminDonationsQuery('-created_date', 500);
  const { data: registrations = [], isLoading: rLoading } = useRegistrationsQuery('-created_date', 10);

  const loading = tLoading || sLoading || eLoading || cLoading || dLoading || rLoading;

  const totalRaised = donations
    .filter((x) => String(x.status).toLowerCase() === 'completed')
    .reduce((sum, x) => sum + (x.amount || 0), 0);

  const stats = {
    teachers: teachers.length,
    students: students.length,
    events: events.length,
    campaigns: campaigns.length,
    donations: donations.length,
    raised: totalRaised,
    registrations: registrations.length,
  };

  const recentDonations = donations.slice(0, 5);
  const recentRegs = registrations.slice(0, 5);

  const statCards = [
    { label: 'Teachers', value: stats.teachers, icon: Users, color: 'bg-foreground text-background', href: '/admin/teachers' },
    { label: 'Students', value: stats.students, icon: GraduationCap, color: 'bg-secondary text-foreground', href: '/admin/students' },
    { label: 'Events', value: stats.events, icon: Calendar, color: 'bg-secondary text-foreground', href: '/admin/events' },
    { label: 'Campaigns', value: stats.campaigns, icon: Heart, color: 'bg-accent text-accent-foreground', href: '/admin/campaigns' },
    { label: 'Total Raised', value: `$${stats.raised.toLocaleString()}`, icon: DollarSign, color: 'bg-foreground text-background', href: '/admin/donations' },
    { label: 'Registrations', value: stats.registrations, icon: FileText, color: 'bg-secondary text-foreground', href: '/admin/registrations' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair font-bold text-3xl text-foreground">Dashboard</h1>
          <p className="font-jakarta text-muted-foreground text-sm mt-1">Overview of Madrasa Farooqia</p>
        </div>
        <Link
          to="/"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-sm font-jakarta font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          View Website <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map(({ label, value, icon: IconComp, color, href }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={href} className="block bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                <IconComp size={18} />
              </div>
              <p className="font-playfair font-bold text-2xl text-foreground">{loading ? '...' : value}</p>
              <p className="font-jakarta text-xs text-muted-foreground mt-1">{label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Donations */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-playfair font-bold text-xl text-foreground">Recent Donations</h2>
            <Link to="/admin/donations" className="text-xs text-muted-foreground hover:text-foreground transition-colors">View All</Link>
          </div>
          {recentDonations.length === 0 ? (
            <p className="text-sm font-jakarta text-muted-foreground">No donations yet.</p>
          ) : (
            <div className="space-y-3">
              {recentDonations.map(d => (
                <div key={d.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-jakarta font-medium text-foreground">{d.is_anonymous ? 'Anonymous' : d.donor_name}</p>
                    <p className="text-xs font-jakarta text-muted-foreground">{d.campaign_name || 'General'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-playfair font-bold text-foreground">${d.amount}</p>
                    <p className="text-xs font-jakarta text-muted-foreground">{d.created_date ? format(new Date(d.created_date), 'MMM d') : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Registrations */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-playfair font-bold text-xl text-foreground">Recent Registrations</h2>
            <Link to="/admin/registrations" className="text-xs text-muted-foreground hover:text-foreground transition-colors">View All</Link>
          </div>
          {recentRegs.length === 0 ? (
            <p className="text-sm font-jakarta text-muted-foreground">No registrations yet.</p>
          ) : (
            <div className="space-y-3">
              {recentRegs.map(r => (
                <div key={r.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-jakarta font-medium text-foreground">{r.student_name}</p>
                    <p className="text-xs font-jakarta text-muted-foreground">{r.course}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    r.status === 'approved' ? 'bg-foreground text-background' :
                    r.status === 'rejected' ? 'bg-destructive/10 text-destructive' :
                    'bg-secondary text-muted-foreground'
                  }`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}