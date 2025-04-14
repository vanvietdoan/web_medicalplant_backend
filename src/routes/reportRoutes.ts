import { Router } from "express";
import { ReportController } from "../controllers/ReportController";
import { auth } from "../middleware/auth";

const router = Router();
const reportController = new ReportController();

// Public routes
router.get("/", reportController.getAllReports);
router.get("/:id", reportController.getReportById);
router.get("/user/:userId", reportController.getReportsByUser.bind(reportController));
router.get("/plant/:plantId", reportController.getReportsByPlant.bind(reportController));

// Protected routes
router.post("/", auth, reportController.createReport);
router.put("/:id", auth, reportController.updateReport);
router.delete("/:id", auth, reportController.deleteReport);

export default router; 