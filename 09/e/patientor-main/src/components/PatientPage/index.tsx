import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { Diagnosis, Entry, Patient } from "../../types";
import PatientEntries from "./PatientEntries";
import EntryForm from "./EntryForm";
import { Button } from "@mui/material";

const PatientPage = () => {
    const { id } = useParams();
    const [showForm, setShowForm] = useState(false);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

    const addEntry = (entry: Entry) => {
        if (patient) {
            setPatient({ ...patient, entries: [...patient.entries, entry] });
        }
    };

    type FetchDataParams =
        | { type: 'patient'; service: (id: string) => Promise<Patient>; setter: (data: Patient) => void; id: string | undefined }
        | { type: 'diagnosis'; service: () => Promise<Diagnosis[]>; setter: (data: Diagnosis[]) => void; };

    useEffect(() => {
        const fetchData = async (params: FetchDataParams) => {
            try {
                let data;
                switch (params.type) {
                    case 'patient':
                        data = await params.service(params.id!);
                        break;
                    case 'diagnosis':
                        data = await params.service();
                        break;
                }
                if (data) {
                    if (params.type === 'patient') {
                        params.setter(data as Patient);
                    } else if (params.type === 'diagnosis') {
                        params.setter(data as Diagnosis[]);
                    }
                }
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(errorMessage.concat(error.message));
                }
            }
        };

        fetchData({ type: 'patient', service: patientService.getPatient, setter: setPatient, id });
        fetchData({ type: 'diagnosis', service: diagnosisService.getAll, setter: setDiagnoses });
    }, [errorMessage, id]);

    const patientDiagnoses = patient?.entries
        .flatMap(entry => entry.diagnosisCodes)
        .map(diagnosisCode => diagnoses?.find(diagnosis => diagnosis.code === diagnosisCode));

    const dataDiagnoses = diagnoses?.map(diagnosis => diagnosis.code);

    if (errorMessage) {
        return (
            <h1>{errorMessage}</h1>
        );
    }

    return (
        <>
            <h1>{patient?.name}</h1>
            gender: {patient?.gender}<br />
            ssh: {patient?.ssn}<br />
            occupation: {patient?.occupation}<br /><br />
            <Button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide Entry Form" : "Show Entry Form"}
            </Button>
            <div style={{ display: showForm ? "block" : "none" }}>
                <EntryForm id={id} addEntry={addEntry} diagnoses={dataDiagnoses!} />
            </div>
            {patient?.entries && patient.entries.length > 0 && (
                <>
                    <h2>Entries</h2>
                    <PatientEntries
                        entries={patient.entries}
                        diagnoses={patientDiagnoses?.filter((diagnosis): diagnosis is Diagnosis => !!diagnosis) || []}
                    />
                </>
            )}
        </>
    );
};

export default PatientPage;