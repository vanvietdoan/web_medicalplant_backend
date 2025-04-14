import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Order } from "../entities/Order";
import { ILike } from "typeorm";

export class OrderRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = AppDataSource.getRepository(Order);
  }

  async findAll(): Promise<Order[]> {
    return this.repository.find({
      relations: ["class"]
    });
  }

  async findById(id: number): Promise<Order | null> {
    return this.repository.findOne({
      where: { order_id: id },
      relations: ["class"]
    });
  }

  async create(order: Partial<Order>): Promise<Order> {
    const newOrder = this.repository.create(order);
    return this.repository.save(newOrder);
  }

  async update(id: number, order: Partial<Order>): Promise<Order | null> {
    await this.repository.update(id, order);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  async findByClass(classId: number): Promise<Order[]> {
    return this.repository.find({
      where: { class: { class_id: classId } },
      relations: ["class"]
    });
  }

  async searchByName(name: string): Promise<Order[]> {
    return this.repository.find({
      where: { name: ILike(`%${name}%`) },
      relations: ["class"]
    });
  }
} 