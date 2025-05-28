import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  // Testimonials data
  const testimonials = [
    { text: "AI Bias Detector helped us ensure our AI model is fair!", user: "Jane Doe, Data Scientist" },
    { text: "A great tool for checking fairness in machine learning models.", user: "John Smith, AI Engineer" },
    { text: "Super easy to use and provides insightful reports!", user: "Emily Davis, Researcher" },
  ];

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="hero">
        <h1 className="hero-title">AI Bias Detector</h1>
        <p className="hero-subtitle">Uncover Bias in Your AI Models</p>
        <p className="hero-text">Upload your dataset and analyze bias instantly.</p>
        <p className="csv-info-text">
  Before starting bias detection, take a quick look at the required CSV format to ensure accurate results.
</p>
        <button className="csv-button" onClick={() => navigate("/csv-format")}>
         CSV Format
         </button>
         <br></br>
         <br></br>
        <button className="cta-button" onClick={() => navigate("/upload")}>
          Start Bias Detection
        </button>

      </header>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔍 Bias Detection</h3>
            <p>Detect AI bias using advanced algorithms.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Data Insights</h3>
            <p>Get detailed reports on fairness metrics.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Real-Time Analysis</h3>
            <p>Analyze bias instantly with real-time insights.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section-title">What Our Users Say</h2>
        {testimonials.map((item, index) => (
          <div key={index} className="testimonial-card">
            <p>"{item.text}"</p>
            <span>- {item.user}</span>
          </div>
        ))}
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <button className="about-button" onClick={() => navigate("/about")}>
          About Us | AI Bias Detector &copy; 2025
        </button>
      </footer>
    </div>
  );
};

export default HomePage;
