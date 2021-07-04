const router = require('express').Router();
const db = require('../../models');
const moment = require("moment");

//Create workouts
router.post('/', async (req, res) => {
    try {
        const newWorkout = await db.Workout.create(req.body);
        res.status(200).json(newWorkout);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let exercise = await db.Exercise.create(req.body);
        let exerciseDuration = exercise.duration;
        let exerciseWeight = exercise.weight || 0;
        let exerciseDistance = exercise.distance || 0;
        let workout = await db.Workout.updateOne({ _id: id }, { $push: { exercises: exercise._id }, $inc: { totalDuration: exerciseDuration, totalWeight: exerciseWeight, totalDistance: exerciseDistance } });
        res.json(workout);
    } catch (error) {
        res.status(400).json(err);
    }
})

router.get('/', async (req, res) => {
    try {
        let workouts = await db.Workout.find().populate("exercises");
        res.json(workouts);
    } catch (error) {
        console.log(error);
        res.status(400).json(err);
    }
})

router.get('/range', async (req, res) => {
    try {
        let workouts = await db.Workout.find({ day: { $gte: moment().subtract(7, "days") } }).populate("exercises");
        res.json(workouts);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;