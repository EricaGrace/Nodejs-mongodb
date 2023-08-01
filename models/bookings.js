import { Timestamp } from "bson";
import { Date } from "mongoose";
import { Schema, mongoose } from "mongoose";
import { serializeInteger } from "whatwg-url";

const bookingsSchema = new Schema({
  number: {
    type: Number,
    required: [true],
  },

  hour: {
    type: Number,
    required: [true],
  },

  date: {
    type: Date,
    required: [true],
  },

  clientLastName: {
    type: String,
    required: [true],
  },

  clientFirstName: {
    type: String,
    required: [true],
  },
});

const Bookings = mongoose.model("Bookings", bookingsSchema);
export default Bookings;
