import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Bell,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  HelpCircle,
  MessageSquare,
  Menu,
  Clock,
  Coffee,
  Play
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { notifications } from '@/data/mockData';
import { toast } from 'sonner';

interface HeaderProps {
  unreadNotifications: number;
  onNotificationClick: () => void;
  onMenuClick?: () => void;
}

export function Header({ unreadNotifications, onNotificationClick, onMenuClick }: HeaderProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const isStaff = user?.role === 'therapist' || user?.role === 'manager' || user?.role === 'receptionist';

  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(0);

  const handleAttendance = () => {
    if (isOnBreak) {
      toast.error('Please end your break before checking out!');
      return;
    }
    setIsCheckedIn(!isCheckedIn);
    toast.success(isCheckedIn ? 'Checked out successfully!' : 'Checked in successfully!', {
      description: `Time: ${new Date().toLocaleTimeString()}`,
    });
  };

  const handleBreak = () => {
    setIsOnBreak(!isOnBreak);
    toast.success(isOnBreak ? 'Break ended!' : 'Break started!', {
      description: `Time: ${new Date().toLocaleTimeString()}`,
    });
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-indigo-100 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 md:hidden mr-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="rounded-xl">
          <Menu className="w-6 h-6 text-gray-600" />
        </Button>
      </div>
      {/* Search */}
      {/* Attendance & Breaks - Replaces Search Bar */}
      <div className="flex-1 flex items-center justify-center md:justify-start px-2 md:px-6">
        {isStaff && (
          <div className="flex items-center gap-2 md:gap-4 bg-gray-50/50 p-1.5 rounded-xl border border-gray-100/50 backdrop-blur-sm">
            {/* Clock In/Out */}
            <Button
              variant={isCheckedIn ? "outline" : "default"}
              size="sm"
              onClick={handleAttendance}
              className={cn(
                "rounded-lg font-bold transition-all shadow-sm h-9 md:h-10 text-xs md:text-sm whitespace-nowrap px-3 md:px-4",
                isCheckedIn
                  ? "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                  : "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white hover:opacity-90 active:scale-95 hover:shadow-md"
              )}
            >
              <Clock className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">{isCheckedIn ? 'Check Out' : 'Check In'}</span>
            </Button>

            {/* Break Controls - Only visible when checked in */}
            {isCheckedIn && (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="h-6 w-px bg-gray-200 hidden xs:block" />
                <Button
                  variant={isOnBreak ? "default" : "secondary"}
                  size="sm"
                  onClick={handleBreak}
                  className={cn(
                    "rounded-lg font-medium transition-all shadow-sm h-9 md:h-10 text-xs md:text-sm whitespace-nowrap px-3 md:px-4",
                    isOnBreak
                      ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {isOnBreak ? (
                    <>
                      <Play className="w-4 h-4 md:mr-2 fill-current" />
                      <span className="hidden md:inline">Resume Work</span>
                    </>
                  ) : (
                    <>
                      <Coffee className="w-4 h-4 md:mr-2" />
                      <span className="hidden md:inline">Take Break</span>
                    </>
                  )}
                </Button>

                {/* Status Indicator */}
                <div className="hidden lg:flex flex-col px-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                    {isOnBreak ? 'On Break' : 'Shift Time'}
                  </span>
                  <span className={cn(
                    "text-xs font-bold tabular-nums",
                    isOnBreak ? "text-amber-600" : "text-green-600"
                  )}>
                    {isOnBreak ? "00:15:30" : "02:14:45"}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-3">

        {/* Quick Actions */}
        {(user?.role === 'super_admin' || user?.role === 'manager' || user?.role === 'receptionist') && (
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-xl hover:bg-indigo-50 hover:text-indigo-600"
            asChild
          >
            <Link to="/admin/bookings/new">
              <span className="sr-only">New Booking</span>
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center">
                <span className="text-white text-lg leading-none">+</span>
              </div>
            </Link>
          </Button>
        )}

        {/* Dark Mode Toggle - Hidden when checked in */}
        {!isCheckedIn && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-xl hover:bg-indigo-50 hover:text-indigo-600"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        )}

        {/* Notifications */}
        <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl hover:bg-indigo-50 hover:text-indigo-600"
              onClick={onNotificationClick}
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] rounded-full flex items-center justify-center text-xs text-white font-medium animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-96 p-0">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                Mark all read
              </Button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors',
                    !notification.isRead && 'bg-indigo-50/50'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                      notification.type === 'booking' && 'bg-blue-500',
                      notification.type === 'payment' && 'bg-green-500',
                      notification.type === 'system' && 'bg-purple-500',
                      notification.type === 'reminder' && 'bg-orange-500'
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-800">{notification.title}</p>
                      <p className="text-sm text-gray-500 truncate">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100 text-center">
              <Link to="/notifications" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View all notifications
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Messages */}
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl hover:bg-indigo-50 hover:text-indigo-600"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
            3
          </span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-indigo-50">
              <img
                src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff'}
                alt={user?.firstName}
                className="w-9 h-9 rounded-full border-2 border-indigo-200"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-indigo-600">{user?.role}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin/settings" className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/admin/settings" className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/admin/help" className="cursor-pointer">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
