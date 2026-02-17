import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Building2, Bell, Shield, CreditCard, Calendar,
  Clock, Mail, Phone, Save, Users
} from 'lucide-react';
import { toast } from 'sonner';

export function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Settings saved successfully');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 mt-1">Configure your business and system preferences</p>
        </div>
        <Button
          className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="general">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TabsList className="flex flex-row lg:flex-col w-full h-auto bg-transparent gap-2 lg:gap-0 lg:space-y-1 overflow-x-auto pb-2 lg:pb-0 mb-4 lg:mb-0 justify-start">
              <TabsTrigger value="general" className="justify-center lg:justify-start w-auto lg:w-full whitespace-nowrap flex-shrink-0 px-4 py-2">
                <Building2 className="w-4 h-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="business" className="justify-center lg:justify-start w-auto lg:w-full whitespace-nowrap flex-shrink-0 px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                Business Hours
              </TabsTrigger>
              <TabsTrigger value="booking" className="justify-center lg:justify-start w-auto lg:w-full whitespace-nowrap flex-shrink-0 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Booking Rules
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-center lg:justify-start w-auto lg:w-full whitespace-nowrap flex-shrink-0 px-4 py-2">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="payments" className="justify-center lg:justify-start w-auto lg:w-full whitespace-nowrap flex-shrink-0 px-4 py-2">
                <CreditCard className="w-4 h-4 mr-2" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-center lg:justify-start w-auto lg:w-full whitespace-nowrap flex-shrink-0 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="users" className="justify-center lg:justify-start w-auto lg:w-full whitespace-nowrap flex-shrink-0 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Users & Roles
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <TabsContent value="general" className="mt-0">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-500" />
                    Business Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Business Name</Label>
                      <Input defaultValue="SpaBook Pro Salon" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue="contact@spabook.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label>Website</Label>
                      <Input defaultValue="https://spabook.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input defaultValue="123 Spa Street" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                      <Input defaultValue="Austin" placeholder="City" />
                      <Input defaultValue="TX" placeholder="State" />
                      <Input defaultValue="78701" placeholder="ZIP" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                        <option>America/Chicago (Central Time)</option>
                        <option>America/New_York (Eastern Time)</option>
                        <option>America/Los_Angeles (Pacific Time)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="business" className="mt-0">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <Switch defaultChecked={day !== 'Sunday'} />
                          <span className="font-medium">{day}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                          <Input type="time" defaultValue="09:00" className="flex-1 sm:w-32" />
                          <span className="text-gray-400">to</span>
                          <Input type="time" defaultValue="18:00" className="flex-1 sm:w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="booking" className="mt-0">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    Booking Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Minimum Advance Booking (hours)</Label>
                      <Input type="number" defaultValue="2" />
                    </div>
                    <div className="space-y-2">
                      <Label>Maximum Advance Booking (days)</Label>
                      <Input type="number" defaultValue="90" />
                    </div>
                    <div className="space-y-2">
                      <Label>Default Booking Duration (minutes)</Label>
                      <Input type="number" defaultValue="60" />
                    </div>
                    <div className="space-y-2">
                      <Label>Buffer Time Between Bookings (minutes)</Label>
                      <Input type="number" defaultValue="15" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                      <div>
                        <p className="font-medium">Allow Same-Day Booking</p>
                        <p className="text-sm text-gray-500">Customers can book for today</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                      <div>
                        <p className="font-medium">Enable Waitlist</p>
                        <p className="text-sm text-gray-500">Allow customers to join waitlist for full slots</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                      <div>
                        <p className="font-medium">Guest Checkout</p>
                        <p className="text-sm text-gray-500">Allow bookings without registration</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Bell className="w-5 h-5 text-indigo-500" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Booking Confirmation', description: 'Send confirmation after booking', email: true, sms: true },
                      { name: 'Booking Reminder', description: 'Remind 24 hours before appointment', email: true, sms: true },
                      { name: 'Payment Receipt', description: 'Send receipt after payment', email: true, sms: false },
                      { name: 'Marketing Emails', description: 'Promotional offers and updates', email: true, sms: false },
                    ].map((notification, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                        <div>
                          <p className="font-medium">{notification.name}</p>
                          <p className="text-sm text-gray-500">{notification.description}</p>
                        </div>
                        <div className="flex items-center gap-4 pt-2 sm:pt-0">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <Switch defaultChecked={notification.email} />
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <Switch defaultChecked={notification.sms} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="mt-0">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-500" />
                    Payment Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Default Payment Gateway</Label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                        <option>Stripe</option>
                        <option>PayPal</option>
                        <option>Square</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tax Rate (%)</Label>
                      <Input type="number" defaultValue="8.25" step="0.01" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                      <div>
                        <p className="font-medium">Require Deposit</p>
                        <p className="text-sm text-gray-500">Require upfront payment for bookings</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                      <div>
                        <p className="font-medium">Enable Tips</p>
                        <p className="text-sm text-gray-500">Allow customers to add gratuity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-indigo-500" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                      <div>
                        <p className="font-medium">Session Timeout</p>
                        <p className="text-sm text-gray-500">Automatically logout after 30 minutes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                      <div>
                        <p className="font-medium">IP Whitelist</p>
                        <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-500" />
                    Users & Roles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Super Admin', users: 1, permissions: 'Full access' },
                      { name: 'Manager', users: 3, permissions: 'Bookings, staff, reports' },
                      { name: 'Front Desk', users: 5, permissions: 'Bookings, customers' },
                      { name: 'Therapist', users: 12, permissions: 'Own schedule, customers' },
                    ].map((role, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                        <div>
                          <p className="font-medium">{role.name}</p>
                          <p className="text-sm text-gray-500">{role.permissions}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">{role.users} users</Badge>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
