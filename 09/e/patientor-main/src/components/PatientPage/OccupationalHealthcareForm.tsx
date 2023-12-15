import React from "react";
import { OccupationalHealthcareEntry } from "../../types";
import { TextField } from "@mui/material";

interface OccupationalHealthcareFormProps {
    formData: OccupationalHealthcareEntry;
    setFormData: (data: OccupationalHealthcareEntry) => void;
}

const OccupationalHealthcareForm: React.FC<OccupationalHealthcareFormProps> = ({ formData, setFormData }) => {
    return (
        <>
            <TextField label="Employer Name" value={formData.employerName} onChange={e => setFormData({ ...formData, employerName: e.target.value })} />
            <TextField type="date" label="Sick Leave Start Date" value={formData.sickLeave?.startDate} onChange={e => setFormData({ ...formData, sickLeave: { ...formData.sickLeave, startDate: e.target.value } })} />
            <TextField type="date" label="Sick Leave End Date" value={formData.sickLeave?.endDate} onChange={e => setFormData({ ...formData, sickLeave: { ...formData.sickLeave, endDate: e.target.value } })} />
        </>
    );
};

export default OccupationalHealthcareForm;