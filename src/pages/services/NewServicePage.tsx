import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
    Sparkles, DollarSign, Clock, Tag,
    ChevronLeft, Camera, Plus, Save
} from 'lucide-react';
import { productCategories } from '@/data/mockData';
import { toast } from 'sonner';

export function NewServicePage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            toast.success('Service created successfully!');
            setIsLoading(false);
            navigate('/admin/services');
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-800">New Service</h1>
                    <p className="text-gray-500">Add a new treatment or service to your menu</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-0 shadow-soft">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-coral-500" />
                            General Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Service Name</Label>
                            <Input id="name" placeholder="e.g. Deep Tissue Massage" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="facials">Facials</SelectItem>
                                        <SelectItem value="massage">Massage</SelectItem>
                                        <SelectItem value="waxing">Waxing</SelectItem>
                                        <SelectItem value="threading">Threading</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration (Minutes)</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input id="duration" type="number" className="pl-10" placeholder="60" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the service, its benefits, and what customers can expect..."
                                className="min-h-[120px]"
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-coral-500" />
                                Pricing
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Base Price</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <Input id="price" type="number" className="pl-8" placeholder="0.00" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tax">Tax Rate (%)</Label>
                                <Input id="tax" type="number" placeholder="8.25" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Camera className="w-5 h-5 text-coral-500" />
                                Service Image
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer">
                                <Plus className="w-8 h-8 text-gray-400" />
                                <span className="text-xs text-gray-500">Upload Image</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-3">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)}>Discard</Button>
                        <Button type="submit" className="flex-1 gradient-coral text-white" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Save Service'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
