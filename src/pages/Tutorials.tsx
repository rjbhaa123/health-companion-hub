import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, Dumbbell, Heart, Sparkles } from 'lucide-react';

const tutorials = [
  {
    category: 'Workouts',
    icon: Dumbbell,
    items: [
      { title: 'Full Body HIIT Workout', duration: '20 min', level: 'Intermediate' },
      { title: 'Beginner Strength Training', duration: '30 min', level: 'Beginner' },
      { title: 'Core Strengthening Routine', duration: '15 min', level: 'All Levels' },
      { title: 'Upper Body Blast', duration: '25 min', level: 'Advanced' },
    ],
  },
  {
    category: 'Yoga',
    icon: Heart,
    items: [
      { title: 'Morning Yoga Flow', duration: '20 min', level: 'Beginner' },
      { title: 'Stress Relief Yoga', duration: '30 min', level: 'All Levels' },
      { title: 'Power Yoga Session', duration: '45 min', level: 'Intermediate' },
      { title: 'Bedtime Yoga Routine', duration: '15 min', level: 'Beginner' },
    ],
  },
  {
    category: 'Stretching',
    icon: Sparkles,
    items: [
      { title: 'Post-Workout Stretches', duration: '10 min', level: 'All Levels' },
      { title: 'Flexibility Improvement', duration: '25 min', level: 'Intermediate' },
      { title: 'Office Desk Stretches', duration: '8 min', level: 'Beginner' },
      { title: 'Full Body Stretch Routine', duration: '20 min', level: 'All Levels' },
    ],
  },
];

const tips = [
  {
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water per day, and more when exercising.',
  },
  {
    title: 'Warm Up First',
    description: 'Always spend 5-10 minutes warming up before intense exercise.',
  },
  {
    title: 'Rest Days Matter',
    description: 'Give your muscles time to recover with at least 1-2 rest days per week.',
  },
  {
    title: 'Consistency is Key',
    description: 'Regular shorter workouts are better than occasional long sessions.',
  },
];

export default function Tutorials() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Tutorials & Guides</h1>
        <p className="text-muted-foreground">Learn proper techniques and follow guided workouts</p>
      </div>

      {/* Video Tutorials */}
      {tutorials.map((section) => (
        <div key={section.category} className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <section.icon className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-display font-semibold">{section.category}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {section.items.map((item) => (
              <Card key={item.title} className="overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 group-hover:bg-primary/20 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                      <Play className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {item.level}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Tips Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-display font-semibold mb-6">Health Tips</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {tips.map((tip) => (
            <Card key={tip.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{tip.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      
    </div>
  );
}
