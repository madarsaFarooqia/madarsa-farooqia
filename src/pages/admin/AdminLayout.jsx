import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Heart,
  DollarSign,
  FileText,
  Menu,
  X,
  LogOut,
  MessageSquare,
  PenSquare,
  Building2,
  BarChart2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const navGroups = [
  {
    label: null,
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Academic",
    items: [
      { label: "Teachers", href: "/admin/teachers", icon: Users },
      { label: "Students", href: "/admin/students", icon: GraduationCap },
      { label: "Registrations", href: "/admin/registrations", icon: FileText },
      { label: "Events", href: "/admin/events", icon: Calendar },
    ],
  },
  {
    label: "Donations",
    items: [
      { label: "Campaigns", href: "/admin/campaigns-pro", icon: Heart },
      { label: "Donations", href: "/admin/donations-pro", icon: DollarSign },
      { label: "Reports", href: "/admin/reports", icon: BarChart2 },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Blog & News", href: "/admin/blog", icon: PenSquare },
      { label: "Messages / Q&A", href: "/admin/messages", icon: MessageSquare },
      {
        label: "Infrastructure",
        href: "/admin/infrastructure",
        icon: Building2,
      },
    ],
  },
];

export default function AdminLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout("/login");
  };

  const isActive = (href) =>
    location.pathname === href ||
    (href !== "/admin" && location.pathname.startsWith(href));

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center border border-sidebar-primary/30">
            <span className="font-amiri font-bold text-sidebar-primary text-sm">
              مف
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-playfair font-bold text-sidebar-foreground text-sm truncate">
              Madrasa Farooqia
            </p>
            <p className="text-xs text-sidebar-foreground/50 flex items-center gap-1">
              Admin Panel <ExternalLink size={10} />
            </p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {group.label && (
              <p className="text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-widest px-3 mb-2">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive(href)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        {user && (
          <div className=" flex w-full justify-between items-center">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground font-bold text-sm shrink-0">
              {user.firstName?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 pl-2 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {`${user.firstName} ${user.lastName}` || "Admin"}
              </p>
              <p className="text-xs text-sidebar-foreground/50 truncate">
                {user.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-sm text-sm text-sidebar-foreground/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar fixed top-0 left-0 bottom-0 z-30 border-r border-sidebar-border">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b border-border flex items-center px-4 z-40 gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-foreground hover:bg-muted rounded-lg"
        >
          <Menu size={20} />
        </button>
        <span className="font-playfair font-bold text-foreground">
          Madrasa Admin
        </span>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-sidebar flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
              <span className="font-playfair font-bold text-sidebar-foreground">
                Navigation
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-sidebar-foreground/60"
              >
                <X size={18} />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 min-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
