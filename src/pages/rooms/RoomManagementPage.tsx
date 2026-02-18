import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DoorOpen, Plus, Users, Sparkles, Wrench, Calendar, Clock,
  CheckCircle, AlertCircle, Edit, Eye, MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { rooms } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export function RoomManagementPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

  const filteredRooms = activeTab === 'all'
    ? rooms
    : rooms.filter(r => r.roomType === activeTab);

  const getStatusColor = (room: typeof rooms[0]) => {
    return room.isActive ? 'bg-green-500' : 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800">Room Management</h1>
          <p className="text-gray-500 mt-1">Manage treatment rooms, cabins, and facilities</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-coral-200 hover:bg-coral-50" onClick={() => toast.info('Maintenance schedule opening...')}>
            <Wrench className="w-4 h-4 mr-2" />
            Maintenance
          </Button>
          <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-coral hover:opacity-90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Treatment Room</DialogTitle>
                <DialogDescription>Create a new space for spa services and treatments.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Room Name</Label>
                  <Input placeholder="e.g. Zen Suite" />
                </div>
                <div className="space-y-2">
                  <Label>Room Code</Label>
                  <Input placeholder="e.g. R-101" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select defaultValue="single">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="couple">Couple</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Capacity</Label>
                    <Input type="number" placeholder="1" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddRoomOpen(false)}>Cancel</Button>
                <Button className="gradient-coral text-white" onClick={() => {
                  toast.success('Room added successfully!');
                  setIsAddRoomOpen(false);
                }}>Save Room</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Rooms', value: rooms.length.toString(), color: 'coral' },
          { label: 'Available', value: '4', color: 'green' },
          { label: 'In Use', value: '3', color: 'blue' },
          { label: 'Maintenance', value: '1', color: 'yellow' },
          { label: 'Cleaning', value: '0', color: 'purple' },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-soft">
            <CardContent className="p-4 text-center">
              <p className={cn('text-2xl font-bold', `text-${stat.color}-500`)}>{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100">
          <TabsTrigger value="all">All Rooms</TabsTrigger>
          <TabsTrigger value="single">Single</TabsTrigger>
          <TabsTrigger value="couple">Couple</TabsTrigger>
          <TabsTrigger value="vip">VIP</TabsTrigger>
          <TabsTrigger value="group">Group</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="border-0 shadow-soft overflow-hidden">
                {/* Room Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={room.images[0] || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className={cn('text-white', getStatusColor(room))}>
                      {room.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white">{room.name}</h3>
                    <p className="text-sm text-white/80">{room.code}</p>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Capacity: {room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DoorOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 capitalize">{room.roomType}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {room.amenities.slice(0, 3).map((amenity, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{room.amenities.length - 3}
                      </Badge>
                    )}
                  </div>

                  {room.basePricePremium > 0 && (
                    <div className="flex items-center gap-2 p-2 bg-coral-50 rounded-lg mb-4">
                      <Sparkles className="w-4 h-4 text-coral-500" />
                      <span className="text-sm text-coral-600">
                        +${room.basePricePremium} premium
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
