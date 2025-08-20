const Workout = require("../models/Workout");

// Add a new workout
module.exports.addWorkout = async (req, res) => {
    try {
        const { name, duration } = req.body;
        const userId = req.user.id;

        const newWorkout = new Workout({
            userId,
            name,
            duration
        });

        const savedWorkout = await newWorkout.save();

        res.status(201).json({
            message: "Workout added successfully",
            workout: savedWorkout
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to add workout",
            error: error.message
        });
    }
};

// Get all workouts for the authenticated user
module.exports.getMyWorkouts = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const workouts = await Workout.find({ userId });

        res.status(200).json({
            message: "Workouts retrieved successfully",
            workouts: workouts
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to retrieve workouts",
            error: error.message
        });
    }
};

// Update a workout
module.exports.updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, duration } = req.body;
        const userId = req.user.id;

        const updatedWorkout = await Workout.findOneAndUpdate(
            { _id: id, userId },
            { name, duration },
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({
                message: "Workout not found or unauthorized"
            });
        }

        res.status(200).json({
            message: "Workout updated successfully",
            workout: updatedWorkout
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update workout",
            error: error.message
        });
    }
};

// Delete a workout
module.exports.deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deletedWorkout = await Workout.findOneAndDelete({
            _id: id,
            userId
        });

        if (!deletedWorkout) {
            return res.status(404).json({
                message: "Workout not found or unauthorized"
            });
        }

        res.status(200).json({
            message: "Workout deleted successfully",
            workout: deletedWorkout
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete workout",
            error: error.message
        });
    }
};

// Complete a workout (change status to "completed")
module.exports.completeWorkoutStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const completedWorkout = await Workout.findOneAndUpdate(
            { _id: id, userId },
            { status: "completed" },
            { new: true }
        );

        if (!completedWorkout) {
            return res.status(404).json({
                message: "Workout not found or unauthorized"
            });
        }

        res.status(200).json({
            message: "Workout status updated successfully",
            workout: completedWorkout
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update workout status",
            error: error.message
        });
    }
};
