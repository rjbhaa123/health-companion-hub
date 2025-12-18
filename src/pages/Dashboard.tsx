import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatCard } from '@/components/StatCard';
import { useAuthContext } from '@/contexts/AuthContext';
import { useHealthData } from '@/hooks/useHealthData';
import { useToast } from '@/hooks/use-toast';
import { Footprints, Dumbbell, Droplets, Activity, Plus, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const CHART_COLORS = ['hsl(160, 84%, 39%)', 'hsl(199, 89%, 48%)', 'hsl(38, 92%, 50%)', 'hsl(280, 65%, 60%)', 'hsl(0, 62%, 50%)'];

export default function Dashboard() {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const {
    workouts,
    waterIntakes,
    stepCounts,
    activities,
    addWaterIntake,
    addSteps,
    addActivity,
    getStats,
  } = useHealthData(user?.id);
  
  const stats = getStats();
  const [waterAmount, setWaterAmount] = useState('250');
  const [stepsAmount, setStepsAmount] = useState('1000');
  const [activityName, setActivityName] = useState('');
  const [activityDuration, setActivityDuration] = useState('30');

  // Workout type distribution for pie chart
  const workoutTypeData = workouts.reduce((acc: { name: string; value: number }[], workout) => {
    const existing = acc.find(item => item.name === workout.type);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: workout.type, value: 1 });
    }
    return acc;
  }, []);

  // Goals progress for donut chart
  const goalsData = [
    { name: 'Steps', value: Math.min(stats.totalSteps / stats.stepsGoal * 100, 100), color: CHART_COLORS[0] },
    { name: 'Water', value: Math.min(stats.totalWaterIntake / stats.waterGoal * 100, 100), color: CHART_COLORS[1] },
    { name: 'Workouts', value: Math.min(stats.totalWorkouts / stats.workoutsGoal * 100, 100), color: CHART_COLORS[2] },
  ];

  const handleAddWater = () => {
    const amount = parseInt(waterAmount);
    if (amount > 0) {
      addWaterIntake(amount);
      toast({ title: 'Water logged!', description: `Added ${amount}ml to your intake.` });
    }
  };

  const handleAddSteps = () => {
    const steps = parseInt(stepsAmount);
    if (steps > 0) {
      addSteps(steps);
      toast({ title: 'Steps logged!', description: `Added ${steps} steps to your count.` });
    }
  };

  const handleAddActivity = () => {
    if (activityName && activityDuration) {
      addActivity({
        name: activityName,
        description: '',
        duration: parseInt(activityDuration),
        date: new Date().toISOString().split('T')[0],
      });
      toast({ title: 'Activity logged!', description: `${activityName} has been added.` });
      setActivityName('');
      setActivityDuration('30');
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Track your daily health metrics</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Steps Today"
          value={stats.totalSteps.toLocaleString()}
          subtitle={`${Math.round((stats.totalSteps / stats.stepsGoal) * 100)}% of goal`}
          icon={Footprints}
        />
        <StatCard
          title="Workouts"
          value={stats.totalWorkouts}
          subtitle={`Goal: ${stats.workoutsGoal}`}
          icon={Dumbbell}
        />
        <StatCard
          title="Water Intake"
          value={`${stats.totalWaterIntake}ml`}
          subtitle={`${Math.round((stats.totalWaterIntake / stats.waterGoal) * 100)}% of goal`}
          icon={Droplets}
        />
        <StatCard
          title="Activities"
          value={stats.totalActivities}
          subtitle="Today"
          icon={Activity}
        />
      </div>

      {/* Quick Add Section */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Droplets className="h-4 w-4 text-info" />
              Log Water
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="number"
                value={waterAmount}
                onChange={(e) => setWaterAmount(e.target.value)}
                placeholder="ml"
              />
              <Button onClick={handleAddWater} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              {[250, 500, 750].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => { setWaterAmount(String(amount)); addWaterIntake(amount); toast({ title: `Added ${amount}ml` }); }}
                >
                  {amount}ml
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Footprints className="h-4 w-4 text-primary" />
              Log Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="number"
                value={stepsAmount}
                onChange={(e) => setStepsAmount(e.target.value)}
                placeholder="steps"
              />
              <Button onClick={handleAddSteps} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              {[1000, 2500, 5000].map((steps) => (
                <Button
                  key={steps}
                  variant="outline"
                  size="sm"
                  onClick={() => { setStepsAmount(String(steps)); addSteps(steps); toast({ title: `Added ${steps} steps` }); }}
                >
                  {steps}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-warning" />
              Log Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Activity name"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                value={activityDuration}
                onChange={(e) => setActivityDuration(e.target.value)}
                placeholder="Duration (min)"
              />
              <Button onClick={handleAddActivity} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Workout Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {workoutTypeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={workoutTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {workoutTypeData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No workouts logged yet
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Daily Goals Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={goalsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${Math.round(value)}%`}
                >
                  {goalsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${Math.round(value)}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            {workouts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workouts.slice(-5).reverse().map((workout) => (
                    <TableRow key={workout.id}>
                      <TableCell className="font-medium">{workout.name}</TableCell>
                      <TableCell className="capitalize">{workout.type}</TableCell>
                      <TableCell>{workout.duration} min</TableCell>
                      <TableCell>{new Date(workout.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-8">No workouts logged yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.slice(-5).reverse().map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.name}</TableCell>
                      <TableCell>{activity.duration} min</TableCell>
                      <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-8">No activities logged yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
