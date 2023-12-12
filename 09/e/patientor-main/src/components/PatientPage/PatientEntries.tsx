import React from 'react';
import { Diagnosis, Entry } from "../../types";
import BaseEntry from './BaseEntry';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

export interface PatientEntriesProps {
    entries: Entry[];
    diagnoses: Diagnosis[];
}

const PatientEntries = ({ entries, diagnoses }: PatientEntriesProps) => {
    const entryStyle = (index: number) => ({
        border: '1px solid gainsboro',
        padding: '8px',
        marginBottom: index < entries.length - 1 ? '5px' : '0',
    });

    return entries.map((entry, index) => {
        let specificEntry;
        switch (entry.type) {
            case 'HealthCheck':
                specificEntry = <HealthCheckEntry entry={entry} />;
                break;
            case 'OccupationalHealthcare':
                specificEntry = <OccupationalHealthcareEntry entry={entry} />;
                break;
            case 'Hospital':
                specificEntry = <HospitalEntry entry={entry} />;
                break;
            default:
                specificEntry = null;
        }
        return (
            <div style={entryStyle(index)} key={entry.id}>
                <BaseEntry entry={entry} diagnoses={diagnoses} />
                {specificEntry}
            </div>
        );
    });
};


export default PatientEntries;