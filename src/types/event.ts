export interface AppEvent {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  guests: string | number;
  tags: string[];
  image?: string;
}
