import mongoose from "mongoose";

const promocodesSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  percent: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Promocodes =
  mongoose.models.promocodes || mongoose.model("promocodes", promocodesSchema);

export default Promocodes;
