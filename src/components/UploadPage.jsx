import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/UploadPage.css";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const response = await API.post("/api/upload/", formData);
      const datasetId = response.data.dataset_id;
      
      navigate("/loading", { state: { datasetId } });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>📂 Upload Your Dataset</h2>
        <p>Upload a CSV file for AI Bias Detection analysis.</p>

        <div className="file-input">
          <input type="file" accept=".csv" onChange={handleFileChange} />
          {file && <p className="file-name">📄 {file.name}</p>}
        </div>

        <button className="upload-btn" onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>

        {loading && <p className="loading-text">Processing your dataset...</p>}
      </div>
    </div>
  );
};

export default UploadPage;
