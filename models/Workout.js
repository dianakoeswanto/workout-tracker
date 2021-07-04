const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
		type: Date,
		default: Date.now
	},
	exercises: [
		{
			type: Schema.Types.ObjectId,
			ref: "Exercise"
		}
	],
	totalDuration: {
		type: Number
	},
    totalWeight: {
		type: Number
	},
	totalDistance: {
		type: Number
	}
});

WorkoutSchema.methods.addTotalDuration = (exercises) => {
	const totalDuration = exercises.reduce((accumulator, currentValue) => {
		accumulator = accumulator + currentValue.duration;
		return accumulator;
	}, 0);
	return totalDuration;
};

WorkoutSchema.methods.addTotalWeight = (exercises) => {
	const totalWeight = exercises.reduce((accumulator, currentValue) => {
		if (currentValue.type === "resistance") {
			accumulator = accumulator + currentValue.weight;
		} else {
			accumulator = accumulator + 0;
		}
		return accumulator;
	}, 0);

	return totalWeight;
};

WorkoutSchema.methods.addTotalDistance = (exercises) => {
	const totalDistance = exercises.reduce((accumulator, currentValue) => {
		if (currentValue.type === "resistance") {
			accumulator = accumulator + 0;
		} else {
			accumulator = accumulator + currentValue.distance;
		}
		return accumulator;
	}, 0);

	return totalDistance;
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
