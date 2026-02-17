import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Users, TrendingUp, Heart, MessageSquare,
  Star, Target, Mail, UserCheck, DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { customers, customerSegments, recentActivities } from '@/data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { toast } from 'sonner';

const COLORS = ['#F08080', '#F4978E', '#F8AD9D', '#FBC4AB', '#FFDAB9'];

export function CRMDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Customer segment data for pie chart
  const segmentData = customerSegments.map((segment, index) => ({
    name: segment.label,
    value: customers.filter(c => c.segment === segment.value).length,
    color: COLORS[index % COLORS.length],
  }));

  // RFM Analysis data
  const rfmData = [
    { name: 'Champions', count: 15, value: 45000 },
    { name: 'Loyal', count: 28, value: 38000 },
    { name: 'Potential', count: 22, value: 25000 },
    { name: 'New', count: 18, value: 12000 },
    { name: 'At Risk', count: 12, value: 15000 },
    { name: 'Lost', count: 8, value: 5000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">CRM Dashboard</h1>
          <p className="text-gray-500 mt-1">Customer Relationship Management & Analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-coral-200 hover:bg-coral-50" onClick={() => toast.info('Email campaign manager opening...')}>
            <Mail className="w-4 h-4 mr-2" />
            Email Campaign
          </Button>
          <Button className="gradient-coral hover:opacity-90 text-white" onClick={() => toast.info('New campaign builder loading...')}>
            <Target className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: '1,234', change: '+5.2%', icon: Users, color: 'coral' },
          { label: 'Active Customers', value: '892', change: '+3.8%', icon: UserCheck, color: 'green' },
          { label: 'Avg. Lifetime Value', value: '$2,450', change: '+8.1%', icon: DollarSign, color: 'blue' },
          { label: 'Retention Rate', value: '78%', change: '+2.3%', icon: Heart, color: 'purple' },
        ].map((metric, index) => (
          <Card key={index} className="border-0 shadow-soft cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toast.info(`Viewing detailed analytics for ${metric.label}...`)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-500">{metric.change}</span>
                  </div>
                </div>
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', `bg-${metric.color}-100`)}>
                  <metric.icon className={cn('w-5 h-5', `text-${metric.color}-500`)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="rfm">RFM Analysis</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Segments Chart */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={segmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {segmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {segmentData.map((segment, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                      <span className="text-sm text-gray-600">{segment.name}</span>
                      <span className="text-sm font-medium">({segment.value})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Journey */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Customer Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { stage: 'Awareness', count: 450, percentage: 100, color: 'bg-coral-200' },
                    { stage: 'Interest', count: 320, percentage: 71, color: 'bg-coral-300' },
                    { stage: 'Consideration', count: 210, percentage: 47, color: 'bg-coral-400' },
                    { stage: 'Conversion', count: 156, percentage: 35, color: 'bg-coral-500' },
                    { stage: 'Retention', count: 134, percentage: 30, color: 'bg-coral-600' },
                  ].map((stage, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700">{stage.stage}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">{stage.count} customers</span>
                          <span className="text-sm font-medium text-coral-500">{stage.percentage}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full transition-all duration-500', stage.color)}
                          style={{ width: `${stage.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Customer Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50">
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                      activity.type === 'booking' && 'bg-blue-100 text-blue-600',
                      activity.type === 'payment' && 'bg-green-100 text-green-600',
                      activity.type === 'customer' && 'bg-purple-100 text-purple-600',
                      activity.type === 'review' && 'bg-yellow-100 text-yellow-600',
                    )}>
                      <Star className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
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
        </TabsContent>

        <TabsContent value="segments" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerSegments.map((segment, index) => {
              const segmentCustomers = customers.filter(c => c.segment === segment.value);
              const avgLTV = segmentCustomers.reduce((acc, c) => acc + c.lifetimeValue, 0) / segmentCustomers.length || 0;

              return (
                <Card key={segment.value} className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={cn('text-white', segment.color)}>
                        {segment.label}
                      </Badge>
                      <span className="text-2xl font-bold">{segmentCustomers.length}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{segment.description}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Avg. Lifetime Value</span>
                        <span className="font-medium">${avgLTV.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Visits</span>
                        <span className="font-medium">
                          {segmentCustomers.reduce((acc, c) => acc + c.totalVisits, 0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <Button variant="outline" className="flex-1 text-sm" onClick={() => toast.info(`Listing customers in ${segment.label} segment...`)}>
                        View Customers
                      </Button>
                      <Button className="gradient-coral text-white text-sm" onClick={() => toast.info(`Starting targeted campaign for ${segment.label}...`)}>
                        Campaign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="rfm" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">RFM Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rfmData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="count" fill="#F08080" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-coral-100 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-coral-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Campaigns</h3>
                    <p className="text-sm text-gray-500">12 active campaigns</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Sent</span>
                    <span className="font-medium">45,230</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Open Rate</span>
                    <span className="font-medium text-green-500">28.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Click Rate</span>
                    <span className="font-medium text-green-500">12.3%</span>
                  </div>
                </div>
                <Button className="w-full mt-4 gradient-coral text-white" onClick={() => toast.info('Initializing email campaign wizard...')}>
                  Create Email Campaign
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">SMS Campaigns</h3>
                    <p className="text-sm text-gray-500">8 active campaigns</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Sent</span>
                    <span className="font-medium">12,450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Rate</span>
                    <span className="font-medium text-green-500">98.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Response Rate</span>
                    <span className="font-medium text-green-500">8.7%</span>
                  </div>
                </div>
                <Button className="w-full mt-4 gradient-coral text-white" onClick={() => toast.info('Initializing SMS campaign wizard...')}>
                  Create SMS Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
