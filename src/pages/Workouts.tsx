import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthContext } from '@/contexts/AuthContext';
import { useHealthData } from '@/hooks/useHealthData';
import { useToast } from '@/hooks/use-toast';
import { WorkoutType } from '@/types/health';
import { Dumbbell, Plus, Trash2, Clock, Calendar } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const workoutTypes: { value: WorkoutType; label: string }[] = [
  { value: 'cardio', label: 'Cardio' },
  { value: 'strength', label: 'Strength' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'sports', label: 'Sports' },
  { value: 'other', label: 'Other' },
];

export default function Workouts() {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const { workouts, addWorkout, deleteWorkout } = useHealthData(user?.id);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<WorkoutType>('cardio');
  const [duration, setDuration] = useState('30');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddWorkout = () => {
    if (!name || !duration) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    addWorkout({
      name,
      type,
      duration: parseInt(duration),
      date,
    });

    toast({
      title: 'Workout added!',
      description: `${name} has been logged.`,
    });

    setName('');
    setType('cardio');
    setDuration('30');
    setDate(new Date().toISOString().split('T')[0]);
    setIsDialogOpen(false);
  };

  const handleDeleteWorkout = (id: string, workoutName: string) => {
    deleteWorkout(id);
    toast({
      title: 'Workout deleted',
      description: `${workoutName} has been removed.`,
    });
  };

  const getTypeColor = (type: WorkoutType) => {
    const colors: Record<WorkoutType, string> = {
      cardio: 'bg-chart-1/20 text-chart-1',
      strength: 'bg-chart-2/20 text-chart-2',
      flexibility: 'bg-chart-3/20 text-chart-3',
      sports: 'bg-chart-4/20 text-chart-4',
      other: 'bg-muted text-muted-foreground',
    };
    return colors[type];
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Workouts</h1>
          <p className="text-muted-foreground">Log and manage your workout sessions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Workout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Workout</DialogTitle>
              <DialogDescription>
                Log a new workout session to track your progress.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Workout Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Morning Run"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(value: WorkoutType) => setType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {workoutTypes.map((wt) => (
                      <SelectItem key={wt.value} value={wt.value}>
                        {wt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleAddWorkout}>
                Add Workout
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{workouts.length}</div>
            <p className="text-sm text-muted-foreground">Total Workouts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {workouts.reduce((sum, w) => sum + w.duration, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Minutes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {workouts.filter(w => w.date === new Date().toISOString().split('T')[0]).length}
            </div>
            <p className="text-sm text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {workouts.length > 0 ? Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length) : 0}
            </div>
            <p className="text-sm text-muted-foreground">Avg Duration</p>
          </CardContent>
        </Card>
      </div>

      {/* Workouts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            Workout History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {workouts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Duration
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Date
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workouts.slice().reverse().map((workout) => (
                  <TableRow key={workout.id}>
                    <TableCell className="font-medium">{workout.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(workout.type)}`}>
                        {workout.type}
                      </span>
                    </TableCell>
                    <TableCell>{workout.duration} min</TableCell>
                    <TableCell>{new Date(workout.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteWorkout(workout.id, workout.name)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No workouts yet</h3>
              <p className="text-muted-foreground mb-4">Start logging your workouts to track your progress</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Workout
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
