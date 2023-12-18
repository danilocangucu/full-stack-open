import React, { useState } from "react";
import { Entry, BaseEntry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../../types";
import patientService from "../../services/patients";
import Notification from "../Notification";
import { emptyHospitalEntry, emptyBaseEntry, emptyHealthCheckEntry, emptyOccupationalHealthcareEntry } from "../../util";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Chip } from "@mui/material";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

const EntryForm = (
    { id, addEntry, diagnoses }: {
        id: string | undefined,
        addEntry: (entry: Entry) => void,
        diagnoses: string[]
    }
) => {
    const [baseEntryFormData, setBaseEntryFormData] =
        useState<BaseEntry>(emptyBaseEntry);
    const [hospitalEntryFormData, setHospitalEntryFormData] =
        useState<HospitalEntry>(emptyHospitalEntry);
    const [healthCheckFormData, setHealthCheckFormData] =
        useState<HealthCheckEntry>(emptyHealthCheckEntry);
    const [occupationalHealthcare, setOccupationalHealthcare] =
        useState<OccupationalHealthcareEntry>(emptyOccupationalHealthcareEntry);
    const [formType, setFormType] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const getMergedFormData = (specificFormDataFromType: Partial<Entry>) => {
        return {
            ...specificFormDataFromType,
            id: baseEntryFormData.id,
            description: baseEntryFormData.description,
            date: baseEntryFormData.date,
            specialist: baseEntryFormData.specialist,
            diagnosisCodes: baseEntryFormData.diagnosisCodes,
        };
    };

    const getFormData = (formType: string) => {
        switch (formType) {
            case "Hospital":
                return getMergedFormData(hospitalEntryFormData);
            case "HealthCheck":
                console.log(getMergedFormData(healthCheckFormData));
                return getMergedFormData(healthCheckFormData);
            case "OccupationalHealthcare":
                return getMergedFormData(occupationalHealthcare);
            default:
                return {} as Entry;
        }
    };

    const resetForm = () => {
        setBaseEntryFormData(emptyBaseEntry);
        setHospitalEntryFormData(emptyHospitalEntry);
        setHealthCheckFormData(emptyHealthCheckEntry);
        setOccupationalHealthcare(emptyOccupationalHealthcareEntry);
        setFormType("");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        try {
            const entry = getFormData(formType) as Entry;
            const newEntry = await patientService.postEntryToPatient(entry, id!);
            addEntry(newEntry);
            resetForm();
        } catch (error) {
            setTimeout(() => {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("Oops! An error occurred, sorry.");
                }
            }, 0);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Description" value={baseEntryFormData.description}
                        onChange={e => setBaseEntryFormData({ ...baseEntryFormData, description: e.target.value })} />
                    <TextField type="date" label="Date" value={baseEntryFormData.date}
                        onChange={e => setBaseEntryFormData({ ...baseEntryFormData, date: e.target.value })} />
                    <TextField label="Specialist" value={baseEntryFormData.specialist}
                        onChange={e => setBaseEntryFormData({ ...baseEntryFormData, specialist: e.target.value })} />
                    <InputLabel>Diagnosis Codes</InputLabel>
                    <Select
                        multiple
                        value={baseEntryFormData.diagnosisCodes || []}
                        onChange={e => {
                            setBaseEntryFormData({ ...baseEntryFormData, diagnosisCodes: e.target.value as string[] });
                        }}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {diagnoses && diagnoses.map((diagnosis) => (
                            <MenuItem key={diagnosis} value={diagnosis}>
                                {diagnosis}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormControl>
                        <InputLabel>Type</InputLabel>
                        <Select value={formType} onChange={e => setFormType(e.target.value)}>
                            <MenuItem value="Hospital">Hospital</MenuItem>
                            <MenuItem value="HealthCheck">Health Check</MenuItem>
                            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                        </Select>
                    </FormControl>
                    {formType === "Hospital" &&
                        <HospitalForm
                            formData={{ ...hospitalEntryFormData }}
                            setFormData={setHospitalEntryFormData} />}
                    {formType === "HealthCheck" &&
                        <HealthCheckForm
                            formData={{ ...healthCheckFormData }}
                            setFormData={setHealthCheckFormData} />}
                    {formType === "OccupationalHealthcare" &&
                        <OccupationalHealthcareForm
                            formData={{ ...occupationalHealthcare }}
                            setFormData={setOccupationalHealthcare} />}
                    <Button type="submit">Submit</Button>
                </Box>
            </form>
            {errorMessage && <Notification message={errorMessage} />}
        </>);
};

export default EntryForm;