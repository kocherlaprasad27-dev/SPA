import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
    ChevronLeft, User, Mail, Phone, MapPin,
    Calendar, CreditCard, Heart, Award,
    History, Settings, Edit, MessageSquare, Plus,
    Clock, CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { customers, bookings } from '@/data/mockData';
import { toast } from 'sonner';

export function CustomerDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<any>(null);

    useEffect(() => {
        const found = customers.find(c => c.id === id);
        if (found) {
            setCustomer(found);
        }
    }, [id]);

    if (!customer) {
        return <div>Customer not found</div>;
    }

    const customerBookings = bookings.filter(b => b.customerId === id);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-800">Customer Profile</h1>
                    <p className="text-gray-500">Manage customer details, history, and preferences</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Column: Basic Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-0 shadow-soft overflow-hidden">
                        <div className="h-24 gradient-coral" />
                        <CardContent className="pt-0 px-6 pb-6 mt-[-48px] text-center">
                            <div className="inline-block relative">
                                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg mx-auto bg-white">
                                    <img src={customer.avatar} alt="avatar" />
                                </div>
                                {customer.segment === 'vip' && (
                                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                        <Award className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mt-4">{customer.firstName} {customer.lastName}</h2>
                            <p className="text-sm text-gray-500 font-medium">#{customer.customerCode}</p>
                            <div className="flex items-center justify-center gap-2 mt-3">
                                <Badge className={cn(
                                    'capitalize',
                                    customer.segment === 'vip' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                )}>
                                    {customer.segment}
                                </Badge>
                                <Badge variant="outline">Active</Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <p className="text-xs text-gray-500 uppercase font-bold">Visits</p>
                                    <p className="text-lg font-bold text-gray-800">{customer.totalVisits}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <p className="text-xs text-gray-500 uppercase font-bold">Spent</p>
                                    <p className="text-lg font-bold text-gray-800">${customer.totalSpent.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3 pt-6 border-t border-gray-100 text-left">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="w-4 h-4 text-coral-500" />
                                    <span className="text-gray-600 truncate">{customer.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="w-4 h-4 text-coral-500" />
                                    <span className="text-gray-600">{customer.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="w-4 h-4 text-coral-500" />
                                    <span className="text-gray-600 italic">No address on file</span>
                                </div>
                            </div>

                            <Button className="w-full mt-6 gradient-coral text-white shadow-coral">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-soft">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold uppercase text-gray-500 tracking-wider">Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-sm text-gray-800 font-medium">Preferred Specialist</p>
                                <p className="text-sm text-gray-500">Jessica Chen</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-800 font-medium">Room Type</p>
                                <p className="text-sm text-gray-500">VIP Sanctuary</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-800 font-medium">Skin Type</p>
                                <Badge variant="secondary" className="bg-peach-50 text-peach-600">{customer.skinType}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Content */}
                <div className="lg:col-span-3">
                    <Tabs defaultValue="history">
                        <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0 mb-6">
                            <TabsTrigger
                                value="history"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-coral-500 data-[state=active]:bg-transparent data-[state=active]:text-coral-600 px-6 py-3"
                            >
                                Booking History
                            </TabsTrigger>
                            <TabsTrigger
                                value="notes"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-coral-500 data-[state=active]:bg-transparent data-[state=active]:text-coral-600 px-6 py-3"
                            >
                                Clinical Notes
                            </TabsTrigger>
                            <TabsTrigger
                                value="loyalty"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-coral-500 data-[state=active]:bg-transparent data-[state=active]:text-coral-600 px-6 py-3"
                            >
                                Loyalty & Rewards
                            </TabsTrigger>
                            <TabsTrigger
                                value="settings"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-coral-500 data-[state=active]:bg-transparent data-[state=active]:text-coral-600 px-6 py-3"
                            >
                                Settings
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="history" className="space-y-4 m-0">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Booking History</h3>
                                <Button size="sm" className="gradient-coral text-white">
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Appointment
                                </Button>
                            </div>

                            {customerBookings.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {customerBookings.map((b) => (
                                        <Card key={b.id} className="border-0 shadow-soft hover:shadow-md transition-shadow">
                                            <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center text-coral-500">
                                                        <Calendar className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800">Swedish Massage</p>
                                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {b.bookingDate}</span>
                                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {b.startTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="text-right">
                                                        <p className="font-bold text-gray-800">${b.totalAmount}</p>
                                                        <Badge variant="outline" className="capitalize">{b.status}</Badge>
                                                    </div>
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link to={`/admin/bookings/${b.id}`}><Settings className="w-4 h-4" /></Link>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <Card className="border-dashed border-2 py-12 text-center">
                                    <p className="text-gray-500">No bookings found for this customer.</p>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="notes">
                            <Card className="border-0 shadow-soft">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg font-bold">Notes & Medical History</CardTitle>
                                    <Button variant="outline" size="sm">Add Note</Button>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Heart className="w-4 h-4 text-red-500" />
                                            <span className="font-bold text-gray-800">Medical Warning</span>
                                        </div>
                                        <p className="text-sm text-gray-700">Allergic to almond oil and certain latex materials. Use hypoallergenic products only.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="border-l-4 border-coral-200 pl-4 py-1">
                                            <p className="text-xs text-gray-400">Feb 10, 2024 • by Jessica Chen</p>
                                            <p className="text-sm text-gray-700 mt-1 font-medium">Customer mentioned lower back tension due to long office hours. Recommended deep tissue for next session.</p>
                                        </div>
                                        <div className="border-l-4 border-coral-200 pl-4 py-1">
                                            <p className="text-xs text-gray-400">Jan 15, 2024 • by Maria Garcia</p>
                                            <p className="text-sm text-gray-700 mt-1 font-medium">Standard facial. Responded well to the new hydration serum. Redness reduced by end of session.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="loyalty">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="border-0 shadow-soft gradient-coral text-white">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <Award className="w-10 h-10" />
                                            <Badge className="bg-white/20 text-white border-white/40">VIP GOLD</Badge>
                                        </div>
                                        <p className="text-sm opacity-80 uppercase tracking-widest font-bold">Loyalty Points</p>
                                        <p className="text-4xl font-bold mt-1">2,450</p>
                                        <p className="text-xs mt-4 opacity-75">Next tier in 550 points (Diamond)</p>
                                        <Progress value={75} className="h-2 bg-white/20 mt-2" />
                                    </CardContent>
                                </Card>
                                <Card className="border-0 shadow-soft">
                                    <CardContent className="p-6">
                                        <h4 className="font-bold text-gray-800 mb-4">Active Benefits</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2 text-sm text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-500" /> 10% discount on all services
                                            </li>
                                            <li className="flex items-center gap-2 text-sm text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-500" /> Free birthday facial
                                            </li>
                                            <li className="flex items-center gap-2 text-sm text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-500" /> Complementary herbal tea after sessions
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
