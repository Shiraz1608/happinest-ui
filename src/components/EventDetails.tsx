
import { Calendar, Users, MapPin, Store } from 'lucide-react';
import { Card, CardContent, CardHeader } from './Card';

export default function EventDetails() {
  return (
    <Card>
      <CardHeader>
        <h4 className="leading-none">Event Details</h4>
      </CardHeader>
      <CardContent>
        <div className="mb-6 rounded-lg overflow-hidden border border-border">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"
            alt="Event poster"
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date & Time</p>
                <p>October 9-11, 2025</p>
                <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expected Guests</p>
                <p>1200</p>
                <p className="text-sm text-muted-foreground">CTOs, engineering managers...</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Venue</p>
                <p>Bangalore International Convention Centre</p>
                <p className="text-sm text-muted-foreground">Bangalore</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Store className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Theme</p>
                <p>Tech Innovation</p>
                <div className="flex gap-1 mt-1">
                  {['#ecfeff', '#d0f9ff', '#27e2d6', '#0891b2'].map(c => (
                    <div key={c} className="h-4 w-4 rounded border border-border" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}