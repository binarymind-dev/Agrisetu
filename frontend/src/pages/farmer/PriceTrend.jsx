import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import api from "../../services/api";

const CROPS = ["Onion", "Tomato", "Wheat", "Cotton", "Soybean"];

export default function PriceTrend() {
  const [crop, setCrop] = useState(CROPS[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    api.getForecast(crop)
      .then((res) => { if (active) setData(res); })
      .catch((e) => { if (active) setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [crop]);

  const chartData = data
    ? [...data.history, ...data.forecast]
    : [];

  const lastActual = data?.history?.[data.history.length - 1]?.price;
  const nextForecast = data?.forecast?.[0]?.price;
  const trendUp = lastActual != null && nextForecast != null && nextForecast > lastActual;

  return (
    <div>
      <div className="page-title">📈 किंमत कल (Price Trend & Forecast)</div>

      <select className="select-crop" value={crop} onChange={(e) => setCrop(e.target.value)}>
        {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      {loading && <div className="loading-text">Loading forecast...</div>}
      {error && <div className="card" style={{ color: "#b91c1c" }}>Error: {error}</div>}

      {!loading && !error && data && (
        <>
          <div className="stat-grid">
            <div className="stat-box">
              <div className="value">₹{lastActual ?? "—"}</div>
              <div className="label">Current Price</div>
            </div>
            <div className="stat-box" style={{ borderLeftColor: trendUp ? "#22c55e" : "#ef4444" }}>
              <div className="value">₹{nextForecast ?? "—"}</div>
              <div className="label">
                Tomorrow's Forecast
                <span className="forecast-badge">AI</span>
              </div>
            </div>
            <div className="stat-box">
              <div className="value">{trendUp ? "▲ वाढ" : "▼ घट"}</div>
              <div className="label">Expected Trend</div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">7-Day AI Forecast — {crop}</div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#15803d"
                  strokeWidth={2.5}
                  dot={(props) => {
                    const isForecast = props.payload.predicted;
                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={4}
                        fill={isForecast ? "#f59e0b" : "#15803d"}
                        stroke="white"
                        strokeWidth={1}
                      />
                    );
                  }}
                  name="Price (₹/quintal)"
                />
              </LineChart>
            </ResponsiveContainer>
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>
              🟢 Historical actual price &nbsp;&nbsp; 🟠 AI-predicted (next 7 days)
            </p>
          </div>
        </>
      )}
    </div>
  );
}
