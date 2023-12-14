import React, { useState } from "react";
import { Entry, HospitalEntry } from "../../types";
import patientService from "../../services/patients";
import Notification from "../Notification";
import { emptyHospitalEntry } from "../../util";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const EntryForm = ({ id, addEntry }: { id: string | undefined, addEntry: (entry: Entry) => void }) => {
    const [formData, setFormData] = useState<HospitalEntry>(emptyHospitalEntry);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        try {
            const newEntry = await patientService.postEntryToPatient(formData, id!);
            addEntry(newEntry);
            setFormData(emptyHospitalEntry);
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
                    <TextField label="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    <TextField type="date" label="Date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                    <TextField label="Specialist" value={formData.specialist} onChange={e => setFormData({ ...formData, specialist: e.target.value })} />
                    <TextField label="Diagnosis Codes" value={(formData.diagnosisCodes || []).join(',')} onChange={e => setFormData({ ...formData, diagnosisCodes: e.target.value.split(',') })} />
                    <FormControl>
                        <InputLabel>Type</InputLabel>
                        <Select value={formData.type} onChange={_e => setFormData({ ...formData, type: "Hospital" })}>
                            <MenuItem value="Hospital">Hospital</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField type="date" label="Discharge Date" value={formData.discharge?.date} onChange={e => setFormData({ ...formData, discharge: { ...formData.discharge, date: e.target.value } })} />
                    <TextField label="Discharge Criteria" value={formData.discharge?.criteria} onChange={e => setFormData({ ...formData, discharge: { ...formData.discharge, criteria: e.target.value } })} />
                    <Button type="submit">Submit</Button>
                </Box>
            </form>
            {errorMessage && <Notification message={errorMessage} />}
        </>);
};

export default EntryForm;