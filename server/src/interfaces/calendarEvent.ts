export interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
  description: string;
  category: {
    name: string;
    color: string;
  };
}
