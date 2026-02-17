import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Clock, MapPin, Calendar, CheckCircle, XCircle, AlertCircle,
  Timer, Coffee, Download, Filter, ChevronLeft, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { attendanceRecords } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const weeklyData = [
  { day: 'Mon', present: 18, late: 2, absent: 0 },
  { day: 'Tue', present: 17, late: 3, absent: 0 },
  { day: 'Wed', present: 19, late: 1, absent: 0 },
  { day: 'Thu', present: 16, late: 4, absent: 0 },
  { day: 'Fri', present: 18, late: 2, absent: 0 },
  { day: 'Sat', present: 15, late: 0, absent: 5 },
  { day: 'Sun', present: 10, late: 0, absent: 10 },
];

import { useAuth } from '@/contexts/AuthContext';

export function AttendancePage() {
  const { user } = useAuth();
  const [selectedDate] = useState(new Date());

  // Filter records based on role
  const isAdmin = user?.role === 'super_admin' || user?.role === 'manager';
  const filteredRecords = isAdmin
    ? attendanceRecords
    : attendanceRecords.filter(r => r.employeeId === user?.id || r.employee?.email === user?.email);

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
      present: { color: 'bg-green-100 text-green-600', icon: CheckCircle },
      absent: { color: 'bg-red-100 text-red-600', icon: XCircle },
      late: { color: 'bg-yellow-100 text-yellow-600', icon: AlertCircle },
      half_day: { color: 'bg-orange-100 text-orange-600', icon: Clock },
      on_leave: { color: 'bg-blue-100 text-blue-600', icon: Coffee },
    };
    const config = configs[status] || configs.present;
    const Icon = config.icon;
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  // Personal stats calculation for non-admins
  const personalStats = {
    present: filteredRecords.filter(r => r.status === 'present' || r.status === 'late').length,
    late: filteredRecords.filter(r => r.status === 'late').length,
    leave: filteredRecords.filter(r => r.status === 'on_leave').length,
    avgHours: filteredRecords.length > 0
      ? (filteredRecords.reduce((acc, r) => {
        if (r.checkIn && r.checkOut) {
          return acc + (new Date(r.checkOut).getTime() - new Date(r.checkIn).getTime()) / (1000 * 60 * 60);
        }
        return acc;
      }, 0) / filteredRecords.length).toFixed(1)
      : '0'
  };

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="w-full">
          <h1 className="text-3xl font-display font-bold text-gray-800">
            {isAdmin ? 'Attendance Management' : 'My Attendance'}
          </h1>
          <p className="text-gray-500 mt-1 break-words w-full">
            {isAdmin ? 'Track and manage employee attendance' : 'Track your working hours and attendance history'}
          </p>
        </div>
        <div className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-3 mt-4 sm:mt-0">
          <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50 w-full sm:w-auto" onClick={() => toast.info('Exporting attendance records...')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {!isAdmin && (
            <Button className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white w-full sm:w-auto" onClick={() => toast.info('Attendance action recorded!')}>
              <Clock className="w-4 h-4 mr-2" />
              Check In/Out
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: isAdmin ? 'Present Today' : 'Days Present',
            value: isAdmin ? '18' : personalStats.present.toString(),
            change: isAdmin ? '+2' : '',
            icon: CheckCircle,
            color: 'green'
          },
          {
            label: 'Late Arrivals',
            value: isAdmin ? '2' : personalStats.late.toString(),
            change: isAdmin ? '-1' : '',
            icon: AlertCircle,
            color: 'yellow'
          },
          {
            label: isAdmin ? 'On Leave' : 'Leave Balance',
            value: isAdmin ? '3' : '12',
            change: '0',
            icon: Coffee,
            color: 'blue'
          },
          {
            label: 'Avg. Hours',
            value: isAdmin ? '7.5' : personalStats.avgHours,
            change: isAdmin ? '+0.3' : '',
            icon: Timer,
            color: 'indigo'
          },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-soft cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toast.info(`Viewing detailed breakdown for ${stat.label}...`)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  {stat.change && (
                    <p className={cn(
                      'text-xs mt-1',
                      stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    )}>
                      {stat.change} vs yesterday
                    </p>
                  )}
                </div>
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', `bg-${stat.color}-100`)}>
                  <stat.icon className={cn('w-5 h-5', `text-${stat.color}-500`)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="daily">
        <TabsList className="bg-gray-100 w-full justify-start overflow-x-auto no-scrollbar">
          <TabsTrigger value="daily" className="flex-1 whitespace-nowrap px-4">{isAdmin ? 'Daily View' : 'My History'}</TabsTrigger>
          <TabsTrigger value="weekly" className="flex-1 whitespace-nowrap px-4">Weekly Report</TabsTrigger>
          <TabsTrigger value="monthly" className="flex-1 whitespace-nowrap px-4">Monthly Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6 mt-6">
          {/* Date Selector */}
          <Card className="border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <Calendar className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-center bg-gray-50/50 p-1 rounded-lg sm:bg-transparent">
                  <Button variant="ghost" size="icon" onClick={() => toast.info('Loading previous day records...')} className="sm:hidden">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h3 className="text-base sm:text-lg font-semibold text-center truncate">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={() => toast.info('Loading next day records...')} className="sm:hidden">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="hidden sm:flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast.info('Loading previous day records...')}>Previous</Button>
                  <Button variant="outline" size="sm" onClick={() => toast.info('Loading next day records...')}>Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Table - Desktop */}
          <Card className="border-0 shadow-soft hidden md:block">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                {isAdmin ? "Today's Attendance" : "My Attendance Logs"}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => toast.info('Attendance filter options coming soon!')}>
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Employee</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Check In</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Check Out</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Hours</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {record.employee?.firstName[0]}{record.employee?.lastName[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {record.employee?.firstName} {record.employee?.lastName}
                              </p>
                              <p className="text-sm text-gray-500">{record.employee?.employeeCode}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{record.checkOut ? new Date(record.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(record.status)}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium">
                            {record.checkIn && record.checkOut
                              ? ((new Date(record.checkOut).getTime() - new Date(record.checkIn).getTime()) / (1000 * 60 * 60)).toFixed(1)
                              : '0'
                            }h
                          </span>
                          {record.lateMinutes > 0 && (
                            <p className="text-xs text-yellow-600">+{record.lateMinutes}m late</p>
                          )}
                          {record.overtimeMinutes > 0 && (
                            <p className="text-xs text-green-600">+{record.overtimeMinutes}m OT</p>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Main Location</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Cards - Mobile */}
          <div className="space-y-4 md:hidden">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="border border-gray-100 shadow-sm">
                <CardContent className="p-4 space-y-4">
                  {/* Header: Employee & Status */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {record.employee?.firstName[0]}{record.employee?.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {record.employee?.firstName} {record.employee?.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{record.employee?.employeeCode}</p>
                      </div>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>

                  {/* Times */}
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-50">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Check In</p>
                      <div className="flex items-center gap-1.5 font-medium text-gray-800">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Check Out</p>
                      <div className="flex items-center gap-1.5 font-medium text-gray-800">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {record.checkOut ? new Date(record.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                      </div>
                    </div>
                  </div>

                  {/* Footer: Hours & Location */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      Main Location
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-800">
                        {record.checkIn && record.checkOut
                          ? ((new Date(record.checkOut).getTime() - new Date(record.checkIn).getTime()) / (1000 * 60 * 60)).toFixed(1)
                          : '0'
                        }h
                      </span>
                      {record.lateMinutes > 0 && <span className="text-xs text-yellow-600 ml-2 block">+{record.lateMinutes}m Late</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Weekly Attendance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="present" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="late" fill="#eab308" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div >
  );
}
