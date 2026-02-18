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
  Search, Plus, Filter, MoreHorizontal, Mail, Phone, Calendar, DollarSign,
  UserCheck, Edit, Eye, MessageSquare, Gift, Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { customers, customerSegments } from '@/data/mockData';
import { toast } from 'sonner';

export function CustomerManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone?.includes(searchQuery);
    const matchesSegment = segmentFilter === 'all' || customer.segment === segmentFilter;
    return matchesSearch && matchesSegment;
  });

  const getSegmentBadge = (segment: string) => {
    const segmentConfig = customerSegments.find(s => s.value === segment);
    return (
      <Badge className={cn('text-white', segmentConfig?.color)}>
        {segmentConfig?.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Customers</h1>
          <p className="text-gray-500 mt-1">Manage your customer relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-coral-200 hover:bg-coral-50" onClick={() => toast.info('Customer filtering options coming soon!')}>
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="gradient-coral hover:opacity-90 text-white" asChild>
            <Link to="/admin/customers/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: customers.length.toString(), color: 'text-coral-500' },
          { label: 'VIP', value: '12', color: 'text-purple-500' },
          { label: 'Regular', value: '45', color: 'text-blue-500' },
          { label: 'New', value: '23', color: 'text-green-500' },
          { label: 'At-Risk', value: '8', color: 'text-orange-500' },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-soft cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toast.info(`Viewing detailed segment report for ${stat.label} customers...`)}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <Tabs defaultValue="all" onValueChange={setSegmentFilter}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <TabsList className="bg-gray-100 flex-wrap h-auto">
                <TabsTrigger value="all">All Customers</TabsTrigger>
                <TabsTrigger value="vip">VIP</TabsTrigger>
                <TabsTrigger value="regular">Regular</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="dormant">Dormant</TabsTrigger>
                <TabsTrigger value="at-risk">At-Risk</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Segment</TableHead>
                      <TableHead>Lifetime Value</TableHead>
                      <TableHead>Visits</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full gradient-coral flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {customer.firstName[0]}{customer.lastName[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {customer.firstName} {customer.lastName}
                              </p>
                              <p className="text-sm text-gray-500">{customer.customerCode}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getSegmentBadge(customer.segment)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="font-medium">{customer.lifetimeValue.toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Avg: ${customer.averageOrderValue}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-coral-500" />
                            <span className="font-medium">{customer.totalVisits}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{customer.lastVisitDate}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/customers/${customer.id}`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Profile
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info(`Editing customer ${customer.firstName}...`)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/bookings/new?customer=${customer.id}`}>
                                  <Calendar className="w-4 h-4 mr-2" />
                                  New Booking
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info(`Opening messenger for ${customer.firstName}...`)}>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success(`Gift card sent to ${customer.firstName}!`)}>
                                <Gift className="w-4 h-4 mr-2" />
                                Send Gift Card
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info(`Available coupons for ${customer.firstName} loading...`)}>
                                <Award className="w-4 h-4 mr-2" />
                                Apply Coupon
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
              <div className="md:hidden space-y-4">
                {filteredCustomers.map((customer) => (
                  <Card key={customer.id} className="border border-gray-100 shadow-sm">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full gradient-coral flex items-center justify-center shrink-0">
                            <span className="text-white font-semibold text-sm">
                              {customer.firstName[0]}{customer.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-800">{customer.firstName} {customer.lastName}</h3>
                            </div>
                            <p className="text-xs text-gray-500">{customer.customerCode}</p>
                          </div>
                        </div>
                        <Badge className={cn(
                          "text-[10px] px-1.5 h-5",
                          customer.segment === 'vip' && "bg-purple-100 text-purple-600",
                          customer.segment === 'regular' && "bg-blue-100 text-blue-600",
                          customer.segment === 'new' && "bg-green-100 text-green-600",
                          customer.segment === 'dormant' && "bg-gray-100 text-gray-600",
                          customer.segment === 'at-risk' && "bg-orange-100 text-orange-600",
                        )}>
                          {customer.segment.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-gray-50">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            <span className="truncate max-w-[120px]">{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {customer.phone}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs">
                            <DollarSign className="w-3.5 h-3.5 text-green-500" />
                            <span className="font-medium">${customer.lifetimeValue.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {customer.lastVisitDate}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs" asChild>
                          <Link to={`/admin/customers/${customer.id}`}>Profile</Link>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs" asChild>
                          <Link to={`/admin/bookings/new?customer=${customer.id}`}>Book Now</Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.info('Messenger...')}>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Message
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Tabs>
        </CardHeader>
      </Card>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.slice(0, 3).map((customer) => (
          <Card key={customer.id} className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full gradient-coral flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-lg">
                    {customer.firstName[0]}{customer.lastName[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{customer.firstName} {customer.lastName}</h3>
                  <p className="text-gray-500">{customer.email}</p>
                  <div className="mt-2">
                    {getSegmentBadge(customer.segment)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xl font-bold text-coral-500">
                    ${customer.lifetimeValue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Lifetime Value</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xl font-bold text-blue-500">
                    {customer.totalVisits}
                  </p>
                  <p className="text-xs text-gray-500">Total Visits</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xl font-bold text-green-500">
                    ${customer.averageOrderValue}
                  </p>
                  <p className="text-xs text-gray-500">Avg. Order</p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to={`/admin/customers/${customer.id}`}>
                    View Profile
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to={`/admin/bookings/new?customer=${customer.id}`}>
                    Book Now
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
