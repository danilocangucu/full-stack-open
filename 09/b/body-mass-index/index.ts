/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import { parseBMIArguments, calculateBmi } from "./bmiCalculator";
import {
  parseExerciseArguments,
  ExerciseValues,
  calculateExercises,
  ExerciseResults,
} from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const qHeight = req.query.height as string;
  const qWeight = req.query.weight as string;

  let resJSON = {};

  try {
    const { height, weight } = parseBMIArguments([qHeight, qWeight]);
    const bmi = calculateBmi(height, weight);
    resJSON = { weight, height, bmi };
  } catch (error: unknown) {
    resJSON = { error: "malformatted parameters " };
  }

  res.send(resJSON);
});

app.post("/exercises", (req, res) => {
  const jsonBody = req.body;

  if (!jsonBody.daily_exercises || !jsonBody.target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (
    Array.isArray(
      jsonBody.daily_exercises || typeof jsonBody.target !== "number"
    )
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const request: ExerciseValues = parseExerciseArguments([
    jsonBody.target,
    ...jsonBody.daily_exercises,
  ]);

  const exerciseResult: ExerciseResults = calculateExercises(
    request.exerciseHours,
    request.target
  );

  res.send(exerciseResult);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
