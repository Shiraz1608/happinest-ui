
import { CircleAlert, ArrowRight } from 'lucide-react';
import { Badge } from './Badge';
import { Card, CardContent, CardHeader } from './Card';
import { Progress } from './Progress';

const modules = [
  'Venue Setup',
  'Guest Management',
  'Vendor Coordination',
  'Event Schedule',
  'Budget',
  'Approval Workflow',
  'Logistics',
  'Content Curation',
  'Analytics',
];

export default function ModuleProgress() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2>Module Progress</h2>
        <Badge variant="default">0 of 9 Complete</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((mod) => (
          <Card
            key={mod}
            className="group hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base truncate">{mod}</h4>
                    <CircleAlert className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  </div>
                </div>
                <Badge variant="default" className="flex-shrink-0">
                  0%
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <Progress indeterminate />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Not Started</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[var(--brand-pink)] transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}