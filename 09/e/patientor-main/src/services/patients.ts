import axios from "axios";
import patientsData from "../../data/patients";
import { v4 as uuidv4 } from "uuid";
import { apiBaseUrl } from "../constants";
import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  PatientFormValues,
} from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map((patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...patientWithoutSsn } = patient;
    return patientWithoutSsn;
  });
};

const getByPatientId = (id: string): Patient => {
  const patient = patientsData.filter((patient) =>
    patient.id === id ? patient : null
  );
  return patient[0];
};

const addNewPatient = (object: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...object,
  };
  console.log(patientsData.length);
  const len = patientsData.push(newPatient);
  console.log(len);
  return newPatient;
};

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getPatient = async (id: string) => {
  try {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Oops! An error occurred, sorry.");
  }
};

export default {
  getNonSensitivePatients,
  addNewPatient,
  getByPatientId,
  getAll,
  create,
  getPatient,
};
