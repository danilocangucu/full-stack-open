import React from "react";
import { HospitalEntry as HEType } from "../../types";

const HospitalEntry = ({ entry }: { entry: HEType }) => (
    <>
        <h4>Hospital Discharge</h4>
        <p>Date: {entry.discharge.date}</p>
        <p><i>{entry.discharge.criteria}</i></p>

    </>
);

export default HospitalEntry;