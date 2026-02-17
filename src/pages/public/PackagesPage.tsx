import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Star } from 'lucide-react';

export function PackagesPage() {
    const packages = [
        {
            id: 1,
            name: "Total Relaxation Day",
            description: "A full day of pampering including massage, facial, and lunch.",
            price: 250,
            originalPrice: 300,
            duration: "5 hours",
            features: ["60min Swedish Massage", "Deep CLeansing Facial", "Spa Lunch", "Manicure & Pedicure", "Access to Sauna"],
            popular: true,
            color: "bg-coral-50 border-coral-200"
        },
        {
            id: 2,
            name: "Couples Retreat",
            description: "Perfect for anniversaries or a romantic getaway.",
            price: 180,
            originalPrice: 220,
            duration: "90 mins",
            features: ["Couples Massage", "Private Suite", "Champagne & Strawberries", "Aromatherapy"],
            popular: false,
            color: "bg-white border-gray-100"
        },
        {
            id: 3,
            name: "Bridal Glow",
            description: "Get ready for your big day with our comprehensive bridal package.",
            price: 450,
            originalPrice: 550,
            duration: "4 hours",
            features: ["Trial Makeup & Hair", "Radiance Facial", "Body Scrub", "Shellac Manicure", "Lash Extensions"],
            popular: false,
            color: "bg-white border-gray-100"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">Exclusive Packages</h1>
                    <p className="text-xl text-gray-600">
                        Curated experiences designed to provide the ultimate relaxation and value.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                        <Card key={pkg.id} className={`flex flex-col border-2 relative ${pkg.color} ${pkg.popular ? 'shadow-xl scale-105 z-10' : 'shadow-soft'}`}>
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-coral-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" /> Most Popular
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-gray-900">{pkg.name}</CardTitle>
                                <CardDescription>{pkg.duration}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-coral-600">${pkg.price}</span>
                                    <span className="text-gray-400 line-through ml-2 text-lg">${pkg.originalPrice}</span>
                                </div>
                                <p className="text-gray-600 mb-6">{pkg.description}</p>
                                <ul className="space-y-3">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className={`w-full ${pkg.popular ? 'gradient-coral text-white shadow-lg' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                                    Book Package
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
