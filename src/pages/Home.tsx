import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/StatCard';
import { useAuthContext } from '@/contexts/AuthContext';
import { useHealthData } from '@/hooks/useHealthData';
import { Footprints, Dumbbell, Droplets, Activity, ArrowRight, Heart, Target, Zap } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  const { getStats } = useHealthData(user?.id);
  const stats = getStats();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight animate-fade-in">
              Track Your Health,{' '}
              <span className="text-primary">Transform Your Life</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Monitor your workouts, steps, water intake, and daily activities. 
              Visualize your progress and achieve your health goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {isAuthenticated ? (
                <Button size="lg" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <>
                  <Button size="lg" onClick={() => navigate('/auth?mode=signup')}>
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
                    Login
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Preview Section */}
      {isAuthenticated && (
        <section className="py-12 bg-card/50">
          <div className="container">
            <h2 className="text-2xl font-display font-bold mb-6">Today's Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                title="Steps"
                value={stats.totalSteps.toLocaleString()}
                subtitle={`Goal: ${stats.stepsGoal.toLocaleString()}`}
                icon={Footprints}
              />
              <StatCard
                title="Workouts"
                value={stats.totalWorkouts}
                subtitle={`Goal: ${stats.workoutsGoal}`}
                icon={Dumbbell}
              />
              <StatCard
                title="Water"
                value={`${stats.totalWaterIntake}ml`}
                subtitle={`Goal: ${stats.waterGoal}ml`}
                icon={Droplets}
              />
              <StatCard
                title="Activities"
                value={stats.totalActivities}
                subtitle="Today"
                icon={Activity}
              />
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Everything You Need to Stay Healthy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Track Everything</h3>
              <p className="text-muted-foreground">
                Log your workouts, steps, water intake, and daily activities all in one place.
              </p>
            </div>
            <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border">
              <div className="w-14 h-14 rounded-full bg-info/20 flex items-center justify-center mx-auto">
                <Target className="h-7 w-7 text-info" />
              </div>
              <h3 className="text-xl font-semibold">Set Goals</h3>
              <p className="text-muted-foreground">
                Define your health targets and track your progress with visual charts.
              </p>
            </div>
            <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border">
              <div className="w-14 h-14 rounded-full bg-warning/20 flex items-center justify-center mx-auto">
                <Zap className="h-7 w-7 text-warning" />
              </div>
              <h3 className="text-xl font-semibold">Stay Motivated</h3>
              <p className="text-muted-foreground">
                View your achievements, streaks, and get inspired by your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-card/50">
          <div className="container text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to Start Your Health Journey?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of users who are tracking their health and achieving their goals.
            </p>
            <Button size="lg" onClick={() => navigate('/auth?mode=signup')}>
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
