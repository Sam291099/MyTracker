
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "Personal",
    },

    time: {
      type: String,
      default: "Anytime",
    },

    duration: {
      type: String,
      default: "Not set",
    },

    completed: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: "purple",
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
