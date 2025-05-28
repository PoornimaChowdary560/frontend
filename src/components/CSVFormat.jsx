import React from "react";
import "../styles/CSVFormat.css";

const CSVFormat = () => {
  const sampleData = [
    {
      name: "poornima",
      gender: "female",
      experience: 6,
      skills: "python, sql",
      education: "masters",
      target: "hired",
      predicted: "not hired",
    },
    {
      name: "poojitha",
      gender: "female",
      experience: 5,
      skills: "python, sql",
      education: "bachelors",
      target: "hired",
      predicted: "not hired",
    },
    {
      name: "achu",
      gender: "male",
      experience: 3,
      skills: "java, html",
      education: "bachelors",
      target: "hired",
      predicted: "hired",
    },
    {
      name: "bhaskar",
      gender: "male",
      experience: 8,
      skills: "css, javascript",
      education: "PhD",
      target: "hired",
      predicted: "hired",
    },
  ];

  const downloadCSV = () => {
    const headers = "name,gender,experience,skills,education,target,predicted\n";
    const rows = sampleData
      .map(row =>
        `${row.name},${row.gender},${row.experience},${row.skills},${row.education},${row.target},${row.predicted}`
      )
      .join("\n");
    const csvContent = headers + rows;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "sample_dataset.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="csv-format-container">
      <h1>CSV Format Guidelines</h1>
      <p className="info-text">
        To ensure accurate bias detection, your dataset must include a <strong>target</strong> and <strong>predicted</strong> column.
        It's <span className="highlight">mandatory</span> to have either a <strong>gender</strong> or <strong>race</strong> column to analyze bias.
      </p>

      <h2>Example CSV Format:</h2>
      <div className="table-wrapper">
        <table className="csv-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Experience</th>
              <th>Skills</th>
              <th>Education</th>
              <th>Target</th>
              <th>Predicted</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.gender}</td>
                <td>{row.experience}</td>
                <td>{row.skills}</td>
                <td>{row.education}</td>
                <td>{row.target}</td>
                <td>{row.predicted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="download-button" onClick={downloadCSV}>
        Download Sample CSV
      </button>
    </div>
  );
};

export default CSVFormat;
