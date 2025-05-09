import { Router } from "express";
import { Container } from "typedi";
import { ReportController } from "../controllers/ReportController";
import { auth } from "../middleware/auth";

const router = Router();
const reportController = Container.get(ReportController);

// Public routes
router.get("/", reportController.getAllReports.bind(reportController));
router.get("/:id", reportController.getReportById.bind(reportController));

router.get("/plant/:plantId", reportController.getReportsByPlant.bind(reportController));
router.get("/user/:userId", reportController.getReportsByUserId.bind(reportController));
// Protected routes
router.post("/", auth, reportController.createReport.bind(reportController));
router.put("/:id", auth, reportController.updateReport.bind(reportController));
router.delete("/:id", auth, reportController.deleteReport.bind(reportController));

export default router; 