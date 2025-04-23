import express from "express";
import { OrderController } from "../controllers/OrderController";
import { auth } from "../middleware/auth";
import { Container } from "typedi";

const router = express.Router();
const orderController = Container.get(OrderController);

router.get("/search", orderController.searchOrders.bind(orderController));
router.get("/", orderController.getAllOrders.bind(orderController));
router.get("/:id", orderController.getOrderById.bind(orderController));
router.post("/", orderController.createOrder.bind(orderController));
router.put("/:id", orderController.updateOrder.bind(orderController));
router.delete("/:id", orderController.deleteOrder.bind(orderController));


export default router;