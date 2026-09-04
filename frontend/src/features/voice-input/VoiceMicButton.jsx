import { useVoiceInput } from "./useVoiceInput";
import { useLanguage } from "../../context/LanguageContext";

export default function VoiceMicButton({ onResult }) {
  const { t } = useLanguage();
  const { recording, processing, startRecording, stopRecording } = useVoiceInput(onResult);

  const handleClick = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={processing}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 14px",
        borderRadius: "20px",
        border: "none",
        background: recording ? "#c62828" : "#2e7d32",
        color: "#fff",
        cursor: processing ? "not-allowed" : "pointer"
      }}
    >
      {processing ? "..." : recording ? "●" : "🎤"} {t("speak_now")}
    </button>
  );
}
