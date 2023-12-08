import express from "express";
import patientsService from "../services/patients";
import toNewPatient, { validatePatient } from "../util";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getByPatientId(id);
  if (patient) {
    try {
      validatePatient(patient);
      return res.send(patient);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      } else {
        return res
          .status(500)
          .send({ message: "An unexpected error occurred" });
      }
    }
  } else {
    return res.status(404).send({ message: `No patient with id ${id}` });
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
