import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Crown, Plus, Users, Calendar, Check, DollarSign, TrendingUp,
  Gift, Zap, Edit, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { membershipPlans, customerMemberships } from '@/data/mockData';

export function MembershipPackagesPage() {
  const [activeTab, setActiveTab] = useState('plans');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Memberships & Packages</h1>
          <p className="text-gray-500 mt-1">Manage membership plans and prepaid packages</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="gradient-coral hover:opacity-90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Plan
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Members', value: '234', icon: Users, color: 'coral' },
          { label: 'Total Revenue', value: '$45.2K', icon: DollarSign, color: 'green' },
          { label: 'Renewal Rate', value: '78%', icon: TrendingUp, color: 'blue' },
          { label: 'Avg. Duration', value: '6.5 mo', icon: Calendar, color: 'purple' },
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
          <TabsTrigger value="plans">Membership Plans</TabsTrigger>
          <TabsTrigger value="packages">Prepaid Packages</TabsTrigger>
          <TabsTrigger value="members">Active Members</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {membershipPlans.map((plan, index) => (
              <Card 
                key={plan.id} 
                className={cn(
                  'border-0 shadow-soft overflow-hidden',
                  index === 1 && 'ring-2 ring-coral-500 ring-offset-2'
                )}
              >
                <div className={cn(
                  'h-2',
                  index === 0 && 'bg-gradient-to-r from-gray-400 to-gray-300',
                  index === 1 && 'bg-gradient-to-r from-coral-500 to-coral-400',
                  index === 2 && 'bg-gradient-to-r from-purple-500 to-purple-400',
                  index === 3 && 'bg-gradient-to-r from-blue-500 to-blue-400',
                )} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Crown className={cn('w-6 h-6', 
                        index === 0 && 'text-gray-500',
                        index === 1 && 'text-coral-500',
                        index === 2 && 'text-purple-500',
                        index === 3 && 'text-blue-500',
                      )} />
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                    </div>
                    <Badge variant="secondary">{plan.planType.replace('_', ' ')}</Badge>
                  </div>

                  <div className="mb-6">
                    <p className="text-4xl font-bold text-gray-800">${plan.price}</p>
                    <p className="text-sm text-gray-500">
                      {plan.durationMonths && `/${plan.durationMonths} months`}
                      {plan.totalVisits && ` for ${plan.totalVisits} visits`}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-sm">{plan.benefits.discountPercent}% discount on all services</span>
                    </div>
                    {plan.benefits.priorityBooking && (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Priority booking</span>
                      </div>
                    )}
                    {plan.benefits.freeUpgrades && (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-sm">Free upgrades</span>
                      </div>
                    )}
                    {plan.benefits.guestPasses && (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-sm">{plan.benefits.guestPasses} guest passes</span>
                      </div>
                    )}
                  </div>

                  {plan.isAutoRenewal && (
                    <div className="flex items-center gap-2 p-3 bg-coral-50 rounded-lg mb-4">
                      <Zap className="w-4 h-4 text-coral-500" />
                      <span className="text-sm text-coral-600">Auto-renewal enabled</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button className="gradient-coral text-white flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="packages" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-12 text-center">
              <Gift className="w-16 h-16 text-coral-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">Prepaid Packages</h3>
              <p className="text-gray-500 mt-2">Create and manage prepaid service packages</p>
              <Button className="mt-4 gradient-coral text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Package
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Member</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Plan</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Start Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">End Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerMemberships.map((membership) => (
                      <tr key={membership.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full gradient-coral flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {membership.customerId.slice(-2).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">Customer #{membership.customerId}</p>
                              <p className="text-sm text-gray-500">{membership.membershipNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className="bg-coral-100 text-coral-600">
                            {membership.membershipPlan?.name}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-gray-600">{membership.startDate}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-gray-600">{membership.endDate}</p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={cn(
                            membership.status === 'active' && 'bg-green-100 text-green-600',
                            membership.status === 'expired' && 'bg-red-100 text-red-600',
                            membership.status === 'frozen' && 'bg-yellow-100 text-yellow-600',
                          )}>
                            {membership.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button variant="ghost" size="sm">
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
      </Tabs>
    </div>
  );
}
