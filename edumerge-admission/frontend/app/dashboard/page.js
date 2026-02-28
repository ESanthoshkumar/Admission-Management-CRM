import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalIntake: 100,
    admitted: 45,
    remaining: 55,
    quota: {
      KCET: { filled: 30, available: 30 },
      COMEDK: { filled: 10, available: 20 },
      Management: { filled: 5, available: 5 },
    },
    pendingDocs: 8,
    pendingFees: 12,
  });

  // in real app, fetch from your backend API
  useEffect(() => {
    // example:
    // fetch("http://localhost:5001/api/dashboard")
    //  .then(r => r.json())
    //  .then(setStats);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Admission Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        <div style={cardStyle}>
          <h3>Total Intake</h3>
          <p>{stats.totalIntake}</p>
        </div>
        <div style={cardStyle}>
          <h3>Admitted</h3>
          <p>{stats.admitted}</p>
        </div>
        <div style={cardStyle}>
          <h3>Remaining</h3>
          <p>{stats.remaining}</p>
        </div>
      </div>

      <h2>Quota‑wise Filled Seats</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {Object.entries(stats.quota).map(([key, q]) => (
          <div key={key} style={cardStyle}>
            <h3>{key}</h3>
            <p>Filled: {q.filled}</p>
            <p>Available: {q.available}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
        <div style={cardStyle}>
          <h3>Applicants with Pending Documents</h3>
          <p>{stats.pendingDocs}</p>
        </div>
        <div style={cardStyle}>
          <h3>Applicants with Pending Fees</h3>
          <p>{stats.pendingFees}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "1rem",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};
