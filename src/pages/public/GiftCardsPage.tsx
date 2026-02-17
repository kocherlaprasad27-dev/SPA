
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function GiftCardsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Give the Gift of Relaxation</h1>
                    <p className="text-xl text-gray-600">Perfect for birthdays, anniversaries, or just to say thank you.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Card Preview */}
                    <div className="relative">
                        <div className="aspect-[1.6/1] bg-gradient-to-br from-coral-400 to-peach-400 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
                            <div className="relative z-10 flex justify-between items-start">
                                <Gift className="w-12 h-12" />
                                <span className="text-2xl font-bold">$100</span>
                            </div>
                            <div className="relative z-10">
                                <p className="font-display text-3xl font-bold mb-2">SpaBook Pro</p>
                                <p className="opacity-80 text-sm">Valid at all locations</p>
                            </div>

                            {/* Decor */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-4">Preview of digital gift card</p>
                    </div>

                    {/* Purchase Form */}
                    <Card className="border-0 shadow-xl">
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                {['50', '100', '200'].map((amt) => (
                                    <Button key={amt} variant="outline" className="border-coral-200 text-coral-600 hover:bg-coral-50 py-6 text-lg">
                                        ${amt}
                                    </Button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <Label>Custom Amount</Label>
                                <Input placeholder="Enter amount" type="number" />
                            </div>

                            <div className="space-y-2">
                                <Label>Recipient Email</Label>
                                <Input placeholder="recipient@example.com" type="email" />
                            </div>

                            <div className="space-y-2">
                                <Label>Personal Message</Label>
                                <Input placeholder="Add a note..." />
                            </div>

                            <Button className="w-full gradient-coral text-white py-6 text-lg shadow-lg">
                                Purchase Gift Card
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
