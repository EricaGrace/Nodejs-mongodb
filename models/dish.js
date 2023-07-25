import { Schema, mongoose } from "mongoose";

const dishSchema = new Schema({
  name: {
    type: String,
    required: [true],
  },

  description: {
    type: String,
  },
});

const Dish = mongoose.model("Dish", dishSchema);
export default Dish;
