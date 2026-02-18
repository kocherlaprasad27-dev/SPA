import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Award, Star, Gift, TrendingUp, Users, Crown, Gem,
  Plus, Edit, Trash2, Eye, Sparkles, Zap, Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { loyaltyTiers, customerLoyalty, coupons, customers } from '@/data/mockData';
import { toast } from 'sonner';

export function LoyaltyProgramPage() {
  const [activeTab, setActiveTab] = useState('tiers');
  const [isAddPointsOpen, setIsAddPointsOpen] = useState(false);
  const [isRedeemPointsOpen, setIsRedeemPointsOpen] = useState(false);
  const [isCreateCouponOpen, setIsCreateCouponOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Loyalty Program</h1>
          <p className="text-gray-500 mt-1">Manage rewards, points, and customer tiers</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Redeem Points Dialog */}
          <Dialog open={isRedeemPointsOpen} onOpenChange={setIsRedeemPointsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-coral-200 hover:bg-coral-50">
                <Gift className="w-4 h-4 mr-2" />
                Redeem Points
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Redeem Points</DialogTitle>
                <DialogDescription>
                  Apply customer loyalty points towards a service or product discount.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Search Customer</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input className="pl-10" placeholder="Name or email..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Available Coupons</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reward" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c1">$10 OFF (500 pts)</SelectItem>
                      <SelectItem value="c2">$25 OFF (1000 pts)</SelectItem>
                      <SelectItem value="c3">Free Add-on (750 pts)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRedeemPointsOpen(false)}>Cancel</Button>
                <Button className="gradient-coral text-white" onClick={() => {
                  toast.success('Reward redeemed successfully!');
                  setIsRedeemPointsOpen(false);
                }}>Confirm Redemption</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add Points Dialog */}
          <Dialog open={isAddPointsOpen} onOpenChange={setIsAddPointsOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-coral hover:opacity-90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Points
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Loyalty Points</DialogTitle>
                <DialogDescription>
                  Manually adjust or award points to a customer's loyalty account.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select Customer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Search customers..." />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.firstName} {c.lastName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points">Points to Add</Label>
                  <Input id="points" type="number" placeholder="e.g. 100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Adjustment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purchase">Service Purchase</SelectItem>
                      <SelectItem value="referral">Referral Bonus</SelectItem>
                      <SelectItem value="complimentary">Complimentary / Apology</SelectItem>
                      <SelectItem value="other">Manual Override</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddPointsOpen(false)}>Cancel</Button>
                <Button className="gradient-coral text-white" onClick={() => {
                  toast.success('Points added successfully!');
                  setIsAddPointsOpen(false);
                }}>Apply Adjustment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: '1,234', icon: Users, color: 'coral' },
          { label: 'Points Issued', value: '45.2K', icon: Star, color: 'yellow' },
          { label: 'Points Redeemed', value: '28.1K', icon: Gift, color: 'green' },
          { label: 'Avg. Points/Member', value: '367', icon: TrendingUp, color: 'blue' },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-soft cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toast.info(`Viewing detailed report for ${stat.label}...`)}>
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
          <TabsTrigger value="tiers">Loyalty Tiers</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
        </TabsList>

        <TabsContent value="tiers" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loyaltyTiers.map((tier, index) => (
              <Card
                key={tier.id}
                className={cn(
                  'border-0 shadow-soft overflow-hidden',
                  index === 3 && 'ring-2 ring-coral-500 ring-offset-2'
                )}
              >
                <div className={cn(
                  'h-2',
                  index === 0 && 'bg-gradient-to-r from-amber-600 to-amber-500',
                  index === 1 && 'bg-gradient-to-r from-gray-400 to-gray-300',
                  index === 2 && 'bg-gradient-to-r from-yellow-400 to-yellow-300',
                  index === 3 && 'bg-gradient-to-r from-coral-500 to-coral-400',
                )} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Award className="w-6 h-6 text-amber-600" />}
                      {index === 1 && <Star className="w-6 h-6 text-gray-500" />}
                      {index === 2 && <Crown className="w-6 h-6 text-yellow-500" />}
                      {index === 3 && <Gem className="w-6 h-6 text-coral-500" />}
                      <h3 className="text-xl font-bold">{tier.name}</h3>
                    </div>
                    <Badge variant="secondary">Level {tier.level}</Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Minimum Points</p>
                      <p className="text-2xl font-bold">{tier.minPoints.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Points Multiplier</p>
                      <p className="text-xl font-bold text-coral-500">{tier.pointsMultiplier}x</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Discount</p>
                      <p className="text-xl font-bold text-green-500">{tier.discountPercent}%</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
                    <ul className="space-y-1">
                      {Object.entries(tier.benefits).map(([key, value]) => (
                        value && (
                          <li key={key} className="text-sm text-gray-500 flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-coral-500" />
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </li>
                        )
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" className="flex-1" onClick={() => toast.info(`Editing tier settings for ${tier.name}...`)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" className="text-red-500" onClick={() => toast.info(`Are you sure you want to delete ${tier.name} tier?`)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Current Tier</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Points</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Lifetime</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Progress</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerLoyalty.map((loyalty) => (
                      <tr key={loyalty.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full gradient-coral flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {loyalty.customerId.slice(-2).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Customer #{loyalty.customerId}</p>
                              <p className="text-sm text-gray-500">Member since 2023</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className="bg-coral-100 text-coral-600">
                            {loyalty.currentTier?.name}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-lg">{loyalty.currentPoints.toLocaleString()}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium">{loyalty.lifetimePoints.toLocaleString()}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="w-32">
                            <Progress
                              value={(loyalty.currentPoints / (loyalty.currentTier?.minPoints || 100)) * 100}
                              className="h-2"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {loyalty.currentPoints} / {loyalty.currentTier?.minPoints} points
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => toast.info(`Viewing loyalty details for Customer #${loyalty.customerId}...`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
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

        <TabsContent value="transactions" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Zap className="w-16 h-16 text-coral-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700">Points Transactions</h3>
                <p className="text-gray-500 mt-2">View all points earned and redeemed</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coupons" className="space-y-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Active Coupons</h2>
            <Dialog open={isCreateCouponOpen} onOpenChange={setIsCreateCouponOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-coral text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Coupon
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Coupon</DialogTitle>
                  <DialogDescription>
                    Define a new promotional code for your loyalty members.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loyalty-code">Coupon Code</Label>
                      <Input id="loyalty-code" placeholder="e.g. LOYALTY20" className="uppercase" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loyalty-discountType">Discount Type</Label>
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
                      <Label htmlFor="loyalty-value">Discount Value</Label>
                      <Input id="loyalty-value" type="number" placeholder="20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loyalty-minPurchase">Min. Purchase ($)</Label>
                      <Input id="loyalty-minPurchase" type="number" placeholder="50" />
                    </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <Card key={coupon.id} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={cn(
                      coupon.status === 'active' && 'bg-green-100 text-green-600',
                      coupon.status === 'inactive' && 'bg-gray-100 text-gray-600',
                      coupon.status === 'expired' && 'bg-red-100 text-red-600',
                    )}>
                      {coupon.status}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {coupon.usageCount} / {coupon.usageLimitTotal} used
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-coral-500 to-coral-400 rounded-xl p-4 text-white mb-4">
                    <p className="text-3xl font-bold">{coupon.code}</p>
                    <p className="text-sm opacity-90">{coupon.name}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Discount</span>
                      <span className="font-medium">
                        {coupon.discountType === 'percentage'
                          ? `${coupon.discountValue}%`
                          : `$${coupon.discountValue}`
                        }
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Min. Purchase</span>
                      <span className="font-medium">${coupon.minPurchaseAmount}</span>
                    </div>
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

                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" className="flex-1" onClick={() => toast.info(`Editing coupon ${coupon.code}...`)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" className="text-red-500" onClick={() => toast.success(`Coupon ${coupon.code} has been deactivated.`)}>
                      <Trash2 className="w-4 h-4" />
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
