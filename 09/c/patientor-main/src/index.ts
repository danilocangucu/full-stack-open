import express from "express";
import cors from "cors";

import diagnosisData from "../data/diagnoses";

const app = express();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get("/api/diagnoses", (_req, res) => {
  res.send(diagnosisData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
