import api from "./api";

export async function transcribeAudio(audioBlob) {
  const formData = new FormData();
  formData.append("audio", audioBlob, "voice.webm");
  const res = await api.post("/voice/transcribe", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data.text;
}
