import React, { useState, useEffect } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/suggestions.css";

const SuggestionsPage = () => {
    const { analysisId } = useParams();
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await API.get(`/api/suggestion/${analysisId}/`);
                setSuggestions(response.data.suggestions);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setError("Failed to load suggestions.");
                setLoading(false);
            }
        };
        fetchSuggestions();
    }, [analysisId]);

    const applyFixes = async () => {
        try {
            await API.post(`/api/apply-fixes/${analysisId}/`);
            alert("✅ Bias fixes applied successfully!");
            navigate(`/download-report/${analysisId}`);
        } catch (error) {
            console.error("Error applying fixes:", error);
            alert("❌ Failed to apply fixes.");
        }
    };

    if (loading) return <p className="loading-text">Loading suggestions...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div className="suggestions-container">
            <h2>Suggested Bias Fixes</h2>
            <ul className="suggestions-list">
                {suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion.suggestion_text}</li>
                    ))
                ) : (
                    <p className="error-text">No suggestions available.</p>
                )}
            </ul>
            <button className="apply-fixes-btn" onClick={applyFixes}>Apply Fixes</button>
        </div>
    );
};

export default SuggestionsPage;
