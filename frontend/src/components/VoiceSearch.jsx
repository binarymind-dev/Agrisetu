import { useState } from "react";
import api from "../services/api";

export default function VoiceSearch() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const CROP_MAP = {
    "कांदा": "Onion", "टोमॅटो": "Tomato", "गहू": "Wheat",
    "कापूस": "Cotton", "सोयाबीन": "Soybean",
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("तुमचा browser voice search support करत नाही (Chrome वापरा).");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "mr-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    setError(null);
    setResult(null);

    recognition.onresult = async (event) => {
      const said = event.results[0][0].transcript;
      setTranscript(said);
      const matchedCrop = Object.keys(CROP_MAP).find((mr) => said.includes(mr));
      if (matchedCrop) {
        try {
          const data = await api.getForecast(CROP_MAP[matchedCrop]);
          const price = data.history?.[data.history.length - 1]?.price;
          setResult({ crop: matchedCrop, price });
        } catch {
          setError("किंमत मिळाली नाही, पुन्हा प्रयत्न करा.");
        }
      } else {
        setError(`"${said}" ओळखलं नाही. कांदा/टोमॅटो/गहू/कापूस/सोयाबीन बोला.`);
      }
    };
    recognition.onerror = () => { setError("ऐकू आलं नाही, पुन्हा प्रयत्न करा."); setListening(false); };
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <div className="card voice-card">
      <div className="card-title">🎙️ बोलून किंमत विचारा</div>
      <button className={`voice-btn ${listening ? "listening" : ""}`} onClick={startListening}>
        {listening ? "🎙️ ऐकत आहे..." : "🎤 बोला (उदा. \"कांदा भाव किती\")"}
      </button>
      {transcript && <p className="voice-transcript">तुम्ही म्हणालात: "{transcript}"</p>}
      {result && (
        <div className="voice-result">
          ✅ {result.crop} चा सध्याचा भाव: <strong>₹{result.price}</strong>
        </div>
      )}
      {error && <p style={{ color: "#b91c1c", fontSize: 13 }}>{error}</p>}
    </div>
  );
}
