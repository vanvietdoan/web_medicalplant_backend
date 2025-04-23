import express from "express";
import { DivisionController } from "../controllers/DivisionController";
import { auth } from "../middleware/auth";
import { Container } from "typedi";

const router = express.Router();
const divisionController = Container.get(DivisionController);

router.get("/search", divisionController.searchDivisions.bind(divisionController));
router.get("/", auth, divisionController.getAllDivisions.bind(divisionController));
router.get("/:id", auth, divisionController.getDivisionById.bind(divisionController));
router.post("/", auth, divisionController.createDivision.bind(divisionController));
router.put("/:id", auth, divisionController.updateDivision.bind(divisionController));
router.delete("/:id", auth, divisionController.deleteDivision.bind(divisionController));


export default router;