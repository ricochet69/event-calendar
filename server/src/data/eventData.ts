import { CalendarEvent } from "../interfaces/calendarEvent";
const eventData: CalendarEvent[] = [
  {
    id: 1,
    start: new Date(2023, 10, 4), // November 4, 2023
    end: new Date(2023, 10, 7), // November 7, 2023
    title: "Sample Event 1",
    description: "Description for Sample Event 1",
    createdBy: "userName1",
    category: {
      name: "Work",
      color: "#ff00ee",
    },
  },
  {
    id: 2,
    start: new Date(2023, 10, 11), // November 11, 2023
    end: new Date(2023, 10, 14), // November 14, 2023
    title: "Sample Event 2",
    description: "Description for Sample Event 2",
    createdBy: "userName1",
    category: {
      name: "Personal",
      color: "#e74c3c",
    },
  },
  {
    id: 3,
    start: new Date(2023, 10, 12), // November 12, 2023
    end: new Date(2023, 10, 14), // November 14, 2023
    title: "Sample Event 3",
    description: "Description for Sample Event 3",
    createdBy: "userName1",
    category: {
      name: "Meeting",
      color: "#2ecc71",
    },
  },
  {
    id: 4,
    start: new Date(2023, 10, 12), // November 12, 2023
    end: new Date(2023, 10, 14), // November 14, 2023
    title: "Sample Event 4",
    description: "Description for Sample Event 4",
    createdBy: "userName1",
    category: {
      name: "Meeting",
      color: "#2ecc71",
    },
  },

  {
    id: 5,
    start: new Date(2023, 10, 16), // November 16, 2023
    end: new Date(2023, 10, 16), // November 16, 2023
    title: "Sample Event 5",
    description: "Description for Sample Event 5",
    createdBy: "userName1",
    category: {
      name: "Birthday",
      color: "#f39c12",
    },
  },
  {
    id: 6,
    start: new Date(2023, 10, 29), // November 29, 2023
    end: new Date(2023, 10, 29), // November 29, 2023
    title: "Sample Event 6",
    description: "This is a description for Sample Event 2",
    createdBy: "userName1",
    category: {
      name: "Birthday",
      color: "#f39c12",
    },
  },
  {
    id: 7,
    start: new Date(2023, 10, 29), // November 29, 2023
    end: new Date(2023, 8, 29), // November 29, 2023
    title: "Sample Event 7",
    description: "This is a description for Previous dates",
    createdBy: "userName1",
    category: {
      name: "Meeting",
      color: "#2ecc71",
    },
  },
  {
    id: 8,
    start: new Date(2023, 10, 29), // November 29, 2023
    end: new Date(2023, 10, 29), // November 29, 2023
    title: "Sample Event 8",
    description: "This is a description for Previous dates",
    createdBy: "userName1",
    category: {
      name: "Meeting",
      color: "#2ecc71",
    },
  },
  {
    id: 9,
    start: new Date(2023, 10, 29), // November 29, 2023
    end: new Date(2023, 10, 29), // November 29, 2023
    title: "Sample Event 9",
    description: "This is a description for Previous dates",
    createdBy: "userName1",
    category: {
      name: "Work",
      color: "#ff00ee",
    },
  },
  {
    id: 10,
    start: new Date(2023, 10, 29), // November 29, 2023
    end: new Date(2023, 10, 29), // November 29, 2023
    title: "Sample Event 10",
    description: "This is a description for Previous dates",
    createdBy: "userName1",
    category: {
      name: "Work",
      color: "#ff00ee",
    },
  },
  {
    id: 11,
    start: new Date(2023, 10, 29), // November 29, 2023
    end: new Date(2023, 10, 29), // November 29, 2023
    title: "Sample Event 11",
    description: "This is a description for Previous dates",
    createdBy: "userName1",
    category: {
      name: "Work",
      color: "#ff00ee",
    },
  },
  {
    id: 12,
    start: new Date(2023, 10, 29), //November 29, 2023
    end: new Date(2023, 10, 29), // November 29, 2023
    title: "Sample Event 12",
    description: "This is a description for Previous dates",
    createdBy: "userName1",
    category: {
      name: "Work",
      color: "#ff00ee",
    },
  },
  {
    id: 13,
    start: new Date(2023, 10, 29), // November 29, 2023
    end: new Date(2023, 10, 29), // November 29, 2023
    title: "Sample Event 13",
    description: "This is a description for Previous dates",
    createdBy: "userName1",
    category: {
      name: "Work",
      color: "#ff00ee",
    },
  },
  {
    id: 14,
    start: new Date(2023, 11, 6), // December 6, 2023
    end: new Date(2023, 11, 9), // December 9, 2023
    title: "Sample Event 14",
    description: "This is a description for Previous dates",
    createdBy: "userName1",
    category: {
      name: "Holiday",
      color: "#03f7ff",
    },
  },
  {
    id: 15,
    start: new Date(2023, 11, 6), // December 6, 2023
    end: new Date(2023, 11, 9), // December 9, 2023
    title: "Sample Event 15",
    description: "This is a description for Previous dates",
    createdBy: "userName1",
    category: {
      name: "Holiday",
      color: "#03f7ff",
    },
  },
  {
    id: 16,
    start: new Date(2023, 11, 6), // December 6, 2023
    end: new Date(2023, 11, 9), // December 9, 2023
    title: "Sample Event 16",
    description: "This is a description for Previous dates",
    createdBy: "userName1",
    category: {
      name: "Holiday",
      color: "#03f7ff",
    },
  },
  {
    id: 17,
    start: new Date(2023, 11, 6), // December 6, 2023
    end: new Date(2023, 11, 9), // December 9, 2023
    title: "Sample Event 17",
    description: "This is a description for Previous dates",
    createdBy: "userName1",
    category: {
      name: "Holiday",
      color: "#03f7ff",
    },
  },
];

export default eventData;
