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
  Search, Plus, Filter, MoreHorizontal, Mail, Phone, Star, Calendar,
  DollarSign, TrendingUp, Award, Edit, Trash2, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { employees, employeePerformance } from '@/data/mockData';
import { toast } from 'sonner';

export function EmployeeManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPerformance = (employeeId: string) => {
    return employeePerformance.find(ep => ep.employeeId === employeeId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Employees</h1>
          <p className="text-gray-500 mt-1">Manage your staff and therapists</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50" onClick={() => toast.info('Staff filter options opening...')}>
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] hover:opacity-90 text-white shadow-md shadow-indigo-500/20" asChild>
            <Link to="/admin/employees/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <p className="text-3xl font-bold text-indigo-600">{employees.length}</p>
            <p className="text-sm text-gray-500">Total Employees</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <p className="text-3xl font-bold text-green-500">4</p>
            <p className="text-sm text-gray-500">Available Today</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <p className="text-3xl font-bold text-blue-500">2</p>
            <p className="text-sm text-gray-500">On Leave</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <p className="text-3xl font-bold text-purple-500">$45K</p>
            <p className="text-sm text-gray-500">Monthly Payroll</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <Tabs defaultValue="all" onValueChange={setStatusFilter}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="on_leave">On Leave</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => {
                      const performance = getPerformance(employee.id);
                      return (
                        <TableRow key={employee.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                  {employee.firstName[0]}{employee.lastName[0]}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">
                                  {employee.firstName} {employee.lastName}
                                </p>
                                <p className="text-sm text-gray-500">{employee.employeeCode}</p>
                              </div>
                              {employee.isVipTherapist && (
                                <Award className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">{employee.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">{employee.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium text-sm">{employee.designation}</p>
                            <p className="text-sm text-gray-500">{employee.department}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {employee.specializationTags.slice(0, 2).map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {employee.specializationTags.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{employee.specializationTags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {performance ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  <span className="font-medium">{performance.averageRating}</span>
                                  <span className="text-sm text-gray-500">({performance.totalBookings} bookings)</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="text-gray-500">
                                    <DollarSign className="w-3 h-3 inline" />
                                    {performance.totalRevenue.toLocaleString()}
                                  </span>
                                  <span className="text-gray-500">
                                    <TrendingUp className="w-3 h-3 inline" />
                                    {performance.utilizationRate}%
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">No data</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={cn(
                              employee.status === 'active' && 'bg-green-100 text-green-600',
                              employee.status === 'on_leave' && 'bg-yellow-100 text-yellow-600',
                              employee.status === 'inactive' && 'bg-gray-100 text-gray-600',
                            )}>
                              {employee.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => toast.info(`Viewing profile for ${employee.firstName}...`)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast.info(`Editing employee ${employee.firstName}...`)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Employee
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast.info(`Opening schedule for ${employee.firstName}...`)}>
                                  <Calendar className="w-4 h-4 mr-2" />
                                  View Schedule
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast.info(`Viewing payroll for ${employee.firstName}...`)}>
                                  <DollarSign className="w-4 h-4 mr-2" />
                                  View Payroll
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500" onClick={() => toast.success(`${employee.firstName} has been deactivated.`)}>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Deactivate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {filteredEmployees.map((employee) => (
                  <Card key={employee.id} className="border border-gray-100 shadow-sm overflow-hidden border-l-4 border-l-indigo-500">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center shrink-0 shadow-sm">
                            <span className="text-white font-bold text-lg">
                              {employee.firstName[0]}{employee.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900 leading-tight">{employee.firstName} {employee.lastName}</h3>
                              {employee.isVipTherapist && <Award className="w-4 h-4 text-amber-500" />}
                            </div>
                            <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider mt-0.5">{employee.designation}</p>
                          </div>
                        </div>
                        <Badge className={cn(
                          "text-[10px] px-2 h-5 rounded-full",
                          employee.status === 'active' && 'bg-green-100 text-green-700 border-green-200',
                          employee.status === 'on_leave' && 'bg-amber-100 text-amber-700 border-amber-200',
                          employee.status === 'inactive' && 'bg-gray-100 text-gray-600 border-gray-200',
                        )}>
                          {employee.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-gray-50">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            <span className="truncate max-w-[120px]">{employee.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {employee.phone}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{getPerformance(employee.id)?.averageRating || '-'}</span>
                            <span className="text-gray-400">Rating</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                            <span className="font-medium">{getPerformance(employee.id)?.utilizationRate || 0}%</span>
                            <span className="text-gray-400">Util.</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs" onClick={() => toast.info(`Viewing profile...`)}>
                          Profile
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs" onClick={() => toast.info(`Schedule...`)}>
                          Schedule
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-red-500" onClick={() => toast.success('Deactivated')}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Deactivate
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

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.slice(0, 3).map((employee) => (
          <Card key={employee.id} className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-semibold text-lg">
                    {employee.firstName[0]}{employee.lastName[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{employee.firstName} {employee.lastName}</h3>
                    {employee.isVipTherapist && <Award className="w-5 h-5 text-yellow-500" />}
                  </div>
                  <p className="text-gray-500">{employee.designation}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {employee.specializationTags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xl font-bold text-indigo-600">
                    {getPerformance(employee.id)?.totalBookings || 0}
                  </p>
                  <p className="text-xs text-gray-500">Bookings</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xl font-bold text-green-500">
                    {getPerformance(employee.id)?.averageRating || '-'}
                  </p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xl font-bold text-blue-500">
                    {getPerformance(employee.id)?.utilizationRate || 0}%
                  </p>
                  <p className="text-xs text-gray-500">Utilization</p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => toast.info(`Viewing full profile for ${employee.firstName}...`)}>
                  View Profile
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => toast.info(`Opening weekly schedule for ${employee.firstName}...`)}>
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
