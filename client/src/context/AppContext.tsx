import { ReactNode, createContext, useReducer } from "react";
import { Event } from "../interfaces/calendarInterfaces";

// Reducer setup
interface AppState {
  date: Date;
  events: Event[];
  currentEvents: Event[];
  toggleDatePicker: boolean;
  toggleEventForm: boolean;
  isAgendaOpen: boolean;
  isAddNewEvent: boolean;
}

interface SetDateAction {
  type: "SET_DATE";
  payload: Date;
}

interface SetEventsAction {
  type: "SET_EVENTS";
  payload: Event[];
}

interface SetCurrentEventsAction {
  type: "SET_CURRENT_EVENTS";
  payload: Event[];
}

interface ToggleDatePickerAction {
  type: "TOGGLE_DATE_PICKER";
  payload?: boolean; // Allow for toggling (true/false) or undefined
}

interface ToggleEventFormModalAction {
  type: "TOGGLE_EVENT_FORM_MODAL";
  payload?: boolean; // Allow for toggling (true/false) or undefined
}

interface ToggleAgendaAction {
  type: "TOGGLE_AGENDA";
  payload?: boolean; // Allow for toggling (true/false) or undefined
}

interface SetAddNewEventAction {
  type: "SET_ADD_NEW_EVENT";
  payload?: boolean; // Allow for toggling (true/false) or undefined
}

type Action =
  | SetDateAction
  | SetEventsAction
  | SetCurrentEventsAction
  | ToggleDatePickerAction
  | ToggleEventFormModalAction
  | ToggleAgendaAction
  | SetAddNewEventAction;

const initialAppState: AppState = {
  date: new Date(),
  events: [],
  currentEvents: [],
  toggleDatePicker: false,
  toggleEventForm: false,
  isAgendaOpen: true,
  isAddNewEvent: false,
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, date: action.payload };

    case "SET_EVENTS":
      return { ...state, events: action.payload };

    case "SET_CURRENT_EVENTS":
      return { ...state, currentEvents: action.payload };

    case "TOGGLE_DATE_PICKER":
      return { ...state, toggleDatePicker: action.payload ?? !state.toggleDatePicker };

    case "TOGGLE_EVENT_FORM_MODAL":
      return { ...state, toggleEventForm: action.payload ?? !state.toggleEventForm };

    case "TOGGLE_AGENDA":
      return { ...state, isAgendaOpen: action.payload ?? !state.isAgendaOpen };

    case "SET_ADD_NEW_EVENT":
      return { ...state, isAddNewEvent: action.payload ?? !state.isAddNewEvent };

    default:
      return state;
  }
};

// Context setup

interface AppContext {
  appState: AppState;
  appDispatch: React.Dispatch<Action>;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContext | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);

  return <AppContext.Provider value={{ appState, appDispatch }}>{children}</AppContext.Provider>;
};
