import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Package, Plus, Search, Filter, AlertTriangle, TrendingDown, TrendingUp,
  ShoppingCart, Truck, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { products, productCategories } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const stockData = [
  { name: 'Skincare', inStock: 45, lowStock: 12, outOfStock: 3 },
  { name: 'Massage Oils', inStock: 23, lowStock: 8, outOfStock: 1 },
  { name: 'Nail Care', inStock: 67, lowStock: 5, outOfStock: 0 },
  { name: 'Hair Removal', inStock: 12, lowStock: 15, outOfStock: 2 },
  { name: 'Retail', inStock: 18, lowStock: 6, outOfStock: 1 },
];

export function InventoryManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (product: typeof products[0]) => {
    if (product.stockQuantity <= 0) return { label: 'Out of Stock', color: 'bg-red-500' };
    if (product.stockQuantity <= product.reorderLevel) return { label: 'Low Stock', color: 'bg-yellow-500' };
    return { label: 'In Stock', color: 'bg-green-500' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Inventory</h1>
          <p className="text-gray-500 mt-1">Manage products, stock levels, and suppliers</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-coral-200 hover:bg-coral-50" onClick={() => toast.info('Purchase order wizard opening...')}>
            <Truck className="w-4 h-4 mr-2" />
            Purchase Order
          </Button>
          <Button className="gradient-coral hover:opacity-90 text-white" onClick={() => toast.info('Add new product form opening...')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: '156', icon: Package, color: 'coral' },
          { label: 'In Stock', value: '128', icon: TrendingUp, color: 'green' },
          { label: 'Low Stock', value: '23', icon: AlertTriangle, color: 'yellow' },
          { label: 'Out of Stock', value: '5', icon: TrendingDown, color: 'red' },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-soft cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toast.info(`Viewing detailed report for ${stat.label}...`)}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', `bg-${stat.color}-100`)}>
                <stat.icon className={cn('w-6 h-6', `text-${stat.color}-500`)} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="products">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="stock">Stock Levels</TabsTrigger>
          <TabsTrigger value="purchase">Purchase Orders</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6 mt-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">All Categories</option>
              {productCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <Button variant="outline" onClick={() => toast.info('Advanced filter options coming soon!')}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Products Table */}
          <Card className="border-0 shadow-soft">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">SKU</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Stock</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => {
                      const stockStatus = getStockStatus(product);
                      return (
                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Package className="w-5 h-5 text-gray-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.unitOfMeasure}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-gray-600">{product.sku}</p>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="secondary">{product.category?.name}</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="w-24">
                              <div className="flex justify-between text-sm mb-1">
                                <span>{product.stockQuantity}</span>
                                <span className="text-gray-400">/ {product.maxStockLevel}</span>
                              </div>
                              <Progress
                                value={(product.stockQuantity / (product.maxStockLevel || 100)) * 100}
                                className="h-1.5"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium">${product.sellingPrice}</p>
                              <p className="text-sm text-gray-500">Cost: ${product.purchasePrice}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={cn('text-white', stockStatus.color)}>
                              {stockStatus.label}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Button variant="ghost" size="sm" onClick={() => toast.info(`Viewing details for ${product.name}...`)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Stock Level by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="inStock" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="lowStock" fill="#eab308" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="outOfStock" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-coral-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">Purchase Orders</h3>
              <p className="text-gray-500 mt-2">Manage your purchase orders and supplier relationships</p>
              <Button className="mt-4 gradient-coral text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Purchase Order
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6 mt-6">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-12 text-center">
              <Truck className="w-16 h-16 text-coral-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">Vendors</h3>
              <p className="text-gray-500 mt-2">Manage your suppliers and vendor relationships</p>
              <Button className="mt-4 gradient-coral text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Vendor
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
