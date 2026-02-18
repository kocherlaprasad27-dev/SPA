import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Search, Plus, Filter, MoreHorizontal, Calendar,
  Edit, Trash2, Eye, CheckCircle, MessageSquare, Printer, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { bookings, bookingStatuses } from '@/data/mockData';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export function BookingManagementPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = bookings.filter(booking => {
    // Role-based filtering: Therapists only see their assigned bookings
    if (user?.role === 'therapist') {
      if (booking.employeeId !== user.id) return false;
    }

    const matchesSearch =
      booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer?.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (_bookingId: string) => {
    toast.success('Booking deleted successfully');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = bookingStatuses.find(s => s.value === status);
    return (
      <Badge className={cn('text-white', statusConfig?.color)}>
        {statusConfig?.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Booking Management</h1>
          <p className="text-gray-500 mt-1">Manage all your appointments and reservations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50" onClick={() => toast.info('Advanced filter options coming soon!')}>
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] hover:opacity-90 text-white shadow-md shadow-indigo-500/20" asChild>
            <Link to="/admin/bookings/new">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: '1,456', change: '+8.3%', color: 'text-indigo-600' },
          { label: 'Today', value: '18', change: '+2', color: 'text-blue-500' },
          { label: 'Pending', value: '42', change: '-5', color: 'text-yellow-500' },
          { label: 'Revenue', value: '$12,584', change: '+12.5%', color: 'text-green-500' },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-soft">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <div className="flex items-end justify-between mt-1">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <span className={cn(
                  'text-xs font-medium',
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                )}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-soft overflow-hidden">
        <div className="p-4 sm:p-6">
          <Tabs defaultValue="all" onValueChange={setStatusFilter}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
                <TabsList className="bg-gray-100 inline-flex">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>
              <div className="relative w-full lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            <div className="mt-0">
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </TableHead>
                      <TableHead className="whitespace-nowrap">Booking #</TableHead>
                      <TableHead className="whitespace-nowrap">Customer</TableHead>
                      <TableHead className="whitespace-nowrap">Date & Time</TableHead>
                      <TableHead className="whitespace-nowrap">Services</TableHead>
                      <TableHead className="whitespace-nowrap">Amount</TableHead>
                      <TableHead className="whitespace-nowrap">Status</TableHead>
                      <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-gray-50/80 transition-colors">
                        <TableCell>
                          <input type="checkbox" className="rounded border-gray-300" />
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/admin/bookings/${booking.id}`}
                            className="font-semibold text-indigo-600 hover:text-indigo-700"
                          >
                            {booking.bookingNumber}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center shadow-sm">
                              <span className="text-white text-xs font-bold uppercase">
                                {booking.customer?.firstName[0]}{booking.customer?.lastName[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 leading-none">
                                {booking.customer?.firstName} {booking.customer?.lastName}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{booking.customer?.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-400" />
                            <div className="leading-tight">
                              <p className="text-sm font-medium">{booking.bookingDate}</p>
                              <p className="text-xs text-gray-500">{booking.startTime}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium text-gray-700">Swedish Massage</p>
                          <Badge variant="outline" className="text-[10px] h-4 px-1 text-gray-400 border-gray-100">60 min</Badge>
                        </TableCell>
                        <TableCell>
                          <p className="font-bold text-gray-900">${booking.totalAmount}</p>
                          <Badge variant="secondary" className={cn(
                            "text-[10px] h-4 px-1 mt-1",
                            booking.paymentStatus === 'paid' && 'bg-green-100 text-green-600',
                            booking.paymentStatus === 'pending' && 'bg-yellow-100 text-yellow-600',
                            booking.paymentStatus === 'partial' && 'bg-orange-100 text-orange-600',
                          )}>
                            {booking.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-full">
                                <MoreHorizontal className="w-4 h-4 text-gray-500" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/bookings/${booking.id}`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info('Edit booking flow opening...')}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Booking
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success('Booking marked as completed!')}>
                                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info('Messaging interface opening...')}>
                                <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success('Receipt sent to printer!')}>
                                <Printer className="w-4 h-4 mr-2 text-gray-500" />
                                Print Receipt
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-500 focus:text-red-600 focus:bg-red-50"
                                onClick={() => handleDelete(booking.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Cancel Booking
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id} className="border border-gray-100 shadow-sm overflow-hidden border-l-4 border-l-indigo-500">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                            <span className="text-white text-base font-bold">
                              {booking.customer?.firstName[0]}{booking.customer?.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/admin/bookings/${booking.id}`}
                                className="font-bold text-gray-900 hover:text-indigo-600 transition-colors"
                              >
                                {booking.bookingNumber}
                              </Link>
                              {getStatusBadge(booking.status)}
                            </div>
                            <p className="text-sm font-medium text-gray-600">
                              {booking.customer?.firstName} {booking.customer?.lastName}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8 rounded-full border border-gray-50">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/bookings/${booking.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info('Edit booking flow opening...')}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Booking
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(booking.id)} className="text-red-500">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-gray-50">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Date & Time</p>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                            <span className="truncate">{booking.bookingDate}</span>
                          </div>
                          <p className="text-[10px] text-indigo-400 font-medium ml-5">{booking.startTime}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Payment</p>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-gray-900 text-xs">${booking.totalAmount}</span>
                            <Badge variant="outline" className={cn(
                              "text-[9px] px-1.5 h-4 rounded-full border-0 leading-none",
                              booking.paymentStatus === 'paid' && 'bg-green-100 text-green-700',
                              booking.paymentStatus === 'pending' && 'bg-amber-100 text-amber-700',
                              booking.paymentStatus === 'partial' && 'bg-orange-100 text-orange-700',
                            )}>
                              {booking.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-[11px] font-bold border-indigo-100 text-indigo-600 hover:bg-indigo-50" asChild>
                          <Link to={`/admin/bookings/${booking.id}`}>
                            Details
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-[11px] font-bold border-gray-200" onClick={() => toast.success('Booking marked as completed!')}>
                          Complete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
