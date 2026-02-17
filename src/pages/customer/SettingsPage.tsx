import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Lock, Globe, Moon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-800">Account Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your preferences and security</p>
                </div>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="bg-gray-100 p-1 rounded-xl mb-6">
                    <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">General</TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Notifications</TabsTrigger>
                    <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Globe className="w-5 h-5 text-gray-500" />
                                Language & Appearance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Dark Mode</Label>
                                    <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Language</Label>
                                    <p className="text-sm text-gray-500">Select your preferred language</p>
                                </div>
                                <select className="border rounded-md p-2 bg-white text-sm">
                                    <option>English (US)</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Bell className="w-5 h-5 text-gray-500" />
                                Notification Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Email Notifications</Label>
                                    <p className="text-sm text-gray-500">Receive booking confirmations and updates via email</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">SMS Notifications</Label>
                                    <p className="text-sm text-gray-500">Receive reminders and alerts via SMS</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Promotional Offers</Label>
                                    <p className="text-sm text-gray-500">Receive special offers and discounts</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Lock className="w-5 h-5 text-gray-500" />
                                Security Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Two-Factor Authentication</Label>
                                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                                </div>
                                <Button variant="outline">Enabled</Button>
                            </div>
                            <div className="border-t pt-4">
                                <h4 className="font-medium mb-4">Change Password</h4>
                                <div className="grid gap-4 max-w-sm">
                                    <div className="grid gap-2">
                                        <Label htmlFor="current">Current Password</Label>
                                        <input type="password" id="current" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="new">New Password</Label>
                                        <input type="password" id="new" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                    </div>
                                    <Button className="w-full" onClick={() => toast.success('Password updated successfully!')}>Update Password</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => toast.info('Changes discarded.')}>Cancel</Button>
                <Button className="gradient-coral text-white" onClick={() => toast.success('Settings saved successfully!')}>Save Changes</Button>
            </div>
        </div>
    );
}
