import { Event } from "../interfaces/calendarInterfaces";

interface State {
  date: Date;
  currentEvents: Event[];
}

interface SetDateAction {
  type: "SET_DATE";
  payload: Date;
}

interface SetCurrentEventsAction {
  type: "SET_CURRENT_EVENTS";
  payload: Event[];
}

type Action = SetDateAction | SetCurrentEventsAction;

export const initialDateState: State = {
  date: new Date(),
  currentEvents: [],
};

export const dateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_CURRENT_EVENTS":
      return { ...state, currentEvents: action.payload };
    default:
      return state;
  }
};
