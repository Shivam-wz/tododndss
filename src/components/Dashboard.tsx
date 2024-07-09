// src/components/Dashboard.tsx
import React from "react";
import "./Dashboard.css"; // Optional CSS for styling

interface DashboardProps {
  totalTasks: number;
  completedTasks: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  totalTasks,
  completedTasks,
}) => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-item">
        <span>Total Tasks: </span>
        <span>{totalTasks}</span>
      </div>
      <div className="dashboard-item">
        <span>Completed Tasks: </span>
        <span>{completedTasks}</span>
      </div>
      <div className="dashboard-item">
        <span>Pending Task: </span>
        <span>{totalTasks - completedTasks}</span>
      </div>
    </div>
  );
};

export default Dashboard;
