import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AnalysisPage.css";
import API from "../api";

const AnalysisPage = () => {
  const location = useLocation();
  const datasetId = location.state?.datasetId;
  const [biasScore, setBiasScore] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const analyzeBias = async () => {
      try {
        const response = await API.post("/api/analyze/", {
          dataset_id: datasetId,
          sensitive_feature: "gender",
        });

        const analysisId = response.data.analysis_id;
        setAnalysisId(analysisId);

        const resultResponse = await API.get(`/api/analysis/${analysisId}/`);
        setBiasScore(resultResponse.data.demographic_parity_difference);
        setAccuracy(resultResponse.data.accuracy);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analysis results:", error.response?.data || error);
        setErrorMessage(error.response?.data?.message || "Something went wrong.");
        setLoading(false);
      }
    };

    analyzeBias();
  }, [datasetId]);

  return (
    <div className="analysis-container">
      <div className="analysis-card">
        <h2>🔍 Bias Detection Results</h2>

        {loading ? (
          <div className="loading-spinner"></div>
        ) : errorMessage ? (
          <div className="error-message">{errorMessage}</div>
        ) : (
          <>
            <p className="bias-score">
              <strong>Bias Score:</strong> {biasScore?.toFixed(2)}
            </p>
            <p className="accuracy">
              <strong>Accuracy:</strong> {accuracy?.toFixed(2)}%
            </p>
            {analysisId && (
              <button className="view-report-btn" onClick={() => navigate(`/report/${analysisId}`)}>
                📊 View Report
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;
