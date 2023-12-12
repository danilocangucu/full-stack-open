import React from "react";
import { HealthCheckEntry as HCEntry, HealthCheckRating } from "../../types";

const HealthCheckRatingStrings = {
    [HealthCheckRating.Healthy]: "Healthy",
    [HealthCheckRating.LowRisk]: "Low Risk",
    [HealthCheckRating.HighRisk]: "High Risk",
    [HealthCheckRating.CriticalRisk]: "Critical Risk",
};

const HealthCheckEntry = ({ entry }: { entry: HCEntry }) => (
    <h4 style={{ marginBottom: 0, paddingBottom: 0 }}>
        Health Check: {HealthCheckRatingStrings[entry.healthCheckRating]}
    </h4>
);

export default HealthCheckEntry;