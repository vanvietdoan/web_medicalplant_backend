import { Request, Response } from "express";
import { Service } from "typedi";
import { OrderService } from "../services/OrderService";
import { Order } from "../entities/Order";

@Service()
export class OrderController {
  constructor(
    private orderService: OrderService
  ) {}


  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error }); return;
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const order = await this.orderService.getOrderById(id);
      
      if (!order) {
        res.status(404).json({ message: "Order not found" }); return;
        return;
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order", error }); return;
    }
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderData = req.body;
      
      // Validate input data
      const validationErrors = await this.orderService.validateOrderData(orderData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors }); return;
        return;
      }

      const order = await this.orderService.createOrder(orderData);
      res.status(201).json(order); return;
    } catch (error) {
      res.status(500).json({ message: "Error creating order", error }); return;
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const orderData = req.body;
      
      // Validate input data
      const validationErrors = await this.orderService.validateOrderData(orderData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors }); return;
        return;
      }

      const order = await this.orderService.updateOrder(id, orderData);
      
      if (!order) {
        res.status(404).json({ message: "Order not found" }); return;
        return;
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Error updating order", error }); return;
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.orderService.deleteOrder(id);
      
      if (!success) {
        res.status(404).json({ message: "Order not found" }); return;
        return;
      }
      
      res.status(204).send(); return;
    } catch (error) {
      res.status(500).json({ message: "Error deleting order", error }); return;
    }
  }

  async getOrdersByClass(req: Request, res: Response): Promise<void> {
    try {
      const classId = parseInt(req.params.classId);
      const orders = await this.orderService.getOrdersByClass(classId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders by class", error }); return;
    }
  }

  async searchOrders(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;
      
      if (!name || typeof name !== 'string') {
        res.status(400).json({ message: "Search name is required" }); return;
        return;
      }

      const orders = await this.orderService.searchOrders(name);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error searching orders", error }); return;
    }
  }
} 