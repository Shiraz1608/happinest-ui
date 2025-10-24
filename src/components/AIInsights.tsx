
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from './Card';

export default function AIInsights() {
  return (
    <Card>
      <CardHeader>
        <h4 className="leading-none flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[var(--brand-pink)]" />
          Happinest AI Event Insights
        </h4>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          For your large 3-day conference with 1200 attendees, I've set up
          multi-track scheduling across all days, sponsor management,
          networking facilitation, and comprehensive analytics tracking.
        </p>
      </CardContent>
    </Card>
  );
}