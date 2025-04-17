import { Service } from "typedi";
import { OrderRepository } from "../repositories/OrderRepository";
import { Order } from "../entities/Order";

@Service()
export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  public async getOrderById(id: number): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  public async createOrder(orderData: Partial<Order>): Promise<Order> {
    return this.orderRepository.create(orderData);
  }

  public async updateOrder(id: number, orderData: Partial<Order>): Promise<Order | null> {
    return this.orderRepository.update(id, orderData);
  }

  public async deleteOrder(id: number): Promise<boolean> {
    return this.orderRepository.delete(id);
  }

  public async getOrdersByClass(classId: number): Promise<Order[]> {
    return this.orderRepository.findByClass(classId);
  }

  public async searchOrders(name: string): Promise<Order[]> {
    return this.orderRepository.searchByName(name);
  }

  public async validateOrderData(orderData: Partial<Order>): Promise<string[]> {
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