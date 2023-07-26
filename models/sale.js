import { Schema, mongoose } from "mongoose";

const saleSchema = new Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
