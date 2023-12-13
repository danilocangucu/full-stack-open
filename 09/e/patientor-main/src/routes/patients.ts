import express from "express";
import patientsService from "../services/patients";
import toNew, { validatePatient } from "../util";

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
    const newPatient = toNew.patient(req.body);
    const addedPatient = patientsService.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    res.status(400).send(patientsService.getErrorMessage(error));
  }
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const foundPatient = patientsService.getByPatientId(id);
  if (!foundPatient) {
    res.status(400).send(`Patient id ${id} doesn't exist`);
    return;
  }

  try {
    const newEntry = toNew.entry(req.body);
    patientsService.addEntrytoPatient(newEntry, id);
    res.json(newEntry);
  } catch (error: unknown) {
    res.status(400).send(patientsService.getErrorMessage(error));
  }
});
 
 

export default router;
