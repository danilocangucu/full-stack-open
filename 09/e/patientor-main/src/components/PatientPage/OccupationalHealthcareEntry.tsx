import React from "react";
import { OccupationalHealthcareEntry as OHEntry } from "../../types";

const OccupationalHealthcareEntry = ({ entry }: { entry: OHEntry }) => (
    <>
        <p>Emplyer Name: {entry.employerName}</p>
        {entry.sickLeave && (
            <>
                <h4 style={{ marginBottom: 0, paddingBottom: 0 }}>
                    Sick Leave:
                </h4>
                <span>Start date: {entry.sickLeave?.startDate}<br />
                    End date: {entry.sickLeave?.endDate}</span>
            </>
        )}
    </>
);

export default OccupationalHealthcareEntry;