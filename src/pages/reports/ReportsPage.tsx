import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText, Download, Calendar, Clock, Mail, Plus, Filter,
  TrendingUp, DollarSign, Users, Star, BarChart3, PieChart,
  CheckCircle, Clock as ClockIcon, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { savedReports } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);

  const reportTemplates = [
    { name: 'Revenue Summary', category: 'Financial', icon: DollarSign },
    { name: 'Booking Analytics', category: 'Operations', icon: BarChart3 },
    { name: 'Customer Report', category: 'CRM', icon: Users },
    { name: 'Employee Performance', category: 'HR', icon: Star },
    { name: 'Inventory Status', category: 'Inventory', icon: PieChart },
    { name: 'Service Popularity', category: 'Services', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Reports</h1>
          <p className="text-gray-500 mt-1">Generate and schedule business reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isCreateReportOpen} onOpenChange={setIsCreateReportOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-coral hover:opacity-90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate Business Report</DialogTitle>
                <DialogDescription>Select specific parameters to generate your custom report.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Report Template</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select report type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue Summary</SelectItem>
                      <SelectItem value="bookings">Booking Analytics</SelectItem>
                      <SelectItem value="customers">Customer Retention</SelectItem>
                      <SelectItem value="inventory">Inventory Status</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>From Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>To Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateReportOpen(false)}>Cancel</Button>
                <Button className="gradient-coral text-white" onClick={() => {
                  toast.success('Report generation started!');
                  setIsCreateReportOpen(false);
                }}>Generate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Scheduled', value: '12', icon: Clock, color: 'coral' },
          { label: 'Generated Today', value: '8', icon: FileText, color: 'blue' },
          { label: 'Email Recipients', value: '24', icon: Mail, color: 'green' },
          { label: 'Storage Used', value: '2.4GB', icon: BarChart3, color: 'purple' },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-soft">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', `bg-${stat.color}-100`)}>
                <stat.icon className={cn('w-6 h-6', `text-${stat.color}-500`)} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100">
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {savedReports.map((report) => (
              <Card key={report.id} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-coral-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-coral-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{report.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{report.reportType}</p>
                      </div>
                    </div>
                    <Badge className={report.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}>
                      {report.isActive ? 'Active' : 'Paused'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Frequency</p>
                      <p className="font-medium capitalize">{report.scheduleFrequency}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Next Run</p>
                      <p className="font-medium">{report.nextRunAt ? new Date(report.nextRunAt).toLocaleDateString() : '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {report.emailRecipients.length} recipients
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template, index) => (
              <Card key={index} className="border-0 shadow-soft hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-coral-100 flex items-center justify-center">
                      <template.icon className="w-6 h-6 text-coral-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge variant="secondary">{template.category}</Badge>
                    </div>
                  </div>
                  <Button className="w-full gradient-coral text-white">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Report</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Generated</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Monthly Revenue Report', date: '2024-02-01 09:00', status: 'completed' },
                      { name: 'Weekly Employee Performance', date: '2024-02-12 08:00', status: 'completed' },
                      { name: 'Daily Booking Summary', date: '2024-02-15 07:00', status: 'completed' },
                      { name: 'Customer Analytics', date: '2024-02-14 10:00', status: 'completed' },
                    ].map((report, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-coral-500" />
                            <span className="font-medium">{report.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-600">{report.date}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className="bg-green-100 text-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {report.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
