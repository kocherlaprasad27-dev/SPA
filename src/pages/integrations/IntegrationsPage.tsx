import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plug, CreditCard, Mail, Calendar, Calculator,
  CheckCircle, XCircle, Settings, ExternalLink, RefreshCw, Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const integrationCategories = [
  {
    name: 'Payment Gateways',
    icon: CreditCard,
    integrations: [
      { name: 'Stripe', description: 'Accept credit card payments', connected: true, icon: '💳' },
      { name: 'PayPal', description: 'PayPal checkout integration', connected: false, icon: '🅿️' },
      { name: 'Square', description: 'In-person and online payments', connected: false, icon: '🔲' },
    ],
  },
  {
    name: 'Email & SMS',
    icon: Mail,
    integrations: [
      { name: 'SendGrid', description: 'Transactional emails', connected: true, icon: '📧' },
      { name: 'Twilio', description: 'SMS notifications', connected: true, icon: '📱' },
      { name: 'Mailgun', description: 'Email delivery', connected: false, icon: '📨' },
    ],
  },
  {
    name: 'Calendar & Scheduling',
    icon: Calendar,
    integrations: [
      { name: 'Google Calendar', description: 'Two-way sync', connected: false, icon: '📅' },
      { name: 'Outlook', description: 'Microsoft calendar sync', connected: false, icon: '📆' },
    ],
  },
  {
    name: 'Accounting',
    icon: Calculator,
    integrations: [
      { name: 'QuickBooks', description: 'Financial sync', connected: false, icon: '📊' },
      { name: 'Xero', description: 'Cloud accounting', connected: false, icon: '📈' },
    ],
  },
];

export function IntegrationsPage() {
  const handleConnect = (name: string) => {
    toast.success(`${name} connected successfully`);
  };

  const handleDisconnect = (name: string) => {
    toast.info(`${name} disconnected`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Integrations</h1>
          <p className="text-gray-500 mt-1">Connect with third-party services and APIs</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-coral-200 hover:bg-coral-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Connected', value: '5', color: 'green' },
          { label: 'Available', value: '12', color: 'coral' },
          { label: 'API Calls Today', value: '2.4K', color: 'blue' },
          { label: 'Success Rate', value: '99.8%', color: 'purple' },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-soft">
            <CardContent className="p-4 text-center">
              <p className={cn('text-2xl font-bold', `text-${stat.color}-500`)}>{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          {integrationCategories.map((category, catIndex) => (
            <Card key={catIndex} className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <category.icon className="w-5 h-5 text-coral-500" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.integrations.map((integration, intIndex) => (
                    <div 
                      key={intIndex} 
                      className={cn(
                        'p-4 rounded-xl border transition-all',
                        integration.connected 
                          ? 'border-green-200 bg-green-50/50' 
                          : 'border-gray-200 hover:border-coral-200 hover:bg-coral-50/30'
                      )}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{integration.icon}</span>
                          <div>
                            <h4 className="font-semibold">{integration.name}</h4>
                            <p className="text-sm text-gray-500">{integration.description}</p>
                          </div>
                        </div>
                        {integration.connected ? (
                          <Badge className="bg-green-100 text-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Not Connected</Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        {integration.connected ? (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">Last sync: 2 min ago</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Settings className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500"
                                onClick={() => handleDisconnect(integration.name)}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </>
                        ) : (
                          <Button 
                            className="w-full gradient-coral text-white"
                            onClick={() => handleConnect(integration.name)}
                          >
                            <Plug className="w-4 h-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* API Section */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5 text-coral-500" />
            API Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium">API Keys</p>
                <p className="text-sm text-gray-500">Manage your API credentials</p>
              </div>
              <Button variant="outline">Manage Keys</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium">Webhooks</p>
                <p className="text-sm text-gray-500">Configure webhook endpoints</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium">API Documentation</p>
                <p className="text-sm text-gray-500">View API reference and guides</p>
              </div>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Docs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
