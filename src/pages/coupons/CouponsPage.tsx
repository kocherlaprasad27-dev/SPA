import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Ticket, Plus, Search, Users, DollarSign,
  Copy, Edit, Trash2, Percent, Tag, Gift, CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { coupons } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateCouponOpen, setIsCreateCouponOpen] = useState(false);

  const stats = {
    totalCoupons: 45,
    activeCoupons: 23,
    totalRedemptions: 1234,
    totalDiscount: 12560,
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied to clipboard');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Coupons</h1>
          <p className="text-gray-500 mt-1">Create and manage promotional codes</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isCreateCouponOpen} onOpenChange={setIsCreateCouponOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-coral hover:opacity-90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Coupon
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Coupon</DialogTitle>
                <DialogDescription>
                  Define a new promotional code for your customers.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Coupon Code</Label>
                    <Input id="code" placeholder="e.g. SUMMER24" className="uppercase" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountType">Discount Type</Label>
                    <Select defaultValue="percentage">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                        <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value">Discount Value</Label>
                    <Input id="value" type="number" placeholder="20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minPurchase">Min. Purchase ($)</Label>
                    <Input id="minPurchase" type="number" placeholder="50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit">Usage Limit (Total)</Label>
                  <Input id="limit" type="number" placeholder="100" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateCouponOpen(false)}>Cancel</Button>
                <Button className="gradient-coral text-white" onClick={() => {
                  toast.success('Coupon created successfully!');
                  setIsCreateCouponOpen(false);
                }}>Create Coupon</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Coupons', value: stats.totalCoupons.toString(), icon: Ticket, color: 'coral' },
          { label: 'Active', value: stats.activeCoupons.toString(), icon: CheckCircle, color: 'green' },
          { label: 'Redemptions', value: stats.totalRedemptions.toLocaleString(), icon: Users, color: 'blue' },
          { label: 'Total Discount', value: `$${stats.totalDiscount.toLocaleString()}`, icon: DollarSign, color: 'purple' },
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
          <TabsTrigger value="all">All Coupons</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search coupons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>

          {/* Coupons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <Card key={coupon.id} className="border-0 shadow-soft overflow-hidden">
                {/* Coupon Header */}
                <div className={cn(
                  'p-6 text-white relative overflow-hidden',
                  coupon.status === 'active' ? 'gradient-coral' : 'bg-gray-400'
                )}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {coupon.discountType === 'percentage' ? (
                          <Percent className="w-5 h-5" />
                        ) : (
                          <DollarSign className="w-5 h-5" />
                        )}
                        <Badge className="bg-white/20 text-white">
                          {coupon.status}
                        </Badge>
                      </div>
                      <span className="text-sm opacity-80">
                        {coupon.usageCount} / {coupon.usageLimitTotal} used
                      </span>
                    </div>
                    <p className="text-4xl font-bold">
                      {coupon.discountType === 'percentage'
                        ? `${coupon.discountValue}%`
                        : `$${coupon.discountValue}`
                      }
                    </p>
                    <p className="text-sm opacity-80">{coupon.name}</p>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Coupon Code */}
                  <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg mb-4">
                    <code className="font-mono font-bold text-lg">{coupon.code}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCode(coupon.code)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Min. Purchase</span>
                      <span className="font-medium">${coupon.minPurchaseAmount}</span>
                    </div>
                    {coupon.maxDiscountAmount && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Max Discount</span>
                        <span className="font-medium">${coupon.maxDiscountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Valid Until</span>
                      <span className="font-medium">
                        {coupon.validUntil
                          ? new Date(coupon.validUntil).toLocaleDateString()
                          : 'No expiry'
                        }
                      </span>
                    </div>
                  </div>

                  {/* Usage Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Usage</span>
                      <span className="font-medium">
                        {Math.round((coupon.usageCount / (coupon.usageLimitTotal || 100)) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(coupon.usageCount / (coupon.usageLimitTotal || 100)) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Coupon Types */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Coupon Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Percentage Off', icon: Percent, description: 'e.g., 20% off' },
              { name: 'Fixed Amount', icon: DollarSign, description: 'e.g., $25 off' },
              { name: 'Free Service', icon: Gift, description: 'Complimentary service' },
              { name: 'Bundle Deal', icon: Tag, description: 'Multi-service discount' },
            ].map((type, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-coral-50 hover:border-coral-200"
              >
                <type.icon className="w-6 h-6 text-coral-500" />
                <span className="font-medium">{type.name}</span>
                <span className="text-xs text-gray-500">{type.description}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
