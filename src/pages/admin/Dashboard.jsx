import { useState, useEffect } from 'react';
import {
  teacherService,
  studentService,
  eventService,
  campaignService,
  donationService,
  registrationService,
} from '../../services';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Calendar, Heart, DollarSign, FileText, TrendingUp, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const [stats, setStats] = useState({ teachers: 0, students: 0, events: 0, campaigns: 0, donations: 0, raised: 0, registrations: 0 });
  const [recentDonations, setRecentDonations] = useState([]);
  const [recentRegs, setRecentRegs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      teacherService.list('-created_date', 500).catch(() => []),
      studentService.list('-created_date', 500).catch(() => []),
      eventService.list('-created_date', 500).catch(() => []),
      campaignService.list('-created_date', 500).catch(() => []),
      donationService.list('-created_date', 500).catch(() => []),
      registrationService.list('-created_date', 10).catch(() => []),
    ]).then(([t, s, e, c, d, r]) => {
      const totalRaised = d.filter(x => x.status === 'completed').reduce((sum, x) => sum + (x.amount || 0), 0);
      setStats({
        teachers: t.length,
        students: s.length,
        events: e.length,
        campaigns: c.length,
        donations: d.length,
        raised: totalRaised,
        registrations: r.length,
      });
      setRecentDonations(d.slice(0, 5));
      setRecentRegs(r.slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

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