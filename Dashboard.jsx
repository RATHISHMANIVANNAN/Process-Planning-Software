import React from "react";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './Dashboard.css'; // Import the CSS file

const pendingWorkData = [
  { priority: "High", tasks: 8 },
  { priority: "Medium", tasks: 15 },
  { priority: "Low", tasks: 10 },
];

const performanceData = [
  { month: "Jan", performance: 60 },
  { month: "Feb", performance: 70 },
  { month: "Mar", performance: 65 },
  { month: "Apr", performance: 80 },
];

const completedWorkData = [
  { category: "Design", tasks: 12 },
  { category: "Development", tasks: 18 },
  { category: "Testing", tasks: 10 },
];

const notificationsData = [
  { name: "Mentions", value: 5 },
  { name: "Meeting Reminders", value: 8 },
  { name: "Deadlines", value: 12 },
  { name: "Project Updates", value: 6 },
];

const heatmapData = [
  { team: "Team A", workload: 7 },
  { team: "Team B", workload: 10 },
  { team: "Team C", workload: 5 },
];

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="chart-grid">
        {/* Pending Work Tracker */}
        <div className="chart-container">
          <h3 className="chart-header">Pending Work Tracker</h3>
          <ResponsiveContainer className="chart-responsive-container" width="100%" height={250}>
            <BarChart data={pendingWorkData}>
              <XAxis dataKey="priority" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Improvement Analysis */}
        <div className="chart-container">
          <h3 className="chart-header">Performance Improvement Analysis</h3>
          <ResponsiveContainer className="chart-responsive-container" width="100%" height={250}>
            <LineChart data={performanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="performance" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Completed Work Overview */}
        <div className="chart-container">
          <h3 className="chart-header">Completed Work Overview</h3>
          <ResponsiveContainer className="chart-responsive-container" width="100%" height={250}>
            <BarChart data={completedWorkData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Notifications Dashboard */}
        <div className="chart-container">
          <h3 className="chart-header">Notifications Dashboard</h3>
          <ResponsiveContainer className="chart-responsive-container" width="100%" height={250}>
            <PieChart>
              <Pie data={notificationsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#ff7300" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Workload Distribution Analysis */}
        <div className="chart-container col-span-2">
          <h3 className="chart-header">Workload Distribution Analysis</h3>
          <ResponsiveContainer className="chart-responsive-container" width="100%" height={250}>
            <BarChart data={heatmapData}>
              <XAxis dataKey="team" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="workload" fill="#ff4567" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
