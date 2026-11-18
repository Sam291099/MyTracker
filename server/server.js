
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import activityRoutes from "./routes/activityRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to MyTracker API!");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "MyTracker backend is healthy",
  });
});

app.use("/api/activities", activityRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await connectDB();

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from environment variables.");
    }

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
