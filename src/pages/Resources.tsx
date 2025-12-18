import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, Apple, Brain, Heart, Moon, Salad } from 'lucide-react';

const articles = [
  {
    title: 'The Science of Habit Formation',
    description: 'Learn how to build lasting healthy habits based on scientific research.',
    category: 'Lifestyle',
    icon: Brain,
    readTime: '8 min read',
  },
  {
    title: 'Nutrition Basics for Fitness',
    description: 'Understanding macronutrients and how to fuel your workouts effectively.',
    category: 'Nutrition',
    icon: Apple,
    readTime: '12 min read',
  },
  {
    title: 'The Importance of Sleep',
    description: 'How quality sleep impacts your fitness goals and overall health.',
    category: 'Recovery',
    icon: Moon,
    readTime: '6 min read',
  },
  {
    title: 'Heart Health & Cardio',
    description: 'Benefits of cardiovascular exercise and how to optimize your cardio routine.',
    category: 'Fitness',
    icon: Heart,
    readTime: '10 min read',
  },
  {
    title: 'Meal Prep for Beginners',
    description: 'Simple strategies to prepare healthy meals for the week ahead.',
    category: 'Nutrition',
    icon: Salad,
    readTime: '15 min read',
  },
  {
    title: 'Understanding Your Body',
    description: 'How to listen to your body and adjust your training accordingly.',
    category: 'Fitness',
    icon: BookOpen,
    readTime: '7 min read',
  },
];

const externalLinks = [
  {
    title: 'World Health Organization',
    description: 'Global health guidelines and recommendations',
    url: 'https://www.who.int',
  },
  {
    title: 'MyFitnessPal',
    description: 'Calorie counting and nutrition tracking',
    url: 'https://www.myfitnesspal.com',
  },
  {
    title: 'Headspace',
    description: 'Meditation and mindfulness resources',
    url: 'https://www.headspace.com',
  },
  {
    title: 'Examine.com',
    description: 'Science-based supplement and nutrition information',
    url: 'https://examine.com',
  },
];

const categoryColors: Record<string, string> = {
  Lifestyle: 'bg-chart-4/20 text-chart-4',
  Nutrition: 'bg-chart-3/20 text-chart-3',
  Recovery: 'bg-chart-2/20 text-chart-2',
  Fitness: 'bg-chart-1/20 text-chart-1',
};

export default function Resources() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Resources</h1>
        <p className="text-muted-foreground">Articles, guides, and useful links for your health journey</p>
      </div>

      {/* Articles Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-semibold mb-6">Health Articles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <Card key={article.title} className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[article.category]}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>
                <CardTitle className="text-lg flex items-start gap-2">
                  <article.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{article.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center mt-6">
          These are placeholder articles. In production, these would link to full article pages.
        </p>
      </section>

      {/* External Links Section */}
      <section>
        <h2 className="text-2xl font-display font-semibold mb-6">Useful Links</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {externalLinks.map((link) => (
            <Card key={link.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{link.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <CardDescription>{link.description}</CardDescription>
                <Button variant="ghost" size="icon" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <Card className="mt-12 bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Disclaimer:</strong> The information provided here is for educational purposes only 
            and should not replace professional medical advice. Always consult with a healthcare provider 
            before starting any new exercise or diet program.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
