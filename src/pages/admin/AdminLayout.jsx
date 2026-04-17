import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import {
  LayoutDashboard, Users, GraduationCap, Calendar, Heart, DollarSign,
  FileText, Menu, X, LogOut, ChevronDown
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Teachers', href: '/admin/teachers', icon: Users },
  { label: 'Students', href: '/admin/students', icon: GraduationCap },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'Campaigns', href: '/admin/campaigns', icon: Heart },
  { label: 'Donations', href: '/admin/donations', icon: DollarSign },
  { label: 'Registrations', href: '/admin/registrations', icon: FileText },
];

export default function AdminLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout(true);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center border-2 border-accent/40">
              <span className="text-background font-amiri font-bold text-sm">مف</span>
            </div>
            <div>
              <p className="font-playfair font-bold text-foreground text-sm">Madrasa Farooqia</p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ label, href, icon: IconComp }) => {
            const isActive = location.pathname === href || (href !== '/admin' && location.pathname.startsWith(href));
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-jakarta font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <IconComp size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          {user && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground font-playfair font-bold text-sm">
                {user.full_name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-jakarta font-medium text-foreground truncate">{user.full_name || 'Admin'}</p>
                <p className="text-xs font-jakarta text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-jakarta text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center px-4 z-40">
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-foreground hover:bg-muted rounded-lg">
          <Menu size={20} />
        </button>
        <p className="ml-4 font-playfair font-bold text-foreground">Admin Panel</p>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-card flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <p className="font-playfair font-bold text-foreground">Navigation</p>
              <button onClick={() => setSidebarOpen(false)} className="p-2"><X size={18} /></button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map(({ label, href, icon: MobileIcon }) => {
                const isActive = location.pathname === href;
                return (
                  <Link
                    key={href}
                    to={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-jakarta font-medium transition-all ${
                      isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <MobileIcon size={18} /> {label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}