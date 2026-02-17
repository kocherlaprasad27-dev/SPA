import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Users, DollarSign, Calendar,
  Star, Download, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Line
} from 'recharts';
import { toast } from 'sonner';

const revenueData = [
  { month: 'Jan', revenue: 45000, target: 40000 },
  { month: 'Feb', revenue: 52000, target: 45000 },
  { month: 'Mar', revenue: 48000, target: 50000 },
  { month: 'Apr', revenue: 61000, target: 55000 },
  { month: 'May', revenue: 58000, target: 60000 },
  { month: 'Jun', revenue: 67000, target: 65000 },
];

const serviceData = [
  { name: 'Massage', value: 35, color: '#F08080' },
  { name: 'Facial', value: 25, color: '#F4978E' },
  { name: 'Nails', value: 20, color: '#F8AD9D' },
  { name: 'Body', value: 15, color: '#FBC4AB' },
  { name: 'Other', value: 5, color: '#FFDAB9' },
];

const customerData = [
  { month: 'Jan', new: 45, returning: 120 },
  { month: 'Feb', new: 52, returning: 135 },
  { month: 'Mar', new: 48, returning: 142 },
  { month: 'Apr', new: 61, returning: 158 },
  { month: 'May', new: 58, returning: 165 },
  { month: 'Jun', new: 67, returning: 178 },
];

export function AnalyticsReportingPage() {
  const [timeRange, setTimeRange] = useState('month');

  const kpiCards = [
    { label: 'Total Revenue', value: '$326,000', change: '+15.3%', trend: 'up', icon: DollarSign },
    { label: 'Total Bookings', value: '1,456', change: '+8.7%', trend: 'up', icon: Calendar },
    { label: 'New Customers', value: '331', change: '+12.1%', trend: 'up', icon: Users },
    { label: 'Avg. Rating', value: '4.8', change: '+0.2', trend: 'up', icon: Star },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Analytics & Reporting</h1>
          <p className="text-gray-500 mt-1">Track performance metrics and business insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="outline" className="border-coral-200 hover:bg-coral-50" onClick={() => toast.info(`Exporting ${timeRange} report...`)}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="border-0 shadow-soft cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toast.info(`Viewing detailed trend analysis for ${kpi.label}...`)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-500" />
                    )}
                    <span className={cn(
                      'text-xs',
                      kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    )}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-coral-100 flex items-center justify-center">
                  <kpi.icon className="w-5 h-5 text-coral-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="revenue">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2 border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Revenue vs Target</CardTitle>
                <Badge className="bg-green-100 text-green-600">+8.5% above target</Badge>
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
                      <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip
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
                      <Line type="monotone" dataKey="target" stroke="#9ca3af" strokeDasharray="5 5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Revenue by Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {serviceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top Performing Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Swedish Massage', bookings: 245, revenue: 23275, rating: 4.9, trend: 12 },
                  { name: 'Classic Facial', bookings: 198, revenue: 16830, rating: 4.8, trend: 8 },
                  { name: 'Deep Tissue Massage', bookings: 189, revenue: 27405, rating: 4.8, trend: 15 },
                  { name: 'Deluxe Manicure', bookings: 267, revenue: 12015, rating: 4.7, trend: 5 },
                  { name: 'Spa Pedicure', bookings: 203, revenue: 13195, rating: 4.6, trend: -2 },
                ].map((service, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.info(`Viewing detailed performance for ${service.name}...`)}>
                    <div className="w-10 h-10 rounded-lg gradient-coral flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{service.name}</h4>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{service.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{service.bookings} bookings</span>
                        <span>${service.revenue.toLocaleString()} revenue</span>
                        <span className={service.trend >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {service.trend >= 0 ? '+' : ''}{service.trend}%
                        </span>
                      </div>
                    </div>
                    <Progress value={(service.bookings / 300) * 100} className="w-24 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Customer Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="new" fill="#F08080" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="returning" fill="#F8AD9D" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
