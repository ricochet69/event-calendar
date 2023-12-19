export interface CalendarEvent {
  id: number;
  start: Date;
  end: Date;
  title: string;
  description: string;
  createdBy: string;
  category: {
    name: string;
    color: string;
  };
}
