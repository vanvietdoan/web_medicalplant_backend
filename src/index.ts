import 'reflect-metadata';
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/userRoutes";
import plantRoutes from "./routes/plantRoutes";
import diseaseRoutes from "./routes/diseaseRoutes";
import reportRoutes from "./routes/reportRoutes";
import userReportRoutes from "./routes/userReportRoutes";
import authRoutes from "./routes/authRoutes";
import uploadRoutes from './routes/uploadRoutes';
import divisionRoutes from './routes/divisionRoutes';
import familyRoutes from './routes/familyRoutes'
import adviceRoutes from './routes/adviceCommentRoutes';
import config from "./utils/config";
import logger from "./utils/logger";
import path from "path";
import { useContainer } from "typeorm";
import { Container } from "typedi";

// Đảm bảo reflect-metadata được import đầu tiên
import 'reflect-metadata';

// Khởi tạo các thành phần cốt lõi để Dependency Injection có thể hoạt động
import "./utils/tokenCache";
import "./repositories/UserRepository";
import "./services/AuthService";
import "./controllers/AuthController";
import classRoutes from './routes/classRoutes';
import orderRoutes from './routes/orderRoutes';
import  genusRoutes from './routes/genusRoutes';
import speciesRoutes from './routes/speciesRoutes';

// Set up TypeDI as the container for TypeORM
useContainer(Container);

const app = express();
const port = config.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/diseases", diseaseRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/user_report", userReportRoutes);
app.use('/api/upload', uploadRoutes);

app.use("/api/advice", adviceRoutes);


app.use("/api/divisions", divisionRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/family",familyRoutes);
app.use("/api/genus",genusRoutes)
app.use("/api/species",speciesRoutes)
// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    logger.info("Database connection established");
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => logger.error("TypeORM connection error: ", error)); 