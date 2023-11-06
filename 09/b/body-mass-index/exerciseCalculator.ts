import argsAreNumbers from "./utils/argsAreNumbers";
import consoleLogError from "./utils/consoleError";

interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  exerciseHours: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error("Not enought arguments");

  let parsedArguments: number[];

  try {
    parsedArguments = argsAreNumbers(args.slice(2));
  } catch (error: unknown) {
    consoleLogError(error);
  }

  return {
    target: parsedArguments[0],
    exerciseHours: parsedArguments.slice(1),
  };
};

const calculateExercises = (
  exerciseHours: number[],
  target: number
): ExerciseResults => {
  let periodLength = exerciseHours.length;
  let trainingDaysArray = exerciseHours.filter((hours) => hours > 0);
  let trainingDays = trainingDaysArray.length;
  let trainingDaysSum = trainingDaysArray.reduce(
    (acc, hours) => acc + hours,
    0
  );
  let average = trainingDaysSum / periodLength;
  let success = average >= target;
  let rating = Math.round(average);
  let ratingDescription: string;

  if (rating < 1) ratingDescription = "Not enough...";
  if (rating >= 1 && rating <= 2)
    ratingDescription = "Not too bad but could be better.";
  if (rating > 2) ratingDescription = `That's good!`;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { exerciseHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  consoleLogError(error);
}
