import patientsData from "../../data/patients";
import { v4 as uuidv4 } from "uuid";

import { PatientWithoutSsn, Patient } from "../types";

const getNonSensitivePatients = (): PatientWithoutSsn[] => {
  return patientsData.map((patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...patientWithoutSsn } = patient;
    return patientWithoutSsn;
  });
};

const addNewPatient = (object: unknown): Patient => {
  console.log(object);
  const newPatient: Patient = {
    id: uuidv4(),
    name: "new name",
    occupation: "new occupation",
    gender: "new gender",
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addNewPatient,
};
