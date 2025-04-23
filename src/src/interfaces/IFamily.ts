import { Order } from "../entities/Order";

export interface IFamily {
  family_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  order_id: number;
  order?: Order;
}