import mongoose from "mongoose";
import logger from "./logger";
import { Event, EventModel } from "../models/event.model";
import seedData from "../data/seedData";

// Seed events into the database
const seedEvents = async () => {
  try {
    // Remove existing events
    await EventModel.deleteMany({});

    // Insert new events
    const events = await EventModel.insertMany(seedData);
    logger.info("Events seeded successfully");
  } catch (error) {
    logger.error("Error seeding events:", error);
  }
};

export default seedEvents;
