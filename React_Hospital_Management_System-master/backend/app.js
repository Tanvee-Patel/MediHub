import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import userRouter from "./router/userRouter.js"; // Import the user router
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// Load environment variables
config({ path: "./config/config.env" });

const app = express();

// CORS setup
app.use(
    cors({
        origin: [process.env.FRONTEND_URL || "http://localhost:3000", process.env.DASHBOARD_URL || "http://localhost:5174"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/user", userRouter); // Added user routes

// Catch-all route for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Resource not found" });
});

// Database connection
dbConnection()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });

// Error middleware
app.use(errorMiddleware);

export default app;