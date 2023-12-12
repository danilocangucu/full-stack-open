import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react';
import { Diagnosis, Entry } from '../../types';

export interface BaseEntryProps {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const BaseEntry = ({ entry, diagnoses }: BaseEntryProps) => {
    return (
        <div key={entry.id}>
            <h3 style={{ marginTop: 0, paddingTop: 0 }}>
                Specialist: {entry.specialist}
            </h3>
            {entry.date} <i>{entry.description}</i>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Diagnosis code(s)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entry.diagnosisCodes.map((dC, i) => (
                            <TableRow key={i}>
                                <TableCell>{dC} {diagnoses && diagnoses[i]?.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default BaseEntry;