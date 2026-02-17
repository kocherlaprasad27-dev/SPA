
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Mail, MessageSquare, FileText, Phone } from 'lucide-react';
import { toast } from 'sonner';

export function HelpPage() {
    const [ticketSubject, setTicketSubject] = useState('');
    const [ticketMessage, setTicketMessage] = useState('');

    const handleSubmitTicket = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Support ticket submitted successfully. We will contact you shortly.');
        setTicketSubject('');
        setTicketMessage('');
    };

    const faqs = [
        {
            question: "How do I reset my password?",
            answer: "Go to the login page and click 'Forgot Password'. Follow the email instructions to reset your password."
        },
        {
            question: "How can I add a new employee?",
            answer: "Navigate to the Employees page from the sidebar, then click the '+ Add Employee' button in the top right corner."
        },
        {
            question: "Can I export my booking data?",
            answer: "Yes, go to the Reports page or the Bookings page and look for the 'Export' button to download your data as CSV or PDF."
        },
        {
            question: "How do I change my business hours?",
            answer: "Go to Settings > Business Hours. You can toggle days on/off and set specific hours for each day."
        },
        {
            question: "What payment gateways are supported?",
            answer: "We currently support Stripe, PayPal, and Square. You can configure these in Settings > Payments."
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold text-gray-800">Help & Support</h1>
                <p className="text-gray-500 mt-1">Find answers to common questions or contact support</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* FAQs */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <HelpCircle className="w-5 h-5 text-coral-500" />
                                Frequently Asked Questions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-left font-medium text-gray-700">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Documentation & Guides
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Button variant="outline" className="h-auto p-4 justify-start text-left" onClick={() => toast.info('Opening user guide...')}>
                                    <div className="bg-blue-50 p-2 rounded-lg mr-3">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">User Guide</h3>
                                        <p className="text-xs text-gray-500 mt-1">Comprehensive manual for all features</p>
                                    </div>
                                </Button>
                                <Button variant="outline" className="h-auto p-4 justify-start text-left" onClick={() => toast.info('Opening API docs...')}>
                                    <div className="bg-purple-50 p-2 rounded-lg mr-3">
                                        <MessageSquare className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">API Documentation</h3>
                                        <p className="text-xs text-gray-500 mt-1">For developers and integrations</p>
                                    </div>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-soft bg-gradient-to-br from-coral-500 to-peach-500 text-white">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-xl mb-4">Need Quick Help?</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/80">Support Hotline</p>
                                        <p className="font-semibold">+1 (800) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/80">Email Support</p>
                                        <p className="font-semibold">support@spabook.com</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg">Contact Support</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmitTicket} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Subject</label>
                                    <Input
                                        placeholder="Brief description of issue"
                                        value={ticketSubject}
                                        onChange={(e) => setTicketSubject(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <Textarea
                                        placeholder="Describe your issue in detail..."
                                        className="min-h-[120px]"
                                        value={ticketMessage}
                                        onChange={(e) => setTicketMessage(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full gradient-coral hover:opacity-90">
                                    Submit Ticket
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
