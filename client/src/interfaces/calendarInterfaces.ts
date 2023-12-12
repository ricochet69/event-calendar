export interface CalendarEvent {
  id: number;
  start: Date;
  end: Date;
  title: string;
  description: string;
  createdBy: string;
  label: string;
}
export interface CalendarDay {
  id: number;
  isPadding: boolean;
  dateValue: Date;
  events?: CalendarEvent[];
}

export interface CalendarGridProps {
  dateValue: Date;
  eventData?: CalendarEvent[];
  updateAgenda?: (dateSelected: Date, dailyEvents: CalendarEvent[]) => void;
}
