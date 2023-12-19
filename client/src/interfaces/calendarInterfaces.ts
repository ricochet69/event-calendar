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
export interface CalendarDay {
  id: number;
  isPadding: boolean;
  dateValue: Date;
  events?: CalendarEvent[];
}

export interface CalendarGridProps {
  dateValue: Date;
  eventData?: CalendarEvent[];
  handleAgendaUpdate?: (dateSelected: Date, dailyEvents: CalendarEvent[]) => void;
}
