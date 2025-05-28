import React from "react";
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <header className="about-header">
        <h1>About AI Bias Detector</h1>
      </header>

      {/* Main Content */}
      <section className="about-content">
        <div className="about-card">
          <p>
            The AI Bias Detector is designed to help users identify and mitigate bias in AI datasets. 
            Our tool provides advanced fairness analysis, ensuring your AI models are unbiased and fair. 
            Upload your dataset and get detailed insights into bias detection and fairness scores.
          </p>
          <h2>🔍 Key Features</h2>
          <ul>
            <li>✔ AI Bias Analysis</li>
            <li>✔ Detailed Fairness Reports</li>
            <li>✔ Real-time Data Insights</li>
            <li>✔ Easy-to-Use Interface</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
