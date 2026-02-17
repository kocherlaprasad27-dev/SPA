import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft, ChevronRight, Clock, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { bookings, employees, timeSlots } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export function CalendarViewPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  const displayedEmployees = user?.role === 'therapist'
    ? employees.filter(e => e.email === user.email || e.id === user.id)
    : employees.slice(0, 5);

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const formatDate = () => {
    if (viewMode === 'day') {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else if (viewMode === 'week') {
      const start = new Date(currentDate);
      start.setDate(start.getDate() - start.getDay());
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getBookingsForTimeSlot = (time: string, employeeId?: string) => {
    return bookings.filter(b => {
      const matchesTime = b.startTime === time;
      const matchesEmployee = !employeeId || b.employeeId === employeeId;
      const matchesDate = b.bookingDate === currentDate.toISOString().split('T')[0];
      return matchesTime && matchesEmployee && matchesDate;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Calendar</h1>
          <p className="text-gray-500 mt-1">View and manage your schedule</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="gradient-coral hover:opacity-90 text-white" asChild>
            <Link to="/admin/bookings/new">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Link>
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card className="border-0 shadow-soft">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center justify-between w-full md:w-auto gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
              <Button variant="ghost" size="icon" onClick={() => navigateDate('prev')} className="h-8 w-8 hover:bg-white hover:text-coral-600 hover:shadow-sm shrink-0 rounded-lg">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-sm sm:text-lg font-bold text-gray-800 text-center px-2 min-w-[140px] sm:min-w-[200px] leading-tight">
                {formatDate()}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => navigateDate('next')} className="h-8 w-8 hover:bg-white hover:text-coral-600 hover:shadow-sm shrink-0 rounded-lg">
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="hidden sm:block h-6 w-px bg-gray-200 mx-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="hidden sm:flex text-coral-600 hover:bg-coral-50 hover:text-coral-700 font-medium px-3"
              >
                Today
              </Button>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              <div className="flex sm:hidden w-full gap-2">
                {(['day', 'week', 'month'] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                    className={cn(
                      "flex-1",
                      viewMode === mode ? 'gradient-coral text-white' : 'bg-white'
                    )}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="hidden sm:flex items-center gap-2">
                {(['day', 'week', 'month'] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? 'default' : 'outline'}
                    onClick={() => setViewMode(mode)}
                    className={viewMode === mode ? 'gradient-coral text-white' : ''}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day View */}
      {viewMode === 'day' && (
        <Card className="border-0 shadow-soft">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div style={{ minWidth: displayedEmployees.length > 2 ? `${displayedEmployees.length * 200 + 80}px` : '100%' }}>
                {/* Header Row */}
                <div className="grid grid-cols-[80px_repeat(var(--cols),1fr)] border-b border-gray-200 bg-gray-50/50" style={{ '--cols': displayedEmployees.length } as any}>
                  <div className="p-4 font-semibold text-gray-500 sticky left-0 bg-white z-20 border-r border-gray-100 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">Time</div>
                  {displayedEmployees.map((employee) => (
                    <div key={employee.id} className="p-4 border-l border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full gradient-coral flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {employee.firstName[0]}{employee.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{employee.firstName}</p>
                          <p className="text-xs text-gray-500">{employee.designation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {timeSlots.slice(8, 20).map((time) => (
                  <div key={time} className="grid grid-cols-[80px_repeat(var(--cols),1fr)] border-b border-gray-100" style={{ '--cols': displayedEmployees.length } as any}>
                    <div className="p-4 text-sm text-gray-500 font-medium sticky left-0 bg-white z-20 border-r border-gray-100 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">{time}</div>
                    {displayedEmployees.map((employee) => {
                      const slotBookings = getBookingsForTimeSlot(time, employee.id);
                      const hasBooking = slotBookings.length > 0;

                      return (
                        <div
                          key={employee.id}
                          className={cn(
                            'p-2 border-l border-gray-100 min-h-[80px] relative',
                            hasBooking ? 'bg-coral-50' : 'hover:bg-gray-50 cursor-pointer'
                          )}
                        >
                          {hasBooking && slotBookings.map((booking) => (
                            <div
                              key={booking.id}
                              className="p-2 rounded-lg bg-gradient-to-r from-coral-400 to-coral-500 text-white text-sm shadow-sm"
                            >
                              <p className="font-medium truncate">
                                {booking.customer?.firstName} {booking.customer?.lastName}
                              </p>
                              <p className="text-xs opacity-90">Swedish Massage</p>
                              <div className="flex items-center gap-2 mt-1 text-xs opacity-75">
                                <Clock className="w-3 h-3" />
                                <span>60 min</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Week View */}
      {viewMode === 'week' && (
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="overflow-x-auto pb-4">
              <div className="grid grid-cols-7 gap-4 min-w-[800px]">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                  const date = new Date(currentDate);
                  date.setDate(date.getDate() - date.getDay() + index);
                  const isToday = date.toDateString() === new Date().toDateString();

                  return (
                    <div key={day} className="text-center">
                      <div className={cn(
                        'p-3 rounded-xl',
                        isToday ? 'gradient-coral text-white' : 'bg-gray-50'
                      )}>
                        <p className="text-sm font-medium">{day}</p>
                        <p className="text-2xl font-bold">{date.getDate()}</p>
                      </div>
                      <div className="mt-2 space-y-1">
                        <Badge variant="secondary" className="bg-coral-100 text-coral-600 w-full">
                          3 bookings
                        </Badge>
                        <Badge variant="secondary" className="bg-green-100 text-green-600 w-full">
                          $450
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Month View */}
      {viewMode === 'month' && (
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="overflow-x-auto pb-4">
              <div className="grid grid-cols-7 gap-2 min-w-[700px]">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center py-2 font-semibold text-gray-500">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 5);
                  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                  const isToday = date.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={i}
                      className={cn(
                        'aspect-square p-2 rounded-xl border transition-colors',
                        isCurrentMonth ? 'bg-white border-gray-200' : 'bg-gray-50 border-transparent',
                        isToday && 'ring-2 ring-coral-500 ring-offset-2'
                      )}
                    >
                      <p className={cn(
                        'text-sm font-medium',
                        !isCurrentMonth && 'text-gray-400'
                      )}>
                        {date.getDate()}
                      </p>
                      {isCurrentMonth && Math.random() > 0.5 && (
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-coral-400 mx-auto" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
