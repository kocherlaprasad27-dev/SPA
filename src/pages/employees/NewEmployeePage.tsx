import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    User, Mail, Phone, Briefcase, Award,
    Settings, ChevronLeft, Camera, Sparkles,
    Plus, Github, Twitter, Linkedin, Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function NewEmployeePage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [specializations, setSpecializations] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!specializations.includes(tagInput.trim())) {
                setSpecializations([...specializations, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setSpecializations(specializations.filter(t => t !== tag));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Employee onboarded successfully!', {
                description: 'An invitation email has been sent to the new staff member.',
            });
            setIsLoading(false);
            navigate('/admin/employees');
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full hover:bg-white/50">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </Button>
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-800">Add New Staff</h1>
                    <p className="text-gray-500">Onboard a new therapist or team member</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Personal & Professional Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Avatar Upload Placeholder */}
                    <Card className="border-0 shadow-soft overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient-x" />
                        <CardContent className="relative pt-0 px-6">
                            <div className="flex flex-col sm:flex-row items-end gap-6 -mt-12">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md">
                                        <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                                            <Camera className="w-8 h-8 text-gray-400" />
                                        </div>
                                    </div>
                                    <Button type="button" size="icon" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full gradient-indigo shadow-lg scale-0 group-hover:scale-100 transition-transform">
                                        <Plus className="w-4 h-4 text-white" />
                                    </Button>
                                </div>
                                <div className="flex-1 pb-2">
                                    <h3 className="text-xl font-bold text-gray-800">Profile Photo</h3>
                                    <p className="text-sm text-gray-500">Upload a professional headshot for the customer portal</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <User className="w-5 h-5 text-indigo-500" />
                                Personal Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="e.g. Sarah" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="e.g. Miller" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input id="email" type="email" className="pl-10" placeholder="sarah.m@spabook.com" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input id="phone" className="pl-10" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="bio">Professional Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Share the staff member's experience and philosophy..."
                                    className="min-h-[100px] resize-none"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-indigo-500" />
                                Professional Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Role / Designation</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="senior-aesthetician">Senior Aesthetician</SelectItem>
                                        <SelectItem value="aesthetician">Aesthetician</SelectItem>
                                        <SelectItem value="waxing-specialist">Waxing Specialist</SelectItem>
                                        <SelectItem value="wellness-coach">Wellness Coach</SelectItem>
                                        <SelectItem value="receptionist">Receptionist</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Department</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="beauty">Beauty Services</SelectItem>
                                        <SelectItem value="wellness">Wellness & Scalp</SelectItem>
                                        <SelectItem value="men">Men's Grooming</SelectItem>
                                        <SelectItem value="admin">Administration</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="md:col-span-2 space-y-3">
                                <Label>Specializations</Label>
                                <div className="flex flex-wrap gap-2 min-h-[42px] p-2 bg-gray-50 rounded-lg border border-gray-100">
                                    {specializations.map((tag) => (
                                        <Badge key={tag} className="bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 cursor-pointer transition-colors group" onClick={() => removeTag(tag)}>
                                            {tag}
                                            <span className="ml-1 opacity-50 group-hover:opacity-100">×</span>
                                        </Badge>
                                    ))}
                                    <input
                                        className="flex-1 bg-transparent border-none outline-none text-sm min-w-[120px] h-6 px-1"
                                        placeholder="Type and press Enter to add..."
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Settings & Social */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Settings className="w-5 h-5 text-indigo-500" />
                                Configurations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="hireDate">Hire Date</Label>
                                <Input id="hireDate" type="date" className="w-full" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="commission">Commission Rate (%)</Label>
                                <Input id="commission" type="number" placeholder="30" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-indigo-600" />
                                    <Label htmlFor="isVip" className="font-semibold text-indigo-900">VIP Therapist</Label>
                                </div>
                                <input type="checkbox" id="isVip" className="w-5 h-5 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500" />
                            </div>
                            <div className="pt-2">
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Designating as a VIP therapist allows the staff to charge premium rates and appear as a recommended provider.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-soft">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-500" />
                                Social Profiles
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="relative">
                                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input className="pl-10 text-xs" placeholder="LinkedIn URL" />
                            </div>
                            <div className="relative">
                                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input className="pl-10 text-xs" placeholder="Portfolio/GitHub" />
                            </div>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input className="pl-10 text-xs" placeholder="Personal Website" />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        <Button
                            type="submit"
                            className="w-full gradient-indigo text-white font-bold py-6 shadow-indigo"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Onboard Employee'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-gray-200"
                            onClick={() => navigate('/admin/employees')}
                            disabled={isLoading}
                        >
                            Discard
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
