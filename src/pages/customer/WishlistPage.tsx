import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function WishlistPage() {
    const wishlistItems = services.slice(0, 3); // Mock wishlist

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-800">My Wishlist</h1>
                    <p className="text-gray-500 mt-1">Saved services to book later</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search wishlist..." className="pl-9 bg-white" />
                </div>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">Start exploring our services to add favorites!</p>
                    <Button className="gradient-coral text-white" asChild>
                        <Link to="/services">Explore Services</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((service) => (
                        <Card key={service.id} className="group border-0 shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                            <div className="absolute top-4 right-4 z-10 index-10">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="bg-white/80 backdrop-blur-sm text-red-500 hover:bg-white hover:text-red-600 rounded-full shadow-sm"
                                    onClick={() => toast.success(`Removed ${service.name} from wishlist`)}
                                >
                                    <Heart className="w-5 h-5 fill-current" />
                                </Button>
                            </div>

                            <div className="h-48 overflow-hidden bg-gray-200 relative">
                                <img
                                    src={service.imageUrls?.[0] || `https://source.unsplash.com/random/800x600/?spa,${service.name.split(' ')[0]}`}
                                    alt={service.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                    <span className="text-white font-bold text-lg">${service.basePrice}</span>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                <div className="mb-2">
                                    <Badge variant="outline" className="border-coral-200 text-coral-600 bg-coral-50 hover:bg-coral-100">{service.category?.name || 'Service'}</Badge>
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-2 truncate" title={service.name}>{service.name}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{service.description}</p>

                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-4 border-t border-gray-100">
                                    <span className="flex items-center gap-1">⏱️ {service.durationMinutes} min</span>
                                    <span className="flex items-center gap-1">⭐ {service.popularityScore}% Popular</span>
                                </div>

                                <Button className="w-full gradient-coral text-white shadow-md hover:shadow-lg transition-all transform active:scale-95" asChild>
                                    <Link to="/customer/booking">Book Now</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
