import {
  NewPatient,
  Gender,
  Patient,
  Entry,
  Diagnosis,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckRating,
} from "./types";
import { v4 as uuidv4 } from "uuid";

const toNewPatient = (object: unknown): Patient => {
  const parsedObject = parseObject(object);

  if (
    "name" in parsedObject &&
    "occupation" in parsedObject &&
    "gender" in parsedObject &&
    "ssn" in parsedObject &&
    "dateOfBirth" in parsedObject
  ) {
    const newPatient: NewPatient = {
      name: parseString(parsedObject.name),
      occupation: parseString(parsedObject.occupation),
      gender: parseGender(parsedObject.gender),
      ssn: parseString(parsedObject.ssn),
      dateOfBirth: parseDate(parsedObject.dateOfBirth),
      entries: [],
    };

    return { id: uuidv4(), ...newPatient };
  }

  throw new Error("Incorrect patient data: some fields are missing");
};

const toNewEntry = (object: unknown): Entry => {
  const parsedObject = parseObject(object);
  const baseEntry = baseEntryValidation(parsedObject);

  assertEntry(parsedObject);

  const validationFunction = validationFunctions.get(parsedObject.type);

  if (!validationFunction) {
    throw new Error(`Unknown type: ${parsedObject.type}`);
  }

  const typeEntry = validationFunction(parsedObject);

  return { ...baseEntry, ...typeEntry! };
};

const baseEntryValidation = (parsedObject: object): Entry => {
  if (
    "description" in parsedObject &&
    "date" in parsedObject &&
    "specialist" in parsedObject
  ) {
    let newEntry;

    if ("diagnosisCodes" in parsedObject) {
      newEntry = { diagnosisCodes: parseDiagnosisCodes(parsedObject) };
    }

    newEntry = {
      id: uuidv4(),
      description: parseString(parsedObject.description),
      date: parseDate(parsedObject.date),
      specialist: parseString(parsedObject.specialist),
      ...newEntry,
    };

    return newEntry as Entry;
  }

  throw new Error("Incorrect entry data: some fields are missing");
};

const healthCheckValidation = (hCEntry: HealthCheckEntry): HealthCheckEntry => {
  if ("healthCheckRating" in hCEntry) {
    return {
      ...hCEntry,
      healthCheckRating: parseHealthCheckRating(hCEntry.healthCheckRating),
    };
  }

  throw new Error("Incorrect data for type HealthCheckEntry");
};

const occupationalHealthcareValidation = (
  oH: OccupationalHealthcareEntry
): OccupationalHealthcareEntry => {
  let parsedOH;
  if ("employerName" in oH) {
    parsedOH = {
      employerName: parseString(oH.employerName),
    };

    if ("sickLeave" in oH) {
      if ("startDate" in oH.sickLeave! && "endDate" in oH.sickLeave) {
        parsedOH = {
          ...parsedOH,
          startDate: parseDate(oH.sickLeave.startDate),
          endDate: parseDate(oH.sickLeave.endDate),
        };
      }
    }
    return { ...oH, ...parsedOH };
  }
  throw new Error("Incorrect data for type OccupationalHealthcareEntry");
};

const hospitalValidation = (h: HospitalEntry): HospitalEntry => {
  if ("discharge" in h && "date" in h.discharge && "criteria" in h.discharge) {
    return {
      ...h,
      discharge: {
        date: parseDate(h.discharge.date),
        criteria: parseString(h.discharge.criteria),
      },
    };
  }
  throw new Error("Incorrect data for type HospitalEntry");
};

const validationFunctions = new Map<string, (object: unknown) => Entry>([
  ["HealthCheck", healthCheckValidation as (object: unknown) => Entry],
  ["Hospital", hospitalValidation as (object: unknown) => Entry],
  [
    "OccupationalHealthcare",
    occupationalHealthcareValidation as (object: unknown) => Entry,
  ],
]);

const parseObject = (object: unknown): object => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  return object;
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
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

const parseHealthCheckRating = (
  healthCheckRating: HealthCheckRating
): HealthCheckRating => {
  if (healthCheckRating in HealthCheckRating) {
    return healthCheckRating;
  }

  throw new Error("Invalid health check rating");
};

function assertEntry(parsedObject: object): asserts parsedObject is Entry {
  if (
    "description" in parsedObject &&
    "date" in parsedObject &&
    "specialist" in parsedObject
  ) {
    return;
  }

  throw new Error("Object from request is not an Entry");
}

export const emptyHospitalEntry: HospitalEntry = {
  type: "Hospital",
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  discharge: {
    date: "",
    criteria: "",
  },
  id: "",
};

const toNew = {
  patient: toNewPatient,
  entry: toNewEntry,
};

export default toNew;
