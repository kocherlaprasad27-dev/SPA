import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Gift, Award, ArrowUpRight } from 'lucide-react';
import { customerLoyalty, loyaltyTiers } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export function LoyaltyPage() {
    const loyalty = customerLoyalty[0]; // fallback
    const nextTier = loyaltyTiers.find(t => t.minPoints > loyalty.currentPoints) || loyaltyTiers[loyaltyTiers.length - 1]; // next or max
    const maxPoints = nextTier.minPoints;
    const progress = Math.min((loyalty.currentPoints / maxPoints) * 100, 100);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-800">My Loyalty Rewards</h1>
                    <p className="text-gray-500 mt-1">Earn points and redeem exclusive rewards</p>
                </div>
            </div>

            {/* Hero Card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-8 md:p-12 shadow-xl">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-white/80 uppercase tracking-widest font-semibold text-sm mb-2">Current Balance</p>
                        <h2 className="text-5xl md:text-7xl font-bold mb-4">{loyalty.currentPoints} <span className="text-2xl font-medium">pts</span></h2>
                        <Badge className="bg-white/20 text-white hover:bg-white/30 px-4 py-1 text-smbackdrop-blur-sm border-0">
                            {loyalty.currentTier?.name} Member
                        </Badge>
                    </div>
                    <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <div className="flex justify-between text-sm mb-2 font-medium">
                            <span>{loyalty.currentTier?.name}</span>
                            <span>{nextTier?.name}</span>
                        </div>
                        <Progress value={progress} className="h-3 bg-black/20" />
                        <p className="mt-4 text-sm text-center">
                            Earn <span className="font-bold">{maxPoints - loyalty.currentPoints}</span> more points to reach {nextTier?.name} status!
                        </p>
                    </div>
                </div>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-0 shadow-soft col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Gift className="w-5 h-5 text-coral-500" />
                            Available Rewards
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: '$10 Gift Voucher', cost: '500 points', icon: '🎁' },
                                { title: 'Free Facial Add-on', cost: '800 points', icon: '✨' },
                                { title: '20% Off Next Visit', cost: '1200 points', icon: '🎟️' },
                                { title: 'VIP Lounge Access', cost: '2000 points', icon: '🥂' },
                            ].map((item, i) => (
                                <div key={i} className="border rounded-xl p-4 flex gap-4 hover:border-coral-200 transition-colors group cursor-pointer" onClick={() => toast.success(`Challenge started! Spend ${item.cost} to get ${item.title}`)}>
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-coral-50 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 group-hover:text-coral-600 transition-colors">{item.title}</h4>
                                        <p className="text-sm text-gray-500 mb-2">Redeem for {item.cost}</p>
                                        <Button size="sm" variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); toast.success(`Redeemed ${item.title}! Check your email.`); }}>Redeem</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            Tier Benefits
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                                <span>5% discount on all services</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                                <span>Free birthday treatment</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                                <span>Priority booking access</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm opacity-50">
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">🔒</div>
                                <span>Partner rewards (Platinum)</span>
                            </li>
                        </ul>
                        <Button variant="link" className="w-full mt-4 text-coral-500" onClick={() => toast.info('Detailed benefits list coming soon!')}>View All Benefits <ArrowUpRight className="w-4 h-4 ml-1" /></Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-0 shadow-soft">
                <CardHeader>
                    <CardTitle>Points History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { date: 'Feb 15, 2024', desc: 'Visit: Swedish Massage', points: '+150', type: 'earn' },
                            { date: 'Jan 20, 2024', desc: 'Redeemed: $10 Voucher', points: '-500', type: 'spend' },
                            { date: 'Jan 05, 2024', desc: 'Visit: Haircut', points: '+80', type: 'earn' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">{item.desc}</p>
                                    <p className="text-sm text-gray-500">{item.date}</p>
                                </div>
                                <span className={`font-bold ${item.type === 'earn' ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.points}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
