export interface Entry {}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, "id">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
