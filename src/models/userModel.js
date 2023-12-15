import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username!"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide an email!"],
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
      id: String,
      title: String,
      price: Number,
      color: String,
      size: String,
      image: String,
    },
  ],
  orders: [
    {
      title: String,
      price: Number,
      color: String,
      size: String,
    },
  ],
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
