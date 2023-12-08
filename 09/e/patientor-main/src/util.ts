import { NewPatient, Gender, Patient, Entry } from "./types";
import { v4 as uuidv4 } from "uuid";

const toNewPatient = (object: unknown): Patient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "occupation" in object &&
    "gender" in object &&
    "ssn" in object &&
    "dateOfBirth" in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      occupation: parseString(object.occupation),
      gender: parseGender(object.gender),
      ssn: parseString(object.ssn),
      dateOfBirth: parseDate(object.dateOfBirth),
      entries: [],
    };

    return { id: uuidv4(), ...newPatient };
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseString = (property: unknown): string => {
  if (!isString(property)) {
    throw new Error("Incorrent or missing " + property);
  }

  return property;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const validatePatient = (patient: Patient) => {
  for (const entry of patient.entries) {
    if (
      entry.type !== "HealthCheck" &&
      entry.type !== "OccupationalHealthcare" &&
      entry.type !== "Hospital"
    ) {
      throw new Error(`Invalid entry type: ${(entry as Entry).type}`);
    }
  }
};

export default toNewPatient;
