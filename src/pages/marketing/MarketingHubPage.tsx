import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Megaphone, Mail, MessageSquare, Plus, Send, Eye, MousePointer,
  Edit, Copy, BarChart3, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { emailTemplates, marketingCampaigns } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const campaignData = [
  { name: 'Valentine Special', sent: 450, opened: 289, clicked: 87 },
  { name: 'New Year Wellness', sent: 320, opened: 198, clicked: 45 },
  { name: 'Spring Refresh', sent: 280, opened: 156, clicked: 62 },
];

export function MarketingHubPage() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Marketing Hub</h1>
          <p className="text-gray-500 mt-1">Create and manage marketing campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-coral hover:opacity-90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create Marketing Campaign</DialogTitle>
                <DialogDescription>Launch a new promotion or update to your customers.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Campaign Name</Label>
                  <Input placeholder="e.g. Summer Glow Sale" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Channel</Label>
                    <Select defaultValue="email">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email Campaign</SelectItem>
                        <SelectItem value="sms">SMS Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Audience</Label>
                    <Select defaultValue="all">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        <SelectItem value="vip">VIP Only</SelectItem>
                        <SelectItem value="recent">Recent Visitors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Message Content</Label>
                  <Textarea placeholder="Type your marketing message here..." className="h-24" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewCampaignOpen(false)}>Cancel</Button>
                <Button className="gradient-coral text-white" onClick={() => {
                  toast.success('Campaign launched effectively!');
                  setIsNewCampaignOpen(false);
                }}>Launch Campaign</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Campaigns', value: '24', icon: Megaphone, color: 'coral' },
          { label: 'Emails Sent', value: '12.5K', icon: Mail, color: 'blue' },
          { label: 'Open Rate', value: '28.5%', icon: Eye, color: 'green' },
          { label: 'Click Rate', value: '12.3%', icon: MousePointer, color: 'purple' },
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
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketingCampaigns.map((campaign) => (
              <Card key={campaign.id} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {campaign.campaignType === 'email' && <Mail className="w-5 h-5 text-coral-500" />}
                        {campaign.campaignType === 'sms' && <MessageSquare className="w-5 h-5 text-green-500" />}
                        <h3 className="text-lg font-semibold">{campaign.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500">{campaign.description}</p>
                    </div>
                    <Badge className={cn(
                      campaign.status === 'sent' && 'bg-green-100 text-green-600',
                      campaign.status === 'draft' && 'bg-gray-100 text-gray-600',
                      campaign.status === 'scheduled' && 'bg-blue-100 text-blue-600',
                    )}>
                      {campaign.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xl font-bold">{campaign.totalRecipients}</p>
                      <p className="text-xs text-gray-500">Recipients</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xl font-bold">{campaign.totalSent}</p>
                      <p className="text-xs text-gray-500">Sent</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xl font-bold text-green-600">
                        {((campaign.totalOpened / campaign.totalDelivered) * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-500">Open Rate</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xl font-bold text-coral-600">
                        {((campaign.totalClicked / campaign.totalOpened) * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-500">Click Rate</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => toast.info(`Viewing detailed analytics for ${campaign.name}...`)}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => toast.success(`${campaign.name} campaign duplicated!`)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emailTemplates.map((template) => (
              <Card key={template.id} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-coral-500" />
                    <h3 className="font-semibold">{template.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Subject: {template.subject}</p>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600 line-clamp-3 mb-4">
                    {template.bodyHtml.replace(/<[^>]*>/g, '')}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.variables.map((variable, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {'{{'}{variable}{'}}'}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => toast.info(`Opening editor for ${template.name}...`)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button className="gradient-coral text-white flex-1" onClick={() => toast.info(`Template ${template.name} is ready to use!`)}>
                      <Send className="w-4 h-4 mr-2" />
                      Use
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Welcome Series', trigger: 'New signup', status: 'active', sends: 456 },
              { name: 'Birthday Wishes', trigger: 'Birthday', status: 'active', sends: 89 },
              { name: 'Booking Reminder', trigger: '24h before', status: 'active', sends: 1234 },
              { name: 'Review Request', trigger: 'After service', status: 'paused', sends: 567 },
            ].map((workflow, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-coral-100 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-coral-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{workflow.name}</h3>
                        <p className="text-sm text-gray-500">Trigger: {workflow.trigger}</p>
                      </div>
                    </div>
                    <Badge className={cn(
                      workflow.status === 'active' && 'bg-green-100 text-green-600',
                      workflow.status === 'paused' && 'bg-yellow-100 text-yellow-600',
                    )}>
                      {workflow.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{workflow.sends} emails sent</p>
                    <Button variant="outline" size="sm" onClick={() => toast.info(`Configuring automation for ${workflow.name}...`)}>Configure</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignData}>
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
                    <Bar dataKey="sent" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="opened" fill="#F8AD9D" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="clicked" fill="#F08080" radius={[4, 4, 0, 0]} />
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
