export interface Event {
  _id: number;
  start: Date;
  end: Date;
  title: string;
  description: string;
  createdBy: string;
  category: {
    name: string;
    color: string;
  };
  gridIndex?: number;
}
export interface CalendarDay {
  id: number;
  isPadding: boolean;
  dateValue: Date;
  events?: Event[];
}

export interface CalendarGridProps {
  eventData?: Event[];
  handleAgendaUpdate?: (dateSelected: Date, dailyEvents: Event[]) => void;
}
