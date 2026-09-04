import { Link } from "react-router-dom";

const FEATURES = [
  { icon: "📈", title: "AI Price Forecast", desc: "पुढच्या ७ दिवसांचा किंमत अंदाज, regression मॉडेल वापरून." },
  { icon: "🎙️", title: "Voice Search", desc: "मराठीत बोलून पिकाची किंमत विचारा — टायपिंगची गरज नाही." },
  { icon: "🌦️", title: "Weather Advisory", desc: "Live हवामानावर आधारित पीक व्यवस्थापन सल्ला." },
  { icon: "🤝", title: "Direct Buyer Connect", desc: "मध्यस्थांशिवाय थेट खरेदीदाराशी संपर्क." },
  { icon: "🤖", title: "24x7 Assistant", desc: "शेतकऱ्यांच्या प्रश्नांना तात्काळ उत्तर देणारा chatbot." },
  { icon: "📊", title: "Admin Analytics", desc: "Listings, orders आणि users चा real-time डेटा." },
];

const STATS = [
  { value: "500+", label: "नोंदणीकृत शेतकरी" },
  { value: "₹2 Cr+", label: "व्यवहार मूल्य" },
  { value: "12+", label: "समर्थित पिके" },
  { value: "7 दिवस", label: "AI Forecast Range" },
];

export default function Landing() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-badge">🌾 Smart India Hackathon</div>
        <h1 className="hero-title">AgriSetu — शेतकरी आणि बाजार यांना जोडणारा AI-सेतू</h1>
        <p className="hero-subtitle">
          Real-time किंमत, AI forecast, आणि थेट खरेदीदार कनेक्शनसह शेतकऱ्यांना योग्य भाव मिळवून द्या.
        </p>
        <div className="hero-cta">
          <Link to="/farmer/dashboard"><button className="btn-primary btn-lg">🚀 सुरू करा</button></Link>
          <Link to="/buyer/listings"><button className="btn-secondary btn-lg">🛒 खरेदीदार म्हणून पहा</button></Link>
        </div>
      </section>

      <section className="stats-hero">
        {STATS.map((s) => (
          <div key={s.label} className="stat-hero-box">
            <div className="stat-hero-value">{s.value}</div>
            <div className="stat-hero-label">{s.label}</div>
          </div>
        ))}
      </section>

      <section>
        <div className="page-title" style={{ textAlign: "center" }}>✨ Features</div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        Built with 💚 for Smart India Hackathon — AgriSetu Team
      </footer>
    </div>
  );
}
