import patientsData from "../../data/patients";

import { PatientWithoutSsn } from "../types";

const getNonSensitivePatients = (): PatientWithoutSsn[] => {
  return patientsData.map((patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...patientWithoutSsn } = patient;
    return patientWithoutSsn;
  });
};

export default {
  getNonSensitivePatients,
};
