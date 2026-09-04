import { useState } from "react";
import api from "../../services/api";
import Card from "../../components/Card.jsx";
import Button from "../../components/Button.jsx";
import VoiceMicButton from "../../features/voice-input/VoiceMicButton.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function CreateListing() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    crop: "",
    quantity: "",
    unit: "kg",
    quality_grade: "",
    location: ""
  });
  const [status, setStatus] = useState(null);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleVoiceResult = (text) => {
    setForm((prev) => ({ ...prev, crop: text }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    try {
      await api.post("/listings", form);
      setStatus("success");
      setForm({ crop: "", quantity: "", unit: "kg", quality_grade: "", location: "" });
    } catch (err) {
      console.error("Failed to create listing:", err);
      setStatus("error");
    }
  };

  return (
    <div>
      <h3>{t("create_listing")}</h3>
      <Card>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>{t("crop")}</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input value={form.crop} onChange={handleChange("crop")} style={{ flex: 1 }} />
              <VoiceMicButton onResult={handleVoiceResult} />
            </div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>{t("quantity")}</label>
            <input
              type="number"
              value={form.quantity}
              onChange={handleChange("quantity")}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Quality Grade</label>
            <input value={form.quality_grade} onChange={handleChange("quality_grade")} style={{ width: "100%" }} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Location</label>
            <input value={form.location} onChange={handleChange("location")} style={{ width: "100%" }} />
          </div>
          <Button type="submit">{t("submit")}</Button>
          {status === "success" && <p style={{ color: "green" }}>Listing created!</p>}
          {status === "error" && <p style={{ color: "red" }}>Failed to create listing.</p>}
        </form>
      </Card>
    </div>
  );
}
