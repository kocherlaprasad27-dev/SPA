
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';

const jobs = [
    {
        id: 1,
        title: "Licensed Massage Therapist",
        location: "New York, NY",
        type: "Full-Time",
        salary: "$50k - $70k",
        description: "We are looking for a skilled Massage Therapist to provide exceptional treatments and customer service.",
        requirements: ["Licensed in NY State", "2+ years experience", "Deep Tissue & Swedish techniques"]
    },
    {
        id: 2,
        title: "Esthetician",
        location: "Brooklyn, NY",
        type: "Part-Time",
        salary: "$30/hr + Tips",
        description: "Join our skincare team! Experience with facials, waxing, and peels required.",
        requirements: ["Licensed Esthetician", "Knowledge of Dermalogica products", "Customer service focus"]
    },
    {
        id: 3,
        title: "Spa Receptionist",
        location: "New York, NY",
        type: "Full-Time",
        salary: "$18 - $22/hr",
        description: "Be the first face our clients see. Manage bookings, phone calls, and check-ins.",
        requirements: ["Excellent communication skills", "Basic computer knowledge", "Friendly demeanor"]
    },
];

export function CareersPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gray-900 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Join Our Team</h1>
                <p className="text-xl max-w-2xl mx-auto text-gray-300">
                    Passionate about wellness? We're always looking for talented individuals to grow with us.
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Open Positions</h2>
                <div className="space-y-6">
                    {jobs.map((job) => (
                        <Card key={job.id} className="border hover:border-coral-200 transition-colors cursor-pointer group shadow-sm hover:shadow-md">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-coral-600 transition-colors">{job.title}</h3>
                                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                                            <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
                                            <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="hidden sm:flex border-coral-200 text-coral-600 hover:bg-coral-50">Apply Now</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">{job.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {job.requirements.map((req, i) => (
                                        <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-600 font-normal">
                                            {req}
                                        </Badge>
                                    ))}
                                </div>
                                <Button className="w-full mt-6 sm:hidden gradient-coral text-white">Apply Now</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
