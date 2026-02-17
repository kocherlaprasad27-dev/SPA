import { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navigationItems } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  LayoutDashboard, Calendar, CalendarDays, Sparkles, Users, UserCircle, Heart, Award,
  CreditCard, Package, Crown, Gift, Ticket, DoorOpen, Clock, BarChart3, FileText,
  Megaphone, Plug, Settings, HelpCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Calendar, CalendarDays, Sparkles, Users, UserCircle, Heart, Award,
  CreditCard, Package, Crown, Gift, Ticket, DoorOpen, Clock, BarChart3, FileText,
  Megaphone, Plug, Settings, HelpCircle,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-all duration-300",
          collapsed ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        )}
        onClick={onToggle}
      />
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen bg-white/90 backdrop-blur-xl border-r border-indigo-100',
          'flex flex-col transition-all duration-300 ease-in-out z-50',
          'shadow-soft',
          collapsed ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0 w-72'
        )}
      >
        <div className={cn(
          "h-20 flex items-center border-b border-indigo-100 transition-all duration-300",
          collapsed ? "justify-center px-0" : "justify-between px-4"
        )}>
          <Link to="/" className={cn("flex items-center overflow-hidden transition-all", collapsed ? "gap-0" : "gap-3")}>
            <BrandLogo collapsed={collapsed} />
          </Link>
          <button
            onClick={onToggle}
            className={cn(
              'w-8 h-8 rounded-lg bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center',
              'transition-all duration-200 hover:scale-110',
              collapsed ? 'absolute -right-4 top-6 bg-white shadow-md border border-indigo-100 z-[60]' : ''
            )}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-indigo-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-indigo-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-smooth transition-all duration-300",
          collapsed ? "px-2" : "px-3"
        )}>
          <ul className="space-y-1">
            {navigationItems
              .filter(item => {
                if (!item.allowedRoles) return true;
                if (!user) return false;
                return item.allowedRoles.includes(user.role);
              })
              .map((item, index) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                const active = isActive(item.path);
                const isHovered = hoveredItem === item.path;

                return (
                  <li
                    key={item.path}
                    style={{ animationDelay: `${index * 30}ms` }}
                    className="animate-slide-up"
                  >
                    <Link
                      to={item.path}
                      onMouseEnter={() => setHoveredItem(item.path)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => {
                        if (window.innerWidth < 768) {
                          onToggle(); // In admin context, onToggle on mobile closes it
                        }
                      }}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                        active
                          ? 'gradient-coral text-white shadow-coral'
                          : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600',
                        collapsed && 'justify-center'
                      )}
                    >
                      <Icon className={cn(
                        'w-5 h-5 flex-shrink-0 transition-transform duration-200',
                        (active || isHovered) && 'scale-110'
                      )} />

                      {!collapsed && (
                        <>
                          <span className="font-medium text-sm whitespace-nowrap flex-1">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className={cn(
                              'px-2 py-0.5 text-xs font-semibold rounded-full',
                              active ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-600'
                            )}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <div className={cn(
                          'absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg',
                          'whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible',
                          'transition-all duration-200 z-50 shadow-lg',
                          'before:absolute before:left-0 before:top-1/2 before:-translate-x-1 before:-translate-y-1/2',
                          'before:border-4 before:border-transparent before:border-r-gray-800'
                        )}>
                          {item.name}
                          {item.badge && (
                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-indigo-500 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-indigo-100">
          <div className={cn(
            'flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-slate-50',
            collapsed && 'justify-center'
          )}>
            <div className="w-10 h-10 rounded-full gradient-coral flex items-center justify-center flex-shrink-0 shadow-coral cursor-pointer" onClick={() => toast.info(`Viewing profile for ${user?.firstName}...`)}>
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=F08080&color=fff`}
                className="w-full h-full rounded-full border-2 border-white/20"
                alt="Avatar"
              />
            </div>
            {!collapsed && (
              <div className="animate-fade-in overflow-hidden">
                <p className="font-medium text-sm text-gray-800 truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-indigo-500 truncate">{user?.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
