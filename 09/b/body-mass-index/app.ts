import express from "express";
import { parseBMIArguments, calculateBmi } from "./bmiCalculator";

// import {
//   ExerciseResults,
//   exerciseValues,
//   parseExerciseArguments,
//   calculateExercises,
// } from "./exerciseCalculator";
const app = express();
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
app.post("/exercises", (req, _res) => {
  const body: unknown = req.body;
  console.log(body);
});
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
