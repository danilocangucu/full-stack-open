import argsAreNumbers from "./utils/argsAreNumbers";
import consoleLogError from "./utils/consoleError";

export interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExerciseValues {
  exerciseHours: number[];
  target: number;
}

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enought arguments");

  let parsedArguments: number[] = [];

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

export const calculateExercises = (
  exerciseHours: number[],
  target: number
): ExerciseResults => {
  const periodLength = exerciseHours.length;
  const trainingDaysArray = exerciseHours.filter((hours) => hours > 0);
  const trainingDays = trainingDaysArray.length;
  const trainingDaysSum = trainingDaysArray.reduce(
    (acc, hours) => acc + hours,
    0
  );
  const average = trainingDaysSum / periodLength;
  const success = average >= target;
  const rating = Math.round(average);
  let ratingDescription: string = "Default description";

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

// try {
//   const { exerciseHours, target } = parseExerciseArguments(process.argv);
//   console.log(calculateExercises(exerciseHours, target));
// } catch (error: unknown) {
//   consoleLogError(error);
// }