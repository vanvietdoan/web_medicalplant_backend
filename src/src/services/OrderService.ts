import { Service } from "typedi";
import { OrderRepository } from "../repositories/OrderRepository";
import { IOrderResponse } from "../interfaces/IOrder";
import { Order } from "../entities/Order";

@Service()
export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
      this.orderRepository = new OrderRepository();
  }

  private formatOrderResponse(orderData: Order): IOrderResponse {
    return {
      created_at: orderData.created_at,
      updated_at: orderData.updated_at,
      order_id: orderData.order_id,
      name: orderData.name,
      class_id: orderData.class_id
    };
  }

  public async getAllOrders(): Promise<IOrderResponse[]> {
    const orders = await this.orderRepository.findAll();
    return orders.map(this.formatOrderResponse);
  }

  public async getOrderById(id: number): Promise<IOrderResponse | null> {
    const orderData = await this.orderRepository.findById(id);
    return orderData ? this.formatOrderResponse(orderData) : null;
  }

  public async createOrder(orderData: Partial<Order>): Promise<Order> {
    return this.orderRepository.create(orderData);
  }

  public async updateOrder(id: number, orderData: { name: string; divisio_id: number }): Promise<Order | null> {
    return this.orderRepository.update(id, orderData);
  }

  public async deleteOrder(id: number): Promise<boolean> {
    return this.orderRepository.delete(id);
  }

  public async getOrdersByClass(classId: number): Promise<IOrderResponse[]> {
    const orders = await this.orderRepository.findByClass(classId);
    return orders.map(this.formatOrderResponse);
  }

  public async searchOrders(name: string): Promise<IOrderResponse[]> {
    const orders = await this.orderRepository.searchByName(name);
    return orders.map(this.formatOrderResponse);
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