import { Router } from "express";
import {
  handleAllEvents,
  handleCreateEvent,
  handleUpdateEvent,
  handleDeleteEvent,
  handleSearchEventByTitle,
} from "../controller/calendarEvents.controller";
const router = Router();

router.get("/calendar", handleAllEvents);
router.post("/calendar/create", handleCreateEvent);
router.put("/calendar/update/:id", handleUpdateEvent);
router.delete("/calendar/delete/:id", handleDeleteEvent);

router.get("/calendar/search/:title", handleSearchEventByTitle);

export default router;
