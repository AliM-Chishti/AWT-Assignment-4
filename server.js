require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/delivery", require("./routes/deliveryRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 Drone Delivery API is running!",
    frontend: "http://localhost:3000",
    api: "http://localhost:5000/api"
  });
});

// ===================== SERVER START =====================
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    
    app.listen(PORT, () => {
      console.log("\n🚀 Server is running!");
      console.log(`🔗 Local: http://localhost:${PORT}`);
      console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🌐 Frontend: http://localhost:3000`);
      console.log("\n✅ Ready to use! Start your React frontend now.\n");
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });