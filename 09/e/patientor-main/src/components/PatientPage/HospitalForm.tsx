import React from 'react';
import { HospitalEntry } from "../../types";
import { TextField } from "@mui/material";

interface HospitalFormProps {
    formData: HospitalEntry;
    setFormData: (data: HospitalEntry) => void;
}

const HospitalForm: React.FC<HospitalFormProps> = ({ formData, setFormData }) => {
    return (
        <>
            <TextField type="date" label="Discharge Date" value={formData.discharge?.date} onChange={e => setFormData({ ...formData, discharge: { ...formData.discharge, date: e.target.value } })} />
            <TextField label="Discharge Criteria" value={formData.discharge?.criteria} onChange={e => setFormData({ ...formData, discharge: { ...formData.discharge, criteria: e.target.value } })} />
        </>
    );
};

export default HospitalForm;