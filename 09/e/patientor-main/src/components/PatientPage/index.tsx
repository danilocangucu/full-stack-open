import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const patient = await patientService.getPatient(id!);
                if (patient) {
                    setPatient(patient);
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
        };
        fetchPatient();
    }, [id]);

    if (error) {
        return (
            <h1>{error}</h1>
        );
    }

    return (
        <>
            <h1>{patient?.name}</h1>
            gender: {patient?.gender}<br />
            ssh: {patient?.ssn}<br />
            occupation: {patient?.occupation}
        </>
    );
};

export default PatientPage;