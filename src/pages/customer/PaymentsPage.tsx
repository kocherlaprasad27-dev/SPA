import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, Download, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function PaymentsPage() {
    // Mock payments if not available in mockData, but I remember seeing payments there or I can mock locally.
    // mockData has payments? Yes, let's assume it does or use a local mock array if not exported.
    // To avoid errors, I'll use a local mock array.

    const paymentMethods = [
        { id: '1', type: 'Visa', last4: '4242', expiry: '12/24', isDefault: true },
        { id: '2', type: 'Mastercard', last4: '8888', expiry: '09/25', isDefault: false },
    ];

    const transactionHistory = [
        { id: 'INV-001', date: '2024-02-15', amount: 120.00, status: 'Paid', method: 'Visa **** 4242' },
        { id: 'INV-002', date: '2024-01-20', amount: 85.50, status: 'Paid', method: 'Mastercard **** 8888' },
        { id: 'INV-003', date: '2023-12-10', amount: 200.00, status: 'Refunded', method: 'Visa **** 4242' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-gray-800">Payments & Billing</h1>
                    <p className="text-gray-500 mt-1">Manage payment methods and view history</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-soft">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold">Payment Methods</CardTitle>
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info('Add payment method flow starting...')}>
                            <Plus className="w-4 h-4" /> Add New
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => toast.success(`Changed default to ${method.type} ending in ${method.last4}`)}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-500 text-xs group-hover:bg-coral-50 group-hover:text-coral-500 transition-colors">
                                        {method.type}
                                    </div>
                                    <div>
                                        <p className="font-medium">•••• •••• •••• {method.last4}</p>
                                        <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                                    </div>
                                </div>
                                {method.isDefault && (
                                    <Badge className="bg-coral-100 text-coral-700">Default</Badge>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Billing Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl text-green-700">
                                <span className="font-medium">Outstanding Balance</span>
                                <span className="text-2xl font-bold">$0.00</span>
                            </div>
                            <p className="text-sm text-gray-500">
                                Your next billing date is <span className="font-bold">March 1, 2024</span> for your monthly membership.
                            </p>
                            <Button className="w-full" variant="outline" onClick={() => toast.info('Generating detailed statement...')}>View Detailed Statement</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-0 shadow-soft">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactionHistory.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell className="font-medium">{tx.id}</TableCell>
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell>${tx.amount.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge variant={tx.status === 'Paid' ? 'default' : 'secondary'} className={
                                                tx.status === 'Paid' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                                    tx.status === 'Refunded' ? 'bg-gray-100 text-gray-800 hover:bg-gray-100' : ''
                                            }>
                                                {tx.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{tx.method}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => toast.success(`Downloaded ${tx.id}`)}>
                                                <Download className="w-4 h-4 text-gray-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {transactionHistory.map((tx) => (
                            <div key={tx.id} className="p-4 border rounded-xl space-y-3 bg-gray-50/50">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-900">{tx.id}</span>
                                    <span className="text-sm text-gray-500">{tx.date}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-gray-900">${tx.amount.toFixed(2)}</span>
                                    <Badge variant={tx.status === 'Paid' ? 'default' : 'secondary'} className={
                                        tx.status === 'Paid' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                            tx.status === 'Refunded' ? 'bg-gray-100 text-gray-800 hover:bg-gray-100' : ''
                                    }>
                                        {tx.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                    <span className="text-sm text-gray-600">{tx.method}</span>
                                    <Button variant="ghost" size="sm" onClick={() => toast.success(`Downloaded ${tx.id}`)}>
                                        <Download className="w-4 h-4 text-gray-500" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
