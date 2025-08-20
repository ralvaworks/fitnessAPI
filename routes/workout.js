const express = require("express");
const workoutController = require("../controllers/workout");
const { verify } = require("../auth");

const router = express.Router();

// Add a new workout
router.post("/addWorkout", verify, workoutController.addWorkout);

// Get all workouts for the authenticated user
router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts);

// Update a workout
router.patch("/updateWorkout/:id", verify, workoutController.updateWorkout);

// Delete a workout
router.delete("/deleteWorkout/:id", verify, workoutController.deleteWorkout);

// Complete a workout (change status to "completed")
router.patch("/completeWorkoutStatus/:id", verify, workoutController.completeWorkoutStatus);

module.exports = router;
