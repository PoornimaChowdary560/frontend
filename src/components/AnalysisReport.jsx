import React, { useState, useEffect } from "react";
import API from "../api";
import { useParams } from "react-router-dom";
import "../styles/analysisReport.css";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Treemap
} from "recharts";

const COLORS = ["#33FF57", "#FF5733", "#3380FF"];

const AnalysisReport = () => {
  const [treemapData, setTreemapData] = useState([]);
  const [barData, setBarData] = useState([]);
  const { analysisId } = useParams();
  const [biasScore, setBiasScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!analysisId) {
      console.error("Error: analysisId is undefined. API request skipped.");
      setError("Invalid Analysis ID.");
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        console.log(`Fetching report for analysisId: ${analysisId}`);
        const response = await API.get(`/api/bias-report/${analysisId}/`);

        if (!response.data || !response.data.data) {
          throw new Error("Invalid API response structure.");
        }

        const genderDistribution = [
          { category: "Male", value: response.data.data.male_percentage },  // Ensure backend sends these values
          { category: "Female", value: response.data.data.female_percentage }
        ];
        setBarData(genderDistribution);
        setBiasScore(response.data.data.bias_score);
        setTreemapData(response.data.data.heatmap_data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching report:", error);
        setError("Failed to load report. Please try again.");
        setLoading(false);
      }
    };

    fetchReport();
  }, [analysisId]);

  if (loading) return <p className="loading-text">Loading report...</p>;
  if (error) return <p className="error-text">{error}</p>;

  // ✅ Dynamic Data Generation Based on API Response
  const pieData = biasScore !== null
    ? [
      { name: "Fair Decisions", value: (1 - biasScore) * 100 },
      { name: "Biased Decisions", value: biasScore * 100 }
      ]
    : [];

  return (
    <div className="report-container">
      <h2 className="report-title">Bias Analysis Report</h2>

      <div className="chart-container">
        {/* Pie Chart */}
        <h3>Bias Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Bar Chart */}
        <h3>AI Decision Breakdown by Gender/Race</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        {/* Treemap as Heatmap Alternative */}
        <h3>Bias Distribution Heatmap</h3>
        <ResponsiveContainer width="100%" height={300}>
          <Treemap width={400} height={200} data={treemapData} dataKey="size" stroke="#fff" fill="#ff7f50" />
        </ResponsiveContainer>
      </div>

      {/* Fix Bias Button */}
      <button className="fix-bias-btn" onClick={() => navigate(`/suggestions/${analysisId}`)}>
        Fix Bias
      </button>
    </div>
  );
};

export default AnalysisReport;
