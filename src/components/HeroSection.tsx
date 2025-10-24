
import { Rocket, CircleCheck } from 'lucide-react';
import { Badge } from './Badge';
import { Card, CardContent } from './Card';
import { Progress } from './Progress';
import { Button } from './Button';

export default function HeroSection() {
  return (
    <div className="border-b bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="gradient">Conference</Badge>
              <Badge variant="purple">Ongoing</Badge>
              <Badge variant="success">
                <CircleCheck className="h-3 w-3" />
                Event Completed
              </Badge>
            </div>
            <h1 className="text-3xl">TechVista Summit 2025</h1>
            <p className="text-muted-foreground max-w-2xl">Innovation. Collaboration. Growth.</p>
          </div>

          <div className="flex gap-4 flex-shrink-0">
            <Card className="w-48 border-[var(--brand-teal)] bg-gradient-to-br from-cyan-50 to-card dark:from-cyan-950/20">
              <CardContent className="pt-6 pb-4 text-center space-y-2">
                <p className="text-xs text-muted-foreground">Overall Progress</p>
                <div className="text-2xl bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] bg-clip-text text-transparent">
                  0%
                </div>
                <Progress/>
              </CardContent>
            </Card>

            <Card className="w-64 border-[var(--brand-pink)] bg-gradient-to-br from-pink-50 to-card dark:from-pink-950/20">
              <CardContent className="pt-6 pb-4">
                <Button className="w-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] text-white hover:opacity-90">
                  <Rocket className="h-3.5 w-3.5" />
                  Publish Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}