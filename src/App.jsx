import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage';
import AboutPage from "./components/AboutPage";
import UploadPage from "./components/UploadPage";
import AnalysisPage from "./components/AnalysisPage";
import LoadingPage from "./components/LoadingPage";
import AnalysisReport from "./components/AnalysisReport";
import SuggestionsPage from "./components/SuggestionsPage";
import DownloadReportPage from "./components/DownloadReportPage";
import CSVFormat from "./components/CSVFormat";
function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/report/:analysisId" element={<AnalysisReport />} />
        <Route path="/suggestions/:analysisId" element={<SuggestionsPage />} />
        <Route path="/download-report/:analysisId" element={<DownloadReportPage />} />
        <Route path="/csv-format" element={<CSVFormat />} />
      </Routes>
    </Router>
  );
}

export default App;