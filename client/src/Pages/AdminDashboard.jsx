import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-page">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      <div className="dashboard-grid">
        {/* Users Card */}
        <div className="dashboard-card">
          <div className="dashboard-icon-wrapper">
            <svg className="dashboard-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className="dashboard-content">
            <h3>Users</h3>
            <p>2</p>
          </div>
        </div>

        {/* Questions Attempted Card */}
        <div className="dashboard-card">
          <div className="dashboard-icon-wrapper">
            <svg className="dashboard-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <circle cx="12" cy="17" r="1"/>
              <path d="M12 13v-1a2 2 0 1 1 2-2"/>
            </svg>
          </div>
          <div className="dashboard-content">
            <h3>Questions Attempted</h3>
            <p>10</p>
          </div>
        </div>

        {/* Attempts Card */}
        <div className="dashboard-card">
          <div className="dashboard-icon-wrapper">
            <svg className="dashboard-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
            </svg>
          </div>
          <div className="dashboard-content">
            <h3>Attempts</h3>
            <p>3</p>
          </div>
        </div>

        {/* Score Card (Teal) */}
        <div className="dashboard-card teal">
          <div className="dashboard-icon-wrapper teal">
            <svg className="dashboard-icon teal" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"/>
              <rect width="4" height="7" x="7" y="10" rx="1"/>
              <rect width="4" height="12" x="15" y="5" rx="1"/>
            </svg>
          </div>
          <div className="dashboard-content">
            <h3>Score</h3>
            <p className="teal">7 / 10</p>
          </div>
        </div>

      </div>
    </div>
  );
}
