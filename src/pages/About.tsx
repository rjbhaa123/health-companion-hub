import { Card, CardContent } from '@/components/ui/card';
import { Activity, Target, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: 'Track Everything',
    description: 'Monitor your steps, workouts, water intake, and daily activities all in one place.',
  },
  {
    icon: Target,
    title: 'Set Goals',
    description: 'Define personal health targets and track your progress with visual charts.',
  },
  {
    icon: Users,
    title: 'For Everyone',
    description: 'Whether you\'re just starting or an experienced athlete, HealthTrack adapts to you.',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'Your health data stays on your device. We prioritize your privacy.',
  },
];

export default function About() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Activity className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">About HealthTrack</h1>
          <p className="text-lg text-muted-foreground">
            Your personal health companion for tracking fitness, nutrition, and wellness.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-display font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At HealthTrack, we believe that everyone deserves access to simple, effective tools 
              for managing their health. Our mission is to empower individuals to take control of 
              their wellness journey through intuitive tracking and meaningful insights.
            </p>
            <p className="text-muted-foreground">
              We've designed HealthTrack to be straightforward and accessible, removing the complexity 
              often associated with health apps. Whether you're counting steps, logging workouts, or 
              monitoring your water intake, we make it easy to build and maintain healthy habits.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-display font-semibold mb-6 text-center">Why HealthTrack?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6">
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-display font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              HealthTrack was born from a simple idea: health tracking shouldn't be complicated. 
              We noticed that many health apps overwhelm users with features they don't need, 
              making it harder to focus on what matters most — building consistent, healthy habits.
            </p>
            <p className="text-muted-foreground">
              We built HealthTrack to be different. Clean design, essential features, and a 
              focus on the metrics that actually matter. No overwhelming dashboards, no confusing 
              settings — just a simple, effective way to track your health journey.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-2xl font-display font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-2">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <p className="text-primary font-medium"><a href="mailto:rimonjitsaikia03@gmail.com">rimonjitsaikia03@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
