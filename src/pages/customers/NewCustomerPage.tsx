import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
    User, Mail, Phone, MapPin,
    ChevronLeft, Plus, Save, UserCheck
} from 'lucide-react';
import { toast } from 'sonner';

export function NewCustomerPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            toast.success('Customer profile created successfully!');
            setIsLoading(false);
            navigate('/admin/customers');
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-800">Add Customer</h1>
                    <p className="text-gray-500">Create a new customer profile</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-0 shadow-soft">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <User className="w-5 h-5 text-coral-500" />
                            General Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="e.g. Emily" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="e.g. Davis" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input id="email" type="email" className="pl-10" placeholder="emily.d@example.com" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input id="phone" className="pl-10" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Customer Segment</Label>
                            <Select defaultValue="new">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select segment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="vip">VIP</SelectItem>
                                    <SelectItem value="regular">Regular</SelectItem>
                                    <SelectItem value="new">New Customer</SelectItem>
                                    <SelectItem value="dormant">Dormant</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Internal Notes</Label>
                            <Textarea
                                id="notes"
                                placeholder="Any specific preferences, allergies, or history information..."
                                className="min-h-[100px]"
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-coral-500" />
                                Address (Optional)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="address">Street Address</Label>
                                <Input id="address" placeholder="123 Main St" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="New York" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">ZIP Code</Label>
                                    <Input id="zip" placeholder="10001" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-soft">
                        <CardContent className="p-4 bg-coral-50 rounded-xl">
                            <div className="flex items-start gap-3">
                                <UserCheck className="w-5 h-5 text-coral-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-coral-900 text-sm">Marketing Consent</h4>
                                    <p className="text-xs text-coral-700 mt-1">
                                        Customer has agreed to receive SMS and Email reminders and marketing materials.
                                    </p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <input type="checkbox" id="consent" className="rounded border-coral-300 text-coral-600 focus:ring-coral-500" defaultChecked />
                                        <Label htmlFor="consent" className="text-xs font-medium text-coral-900">Agreed to terms</Label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-3">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)}>Discard</Button>
                        <Button type="submit" className="flex-1 gradient-coral text-white" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Save Profile'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
