import express from "express";
import patientsService from "../services/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  console.log(req.body);
  const addedPatient = patientsService.addNewPatient(req.body);
  res.send(addedPatient);
});

export default router;
