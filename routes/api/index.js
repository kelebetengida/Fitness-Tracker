const router= require("express").Router();
const WorkoutRoutes=require("./workout");

router.use("/workouts", workoutRoutes);
module.exports=router;