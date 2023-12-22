import mongoose from "mongoose";

interface Event {
  // _id: mongoose.Types.ObjectId;
  start: Date;
  end: Date;
  title: string;
  description: string;
  category: {
    name: string;
    color: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new mongoose.Schema<Event>(
  {
    // _id: mongoose.Types.ObjectId,
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, default: null },
    category: {
      name: { type: String, required: true },
      color: { type: String, required: true },
    },
  },
  { timestamps: true }
);

eventSchema.index({ title: "text" });

const EventModel = mongoose.model<Event>("Event", eventSchema);

export { Event, EventModel };
