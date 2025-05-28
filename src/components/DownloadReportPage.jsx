import React from "react";
import { useParams } from "react-router-dom";
import "../styles/download.css";
const baseURL = "https://web-production-f90ec.up.railway.app/"; // Replace with actual backend URL
const DownloadReportPage = () => {
    const { analysisId } = useParams();

    const handleDownload = () => {
        window.open(`${baseURL}/api/download-report/${analysisId}/`, "_blank");
    };

    return (
        <div className="download-report-container">
            <h2>Bias Report Ready</h2>
            <p>Your bias analysis report is generated and ready for download.</p>
            <button className="download-btn" onClick={handleDownload}>Download PDF</button>
        </div>
    );
};

export default DownloadReportPage;
