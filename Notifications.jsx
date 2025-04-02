import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Ensure Chart.js is registered
import "./Notifications.css";

export const Notifications = () => {
  const [notificationData] = useState({
    mentions: 15,
    reminders: 8,
    deadlines: 5,
    projectUpdates: 10,
  });

  const data = {
    labels: ["Mentions", "Meeting Reminders", "Deadlines", "Project Updates"],
    datasets: [
      {
        data: [
          notificationData.mentions,
          notificationData.reminders,
          notificationData.deadlines,
          notificationData.projectUpdates,
        ],
        backgroundColor: ["#FF5733", "#33FF57", "#337AFF", "#FF33A5"],
        hoverBackgroundColor: ["#FF7F50", "#32CD32", "#1E90FF", "#FF1493"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#333",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset.data;
            return `${tooltipItem.label}: ${dataset[tooltipItem.dataIndex]}`;
          },
        },
      },
    },
  };

  return (
    <div className="notifications-container">
      <h2 className="dashboard-title">📢 Notifications</h2>
      <p className="description">
        Stay updated with mentions, reminders, deadlines, and project updates.
      </p>

      {/* Donut Chart */}
      <div className="chart-container">
        <Doughnut data={data} options={options} />
      </div>

      {/* Notification List */}
      <div className="notification-list">
        <h3>Recent Notifications</h3>
        <ul>
          <li>📅 <strong>Meeting Reminder:</strong> Discuss project timeline (Due Today)</li>
          <li>⏳ <strong>Deadline:</strong> Submit final report by 3 PM</li>
          <li>🔔 <strong>Mention:</strong> @User1, you are tagged in the discussion</li>
          <li>🚀 <strong>Project Update:</strong> Version 2.0 has been deployed</li>
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
