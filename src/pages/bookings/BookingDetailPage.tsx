import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    ChevronLeft, Calendar, Clock, User, Sparkles,
    MapPin, CreditCard, CheckCircle, MessageSquare,
    Printer, Edit, Trash2, MoreHorizontal, Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { bookings, bookingStatuses } from '@/data/mockData';
import { toast } from 'sonner';

export function BookingDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState<any>(null);

    useEffect(() => {
        const foundBooking = bookings.find(b => b.id === id);
        if (foundBooking) {
            setBooking(foundBooking);
        }
    }, [id]);

    if (!booking) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <p className="text-gray-500 font-display text-xl">Booking not found</p>
                <Button onClick={() => navigate('/admin/bookings')} variant="outline">Back to Bookings</Button>
            </div>
        );
    }

    const getStatusBadge = (status: string) => {
        const statusConfig = bookingStatuses.find(s => s.value === status);
        return (
            <Badge className={cn('text-white px-3 py-1', statusConfig?.color)}>
                {statusConfig?.label}
            </Badge>
        );
    };

    const handleAction = (action: string) => {
        toast.success(`Action "${action}" performed successfully`);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-display font-bold text-gray-800">{booking.bookingNumber}</h1>
                            {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-gray-500 mt-1">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50" onClick={() => handleAction('Print')}>
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                    </Button>
                    <Button className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white shadow-md shadow-blue-500/20" onClick={() => handleAction('Edit')}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Booking
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-0 shadow-soft overflow-hidden">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                            <CardTitle className="text-lg font-semibold">Appointment Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-coral-50 flex items-center justify-center flex-shrink-0 text-coral-500">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Date</p>
                                            <p className="text-lg font-semibold text-gray-800">{new Date(booking.bookingDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-coral-50 flex items-center justify-center flex-shrink-0 text-coral-500">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Time</p>
                                            <p className="text-lg font-semibold text-gray-800">{booking.startTime} - {booking.endTime} ({booking.totalDuration} min)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-coral-50 flex items-center justify-center flex-shrink-0 text-coral-500">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Location</p>
                                            <p className="text-lg font-semibold text-gray-800">Main Spa - Room 101</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-coral-50 flex items-center justify-center flex-shrink-0 text-coral-500">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Provider</p>
                                            <p className="text-lg font-semibold text-gray-800">Jessica Chen</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-gray-100" />

                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Services</p>
                                <div className="p-4 rounded-xl border border-gray-100 hover:border-coral-200 transition-colors bg-gray-50/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white">
                                                <Sparkles className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">Signature Massage</p>
                                                <p className="text-sm text-gray-500">75 minutes • Fusion relaxation treatment</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-lg text-indigo-600">$195.00</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Internal Notes</p>
                                <div className="p-4 rounded-xl bg-yellow-50/50 border border-yellow-100 italic text-gray-600">
                                    Customer prefers medium pressure and extra aromatherapy. Keep the room slightly warmer.
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment History */}
                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Payment Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>$195.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (8.25%)</span>
                                    <span>$16.09</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Discount</span>
                                    <span className="text-green-600">-$0.00</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center py-2 text-xl font-bold text-gray-800">
                                    <span>Total Amount</span>
                                    <span>$211.09</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 uppercase">Payment Status</p>
                                            <p className="text-xs text-gray-500">Processed via Cashfree Payments</p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className={cn(
                                        booking.paymentStatus === 'paid' && 'bg-green-100 text-green-600',
                                        booking.paymentStatus === 'pending' && 'bg-yellow-100 text-yellow-600',
                                        booking.paymentStatus === 'partial' && 'bg-orange-100 text-orange-600',
                                    )}>
                                        {booking.paymentStatus.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Customer Card */}
                    <Card className="border-0 shadow-soft overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]" />
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold">Customer info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-full border-2 border-indigo-100 overflow-hidden shadow-sm">
                                    <img
                                        src={booking.customer?.avatar || `https://ui-avatars.com/api/?name=${booking.customer?.firstName}+${booking.customer?.lastName}&background=6366f1&color=fff`}
                                        alt="avatar"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{booking.customer?.firstName} {booking.customer?.lastName}</h3>
                                    <Badge className="bg-indigo-100 text-indigo-700 border-0">VIP Member</Badge>
                                </div>
                            </div>
                            <Separator />
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{booking.customer?.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">+1 (555) 123-4567</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full border-indigo-100 text-indigo-600 hover:bg-indigo-50" asChild>
                                <Link to={`/admin/customers/${booking.customerId}`}>View Full Profile</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start hover:bg-green-50 hover:text-green-600 hover:border-green-200" onClick={() => handleAction('Complete')}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark as Completed
                            </Button>
                            <Button variant="outline" className="w-full justify-start hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" onClick={() => handleAction('Message')}>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Resend Confirmation
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-700 hover:border-red-200" onClick={() => handleAction('Cancel')}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Cancel Appointment
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
