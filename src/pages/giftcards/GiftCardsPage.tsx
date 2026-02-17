import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Gift, Plus, Search, TrendingUp, DollarSign,
  CheckCircle, Send, Download, QrCode
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { giftCards } from '@/data/mockData';

export function GiftCardsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    totalSold: 245,
    totalValue: 45250,
    totalRedeemed: 189,
    outstandingBalance: 12450,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Gift Cards</h1>
          <p className="text-gray-500 mt-1">Manage gift card sales and redemptions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-coral-200 hover:bg-coral-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="gradient-coral hover:opacity-90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Gift Card
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sold', value: stats.totalSold.toString(), icon: Gift, color: 'coral' },
          { label: 'Total Value', value: `$${stats.totalValue.toLocaleString()}`, icon: DollarSign, color: 'green' },
          { label: 'Redeemed', value: stats.totalRedeemed.toString(), icon: CheckCircle, color: 'blue' },
          { label: 'Outstanding', value: `$${stats.outstandingBalance.toLocaleString()}`, icon: TrendingUp, color: 'purple' },
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
      <Tabs defaultValue="all">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="all">All Cards</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search gift cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>

          {/* Gift Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftCards.map((card) => (
              <Card key={card.id} className="border-0 shadow-soft overflow-hidden">
                {/* Card Design */}
                <div className="gradient-coral p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Gift className="w-8 h-8" />
                      <Badge className="bg-white/20 text-white">
                        {card.status}
                      </Badge>
                    </div>
                    <p className="text-4xl font-bold">${card.remainingBalance}</p>
                    <p className="text-sm opacity-80">Remaining Balance</p>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Card Number</span>
                      <span className="font-medium font-mono">{card.cardNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Initial Amount</span>
                      <span className="font-medium">${card.initialAmount}</span>
                    </div>
                    {card.recipientName && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Recipient</span>
                        <span className="font-medium">{card.recipientName}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Expires</span>
                      <span className="font-medium">{card.expiryDate}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1">
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Code
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Plus className="w-6 h-6 text-coral-500" />
              <span className="text-sm">Create New</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <QrCode className="w-6 h-6 text-coral-500" />
              <span className="text-sm">Scan Card</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-coral-500" />
              <span className="text-sm">Check Balance</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Download className="w-6 h-6 text-coral-500" />
              <span className="text-sm">Export Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
