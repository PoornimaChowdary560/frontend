import React from "react";
import { useParams } from "react-router-dom";
import "../styles/download.css";
const baseURL = process.env.REACT_APP_BASE_URL;

const DownloadReportPage = () => {
    const { analysisId } = useParams();

    const handleDownload = () => {
  const link = document.createElement("a");
  link.href = `${baseURL}/api/download-report/${analysisId}/`;
  link.download = `bias_report_${analysisId}.pdf`; // Optional: filename hint
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
