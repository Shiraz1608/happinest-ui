
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from './Card';
import { Button } from './Button';

export default function PriorityActions() {
  const actions = [
    {
      title: 'Venue Setup',
      desc: 'Large convention center with 6 halls and breakout rooms',
    },
    {
      title: 'Guest Management',
      desc: '1200+ attendee registration and badge tracking',
    },
    {
      title: 'Vendor Coordination',
      desc: 'AV providers, catering, and 25+ sponsor booths',
    },
  ];

  return (
    <Card className="border-[var(--brand-pink)] bg-gradient-to-br from-pink-50 to-card dark:from-pink-950/20 dark:to-card">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="leading-none">Priority Actions</h4>
            <p className="text-muted-foreground">
              Build a strong foundation for your event success
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {actions.map((action, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
          >
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] flex items-center justify-center flex-shrink-0 text-white text-xs">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p>{action.title}</p>
              <p className="text-sm text-muted-foreground">{action.desc}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 px-3 flex-shrink-0"
            >
              Start
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}