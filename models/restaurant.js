import { Schema, mongoose } from "mongoose";

import Dish from "./dish.js";

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: [true],
  },
  seatingCapacity: {
    type: Number,
  },
  dishes: {
    type: [Dish.schema],
    required: [true, "Dishes are required"],
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
