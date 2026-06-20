const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");

router.get("/stats", protect, getTaskStats);

router.get("/", protect, getTasks);

router.post("/", protect, createTask);

router.get("/:id", protect, getTask);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;