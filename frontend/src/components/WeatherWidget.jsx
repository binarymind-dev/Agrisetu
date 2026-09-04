import { useEffect, useState } from "react";

const WEATHER_CODES = {
  0: { label: "निरभ्र आकाश", icon: "☀️" },
  1: { label: "साधारण निरभ्र", icon: "🌤️" },
  2: { label: "अंशतः ढगाळ", icon: "⛅" },
  3: { label: "ढगाळ", icon: "☁️" },
  45: { label: "धुके", icon: "🌫️" },
  51: { label: "हलका पाऊस", icon: "🌦️" },
  61: { label: "पाऊस", icon: "🌧️" },
  63: { label: "मध्यम पाऊस", icon: "🌧️" },
  65: { label: "जोरदार पाऊस", icon: "⛈️" },
  80: { label: "सरी", icon: "🌦️" },
  95: { label: "वादळ", icon: "⛈️" },
};

function getAdvisory(code, temp) {
  if ([61, 63, 65, 80, 95].includes(code)) {
    return { text: "पावसाची शक्यता — काढणी/फवारणी पुढे ढकला.", color: "#0ea5e9" };
  }
  if (temp >= 38) {
    return { text: "तीव्र उष्णता — पिकांना जास्त पाणी द्या.", color: "#f43f5e" };
  }
  if (code === 0 || code === 1) {
    return { text: "हवामान पीक कामांसाठी अनुकूल आहे.", color: "#22c55e" };
  }
  return { text: "सर्वसाधारण हवामान — नियमित काळजी घ्या.", color: "#4b5563" };
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
          );
          const data = await res.json();
          setWeather(data.current);
          setStatus("ready");
        } catch {
          setStatus("error");
        }
      },
      () => setStatus("error")
    );
  }, []);

  if (status === "loading") return <div className="card loading-text">🌍 हवामान माहिती मिळवत आहे...</div>;
  if (status === "error" || !weather) return null;

  const code = weather.weather_code;
  const temp = Math.round(weather.temperature_2m);
  const wInfo = WEATHER_CODES[code] || { label: "अज्ञात", icon: "🌡️" };
  const advisory = getAdvisory(code, temp);

  return (
    <div className="card weather-card">
      <div className="card-title">🌦️ हवामान आधारित सल्ला</div>
      <div className="weather-row">
        <div className="weather-icon">{wInfo.icon}</div>
        <div>
          <div className="weather-temp">{temp}°C</div>
          <div className="weather-label">{wInfo.label}</div>
        </div>
      </div>
      <div className="advisory-pill" style={{ background: advisory.color }}>
        💡 {advisory.text}
      </div>
    </div>
  );
}
