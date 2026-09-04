import React from "react";
import { Link, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import ChatBot from "./components/ChatBot.jsx";

const NAV = [
  { to: "/farmer/dashboard", label: "🌾 शेतकरी" },
  { to: "/farmer/price-trend", label: "📈 किंमत कल" },
  { to: "/buyer/listings", label: "🛒 खरेदीदार" },
  { to: "/admin/analytics", label: "📊 Admin" },
];

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-logo" style={{ textDecoration: "none" }}>🌱 AgriSetu</Link>
        {!isLanding && (
          <nav className="nav-links">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={location.pathname === item.to ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main>
        <ErrorBoundary key={location.pathname}>
          <AppRoutes />
        </ErrorBoundary>
      </main>
      <ChatBot />
    </div>
  );
}
