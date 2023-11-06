import express from "express";
import { parseBMIArguments, calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  var qHeight = req.query.height as string;
  var qWeight = req.query.weight as string;

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
