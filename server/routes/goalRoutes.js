
import express from "express";
import mongoose from "mongoose";

import Goal from "../models/Goal.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All goal routes require authentication
router.use(protect);

// GET: Fetch only logged-in user's goals
router.get("/", async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch goals",
    });
  }
});

// POST: Create goal for logged-in user
router.post("/", async (req, res) => {
  try {
    const { title, targetDate, progress } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Goal title is required",
      });
    }

    const goal = await Goal.create({
      user: req.user._id,
      title: title.trim(),
      targetDate: targetDate || null,
      progress: progress ?? 0,
    });

    res.status(201).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create goal",
    });
  }
});

// PATCH: Update only user's own goal
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid goal ID",
      });
    }

    const allowedFields = ["title", "targetDate", "progress"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    });

    if (
      Object.prototype.hasOwnProperty.call(updates, "title") &&
      (typeof updates.title !== "string" || !updates.title.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Goal title cannot be empty",
      });
    }

    if (typeof updates.title === "string") {
      updates.title = updates.title.trim();
    }

    const goal = await Goal.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update goal",
    });
  }
});

// DELETE: Remove only user's own goal
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid goal ID",
      });
    }

    const goal = await Goal.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Goal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete goal",
    });
  }
});

export default router;
