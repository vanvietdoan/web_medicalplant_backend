import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/userRoutes";
import plantRoutes from "./routes/plantRoutes";
import diseaseRoutes from "./routes/diseaseRoutes";
import reportRoutes from "./routes/reportRoutes";
import authRoutes from "./routes/authRoutes";
import uploadRoutes from './routes/uploadRoutes';
import divisionRoutes from './routes/divisionRoutes';

import config from "./utils/config";
import logger from "./utils/logger";
import path from "path";


const app = express();
const port = config.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use("/api/auth", authRoutes); // Add this line to use the userRoutes for /api/auth
app.use("/api/users", userRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/diseases", diseaseRoutes);
app.use("/api/reports", reportRoutes);
app.use('/api/upload', uploadRoutes);
app.use("/api/divisions", divisionRoutes);

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    logger.info("Database connection established");
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => logger.error("TypeORM connection error: ", error)); 