import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/LoadingPage.css";

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const datasetId = location.state?.datasetId;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 20;
      });
    }, 1000);

    setTimeout(() => {
      navigate("/analysis", { state: { datasetId } });
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate, datasetId]);

  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="spinner"></div>
        <p className="loading-text">Detecting Bias...</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">{progress}% Completed</p>
      </div>
    </div>
  );
};

export default LoadingPage;
