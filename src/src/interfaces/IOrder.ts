import { Class } from "../entities/Class";
import { Order } from "../entities/Order";

export interface IOrder {
  order_id: number;
  name: string;
  class_id: number;
  created_at: Date;
  updated_at: Date;
  class: Class;
  orders?: Order[];
}

export interface IOrderResponse {
  created_at: Date;
  updated_at: Date;
  order_id: number;
  name: string;
  class_id: number;
  } 