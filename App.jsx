import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { ChatSystem } from "./components/ChatSystem";
import { Dashboard } from "./components/Dashboard";
import { Notifications } from "./components/Notifications";
import EyeGaze from "./components/EyeGaze";  // New import
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 22));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));
  const resetFontSize = () => setFontSize(16);

  return (
    <Router>
      <div className="app-container" style={{ fontSize: `${fontSize}px` }}>
        <Sidebar />
        <main className="main-content">
          <div className="accessibility-controls">
            <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Dark Mode">
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <button onClick={increaseFontSize} aria-label="Increase Font Size">A+</button>
            <button onClick={decreaseFontSize} aria-label="Decrease Font Size">A-</button>
            <button onClick={resetFontSize} aria-label="Reset Font Size">🔄 Reset</button>
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<ChatSystem />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/eyegaze" element={<EyeGaze />} />  {/* New Route */}
          </Routes>
        </main>
      </div>
      <KeyboardShortcuts />
    </Router>
  );
};

const KeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        switch (event.key.toLowerCase()) {
          case "d": navigate("/"); break;
          case "c": navigate("/chat"); break;
          case "n": navigate("/notifications"); break;
          case "e": navigate("/eye-gaze"); break;  // Shortcut for Eye-Gaze Page
          default: break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return null;
};

export default App;
