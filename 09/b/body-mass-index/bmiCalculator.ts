interface BMIValues {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  if (!(height > 0))
    throw new Error(`Can't calculate BMI with height 0 or negative`);
  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);

  if (bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi < 24.9) return "Normal (healthy weight)";
  if (bmi >= 24.9 && bmi < 29.9) return "Overweight";
  if (bmi >= 29.9 && bmi < 34.9) return "Moderately obese";
  if (bmi >= 34.9) return "Severely obese";

  return "Invalid BMI";
};

export const parseBMIArguments = (args: [string, string]): BMIValues => {
  if (args.length !== 2) throw new Error("Exactly two arguments are required");

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

/* try {
  const { height, weight } = parseBMIArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something happened. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
} */
