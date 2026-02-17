import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreditCard, DollarSign, TrendingUp, TrendingDown, Download, FileText,
  Clock, ArrowUpRight, ArrowDownRight, Wallet, Gift,
  Receipt, Plus, Filter, Search, Send
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { invoices, giftCards } from '@/data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const paymentData = [
  { date: 'Mon', revenue: 2400, refunds: 200 },
  { date: 'Tue', revenue: 3200, refunds: 150 },
  { date: 'Wed', revenue: 2800, refunds: 300 },
  { date: 'Thu', revenue: 4100, refunds: 100 },
  { date: 'Fri', revenue: 3800, refunds: 250 },
  { date: 'Sat', revenue: 5200, refunds: 0 },
  { date: 'Sun', revenue: 4800, refunds: 100 },
];

export function PaymentBillingPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Payments & Billing</h1>
          <p className="text-gray-500 mt-1">Manage transactions, invoices, and financial reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-coral-200 hover:bg-coral-50" onClick={() => toast.info('Exporting financial reports...')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="gradient-coral hover:opacity-90 text-white" onClick={() => toast.info('New invoice builder opening...')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$125,840', change: '+12.5%', icon: DollarSign, trend: 'up' },
          { label: 'Today', value: '$4,250', change: '+8.2%', icon: TrendingUp, trend: 'up' },
          { label: 'Pending', value: '$12,450', change: '-2.1%', icon: Clock, trend: 'down' },
          { label: 'Refunds', value: '$1,240', change: '+5.3%', icon: TrendingDown, trend: 'up' },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-soft cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toast.info(`Viewing detailed analytics for ${stat.label}...`)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-500" />
                    )}
                    <span className={cn(
                      'text-xs',
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    )}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-coral-100 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-coral-500" />
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
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="giftcards">Gift Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Revenue Chart */}
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-600">
                  +12.5% vs last week
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={paymentData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F08080" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F08080" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
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
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-soft cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toast.info('Opening credit card transaction reports...')}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Credit Cards</h3>
                    <p className="text-sm text-gray-500">65% of payments</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">$81,796</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Digital Wallets</h3>
                    <p className="text-sm text-gray-500">25% of payments</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">$31,460</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Gift Cards</h3>
                    <p className="text-sm text-gray-500">10% of payments</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">$12,584</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search transactions..." className="pl-10 w-64" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Transaction ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.slice(0, 5).map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-medium text-coral-500">{invoice.invoiceNumber}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium">Customer #{invoice.customerId?.slice(-4)}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-gray-600">{invoice.issueDate}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold">${invoice.totalAmount}</p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={cn(
                            invoice.status === 'paid' && 'bg-green-100 text-green-600',
                            invoice.status === 'sent' && 'bg-blue-100 text-blue-600',
                            invoice.status === 'overdue' && 'bg-red-100 text-red-600',
                            invoice.status === 'draft' && 'bg-gray-100 text-gray-600',
                            invoice.status === 'refunded' && 'bg-gray-100 text-gray-600',
                          )}>
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => toast.success(`Receipt for ${invoice.invoiceNumber} sent to printer!`)}>
                            <Receipt className="w-4 h-4 mr-2" />
                            Receipt
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

        <TabsContent value="invoices" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Invoices</CardTitle>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Invoice #</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Issue Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-medium text-coral-500">{invoice.invoiceNumber}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium">Customer #{invoice.customerId?.slice(-4)}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-gray-600">{invoice.issueDate}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold">${invoice.totalAmount}</p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={cn(
                            invoice.status === 'paid' && 'bg-green-100 text-green-600',
                            invoice.status === 'sent' && 'bg-blue-100 text-blue-600',
                            invoice.status === 'overdue' && 'bg-red-100 text-red-600',
                            invoice.status === 'draft' && 'bg-gray-100 text-gray-600',
                          )}>
                            {invoice.status}
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

        <TabsContent value="giftcards" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftCards.map((card) => (
              <Card key={card.id} className="border-0 shadow-soft overflow-hidden">
                <div className="gradient-coral p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Gift className="w-8 h-8" />
                    <Badge className="bg-white/20 text-white">
                      {card.status}
                    </Badge>
                  </div>
                  <p className="text-3xl font-bold">${card.remainingBalance}</p>
                  <p className="text-sm opacity-80">Remaining Balance</p>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Card Number</span>
                      <span className="font-medium">{card.cardNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Initial Amount</span>
                      <span className="font-medium">${card.initialAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Expires</span>
                      <span className="font-medium">{card.expiryDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1" onClick={() => toast.info(`Viewing transaction history for ${card.cardNumber}...`)}>
                      View Details
                    </Button>
                    <Button className="gradient-coral text-white" onClick={() => toast.success('Gift card balance details sent to customer!')}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
