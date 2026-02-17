import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, User, Mail, Phone } from 'lucide-react';
import { customers } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function ProfilePage() {
    const { user } = useAuth();
    const customer = customers[0]; // fallback mock

    const displayedUser = user?.role === 'customer' ? user : customer;

    // Fallback if user is just basic login info without full profile
    const firstName = displayedUser.firstName || customer.firstName;
    const lastName = displayedUser.lastName || customer.lastName;
    const email = displayedUser.email || customer.email;
    const phone = customer.phone; // user context might not have phone

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:items-center sm:flex-row justify-between gap-4">
                <h1 className="text-3xl font-display font-bold text-gray-800">My Profile</h1>
                <Button variant="outline" className="gap-2 w-fit" onClick={() => toast.info('Edit profile form opening...')}>
                    <Edit className="w-4 h-4" /> Edit Profile
                </Button>
            </div>

            <Card className="border-0 shadow-soft overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]"></div>
                <div className="px-6 pb-6 relative">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-12 sm:ml-4">
                        <div className="border-4 border-white rounded-full overflow-hidden w-28 h-28 sm:w-32 sm:h-32 shadow-lg bg-white flex-shrink-0">
                            <Avatar className="w-full h-full">
                                <AvatarImage src={displayedUser.avatar} />
                                <AvatarFallback className="text-4xl">{firstName[0]}</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="flex-1 flex flex-col sm:flex-row justify-between items-center sm:items-start w-full gap-4 sm:pt-4">
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-gray-900">{firstName} {lastName}</h2>
                                <p className="text-gray-500">Member since Jan 2024</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100 italic">Gold Member</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-soft">
                    <CardHeader>
                        <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Email Address</p>
                                <p className="font-medium text-gray-900">{email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Phone Number</p>
                                <p className="font-medium text-gray-900">{phone}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                    <CardHeader>
                        <CardTitle className="text-lg">Preferences</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Communication</p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Email: Yes</span>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">SMS: Yes</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">Push: No</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Dietary / Allergies</p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs">Peanuts</span>
                                    <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs">Latex</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
