import api from "./api";

const getCalendarData = async () => {
  try {
    const response = await api.get("/api/calendar");
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export default {
  getCalendarData,
};
