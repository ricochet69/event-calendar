import { Request, Response } from "express";
import logger from "../utils/logger";
import { Event, EventModel } from "../models/event.model";
import mongoose from "mongoose";

export const handleAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await EventModel.find({}).exec();
    res.send(events);
  } catch (error: any) {
    logger.error(error, "An error occured retriving all events ");
    res.sendStatus(500);
  }
};

export const handleCreateEvent = async (req: Request, res: Response) => {
  try {
    const eventData = req.body;
    const newEvent = new EventModel(eventData);

    console.log("Create event requested and body is:", eventData);

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error: any) {
    logger.error(error, "An error occured creating a event ");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleUpdateEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const updatedEventData = req.body;
    console.log("Update Request made, date in body is:", updatedEventData);

    const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updatedEventData, {
      new: true,
      runValidators: true,
    }).exec();

    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error: any) {
    logger.error(error, "Error occured updating an event");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//

export const handleDeleteEvent = async (req: Request, res: Response) => {
  try {
    const event = req.params.id;
    console.log("Delete Request made, event id is:", event);
    const eventId = new mongoose.Types.ObjectId(event);

    const deletedEvent = await EventModel.findByIdAndDelete({ _id: eventId }).exec();

    if (deletedEvent) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error: any) {
    logger.error(error, "Error occured deleting an event");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleSearchEventByTitle = async (req: Request, res: Response) => {
  const searchTerm = req.params.title;

  try {
    // Perform text search to find events that closely match the title
    const foundEvents = await EventModel.find({ $text: { $search: searchTerm } }).sort({
      score: { $meta: "textScore" },
    }); // Optional: Sort by relevance score

    console.log("found events are: ", foundEvents);

    if (foundEvents && foundEvents.length > 0) {
      // If events are found, send them in the response
      res.json(foundEvents);
    } else {
      // If no events are found, send an appropriate response
      res.status(404).json({ message: "No closely matching events found" });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
