import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { bookings } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function AppointmentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-800">My Appointments</h1>
                    <p className="text-gray-500 mt-1">View and manage your bookings</p>
                </div>
                <Button className="gradient-coral text-white shadow-lg" asChild>
                    <Link to="/customer/booking">
                        Book New Appointment
                    </Link>
                </Button>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search bookings..." className="pl-9 bg-white" />
                </div>
                <Button variant="outline" className="gap-2" onClick={() => toast.info('Filter options coming soon!')}>
                    <Filter className="w-4 h-4" /> Filter
                </Button>
            </div>

            <div className="grid gap-4">
                {bookings.map((booking) => (
                    <Card key={booking.id} className="border-0 shadow-soft hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-500">
                                    <Calendar className="w-8 h-8" />
                                </div>

                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-lg text-gray-900">Swedish Massage</h3>
                                        <Badge className={cn(
                                            "capitalize",
                                            booking.status === 'confirmed' && "bg-green-100 text-green-700 hover:bg-green-200",
                                            booking.status === 'pending' && "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
                                            booking.status === 'cancelled' && "bg-red-100 text-red-700 hover:bg-red-200",
                                            booking.status === 'completed' && "bg-blue-100 text-blue-700 hover:bg-blue-200",
                                        )}>
                                            {booking.status}
                                        </Badge>
                                    </div>
                                    <p className="text-gray-500">Booking ID: <span className="font-mono text-gray-700">{booking.bookingNumber}</span></p>

                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4 text-indigo-400" />
                                            {booking.bookingDate}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4 text-indigo-400" />
                                            {booking.startTime}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4 text-indigo-400" />
                                            Downtown Spa
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 w-full md:w-auto">
                                    {booking.status === 'confirmed' && (
                                        <>
                                            <Button variant="outline" className="flex-1 border-gray-200" onClick={() => toast.info('Reschedule request sent!')}>Reschedule</Button>
                                            <Button variant="outline" className="flex-1 border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => toast.error('Cancellation request submitted.')}>Cancel</Button>
                                        </>
                                    )}
                                    {booking.status === 'completed' && (
                                        <Button variant="outline" className="flex-1 border-gray-200" onClick={() => toast.success('Redirecting to booking...')}>Book Again</Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
