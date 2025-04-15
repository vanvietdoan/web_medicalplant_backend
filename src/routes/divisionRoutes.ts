import express from "express";
import { DivisionController } from "../controllers/DivisionController";
import { auth } from "../middleware/auth";

const router = express.Router();
const divisionController = new DivisionController();

// Search divisions by name
router.get("/search", divisionController.searchDivisions.bind(divisionController));

// Get all divisions
router.get("/", divisionController.getAllDivisions.bind(divisionController));

// Get division by ID
router.get("/:id", auth, divisionController.getDivisionById.bind(divisionController));

// Create new division
router.post("/", auth, divisionController.createDivision.bind(divisionController));

// Update division
router.put("/:id", auth, divisionController.updateDivision.bind(divisionController));

// Delete division
router.delete("/:id", auth, divisionController.deleteDivision.bind(divisionController));


export default router;