require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const listingRoutes = require("./routes/listing.routes");
const priceRoutes = require("./routes/price.routes");
const offerRoutes = require("./routes/offer.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");
const voiceRoutes = require("./routes/voice.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/voice", voiceRoutes);

app.get("/", (req, res) => res.send("AgriSetu API is running"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AgriSetu backend running on port ${PORT}`));
