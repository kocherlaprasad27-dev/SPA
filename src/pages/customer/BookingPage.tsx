import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';
import { services, serviceCategories } from '@/data/mockData';

export function BookingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const initialServiceId = searchParams.get('service');

    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(initialServiceId || null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState('downtown');

    const steps = [
        { title: 'Service', icon: Search },
        { title: 'Time', icon: Calendar },
        { title: 'Details', icon: MapPin },
        { title: 'Confirm', icon: CheckCircle2 },
    ];

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else navigate('/customer/appointments'); // Redirect to dashboard after confirm
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="bg-white rounded-2xl shadow-soft min-h-[600px] flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Progress */}
            <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-100 p-8 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold mb-8">Book Appointment</h2>
                    <div className="space-y-6">
                        {steps.map((s, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step > index + 1 ? 'bg-green-500 text-white' :
                                    step === index + 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-gray-200 text-gray-400'
                                    }`}>
                                    {step > index + 1 ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                                </div>
                                <span className={`text-sm font-medium ${step === index + 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {s.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <Clock className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-blue-800">Need Help?</p>
                        <p className="text-xs text-blue-600">Call (555) 123-4567 for assistance booking.</p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 md:p-12 relative">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-bold mb-4">Select a Service</h3>
                            <div className="grid gap-4">
                                {services.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => setSelectedService(service.id)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedService === service.id
                                            ? 'border-indigo-500 bg-indigo-50 shadow-md'
                                            : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-bold text-gray-900">{service.name}</h4>
                                                <p className="text-sm text-gray-500">{service.durationMinutes} mins • ${service.basePrice}</p>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedService === service.id ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
                                                }`}>
                                                {selectedService === service.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-bold mb-4">Select Date & Time</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-4 border rounded-xl bg-gray-50 h-64 flex items-center justify-center text-gray-400">
                                    <Calendar className="w-8 h-8 mr-2" /> Date Picker Placeholder
                                </div>
                                <div className="space-y-2">
                                    {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`w-full p-3 rounded-lg border text-sm font-medium transition-all ${selectedTime === time
                                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                                : 'bg-white border-gray-200 hover:border-indigo-300 text-gray-700'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-bold mb-4">Appointment Location</h3>
                            <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation} className="space-y-4">
                                <div className="flex items-center space-x-2 p-4 border rounded-xl hover:bg-gray-50 cursor-pointer">
                                    <RadioGroupItem value="downtown" id="r1" />
                                    <Label htmlFor="r1" className="cursor-pointer flex-1">
                                        <span className="font-bold block">Downtown Spa</span>
                                        <span className="text-gray-500 text-sm">123 Main St, New York, NY</span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-4 border rounded-xl hover:bg-gray-50 cursor-pointer">
                                    <RadioGroupItem value="uptown" id="r2" />
                                    <Label htmlFor="r2" className="cursor-pointer flex-1">
                                        <span className="font-bold block">Uptown Sanctuary</span>
                                        <span className="text-gray-500 text-sm">456 Park Ave, New York, NY</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6 text-center py-10"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Your appointment for <span className="font-bold text-gray-900">Signature Massage</span> on <span className="font-bold text-gray-900">Feb 20 at 10:00 AM</span> has been scheduled.
                            </p>

                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-8 text-left max-w-md mx-auto">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-500">Service total</span>
                                    <span className="font-bold">$195.00</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-500">Tax</span>
                                    <span className="font-bold">$16.09</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4 flex justify-between">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-lg text-indigo-600">$211.09</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="absolute bottom-8 right-8 left-8 md:left-12 flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={step === 1 || step === 4}
                        className={step === 1 || step === 4 ? 'invisible' : ''}
                    >
                        Back
                    </Button>

                    <Button
                        onClick={handleNext}
                        className="gradient-coral text-white px-8"
                    >
                        {step === 4 ? 'View Appointments' : step === 3 ? 'Confirm Booking' : 'Next Step'} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
