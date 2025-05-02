import express from "express";
import { ClassController } from "../controllers/ClassController";
import { auth } from "../middleware/auth";
import { Container } from "typedi";

const router = express.Router();
const classController = Container.get(ClassController);

router.get("/search", classController.searchClasses.bind(classController));
router.get("/", classController.getAllClasses.bind(classController));
router.get("/:id",  classController.getClassById.bind(classController));
router.post("/", auth, classController.createClass.bind(classController));
router.put("/:id", auth, classController.updateClass.bind(classController));
router.delete("/:id", auth, classController.deleteClass.bind(classController));


export default router;