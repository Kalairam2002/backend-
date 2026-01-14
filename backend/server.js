const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔑 Whitelisted origins
const allowedOrigins = [
  "http://localhost:5173",          
    "http://31.97.237.98:7000"
];

// ✅ Define corsOptions BEFORE using it
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

// ✅ Apply middlewares
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.get('/',(req,res)=>{
    res.status(200).json({
        message: "Hello World !"
    })
})
app.use("/api/products", require("./routes/productRoutes"));

/* ---------------- DB CONNECT ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed");
    console.error(err.message);
  });
