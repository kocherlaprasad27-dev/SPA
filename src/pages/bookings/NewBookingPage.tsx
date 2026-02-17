import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, User, Sparkles, MapPin, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { services, employees, customers } from '@/data/mockData';

export function NewBookingPage() {
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Booking created successfully!', {
                description: 'The customer will receive a confirmation email shortly.',
            });
            setIsLoading(false);
            navigate('/admin/bookings');
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-800">New Booking</h1>
                    <p className="text-gray-500">Create a new appointment for a customer</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Customer Selection */}
                    <Card className="md:col-span-2 border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <User className="w-5 h-5 text-coral-500" />
                                Customer Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="customer">Select Customer</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Search customers..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customers.map((c) => (
                                                <SelectItem key={c.id} value={c.id}>
                                                    {c.firstName} {c.lastName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-end pb-0.5">
                                    <Button type="button" variant="outline" className="w-full border-coral-200 text-coral-600 hover:bg-coral-50">
                                        + New Customer
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Special Requirements / Notes</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Any allergies, preferences, or specific requests..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Appointment Summary */}
                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-coral-50 rounded-xl space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-medium">$0.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Tax</span>
                                    <span className="font-medium">$0.00</span>
                                </div>
                                <div className="border-t border-coral-100 pt-2 flex justify-between font-bold text-gray-800">
                                    <span>Total</span>
                                    <span>$0.00</span>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full gradient-coral text-white shadow-coral py-6"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating...' : 'Confirm Booking'}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Service & Staff */}
                    <Card className="md:col-span-3 border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-coral-500" />
                                Service & Provider
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label>Service</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {services.map((s) => (
                                            <SelectItem key={s.id} value={s.id}>
                                                {s.name} ({s.durationMinutes} min)
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Provider</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Any available" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {employees.map((e) => (
                                            <SelectItem key={e.id} value={e.id}>
                                                {e.firstName} {e.lastName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Location / Room</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Main Spa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="l1">Main Spa - Room 101</SelectItem>
                                        <SelectItem value="l2">Wellness Center - Suite A</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Date & Time */}
                    <Card className="md:col-span-3 border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-coral-500" />
                                Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Label>Select Date</Label>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border shadow"
                                />
                            </div>
                            <div className="space-y-4">
                                <Label className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Available Time Slots
                                </Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                                        <Button
                                            key={time}
                                            type="button"
                                            variant="outline"
                                            className="border-gray-200 hover:border-coral-300 hover:bg-coral-50 transition-all"
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm text-gray-500">
                                        Selected: <span className="font-semibold text-gray-800">
                                            {date ? format(date, 'PPP') : 'No date selected'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}
