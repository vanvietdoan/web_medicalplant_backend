import { OrderRepository } from "../repositories/OrderRepository";
import { Order } from "../entities/Order";

export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    return this.orderRepository.create(orderData);
  }

  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order | null> {
    return this.orderRepository.update(id, orderData);
  }

  async deleteOrder(id: number): Promise<boolean> {
    return this.orderRepository.delete(id);
  }

  async getOrdersByClass(classId: number): Promise<Order[]> {
    return this.orderRepository.findByClass(classId);
  }

  async searchOrders(name: string): Promise<Order[]> {
    return this.orderRepository.searchByName(name);
  }

  async validateOrderData(orderData: Partial<Order>): Promise<string[]> {
    const errors: string[] = [];

    if (!orderData.name) {
      errors.push("Name is required");
    }

    if (!orderData.class_id) {
      errors.push("Class ID is required");
    }

    return errors;
  }
} 