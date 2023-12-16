import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
});

const Newsletter =
  mongoose.models.newsletter || mongoose.model("newsletter", newsletterSchema);

export default Newsletter;
