import { useState, useRef } from "react";
import { transcribeAudio } from "../../services/voiceService";

export function useVoiceInput(onResult) {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);

      mediaRecorder.onstop = async () => {
        setProcessing(true);
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        try {
          const text = await transcribeAudio(blob);
          onResult?.(text);
        } catch (err) {
          console.error("Transcription failed:", err);
        } finally {
          setProcessing(false);
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Mic access denied or unavailable:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return { recording, processing, startRecording, stopRecording };
}
