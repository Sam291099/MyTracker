
import express from "express";
import mongoose from "mongoose";

import Activity from "../models/Activity.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All activity routes require authentication
router.use(protect);

// GET: Fetch only logged-in user's activities
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// POST: Create activity for logged-in user
router.post("/", async (req, res) => {
  try {
    const { title, category, time, duration, color } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Activity title is required",
      });
    }

    const activity = await Activity.create({
      user: req.user._id,
      title: title.trim(),
      category,
      time,
      duration,
      color,
    });

    res.status(201).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// PATCH: Update only user's own activity
router.patch("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid activity ID",
      });
    }

    const allowedFields = [
      "title",
      "category",
      "time",
      "duration",
      "completed",
      "color",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (
      updates.title !== undefined &&
      (typeof updates.title !== "string" || !updates.title.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Activity title cannot be empty",
      });
    }

    if (updates.title !== undefined) {
      updates.title = updates.title.trim();
    }

    const activity = await Activity.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE: Remove only user's own activity
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid activity ID",
      });
    }

    const activity = await Activity.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Activity deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
