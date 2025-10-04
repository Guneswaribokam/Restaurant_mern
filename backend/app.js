import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

// ✅ Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();

// ✅ Fix CORS config
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Middleware to parse JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use("/api/v1/reservation", reservationRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN 🚀",
  });
});

// ✅ Connect to Database
dbConnection();

// ✅ Global Error Middleware
app.use(errorMiddleware);

export default app;