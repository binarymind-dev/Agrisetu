import { useState, useRef, useEffect } from "react";

const FAQ = [
  { keys: ["listing", "लिस्टिंग"], answer: "लिस्टिंग तयार करण्यासाठी 'लिस्टिंग तयार करा' बटणावर क्लिक करा, पीक, प्रमाण आणि किंमत टाका." },
  { keys: ["price", "भाव", "किंमत"], answer: "'किंमत कल' पेजवर जाऊन तुम्ही कुठल्याही पिकाचा सध्याचा भाव आणि पुढील ७ दिवसांचा AI अंदाज पाहू शकता." },
  { keys: ["payment", "पेमेंट", "पैसे"], answer: "खरेदीदाराने offer accept केल्यावर payment order confirm झाल्यावर होते. सध्या हे demo मध्ये simulate केलं आहे." },
  { keys: ["forecast", "अंदाज"], answer: "AI forecast मागील किमतींच्या trend वरून पुढच्या ७ दिवसांचा अंदाज देतो — जास्त डेटा मिळाला की अचूकता वाढते." },
  { keys: ["help", "मदत"], answer: "तुम्ही मला listing, price, forecast, payment याबद्दल विचारू शकता!" },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "नमस्कार! 🙏 मी AgriSetu Assistant. तुम्हाला काय मदत हवी आहे?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    const lower = userMsg.toLowerCase();
    const matched = FAQ.find((f) => f.keys.some((k) => lower.includes(k.toLowerCase())));
    const reply = matched ? matched.answer : "माफ करा, हे मला समजलं नाही. तुम्ही 'listing', 'price', 'forecast' किंवा 'payment' बद्दल विचारून बघा.";
    setMessages((m) => [...m, { from: "user", text: userMsg }, { from: "bot", text: reply }]);
    setInput("");
  };

  return (
    <>
      <button className="chatbot-bubble" onClick={() => setOpen((o) => !o)}>
        {open ? "✕" : "💬"}
      </button>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">🤖 AgriSetu Assistant</div>
          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-msg ${m.from}`}>{m.text}</div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="chatbot-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="तुमचा प्रश्न लिहा..."
            />
            <button onClick={send}>पाठवा</button>
          </div>
        </div>
      )}
    </>
  );
}
