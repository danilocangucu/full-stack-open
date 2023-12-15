import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../../types";
import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

interface HealthCheckFormProps {
    formData: HealthCheckEntry;
    setFormData: (data: HealthCheckEntry) => void;
}

const HealthCheckForm: React.FC<HealthCheckFormProps> = ({ formData, setFormData }) => {
    const handleRatingChange = (event: SelectChangeEvent<HealthCheckRating>) => {
        setFormData({ ...formData, healthCheckRating: event.target.value as HealthCheckRating });
    };

    return (
        <>
            <TextField type="date" label="Health Check Date" value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })} />
            <Select value={formData.healthCheckRating} onChange={handleRatingChange}>
                {Object.getOwnPropertyNames(HealthCheckRating).map((key) => {
                    if (isNaN(Number(key))) {
                        return (
                            <MenuItem key={key} value={HealthCheckRating[key as keyof typeof HealthCheckRating]}>
                                {key}
                            </MenuItem>
                        );
                    }
                    return null;
                })}
            </Select>
        </>
    );
};

export default HealthCheckForm;