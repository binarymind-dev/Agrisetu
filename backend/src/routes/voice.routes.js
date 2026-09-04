const express = require("express");
const multer = require("multer");
const router = express.Router();
const voiceService = require("../services/voiceService");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const text = await voiceService.transcribeAudio(req.file.buffer);
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
