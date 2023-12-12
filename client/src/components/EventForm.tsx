import { useState } from "react";
import styled from "styled-components";

const EventForm = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [allDayEvent, setAllDayEvent] = useState(false);
  const [label, setLabel] = useState("");
  const [repeat, setRepeat] = useState("");
  const [reminder, setReminder] = useState("");

  return (
    <div>
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </div>
  );
};
export default EventForm;
