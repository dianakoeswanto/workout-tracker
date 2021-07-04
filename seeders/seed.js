const mongoose = require('mongoose');
const db = require('../models');
const { Workout } = require("../models");

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const workoutSeed = [
  {
    day: new Date(new Date().setDate(new Date().getDate() - 9)),
    exercises: [
      {
        type: 'resistance',
        name: 'Bicep Curl',
        duration: 20,
        weight: 100,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 8)),
    exercises: [
      {
        type: 'resistance',
        name: 'Lateral Pull',
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 7)),
    exercises: [
      {
        type: 'resistance',
        name: 'Push Press',
        duration: 25,
        weight: 185,
        reps: 8,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 6)),
    exercises: [
      {
        type: 'cardio',
        name: 'Running',
        duration: 25,
        distance: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 5)),
    exercises: [
      {
        type: 'resistance',
        name: 'Bench Press',
        duration: 20,
        weight: 285,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4)),
    exercises: [
      {
        type: 'resistance',
        name: 'Bench Press',
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 3)),
    exercises: [
      {
        type: 'resistance',
        name: 'Quad Press',
        duration: 30,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 2)),
    exercises: [
      {
        type: 'resistance',
        name: 'Bench Press',
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 1)),
    exercises: [
      {
        type: 'resistance',
        name: 'Military Press',
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
];

async function createWorkout(index) {
	try {
		let exercises = [];
		let exerciseIds = [];

		for (let i = 0; i < workoutSeed[index].exercises.length; i++) {
			let exercise = await db.Exercise.create(workoutSeed[index].exercises[i]);
			exercises.push(exercise);
			exerciseIds.push(exercise._id);
		}

		let workout = new Workout({
			day: workoutSeed[index].day,
			exercises: exerciseIds
		});

		workout.totalDuration = workout.addTotalDuration(exercises);
		workout.totalWeight = workout.addTotalWeight(exercises);
    workout.totalDistance = workout.addTotalDistance(exercises);

		await db.Workout.create(workout);

	} catch (error) {
		console.log(error);
	}
}

async function seedDb() {
	try {
		await db.Workout.deleteMany();
		await db.Exercise.deleteMany();
		
    for (var i = 0; i < workoutSeed.length; i++) {
			await createWorkout(i);
		}

    console.log("DB SEEDED");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(-1);
	}
}

seedDb();