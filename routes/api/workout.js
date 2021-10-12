const router = require("express").Router();
const Workout = require("../../models/workout");

// Route to retrieve the last workout and aggregate additional field totalDuration into the response.
router.get("/", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
        .sort({ day: 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// Route to create new Workout if req.params.id is equal to undefine.
router.post("/", ({ body }, res) => {
    Workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

// Route to update/push new exercise into current/new workout.
router.put("/:id", (req, res) => {
    Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// Route to retrieve the last 7 workouts and aggregate additional field totalDuration to the response.
router.get("/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout.reverse());
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

module.exports = router;