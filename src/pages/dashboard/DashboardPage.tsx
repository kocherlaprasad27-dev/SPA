import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar, Users, DollarSign, Star, TrendingUp, TrendingDown,
  Clock, CheckCircle, XCircle, UserCheck, CalendarCheck,
  Sparkles, Activity, Award, FileText
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { cn } from '@/lib/utils';
import {
  dashboardStats, revenueData, servicePerformance, employeePerformance,
  bookings, customers, recentActivities
} from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const COLORS = ['#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81'];

export function DashboardPage() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('week');

  const isAdmin = user?.role === 'super_admin' || user?.role === 'manager';
  const isReceptionist = user?.role === 'receptionist';
  const isTherapist = user?.role === 'therapist';

  const userBookings = bookings.filter(booking => {
    if (isTherapist) {
      return booking.employeeId === user?.id;
    }
    return true;
  });

  const upcomingBookings = userBookings.filter(b => b.status === 'confirmed' || b.status === 'pending' || b.status === 'in_progress').slice(0, 4);

  // State for the active appointment logic
  const [activeBooking, setActiveBooking] = useState<any>(upcomingBookings[0] || null);

  const handleStatusUpdate = (newStatus: string) => {
    if (!activeBooking) return;
    setActiveBooking((prev: any) => prev ? { ...prev, status: newStatus } : null);
    toast.success(`Appointment status updated to ${newStatus.replace('_', ' ').toUpperCase()}`);
  };

  const displayedStats = {
    ...dashboardStats,
    totalBookings: isTherapist ? userBookings.length : dashboardStats.totalBookings,
    todayBookings: isTherapist ? userBookings.filter(b => b.bookingDate === '2024-02-15').length : dashboardStats.todayBookings,
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${dashboardStats.totalRevenue.toLocaleString()}`,
      change: dashboardStats.revenueChange,
      icon: DollarSign,
      color: 'from-indigo-600 to-blue-500',
      bgColor: 'bg-indigo-50',
      visible: isAdmin,
    },
    {
      title: 'Total Bookings',
      value: displayedStats.totalBookings.toString(),
      change: displayedStats.bookingsChange,
      icon: CalendarCheck,
      color: 'from-blue-500 to-blue-400',
      bgColor: 'bg-blue-50',
      visible: true,
    },
    {
      title: 'New Customers',
      value: dashboardStats.newCustomers.toString(),
      change: dashboardStats.customersChange,
      icon: Users,
      color: 'from-green-500 to-green-400',
      bgColor: 'bg-green-50',
      visible: isAdmin || isReceptionist,
    },
    {
      title: 'Your Performance',
      value: `${(dashboardStats.averageRating || 4.9).toString()}`,
      change: dashboardStats.ratingChange,
      icon: Star,
      color: 'from-yellow-500 to-yellow-400',
      bgColor: 'bg-yellow-50',
      visible: isTherapist,
    },
    {
      title: 'Average Rating',
      value: dashboardStats.averageRating.toString(),
      change: dashboardStats.ratingChange,
      icon: Star,
      color: 'from-yellow-500 to-yellow-400',
      bgColor: 'bg-yellow-50',
      visible: isAdmin || isReceptionist,
    },
  ].filter(c => c.visible);

  const todayStats = [
    { label: 'Today\'s Bookings', value: displayedStats.todayBookings, icon: Calendar, color: 'text-coral-500' },
    { label: 'Pending', value: displayedStats.pendingBookings, icon: Clock, color: 'text-yellow-500' },
    { label: 'Completed', value: displayedStats.completedBookings, icon: CheckCircle, color: 'text-green-500' },
    { label: 'Cancelled', value: displayedStats.cancelledBookings, icon: XCircle, color: 'text-red-500' },
  ];

  const serviceData = servicePerformance.slice(0, 5).map(s => ({
    name: s.serviceName,
    bookings: s.totalBookings,
    revenue: s.totalRevenue,
  }));

  const employeeData = employeePerformance.map(e => ({
    name: e.employeeName.split(' ')[0],
    bookings: e.totalBookings,
    rating: e.averageRating * 20,
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:border-coral-300 focus:ring-coral-200"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <Button className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white rounded-xl" asChild>
            <Link to="/admin/bookings/new">
              <Calendar className="w-4 h-4 mr-2" />
              New Booking
            </Link>
          </Button>
        </div>
      </div>

      {/* Therapist Current Appointment Section */}
      {isTherapist && (
        <Card className="border-0 shadow-soft bg-gradient-to-br from-white to-coral-50/30 overflow-hidden relative mb-8">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Sparkles className="w-32 h-32" />
          </div>
          <CardHeader className="border-b border-gray-100/50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-coral-500 animate-pulse" />
                Current Working Appointment
              </CardTitle>
              {activeBooking && (
                <Badge className={cn(
                  "px-3 py-1 text-sm font-medium transition-all duration-300",
                  activeBooking.status === 'in_progress' ? 'bg-blue-100 text-blue-700 animate-pulse ring-2 ring-blue-100' :
                    activeBooking.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-coral-100 text-coral-700'
                )}>
                  {activeBooking.status === 'in_progress' ? 'IN PROGRESS' :
                    activeBooking.status === 'completed' ? 'COMPLETED' :
                      activeBooking.status?.toUpperCase().replace('_', ' ')}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {activeBooking ? (
              <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
                {/* Details Section */}
                <div className="flex items-start md:items-center gap-6">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-md ring-1 ring-gray-100">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeBooking.customer?.firstName}`} />
                    <AvatarFallback className="bg-coral-100 text-coral-600 text-xl font-bold">
                      {activeBooking.customer?.firstName?.[0] || 'G'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      {activeBooking.customer ? `${activeBooking.customer.firstName} ${activeBooking.customer.lastName}` : 'Guest Customer'}
                    </h3>
                    <p className="text-lg text-coral-600 font-medium">{activeBooking.services?.[0]?.name || 'Spa Service'}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                        <Clock className="w-4 h-4 text-blue-500" />
                        {activeBooking.startTime}
                      </span>
                      <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        {activeBooking.bookingDate}
                      </span>
                      <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        ${activeBooking.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  {activeBooking.status === 'confirmed' && (
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 w-full sm:w-auto transform hover:-translate-y-0.5 transition-all"
                      onClick={() => handleStatusUpdate('in_progress')}
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      Start Session
                    </Button>
                  )}
                  {activeBooking.status === 'in_progress' && (
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200 w-full sm:w-auto transform hover:-translate-y-0.5 transition-all"
                      onClick={() => handleStatusUpdate('completed')}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Session
                    </Button>
                  )}
                  {(activeBooking.status === 'confirmed' || activeBooking.status === 'in_progress') && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 w-full sm:w-auto"
                      onClick={() => handleStatusUpdate('cancelled')}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                    onClick={() => toast.info('Navigating to full booking details...')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No Active Appointment</h3>
                <p className="text-gray-500 max-w-sm mx-auto mt-2">You don't have any appointments scheduled for right now. Check your calendar for upcoming sessions.</p>
                <Button variant="link" className="text-coral-500 mt-2 font-bold">View Full Schedule</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card
            key={stat.title}
            className="hover-lift border-0 shadow-soft overflow-hidden cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => toast.info(`Viewing detailed report for ${stat.title}...`)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={cn(
                      'text-sm font-medium',
                      stat.change >= 0 ? 'text-green-500' : 'text-red-500'
                    )}>
                      {stat.change >= 0 ? '+' : ''}{stat.change}%
                    </span>
                    <span className="text-sm text-gray-400">vs last period</span>
                  </div>
                </div>
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  stat.bgColor
                )}>
                  <stat.icon className={cn('w-6 h-6', `text-${stat.color.split('-')[1]}-500`)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Overview */}
      <Card className="border-0 shadow-soft">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {todayStats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                onClick={() => toast.info(`Opening ${stat.label} list...`)}
              >
                <div className={cn('inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-transform', stat.color.replace('text-', 'bg-').replace('500', '100'))}>
                  <stat.icon className={cn('w-6 h-6', stat.color)} />
                </div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        {isAdmin && (
          <Card className="lg:col-span-2 border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800">Revenue Overview</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-coral-100 text-coral-600">
                  +12.5% vs last period
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F08080" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F08080" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      fontSize={12}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`$${value}`, 'Revenue']}
                      labelFormatter={(label) => new Date(label).toLocaleDateString()}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#F08080"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Schedule List for Receptionist/Therapist */}
        {(isReceptionist || isTherapist) && (
          <Card className="lg:col-span-2 border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800">
                {isTherapist ? 'Your Schedule' : 'Today\'s Check-ins'}
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-coral-500" asChild>
                <Link to="/admin/bookings">View Calendar</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.filter(b => b.status !== 'cancelled').slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-coral-50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white font-bold">
                      {booking.startTime}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{booking.customer?.firstName} {booking.customer?.lastName}</p>
                      <p className="text-sm text-gray-500">Service: {booking.services?.[0]?.service?.name || 'General Relaxation'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={cn(
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                      )}>
                        {booking.status.replace('_', ' ')}
                      </Badge>
                      <Button size="sm" variant="outline" className="h-8 border-coral-200">Action</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Bookings */}
        <Card className="border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800">Upcoming Bookings</CardTitle>
            <Button variant="ghost" size="sm" className="text-coral-500" asChild>
              <Link to="/admin/bookings">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                    booking.status === 'confirmed' && 'bg-blue-100 text-blue-600',
                    booking.status === 'in_progress' && 'bg-orange-100 text-orange-600',
                    booking.status === 'completed' && 'bg-green-100 text-green-600',
                    booking.status === 'cancelled' && 'bg-red-100 text-red-600',
                  )}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {booking.customer?.firstName} {booking.customer?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.bookingDate} at {booking.startTime}
                    </p>
                  </div>
                  <Badge variant="secondary" className={cn(
                    booking.status === 'confirmed' && 'bg-blue-100 text-blue-600',
                    booking.status === 'in_progress' && 'bg-orange-100 text-orange-600',
                    booking.status === 'completed' && 'bg-green-100 text-green-600',
                    booking.status === 'cancelled' && 'bg-red-100 text-red-600',
                  )}>
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Performance */}
        {isAdmin && (
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800">Top Services</CardTitle>
              <Button variant="ghost" size="sm" className="text-coral-500" asChild>
                <Link to="/admin/services">View all</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="#9ca3af"
                      fontSize={12}
                      width={120}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="bookings" fill="#F08080" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Employee Performance */}
        {isAdmin && (
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800">Employee Performance</CardTitle>
              <Button variant="ghost" size="sm" className="text-coral-500" asChild>
                <Link to="/admin/employees">View all</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeePerformance.slice(0, 5).map((employee, index) => (
                  <div key={employee.employeeId} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">
                        {employee.employeeName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-800">{employee.employeeName}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{employee.averageRating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{employee.totalBookings} bookings</span>
                        <span>${employee.totalRevenue.toLocaleString()} revenue</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">Utilization</span>
                          <span className="font-medium text-coral-600">{employee.utilizationRate}%</span>
                        </div>
                        <Progress
                          value={employee.utilizationRate}
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Therapist Personal Stats */}
        {isTherapist && (
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Your Monthly Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-coral-50 rounded-2xl">
                  <div>
                    <p className="text-sm text-gray-500">Bookings</p>
                    <p className="text-2xl font-bold text-coral-600">84</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-coral-500" />
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl">
                  <div>
                    <p className="text-sm text-gray-500">Hours Served</p>
                    <p className="text-2xl font-bold text-blue-600">156h</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
                  <div>
                    <p className="text-sm text-gray-500">Customer Retention</p>
                    <p className="text-2xl font-bold text-green-600">92%</p>
                  </div>
                  <Star className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="text-coral-500" onClick={() => toast.info('Activity log loading...')}>
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                    activity.type === 'booking' && 'bg-blue-100 text-blue-600',
                    activity.type === 'payment' && 'bg-green-100 text-green-600',
                    activity.type === 'customer' && 'bg-purple-100 text-purple-600',
                    activity.type === 'inventory' && 'bg-orange-100 text-orange-600',
                    activity.type === 'employee' && 'bg-coral-100 text-coral-600',
                    activity.type === 'review' && 'bg-yellow-100 text-yellow-600',
                  )}>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">by {activity.user}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 border-coral-200 hover:bg-coral-50 hover:border-coral-300" asChild>
                <Link to="/admin/bookings/new">
                  <Calendar className="w-6 h-6 text-coral-500" />
                  <span className="text-sm">New Booking</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 border-coral-200 hover:bg-coral-50 hover:border-coral-300" asChild>
                <Link to="/admin/customers/new">
                  <UserCheck className="w-6 h-6 text-coral-500" />
                  <span className="text-sm">Add Customer</span>
                </Link>
              </Button>
              {(isAdmin) && (
                <>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 border-coral-200 hover:bg-coral-50 hover:border-coral-300" asChild>
                    <Link to="/admin/services/new">
                      <Sparkles className="w-6 h-6 text-coral-500" />
                      <span className="text-sm">Add Service</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 border-coral-200 hover:bg-coral-50 hover:border-coral-300" asChild>
                    <Link to="/admin/coupons">
                      <Award className="w-6 h-6 text-coral-500" />
                      <span className="text-sm">Create Coupon</span>
                    </Link>
                  </Button>
                </>
              )}
              {isTherapist && (
                <>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 border-coral-200 hover:bg-coral-50 hover:border-coral-300" onClick={() => toast.info('Updating availability...')}>
                    <Clock className="w-6 h-6 text-coral-500" />
                    <span className="text-sm">Update Availability</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 border-coral-200 hover:bg-coral-50 hover:border-coral-300" onClick={() => toast.info('Opening notes...')}>
                    <FileText className="w-6 h-6 text-coral-500" />
                    <span className="text-sm">Patient Notes</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
